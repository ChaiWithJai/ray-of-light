/**
 * Learner state schemas.
 *
 * The governing rule (AC 10): progress "reflects recognition, recall and transfer
 * — not only completion". So there is no completion flag anywhere in this file.
 * The write model is an append-only evidence log, and construction state is
 * *derived* from it by `deriveConstructionState`.
 */
import { z } from 'zod';
import { LanguageCode } from './content.js';

/* -------------------------------------------------------------------------- */
/* Construction state                                                          */
/* -------------------------------------------------------------------------- */

/** The five states from issue #1, in strictly increasing order of evidence. */
export const CONSTRUCTION_STATES = [
	'exposed',
	'recognized',
	'recalled',
	'stabilized',
	'transferable'
] as const;

export const ConstructionState = z.enum(CONSTRUCTION_STATES);
export type ConstructionState = z.infer<typeof ConstructionState>;

/** Rank for comparison; `null` means "no evidence at all", below `exposed`. */
export function stateRank(state: ConstructionState | null): number {
	return state === null ? -1 : CONSTRUCTION_STATES.indexOf(state);
}

/* -------------------------------------------------------------------------- */
/* Evidence                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * What the learner did. Each kind maps to the strongest state it can justify —
 * see `EVIDENCE_GRANTS`. Kinds exist separately from states because the same
 * state can be earned several ways, and because hinted attempts must be
 * recordable without granting the state they would otherwise imply.
 */
export const EvidenceKind = z.enum([
	/** Completed parallel reading of a line (1e). */
	'parallel-read',
	/** Correct comprehension response with no peek (1i, 1k). */
	'comprehension-correct',
	/** Cue-supported retrieval: completion exercise (1l). */
	'completion-correct',
	/** Free production from an L1 cue after a delay (1m). */
	'recall-correct',
	/** Novel valid production in a new situation (1o, 1u). */
	'transfer-correct',
	/** Attempted and wrong — recorded, grants nothing, feeds error repair (1p). */
	'attempt-incorrect',
	/** Peeked or took a hint — grants nothing, and caps the attempt it belongs to. */
	'hint-used'
]);
export type EvidenceKind = z.infer<typeof EvidenceKind>;

/**
 * The strongest state each evidence kind can justify on its own.
 * `stabilized` is deliberately absent: it cannot be earned by a single event,
 * only by repetition across distinct days (see `deriveConstructionState`).
 */
const EVIDENCE_GRANTS: Partial<Record<EvidenceKind, ConstructionState>> = {
	'parallel-read': 'exposed',
	'comprehension-correct': 'recognized',
	'completion-correct': 'recognized',
	'recall-correct': 'recalled',
	'transfer-correct': 'transferable'
};

export const EvidenceEvent = z.object({
	/** Client-generated, so sync is idempotent without server coordination. */
	id: z.string().min(1),
	constructionId: z.string().min(1),
	language: LanguageCode,
	kind: EvidenceKind,
	lessonId: z.string().min(1),
	/** Epoch ms. Recorded on the device that observed it. */
	at: z.number().int().nonnegative(),
	/**
	 * Local calendar day (YYYY-MM-DD) as observed on that device. Stored rather
	 * than derived from `at`, so that "distinct days" survives timezone travel.
	 */
	day: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
	/** True when a hint or peek was used; caps this attempt at no grant. */
	hinted: z.boolean().default(false),
	/** Which content version this was recorded against. */
	contentVersion: z.string().min(1).optional()
});
export type EvidenceEvent = z.infer<typeof EvidenceEvent>;

/* -------------------------------------------------------------------------- */
/* Derivation                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Derive a construction's state from its evidence. Pure, total, and
 * order-independent — replaying the same log always yields the same state.
 *
 * Rules:
 *  - A hinted event grants nothing (it still records that the attempt happened).
 *  - Otherwise a construction reaches the highest state any single event grants.
 *  - `stabilized` is special: it sits between `recalled` and `transferable` and
 *    requires successful retrieval on at least two *distinct* days. That is the
 *    one thing a single session can never produce, which is the point of it.
 */
export function deriveConstructionState(
	events: readonly EvidenceEvent[]
): ConstructionState | null {
	let best: ConstructionState | null = null;
	const retrievalDays = new Set<string>();

	for (const event of events) {
		if (event.hinted) continue;

		const granted = EVIDENCE_GRANTS[event.kind];
		if (granted && stateRank(granted) > stateRank(best)) best = granted;

		if (event.kind === 'recall-correct' || event.kind === 'transfer-correct') {
			retrievalDays.add(event.day);
		}
	}

	// Repeated retrieval across days upgrades `recalled` to `stabilized`, but
	// never downgrades a construction that has already transferred.
	if (
		retrievalDays.size >= 2 &&
		stateRank(best) >= stateRank('recalled') &&
		stateRank(best) < stateRank('stabilized')
	) {
		best = 'stabilized';
	}

	return best;
}

/** Group an evidence log by construction and derive each state. */
export function deriveAllStates(
	events: readonly EvidenceEvent[]
): Map<string, ConstructionState> {
	const byConstruction = new Map<string, EvidenceEvent[]>();
	for (const event of events) {
		const bucket = byConstruction.get(event.constructionId);
		if (bucket) bucket.push(event);
		else byConstruction.set(event.constructionId, [event]);
	}

	const states = new Map<string, ConstructionState>();
	for (const [constructionId, group] of byConstruction) {
		const state = deriveConstructionState(group);
		if (state) states.set(constructionId, state);
	}
	return states;
}

/* -------------------------------------------------------------------------- */
/* Plan and profile                                                            */
/* -------------------------------------------------------------------------- */

/** Daily commitment from 1b. Sets scheduler pacing — not cosmetic. */
export const DailyMinutes = z.union([z.literal(15), z.literal(25), z.literal(40)]);
export type DailyMinutes = z.infer<typeof DailyMinutes>;

export const LearningGoal = z.enum(['travel', 'family', 'work', 'reading']);
export type LearningGoal = z.infer<typeof LearningGoal>;

export const LearningPlan = z.object({
	dailyMinutes: DailyMinutes,
	goal: LearningGoal,
	/** YYYY-MM-DD the plan started; day counting and the active wave key off this. */
	startedOn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
	/** Placement result from the entry assessment (1a). */
	entryLessonIndex: z.number().int().positive().default(1)
});
export type LearningPlan = z.infer<typeof LearningPlan>;

/** Self-rating from lesson closure (1q). Tunes when lines resurface. */
export const ClosureRating = z.object({
	lessonId: z.string().min(1),
	understood: z.number().int().min(0).max(100),
	couldProduce: z.number().int().min(0).max(100),
	effort: z.enum(['easy', 'just-right', 'too-hard']),
	at: z.number().int().nonnegative()
});
export type ClosureRating = z.infer<typeof ClosureRating>;

/** Accessibility and load-reduction settings (1v). Nothing here teaches. */
export const LearnerSettings = z.object({
	audioSpeed: z.union([z.literal(0.75), z.literal(1)]).default(1),
	slowFirstListen: z.boolean().default(false),
	textScale: z.number().int().min(0).max(100).default(55),
	/** Tamil scaffold. Progression nudges this off around lesson 30. */
	transliteration: z.boolean().default(true),
	/** `single-guide` is the accessible default; `two-finger` is opt-in. */
	trackingMode: z.enum(['two-finger', 'single-guide']).default('single-guide'),
	dailyReminder: z
		.string()
		.regex(/^\d{2}:\d{2}$/)
		.nullable()
		.default('07:30')
});
export type LearnerSettings = z.infer<typeof LearnerSettings>;

/**
 * Everything persisted for one learner. Local-first (AC 10 "progress persists"):
 * this is the whole document written to storage, and it is enough to rebuild
 * every derived view.
 */
export const LearnerProfile = z.object({
	version: z.literal(1),
	activeLanguage: LanguageCode,
	plans: z.partialRecord(LanguageCode, LearningPlan).default({}),
	settings: LearnerSettings.default(LearnerSettings.parse({})),
	evidence: z.array(EvidenceEvent).default([]),
	closures: z.array(ClosureRating).default([]),
	/** Lesson ids fully worked through, per language. Sequencing only — not progress. */
	completedLessons: z.partialRecord(LanguageCode, z.array(z.string())).default({})
});
export type LearnerProfile = z.infer<typeof LearnerProfile>;

/** A fresh profile, used before onboarding writes a real one. */
export function emptyProfile(language: LanguageCode = 'fr'): LearnerProfile {
	return LearnerProfile.parse({
		version: 1,
		activeLanguage: language,
		plans: {},
		settings: {},
		evidence: [],
		closures: [],
		completedLessons: {}
	});
}
