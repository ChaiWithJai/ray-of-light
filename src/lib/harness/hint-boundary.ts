/**
 * The hint boundary — the harness's one unresolved policy question.
 *
 * `docs/design/bonsai-aside-harness.md` §9 flags it and does not answer it:
 *
 * > The hint boundary: does *asking the harness about the current recall item*
 * > before answering constitute `hint-used`? The refusal design avoids leaking
 * > the answer, but the owner should rule on whether method explanation
 * > mid-attempt caps evidence.
 *
 * ---------------------------------------------------------------------------
 * OWNER'S OPEN RULING — unresolved. Implemented conservatively.
 * ---------------------------------------------------------------------------
 * Until the owner rules, T1 takes the cautious side: consulting the method
 * while an attempt is open and unsubmitted records that attempt as hinted,
 * exactly as the peek chip does. Conservative because the cost of being wrong
 * in this direction is a slightly under-credited attempt, while the cost of
 * being wrong the other way is a silently ungated hint channel that erodes the
 * evidence log — the thing every derived capability state rests on (spec §2,
 * "the harness must not become an ungated hint that bypasses evidence
 * capping").
 *
 * The ruling flips in exactly one line: set the constant below to `false` and
 * mid-attempt retrieval records nothing. Everything else — the store, the
 * steps, the copy — reads through `retrievalCountsAsHint()`, so nothing else
 * has to change, and `MID_ATTEMPT_NOTICE` stops rendering on its own.
 *
 * Note that this is *stricter* than the wiki's own current position on reading
 * about a technique (`docs/design/method-wiki.md`: "reading *about* the
 * technique is not a hint on the item"). That divergence is deliberate and is
 * precisely what the owner has to rule on: the wiki's stuck panel is a fixed
 * page, while this surface answers a free-text question the learner can aim
 * straight at the item in front of them.
 */
import type { StepId } from '$lib/flow.js';
import type { HarnessAttempt } from './context.js';

/**
 * THE SWITCH. One constant, one line, one ruling.
 *
 * `true`  — mid-attempt retrieval caps the attempt (today's conservative default).
 * `false` — retrieval is never a hint; the surface records nothing, ever.
 */
export const RETRIEVAL_MID_ATTEMPT_COUNTS_AS_HINT = true;

/**
 * The steps that have an attempt to cap: a graded answer the learner has not
 * submitted yet. Reading the method on `preview`, `spread` or `closure` costs
 * nothing, because there is no attempt there to under-credit.
 */
export const ATTEMPT_STEPS: readonly StepId[] = [
	'comprehension',
	'translate',
	'completion',
	'transfer',
	'recall'
];

export function isAttemptStep(step: StepId | null | undefined): boolean {
	return Boolean(step && ATTEMPT_STEPS.includes(step));
}

/**
 * Would asking right now cap the open attempt? Pure, total, and the single
 * place the ruling is consulted.
 */
export function retrievalCountsAsHint(attempt: HarnessAttempt | null | undefined): boolean {
	if (!RETRIEVAL_MID_ATTEMPT_COUNTS_AS_HINT) return false;
	return Boolean(attempt?.open && isAttemptStep(attempt.step));
}

/**
 * Register per R2 batch 2 (#49): invite, don't threaten — the honesty is
 * stated plainly *before* the surface opens in this state, but as information
 * about how the evidence log works, never as a penalty warning or a dare.
 * Compare the peek chip, which invites first and lands the same fact after use;
 * here the fact has to come first, because unlike a peek the learner cannot see
 * from the outside that this particular question touches their open attempt.
 */
export const MID_ATTEMPT_NOTICE =
	'You have an answer in progress. Looking things up here counts as a hint, like a peek — the attempt still counts as practice.';

/** The same fact, past tense, shown once a mid-attempt question was asked. */
export const MID_ATTEMPT_RECORDED =
	'Asked mid-attempt, so this one counts as practice rather than a clean attempt.';
