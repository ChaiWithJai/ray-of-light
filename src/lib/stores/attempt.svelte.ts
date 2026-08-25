/**
 * The open attempt — what the learner is in the middle of answering (#48, T1).
 *
 * Steps that grade an answer publish their attempt here while it is
 * unsubmitted; the "Ask the method" surface reads it to apply the hint
 * boundary (`$lib/harness/hint-boundary.ts`), and the step reads `hinted` back
 * when it records evidence. Same shape of contract as `active-line`: the step
 * owns the truth, the aside only observes it.
 *
 * Nothing here writes evidence. The step that owns the attempt writes it, once,
 * at the moment it already records the outcome — so a capped attempt is one
 * evidence event with `hinted: true`, exactly like a peek, not a second event
 * racing beside it.
 */
import type { StepId } from '$lib/flow.js';
import type { HarnessAttempt } from '$lib/harness/context.js';

class AttemptStore {
	#step = $state<StepId | null>(null);
	#lessonId = $state<string | null>(null);
	#constructionIds = $state<string[]>([]);
	#hinted = $state(false);

	/** The open attempt in `HarnessContext` shape, or null when none is open. */
	get current(): HarnessAttempt | null {
		if (!this.#step) return null;
		return { open: true, step: this.#step, constructionIds: [...this.#constructionIds] };
	}

	get lessonId(): string | null {
		return this.#lessonId;
	}

	/** True once the method was consulted during this attempt. */
	get hinted(): boolean {
		return this.#hinted;
	}

	/** A step opens an attempt: an answer is expected and not yet given. */
	open(step: StepId, lessonId: string, constructionIds: readonly string[]) {
		const same = this.#step === step && this.#lessonId === lessonId;
		this.#step = step;
		this.#lessonId = lessonId;
		this.#constructionIds = [...constructionIds];
		// Re-opening the *same* attempt (a reactive re-run as constructions
		// resolve) must not launder away a hint already taken.
		if (!same) this.#hinted = false;
	}

	/** The hint boundary fired: this attempt is capped. Idempotent. */
	markHinted() {
		if (this.#step) this.#hinted = true;
	}

	/** The answer was submitted, or the step unmounted. */
	close() {
		this.#step = null;
		this.#lessonId = null;
		this.#constructionIds = [];
		this.#hinted = false;
	}
}

export const attempt = new AttemptStore();
