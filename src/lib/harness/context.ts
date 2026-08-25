/**
 * `buildHarnessContext` — the injection layer of the harness (#48, spec §4).
 *
 * At T1 there is no model, so this assembles *content only*: what the learner
 * is looking at, which constructions it exercises, what state the evidence log
 * says those constructions are in, and whether an attempt is open. The same
 * typed value is what T2+ will hand a model as its per-turn context, in the
 * spec's fixed priority order — lesson, line, constructions, learner state —
 * so the shape is deliberately the shape the prompt builder will need, not a
 * bag of strings convenient for today's scorer.
 *
 * A plain function over plain inputs (spec §4, last paragraph): no stores, no
 * `$state`, no browser. That is what makes it testable without any model, and
 * what lets the retrieval-only tier reuse it to bias passage selection.
 */
import type { SessionMode, StepId } from '$lib/flow.js';
import { STEP_TECHNIQUE } from '$lib/content/wiki/index.js';
import type { Construction, Lesson, LessonLine } from '$lib/schemas/content.js';
import type { ConstructionState } from '$lib/schemas/learner.js';
import type { ResurfaceQueueItem } from '$lib/schemas/schedule.js';

/* -------------------------------------------------------------------------- */
/* The shape                                                                   */
/* -------------------------------------------------------------------------- */

export type HarnessLesson = {
	id: string;
	index: number;
	title: string;
	situation: string;
	kind: string;
};

export type HarnessLine = {
	id: string;
	targetScript: string;
	naturalEnglish: string;
	literalEnglish?: string;
	/** Chunk labels the audio pipeline already segmented, when present. */
	chunks: string[];
};

export type HarnessConstruction = {
	id: string;
	label: string;
	gloss: string;
	/** From `deriveConstructionState`; `null` means no evidence at all. */
	state: ConstructionState | null;
	/** True when this construction is due for another retrieval today. */
	due: boolean;
};

/**
 * What the learner is in the middle of. `open` is the hint boundary's whole
 * factual basis: an attempt exists and its answer has not been submitted.
 */
export type HarnessAttempt = {
	open: boolean;
	step: StepId;
	/** Constructions the open attempt would grant state to if unaided. */
	constructionIds: string[];
};

export type HarnessContext = {
	/** Content version of the assembled context, for T2's prompt cache keys. */
	version: 1;
	mode: SessionMode | null;
	step: StepId | null;
	/** Wiki slug of the technique that governs this step, when in a session. */
	techniqueSlug: string | null;
	lesson: HarnessLesson | null;
	line: HarnessLine | null;
	constructions: HarnessConstruction[];
	learner: {
		language: string;
		/** Counts by derived state across the constructions in context. */
		stateCounts: Partial<Record<ConstructionState, number>>;
		/** Construction ids the resurface queue says are due. */
		dueConstructionIds: string[];
	};
	attempt: HarnessAttempt | null;
	/**
	 * The context flattened into search terms. T1's scorer boosts passages that
	 * overlap these; T2 will not need it, which is why it is a derived extra
	 * rather than the context itself.
	 */
	terms: string[];
};

export type HarnessContextInput = {
	language: string;
	mode?: SessionMode | null;
	step?: StepId | null;
	lesson?: Lesson | null;
	line?: LessonLine | null;
	/** Constructions in play; usually the line's, else the lesson's. */
	constructions?: readonly Construction[];
	states?: ReadonlyMap<string, ConstructionState>;
	resurfaceQueue?: readonly ResurfaceQueueItem[];
	attempt?: HarnessAttempt | null;
};

/* -------------------------------------------------------------------------- */
/* Assembly                                                                    */
/* -------------------------------------------------------------------------- */

function termsOf(text: string): string[] {
	return text
		.toLowerCase()
		.split(/[^\p{L}\p{N}]+/u)
		.filter((token) => token.length > 2);
}

export function buildHarnessContext(input: HarnessContextInput): HarnessContext {
	const step = input.step ?? null;
	const lesson = input.lesson ?? null;
	const line = input.line ?? null;
	const states = input.states ?? new Map<string, ConstructionState>();

	const dueIds = (input.resurfaceQueue ?? []).map((item) => item.constructionId);
	const dueSet = new Set(dueIds);

	// Priority order (spec §4.2): the line's constructions come first when a
	// line is active, then the rest of the lesson's, de-duplicated.
	const pool = input.constructions ?? lesson?.constructions ?? [];
	const lineFirst = line
		? [
				...pool.filter((c) => line.constructions.includes(c.id)),
				...pool.filter((c) => !line.constructions.includes(c.id))
			]
		: [...pool];
	const seen = new Set<string>();
	const constructions: HarnessConstruction[] = [];
	for (const c of lineFirst) {
		if (seen.has(c.id)) continue;
		seen.add(c.id);
		constructions.push({
			id: c.id,
			label: c.label,
			gloss: c.gloss,
			state: states.get(c.id) ?? null,
			due: dueSet.has(c.id)
		});
	}

	const stateCounts: Partial<Record<ConstructionState, number>> = {};
	for (const c of constructions) {
		if (!c.state) continue;
		stateCounts[c.state] = (stateCounts[c.state] ?? 0) + 1;
	}

	const terms = new Set<string>();
	for (const source of [
		lesson?.title,
		lesson?.situation,
		line?.naturalEnglish,
		line?.literalEnglish,
		...constructions.map((c) => `${c.label} ${c.gloss}`),
		step ?? undefined
	]) {
		if (!source) continue;
		for (const term of termsOf(source)) terms.add(term);
	}

	return {
		version: 1,
		mode: input.mode ?? null,
		step,
		techniqueSlug: step ? (STEP_TECHNIQUE[step] ?? null) : null,
		lesson: lesson
			? {
					id: lesson.id,
					index: lesson.index,
					title: lesson.title,
					situation: lesson.situation,
					kind: lesson.kind
				}
			: null,
		line: line
			? {
					id: line.id,
					targetScript: line.targetScript,
					naturalEnglish: line.naturalEnglish,
					literalEnglish: line.literalEnglish,
					chunks: line.chunks.map((chunk) => chunk.label)
				}
			: null,
		constructions,
		learner: {
			language: input.language,
			stateCounts,
			dueConstructionIds: [...dueSet].sort()
		},
		attempt: input.attempt ?? null,
		terms: [...terms].sort()
	};
}

/** The empty context — Today, Progress, or any screen outside a session. */
export function emptyHarnessContext(language: string): HarnessContext {
	return buildHarnessContext({ language });
}
