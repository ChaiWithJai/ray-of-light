<script lang="ts">
	/**
	 * Stuck — the quiet step-chrome affordance for #47's job 1.
	 *
	 * Sits in the session's step chrome; opening it overlays the relevant
	 * technique page's unblocking lines (mapped `StepId → page` in the wiki
	 * module) and its one action returns to the exercise, state intact. Never a
	 * route change mid-exercise.
	 */
	import type { StepId } from '$lib/flow.js';
	import { STEP_TECHNIQUE } from '$lib/content/wiki/index.js';
	import WikiPanel from './wiki-panel.svelte';

	let { step, class: className = '' }: { step: StepId; class?: string } = $props();

	let open = $state(false);
</script>

<button
	type="button"
	data-testid="stuck-link"
	class="cursor-pointer self-end text-2xs text-text-faint underline decoration-dotted underline-offset-2 outline-none hover:text-text-soft focus-visible:ring-2 focus-visible:ring-brand {className}"
	aria-haspopup="dialog"
	onclick={() => (open = true)}
>
	stuck?
</button>

{#if open}
	<WikiPanel slug={STEP_TECHNIQUE[step]} mode="unstuck" onclose={() => (open = false)} />
{/if}
