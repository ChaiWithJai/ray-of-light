/**
 * The learner profile store — local-first, as AC 10 requires ("progress
 * persists"). There is no server: the whole profile is one JSON document in
 * localStorage, and every derived view is recomputed from it.
 *
 * Writes are append-only for evidence. Nothing here ever mutates a construction's
 * state directly, because construction state is not stored — it is derived.
 */
import { browser } from '$app/environment';
import {
	deriveAllStates,
	emptyProfile,
	LearnerProfile,
	migrateLegacyTransferEvidence,
	requiredAssessmentSource,
	type ClosureRating,
	type ConstructionState,
	type DailyAssignment,
	type EvidenceAssessmentSource,
	type EvidenceEvent,
	type EvidenceKind,
	type ActiveSession,
	type LearnerSettings,
	type LearningPlan,
	type RecallSessionDraft,
	type SessionMode
} from '$lib/schemas/learner.js';
import {
	deriveResurfaceQueue,
	dueResurfaces,
	POC_WAVE_CONFIG,
	toDayKey,
	type ResurfaceQueueItem
} from '$lib/schemas/schedule.js';
import type { LanguageCode } from '$lib/schemas/content.js';
import { flowFor, RECALL_FLOW, type StepId } from '$lib/flow.js';
import { COURSES, getLesson } from '$lib/content/index.js';
import {
	accessFor,
	advanceSession as advanceSessionState,
	canFinishSession,
	createSession,
	currentSessionMatchesExpected,
	resumeHref,
	type SessionAccess
} from '$lib/session.js';

const STORAGE_KEY = 'ray-of-light.profile.v1';
let loadPersistenceFailed = false;

/**
 * Lessons the entry assessment placed the learner past. They count as met for
 * scheduling only — placement grants no evidence, so `completedLessons` starts
 * at the placed lesson and stays a strict in-order prefix from there.
 */
function placementOffset(profile: LearnerProfile, language: LanguageCode): number {
	const entry = profile.plans[language]?.entryLessonIndex ?? 1;
	return Math.min(Math.max(0, entry - 1), COURSES[language].lessons.length);
}

function sessionMatchesCourse(
	session: ActiveSession,
	activeLanguage: LanguageCode,
	profile?: LearnerProfile
): boolean {
	const lesson = getLesson(activeLanguage, session.lessonId);
	const expectedFlow = lesson
		? session.mode === 'recall'
			? lesson.exercises.some((exercise) => exercise.kind === 'recall')
				? RECALL_FLOW
				: null
			: flowFor(lesson.kind)
		: null;
	if (!currentSessionMatchesExpected(session, activeLanguage, expectedFlow)) return false;
	const origin = session.origin ?? (session.assignmentDay ? 'today' : 'book');
	if (origin === 'resurface') {
		// A resurface retrieval revisits a worked lesson outside the daily
		// assignment; it never belongs to a frozen Today assignment.
		return Boolean(
			!session.assignmentDay &&
				profile &&
				session.mode === 'recall' &&
				(profile.completedLessons[activeLanguage] ?? []).includes(session.lessonId)
		);
	}
	if (origin === 'book') {
		return Boolean(
			!session.assignmentDay &&
				profile &&
				session.mode === 'learn' &&
				(profile.completedLessons[activeLanguage] ?? []).includes(session.lessonId)
		);
	}
	if (!session.assignmentDay || !profile) return false;
	const assignment = profile.dailyAssignments[activeLanguage]?.[session.assignmentDay];
	const expectedLessonId = session.mode === 'learn' ? assignment?.newLessonId : assignment?.recallLessonId;
	return (
		assignment?.day === session.assignmentDay &&
		expectedLessonId === session.lessonId &&
		!assignment.completedModes.includes(session.mode)
	);
}

function recoverSequencing(profile: LearnerProfile): LearnerProfile {
	let changed = false;
	const completedLessons = { ...profile.completedLessons };
	const completedRecallLessons = { ...profile.completedRecallLessons };
	for (const language of ['fr', 'ta'] as const) {
		const course = COURSES[language];
		const offset = placementOffset(profile, language);
		const storedLessons = profile.completedLessons[language] ?? [];
		const validLessons: string[] = [];
		for (let index = 0; index < storedLessons.length; index += 1) {
			if (storedLessons[index] !== course.lessons[offset + index]?.id) break;
			validLessons.push(storedLessons[index]);
		}
		if (validLessons.length !== storedLessons.length) {
			completedLessons[language] = validLessons;
			changed = true;
		}

		const eligibleRecall = course.lessons
			.filter(
				(lesson) =>
					validLessons.includes(lesson.id) &&
					lesson.exercises.some((exercise) => exercise.kind === 'recall')
			)
			.map((lesson) => lesson.id);
		const storedRecall = profile.completedRecallLessons[language] ?? [];
		const validRecall: string[] = [];
		for (let index = 0; index < storedRecall.length; index += 1) {
			if (storedRecall[index] !== eligibleRecall[index]) break;
			validRecall.push(storedRecall[index]);
		}
		if (validRecall.length !== storedRecall.length) {
			completedRecallLessons[language] = validRecall;
			changed = true;
		}
	}
	return changed ? { ...profile, completedLessons, completedRecallLessons } : profile;
}

function todaysAssignmentIsValid(
	profile: LearnerProfile,
	language: LanguageCode,
	day: string
): boolean {
	const assignment = profile.dailyAssignments[language]?.[day];
	if (!assignment) return true;
	if (assignment.day !== day || new Set(assignment.completedModes).size !== assignment.completedModes.length) {
		return false;
	}
	const learnDone = assignment.completedModes.includes('learn');
	const recallDone = assignment.completedModes.includes('recall');
	if ((learnDone && !assignment.newLessonId) || (recallDone && !assignment.recallLessonId)) return false;

	const course = COURSES[language];
	const completedLessons = profile.completedLessons[language] ?? [];
	const completedRecall = profile.completedRecallLessons[language] ?? [];
	const newLesson = assignment.newLessonId
		? getLesson(language, assignment.newLessonId)
		: undefined;
	const recallLesson = assignment.recallLessonId
		? getLesson(language, assignment.recallLessonId)
		: undefined;
	if (assignment.newLessonId && !newLesson) return false;
	if (
		assignment.recallLessonId &&
		(!recallLesson || !recallLesson.exercises.some((exercise) => exercise.kind === 'recall'))
	) return false;

	const offset = placementOffset(profile, language);
	const courseComplete = offset + completedLessons.length >= course.lessons.length;
	if (!learnDone) {
		const expectedNew = courseComplete
			? undefined
			: course.lessons[offset + completedLessons.length];
		if (assignment.newLessonId !== (expectedNew?.id ?? null)) return false;
	} else if (!newLesson || !completedLessons.includes(newLesson.id)) return false;

	const ceiling = courseComplete
		? course.lessons.length
		: Math.max(
				0,
				(newLesson?.index ?? offset + completedLessons.length + 1) -
					POC_WAVE_CONFIG.activeWaveLagLessons
			);
	const expectedRecall = course.lessons.find(
		(candidate) =>
			candidate.index <= ceiling &&
			completedLessons.includes(candidate.id) &&
			!completedRecall.includes(candidate.id) &&
			candidate.exercises.some((exercise) => exercise.kind === 'recall')
	);
	if (!recallDone) {
		if (assignment.recallLessonId !== (expectedRecall?.id ?? null)) return false;
	} else if (!recallLesson || !completedRecall.includes(recallLesson.id)) return false;

	return true;
}

function load(): LearnerProfile {
	if (!browser) return emptyProfile();
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return emptyProfile();
		const decoded = JSON.parse(raw);
		const migrated = migrateLegacyTransferEvidence(decoded);
		const legacyEvidenceMigrated = migrated !== decoded;
		const parsed = LearnerProfile.safeParse(migrated);
		// A profile that fails validation is a profile from an older/broken build.
		// Starting clean loses progress, but silently running on malformed state
		// would corrupt the evidence log, which is worse.
		if (!parsed.success) return emptyProfile();
		const sequenced = recoverSequencing(parsed.data);
		const day = toDayKey(new Date());
		const invalidSession = Boolean(
			sequenced.activeSession &&
				!sessionMatchesCourse(sequenced.activeSession, sequenced.activeLanguage, sequenced)
		);
		const invalidAssignmentLanguages = (['fr', 'ta'] as const).filter(
			(language) => !todaysAssignmentIsValid(sequenced, language, day)
		);
		if (
			legacyEvidenceMigrated ||
			sequenced !== parsed.data ||
			invalidSession ||
			invalidAssignmentLanguages.length > 0
		) {
			let dailyAssignments = sequenced.dailyAssignments;
			for (const language of invalidAssignmentLanguages) {
				const { [day]: _invalid, ...validAssignments } = dailyAssignments[language] ?? {};
				dailyAssignments = { ...dailyAssignments, [language]: validAssignments };
			}
			const recovered = {
				...sequenced,
				activeSession: invalidSession ? null : sequenced.activeSession,
				dailyAssignments
			};
			try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(recovered));
			} catch {
				// Keep the valid profile in memory even when cleanup cannot be persisted.
				loadPersistenceFailed = true;
			}
			return recovered;
		}
		return sequenced;
	} catch {
		return emptyProfile();
	}
}

class ProfileStore {
	#profile = $state<LearnerProfile>(emptyProfile());
	#loaded = $state(false);
	#persisted = $state(true);

	/** Call once on the client. SSR renders the empty profile. */
	hydrate() {
		if (!browser || this.#loaded) return;
		this.#profile = load();
		this.#persisted = !loadPersistenceFailed;
		this.#loaded = true;
	}

	get current(): LearnerProfile {
		return this.#profile;
	}

	get loaded(): boolean {
		return this.#loaded;
	}

	get persisted(): boolean {
		return this.#persisted;
	}

	get language(): LanguageCode {
		return this.#profile.activeLanguage;
	}

	get settings(): LearnerSettings {
		return this.#profile.settings;
	}

	/** The plan for the active language, or null if onboarding is unfinished. */
	get plan(): LearningPlan | null {
		return this.#profile.plans[this.#profile.activeLanguage] ?? null;
	}

	get onboarded(): boolean {
		return this.plan !== null;
	}

	get completedLessons(): string[] {
		return this.#profile.completedLessons[this.#profile.activeLanguage] ?? [];
	}

	get completedRecallLessons(): string[] {
		return this.#profile.completedRecallLessons[this.#profile.activeLanguage] ?? [];
	}

	get activeSession(): ActiveSession | null {
		return this.#profile.activeSession;
	}

	get activeSessionHref(): string | null {
		return this.activeSession && sessionMatchesCourse(this.activeSession, this.language, this.#profile)
			? resumeHref(this.activeSession)
			: null;
	}

	/** Construction id → state, derived from the whole evidence log. */
	get states(): Map<string, ConstructionState> {
		const language = this.#profile.activeLanguage;
		return deriveAllStates(this.#profile.evidence.filter((e) => e.language === language));
	}

	stateOf(constructionId: string): ConstructionState | null {
		return this.states.get(constructionId) ?? null;
	}

	#persist() {
		if (!browser) return true;
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(this.#profile));
			this.#persisted = true;
			return true;
		} catch {
			// Storage full or blocked (private mode). The session continues in
			// memory rather than throwing mid-lesson.
			this.#persisted = false;
			return false;
		}
	}

	#update(fn: (draft: LearnerProfile) => LearnerProfile) {
		this.#profile = fn(this.#profile);
		this.#persist();
	}

	/* ---------------------------------------------------------------- */
	/* Onboarding                                                        */
	/* ---------------------------------------------------------------- */

	setLanguage(language: LanguageCode) {
		if (this.activeSession && language !== this.activeSession.language) return;
		this.#update((p) => ({ ...p, activeLanguage: language }));
	}

	setPlan(plan: LearningPlan) {
		this.#update((p) => ({
			...p,
			plans: { ...p.plans, [p.activeLanguage]: plan }
		}));
	}

	updateSettings(patch: Partial<LearnerSettings>) {
		this.#update((p) => ({ ...p, settings: { ...p.settings, ...patch } }));
	}

	/* ---------------------------------------------------------------- */
	/* Evidence                                                          */
	/* ---------------------------------------------------------------- */

	/**
	 * Append evidence. `hinted` events are still recorded — the fact that the
	 * learner needed a hint is information — they just grant no state.
	 */
	record(
		kind: EvidenceKind,
		lessonId: string,
		constructionIds: readonly string[],
		options: {
			hinted?: boolean;
			contentVersion?: string;
			assessmentSource?: EvidenceAssessmentSource;
		} = {}
	) {
		this.recordOutcomes(
			[{ kind, constructionIds, assessmentSource: options.assessmentSource }],
			lessonId,
			options
		);
	}

	/** Append differently classified construction outcomes in one persisted update. */
	recordOutcomes(
		outcomes: readonly {
			kind: EvidenceKind;
			constructionIds: readonly string[];
			assessmentSource?: EvidenceAssessmentSource;
		}[],
		lessonId: string,
		options: {
			hinted?: boolean;
			contentVersion?: string;
		} = {}
	) {
		if (outcomes.every((outcome) => outcome.constructionIds.length === 0)) return;
		const provenanceMatches = outcomes.every(
			(outcome) => outcome.assessmentSource === requiredAssessmentSource(outcome.kind)
		);
		if (!provenanceMatches) {
			throw new Error('evidence kind does not match its transfer assessment provenance');
		}
		const now = Date.now();
		const day = toDayKey(new Date());
		const language = this.#profile.activeLanguage;

		const events: EvidenceEvent[] = outcomes.flatMap((outcome) =>
			outcome.constructionIds.map((constructionId) => ({
				id: `${now}-${outcome.kind}-${constructionId}`,
				constructionId,
				language,
				kind: outcome.kind,
				lessonId,
				at: now,
				day,
				hinted: options.hinted ?? false,
				contentVersion: options.contentVersion,
				assessmentSource: outcome.assessmentSource
			}))
		);

		this.#update((p) => ({ ...p, evidence: [...p.evidence, ...events] }));
	}

	recordClosure(rating: ClosureRating) {
		this.#update((p) => ({ ...p, closures: [...p.closures, rating] }));
	}

	/* ---------------------------------------------------------------- */
	/* Resumable session                                                 */
	/* ---------------------------------------------------------------- */

	dailyAssignment(day: string): DailyAssignment | null {
		return this.#profile.dailyAssignments[this.language]?.[day] ?? null;
	}

	ensureDailyAssignment(
		day: string,
		newLessonId: string | null,
		recallLessonId: string | null
	) {
		if (this.dailyAssignment(day)) return;
		const assignment: DailyAssignment = {
			day,
			newLessonId,
			recallLessonId,
			completedModes: []
		};
		this.#update((p) => ({
			...p,
			dailyAssignments: {
				...p.dailyAssignments,
				[p.activeLanguage]: {
					...(p.dailyAssignments[p.activeLanguage] ?? {}),
					[day]: assignment
				}
			}
		}));
	}

	startSession(
		mode: SessionMode,
		lessonId: string,
		flow: readonly StepId[],
		assignmentDay?: string,
		origin?: 'today' | 'book' | 'resurface'
	): string {
		if (this.activeSession) {
			const href = this.activeSessionHref;
			if (href) return href;
			this.#update((p) => ({ ...p, activeSession: null }));
		}
		const session = createSession(
			mode,
			this.#profile.activeLanguage,
			lessonId,
			flow,
			Date.now(),
			assignmentDay,
			origin ?? (assignmentDay ? 'today' : 'book')
		);
		this.#update((p) => ({ ...p, activeSession: session }));
		return resumeHref(session);
	}

	/**
	 * Retrieval of a missed construction, outside the daily assignment. The
	 * outcome lands in the evidence log like any recall; finishing never touches
	 * the recall wave's sequencing.
	 */
	startResurfaceSession(lessonId: string): string {
		return this.startSession('recall', lessonId, RECALL_FLOW, undefined, 'resurface');
	}

	/** Missed constructions due for another retrieval, derived from evidence. */
	dueResurfaceItems(day: string): ResurfaceQueueItem[] {
		const language = this.#profile.activeLanguage;
		const queue = deriveResurfaceQueue(
			this.#profile.evidence.filter((event) => event.language === language)
		);
		const completed = this.completedLessons;
		return dueResurfaces(queue, day).filter((item) => {
			if (!completed.includes(item.lessonId)) return false;
			const lesson = getLesson(language, item.lessonId);
			return Boolean(lesson?.exercises.some((exercise) => exercise.kind === 'recall'));
		});
	}

	/** Leave the active route without deleting evidence, progress, or today's assignment. */
	abandonSession() {
		if (!this.activeSession) return;
		this.#update((p) => ({ ...p, activeSession: null }));
	}

	sessionAccess(
		mode: SessionMode,
		lessonId: string,
		step: StepId,
		flow: readonly StepId[]
	): SessionAccess {
		return accessFor(
			this.activeSession,
			mode,
			this.#profile.activeLanguage,
			lessonId,
			step,
			flow
		);
	}

	saveRecallDraft(lessonId: string, draft: RecallSessionDraft) {
		this.#update((p) => {
			const session = p.activeSession;
			if (!session || session.mode !== 'recall' || session.lessonId !== lessonId) return p;
			if (session.currentStep !== 'recall') return p;
			if (
				session.recallDraft?.lineId === draft.lineId &&
				session.recallDraft.text === draft.text &&
				session.recallDraft.hinted === draft.hinted &&
				session.recallDraft.revealed === draft.revealed
			) return p;
			return {
				...p,
				activeSession: { ...session, recallDraft: draft, updatedAt: Date.now() }
			};
		});
	}

	/** Append recall evidence and authorize comparison in one idempotent profile write. */
	submitRecallAttempt(
		lessonId: string,
		flow: readonly StepId[],
		draft: RecallSessionDraft,
		kind: Extract<EvidenceKind, 'recall-correct' | 'attempt-incorrect'>,
		constructionIds: readonly string[],
		contentVersion?: string
	): string | null {
		let destination: string | null = null;
		this.#update((p) => {
			const session = p.activeSession;
			if (
				!session ||
				constructionIds.length === 0 ||
				accessFor(session, 'recall', p.activeLanguage, lessonId, 'recall', flow) !== 'current'
			) return p;
			const now = Date.now();
			const advanced = advanceSessionState(session, 'recall', flow, now, draft);
			if (!advanced) return p;
			const day = toDayKey(new Date(now));
			const events: EvidenceEvent[] = constructionIds.map((constructionId, index) => ({
				id: `${now}-${index}-${constructionId}`,
				constructionId,
				language: p.activeLanguage,
				kind,
				lessonId,
				at: now,
				day,
				hinted: draft.hinted,
				contentVersion
			}));
			destination = resumeHref(advanced);
			return { ...p, evidence: [...p.evidence, ...events], activeSession: advanced };
		});
		return destination;
	}

	advanceSession(
		mode: SessionMode,
		lessonId: string,
		step: StepId,
		flow: readonly StepId[],
		recallDraft?: RecallSessionDraft
	): string | null {
		let destination: string | null = null;
		this.#update((p) => {
			const session = p.activeSession;
			if (!session || accessFor(session, mode, p.activeLanguage, lessonId, step, flow) !== 'current') {
				return p;
			}
			const advanced = advanceSessionState(session, step, flow, Date.now(), recallDraft);
			if (!advanced) return p;
			destination = resumeHref(advanced);
			return { ...p, activeSession: advanced };
		});
		return destination;
	}

	/** Closure, sequencing completion and session clearing are one persisted write. */
	finishSession(
		mode: SessionMode,
		lessonId: string,
		flow: readonly StepId[],
		rating: ClosureRating
	): boolean {
		let finished = false;
		this.#update((p) => {
			const session = p.activeSession;
			if (
				!session ||
				session.mode !== mode ||
				session.language !== p.activeLanguage ||
				session.lessonId !== lessonId ||
				!canFinishSession(session, flow)
			) return p;

			const completed = p.completedLessons[p.activeLanguage] ?? [];
			const completedLessons =
				mode === 'learn' && !completed.includes(lessonId)
					? { ...p.completedLessons, [p.activeLanguage]: [...completed, lessonId] }
					: p.completedLessons;
			const recalled = p.completedRecallLessons[p.activeLanguage] ?? [];
			// A resurface retrieval is extra practice: it must not advance the
			// active wave's sequencing, only append evidence and a closure.
			const completedRecallLessons =
				mode === 'recall' && session.origin !== 'resurface' && !recalled.includes(lessonId)
					? { ...p.completedRecallLessons, [p.activeLanguage]: [...recalled, lessonId] }
					: p.completedRecallLessons;
			const assignmentDay = session.assignmentDay;
			const languageAssignments = p.dailyAssignments[p.activeLanguage] ?? {};
			const assignment = assignmentDay ? languageAssignments[assignmentDay] : undefined;
			const expectedLessonId = mode === 'learn' ? assignment?.newLessonId : assignment?.recallLessonId;
			const updatedAssignment =
				assignment && expectedLessonId === lessonId && !assignment.completedModes.includes(mode)
					? { ...assignment, completedModes: [...assignment.completedModes, mode] }
					: assignment;
			const dailyAssignments = updatedAssignment
				? {
						...p.dailyAssignments,
						[p.activeLanguage]: {
							...languageAssignments,
							[assignmentDay!]: updatedAssignment
						}
					}
				: p.dailyAssignments;
			finished = true;
			return {
				...p,
				closures: [...p.closures, rating],
				completedLessons,
				completedRecallLessons,
					dailyAssignments,
				activeSession: null
			};
		});
		return finished;
	}

	/**
	 * Mark a lesson worked through. This is sequencing only — it drives which
	 * lesson Today offers next. It is deliberately *not* progress: a completed
	 * lesson whose constructions are still `exposed` shows as such on 1s.
	 */
	completeLesson(lessonId: string) {
		this.#update((p) => {
			const language = p.activeLanguage;
			const existing = p.completedLessons[language] ?? [];
			if (existing.includes(lessonId)) return p;
			return {
				...p,
				completedLessons: { ...p.completedLessons, [language]: [...existing, lessonId] }
			};
		});
	}

	hasCompleted(lessonId: string): boolean {
		return this.completedLessons.includes(lessonId);
	}

	/** Wipe everything. Used by settings; irreversible by design. */
	reset() {
		this.#profile = emptyProfile(this.#profile.activeLanguage);
		this.#persist();
	}
}

export const profile = new ProfileStore();
