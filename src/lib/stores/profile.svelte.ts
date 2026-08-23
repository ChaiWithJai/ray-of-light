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
	type EvidenceEvent,
	type EvidenceKind,
	type LearnerSettings,
	type LearningPlan
} from '$lib/schemas/learner.js';
import { toDayKey } from '$lib/schemas/schedule.js';
import type { LanguageCode } from '$lib/schemas/content.js';

const STORAGE_KEY = 'ray-of-light.profile.v1';

function load(): LearnerProfile {
	if (!browser) return emptyProfile();
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return emptyProfile();
		const parsed = LearnerProfile.safeParse(JSON.parse(raw));
		// A profile that fails validation is a profile from an older/broken build.
		// Starting clean loses progress, but silently running on malformed state
		// would corrupt the evidence log, which is worse.
		return parsed.success ? parsed.data : emptyProfile();
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
