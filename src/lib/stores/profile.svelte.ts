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
	type ClosureRating,
	type ConstructionState,
	type DailyAssignment,
	type EvidenceEvent,
	type EvidenceKind,
	type ActiveSession,
	type LearnerSettings,
	type LearningPlan,
	type RecallSessionDraft,
	type SessionMode
} from '$lib/schemas/learner.js';
import { toDayKey } from '$lib/schemas/schedule.js';
import type { LanguageCode } from '$lib/schemas/content.js';
import { flowFor, RECALL_FLOW, type StepId } from '$lib/flow.js';
import { getLesson } from '$lib/content/index.js';
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

function sessionMatchesCourse(session: ActiveSession, activeLanguage: LanguageCode): boolean {
	const lesson = getLesson(activeLanguage, session.lessonId);
	const expectedFlow = lesson
		? session.mode === 'recall'
			? lesson.exercises.some((exercise) => exercise.kind === 'recall')
				? RECALL_FLOW
				: null
			: flowFor(lesson.kind)
		: null;
	return currentSessionMatchesExpected(session, activeLanguage, expectedFlow);
}

function load(): LearnerProfile {
	if (!browser) return emptyProfile();
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return emptyProfile();
		const parsed = LearnerProfile.safeParse(JSON.parse(raw));
		// A profile that fails validation is a profile from an older/broken build.
		// Starting clean loses progress, but silently running on malformed state
		// would corrupt the evidence log, which is worse.
		if (!parsed.success) return emptyProfile();
		if (
			parsed.data.activeSession &&
			!sessionMatchesCourse(parsed.data.activeSession, parsed.data.activeLanguage)
		) {
			const recovered = { ...parsed.data, activeSession: null };
			try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(recovered));
			} catch {
				// Keep the valid profile in memory even when cleanup cannot be persisted.
			}
			return recovered;
		}
		return parsed.data;
	} catch {
		return emptyProfile();
	}
}

class ProfileStore {
	#profile = $state<LearnerProfile>(emptyProfile());
	#loaded = $state(false);

	/** Call once on the client. SSR renders the empty profile. */
	hydrate() {
		if (!browser || this.#loaded) return;
		this.#profile = load();
		this.#loaded = true;
	}

	get current(): LearnerProfile {
		return this.#profile;
	}

	get loaded(): boolean {
		return this.#loaded;
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
		return this.activeSession && sessionMatchesCourse(this.activeSession, this.language)
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
		if (!browser) return;
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(this.#profile));
		} catch {
			// Storage full or blocked (private mode). The session continues in
			// memory rather than throwing mid-lesson.
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
		options: { hinted?: boolean; contentVersion?: string } = {}
	) {
		if (constructionIds.length === 0) return;
		const now = Date.now();
		const day = toDayKey(new Date());
		const language = this.#profile.activeLanguage;

		const events: EvidenceEvent[] = constructionIds.map((constructionId, i) => ({
			id: `${now}-${i}-${constructionId}`,
			constructionId,
			language,
			kind,
			lessonId,
			at: now,
			day,
			hinted: options.hinted ?? false,
			contentVersion: options.contentVersion
		}));

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

	startSession(mode: SessionMode, lessonId: string, flow: readonly StepId[], day = toDayKey(new Date())): string {
		if (this.activeSession) {
			const href = this.activeSessionHref;
			if (href) return href;
			this.#update((p) => ({ ...p, activeSession: null }));
		}
		const session = createSession(mode, this.#profile.activeLanguage, lessonId, flow, Date.now(), day);
		this.#update((p) => ({ ...p, activeSession: session }));
		return resumeHref(session);
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
			const completedRecallLessons =
				mode === 'recall' && !recalled.includes(lessonId)
					? { ...p.completedRecallLessons, [p.activeLanguage]: [...recalled, lessonId] }
					: p.completedRecallLessons;
			const assignmentDay = session.assignmentDay ?? toDayKey(new Date(session.startedAt));
			const languageAssignments = p.dailyAssignments[p.activeLanguage] ?? {};
			const assignment = languageAssignments[assignmentDay];
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
							[assignmentDay]: updatedAssignment
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
