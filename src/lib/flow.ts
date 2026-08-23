/**
 * The session flow — how a learner gets from onboarding to completion.
 *
 * Each lesson kind is an ordered list of steps. Steps are routes, so the browser
 * back button, refresh and deep links all work; but the *order* lives here, in
 * one place, rather than being spread across the route tree.
 *
 * Ordering is not arbitrary. AC 2 requires a session to begin with audio before
 * orthography, so `preview` is always first. AC 7 requires every lesson to end
 * with a novel transfer prompt, so `transfer` is always last before closure.
 */
import type { LessonKind } from './schemas/content.js';

export type StepId =
	| 'preview'
	| 'spread'
	| 'comprehension'
	| 'shadow'
	| 'translate'
	| 'completion'
	| 'transfer'
	| 'closure'
	| 'recall'
	| 'compare'
	| 'synthesis';

export type StepDef = {
	id: StepId;
	title: string;
	/** The designed surface this step renders (canvas id from the design). */
	surface: string;
	/** Shown in the in-frame title bar. */
	label: string;
};

const STEP_DEFS: Record<StepId, Omit<StepDef, 'id'>> = {
	preview: { title: 'Audio preview', surface: '1d', label: 'step 1 · listen' },
	spread: { title: 'Parallel spread', surface: '1e', label: 'step 2 · read' },
	comprehension: { title: 'Comprehension check', surface: '1i', label: 'do you get it?' },
	shadow: { title: 'Echo practice', surface: '1j', label: 'shadow' },
	translate: { title: 'Translation exercise', surface: '1k', label: 'exercise' },
	completion: { title: 'Completion exercise', surface: '1l', label: 'exercise' },
	transfer: { title: 'Transfer challenge', surface: '1o', label: 'make it yours' },
	closure: { title: 'Lesson closure', surface: '1q', label: 'before you go' },
	recall: { title: 'Active recall', surface: '1m', label: 'recall' },
	compare: { title: 'Answer comparison', surface: '1n', label: 'compare' },
	synthesis: { title: 'Weekly synthesis', surface: '1r', label: 'review' }
};

/**
 * The passive wave: sound → form ↔ meaning → retrieval → transfer, with support
 * removed at each step. This is the spine of the product.
 */
export const PASSIVE_FLOW: StepId[] = [
	'preview',
	'spread',
	'comprehension',
	'shadow',
	'translate',
	'completion',
	'transfer',
	'closure'
];

/** Synthesis lessons reassemble old pieces; they introduce nothing new. */
export const SYNTHESIS_FLOW: StepId[] = ['synthesis', 'transfer', 'closure'];

/** The active wave: produce from English, then diagnose the difference. */
export const RECALL_FLOW: StepId[] = ['recall', 'compare', 'closure'];

export function flowFor(kind: LessonKind): StepId[] {
	return kind === 'synthesis' ? SYNTHESIS_FLOW : PASSIVE_FLOW;
}

export function stepDef(id: StepId): StepDef {
	return { id, ...STEP_DEFS[id] };
}

export function isStepId(value: string): value is StepId {
	return value in STEP_DEFS;
}

/** Position of a step within its flow, or -1. */
export function stepIndex(flow: readonly StepId[], step: StepId): number {
	return flow.indexOf(step);
}

export function nextStep(flow: readonly StepId[], step: StepId): StepId | null {
	const i = stepIndex(flow, step);
	return i >= 0 && i < flow.length - 1 ? flow[i + 1] : null;
}

export function previousStep(flow: readonly StepId[], step: StepId): StepId | null {
	const i = stepIndex(flow, step);
	return i > 0 ? flow[i - 1] : null;
}

/** "step 3 of 8", for the in-frame title bar. */
export function stepProgress(flow: readonly StepId[], step: StepId) {
	const i = stepIndex(flow, step);
	return { position: i + 1, total: flow.length };
}

/* -------------------------------------------------------------------------- */
/* Route construction                                                          */
/* -------------------------------------------------------------------------- */

export type SessionMode = 'learn' | 'recall';

export function sessionHref(mode: SessionMode, lessonId: string, step: StepId): string {
	return `/${mode}/${lessonId}/${step}`;
}

/**
 * Where the learner goes when a step is finished. The last step of any flow
 * returns to Today, which is what "completion" means at the session level.
 */
export function afterStep(
	mode: SessionMode,
	lessonId: string,
	flow: readonly StepId[],
	step: StepId
): string {
	const next = nextStep(flow, step);
	return next ? sessionHref(mode, lessonId, next) : '/today';
}
