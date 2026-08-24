<script lang="ts">
	/**
	 * CoverLadder — the support-removal ladder as one guided stepper (#34).
	 *
	 * The method has a small finite set of meaningful cover states, in a fixed
	 * order of removed support. Free cover-EN/cover-FR toggles made the learner
	 * puzzle out "what state am I in?"; this presents the same states as one
	 * legible progression the method advances — named plainly, method-ordered,
	 * with manual jumps allowed.
	 */
	import type { SpreadState } from '$lib/spread.js';
	import { cn } from '$lib/utils.js';

	let {
		stage,
		targetName,
		onstage
	}: {
		stage: SpreadState;
		/** Learner-facing name of the target language, e.g. "French". */
		targetName: string;
		onstage: (next: SpreadState) => void;
	} = $props();

	type Rung = { id: SpreadState; label: string; description: string };

	const rungs = $derived<Rung[]>([
		{
			id: 'parallel-reading',
			label: 'Read both',
			description: 'Both languages are open. Track the pairs together.'
		},
		{
			id: 'target-reading',
			label: 'Hide English',
			description: `Read the ${targetName} on its own; the meaning should come without the English.`
		},
		{
			id: 'active-retrieval',
			label: 'Say it yourself',
			description: `The ${targetName} is covered. Say each line from its English, out loud.`
		}
	]);

	const currentIndex = $derived(Math.max(0, rungs.findIndex((rung) => rung.id === stage)));
</script>

<div
	data-slot="cover-ladder"
	class="anim-rise flex flex-col gap-2 rounded-xl border border-effort-edge bg-effort p-3 shadow-card sm:p-4"
>
	<div class="flex items-baseline justify-between gap-2">
		<span class="text-2xs font-bold tracking-[0.14em] text-brand uppercase">Support ladder</span>
		<span class="font-mono text-2xs text-text-faint">
			{currentIndex + 1} of {rungs.length}
		</span>
	</div>

	<div class="flex items-stretch gap-1.5 sm:gap-2" role="group" aria-label="Support ladder">
		{#each rungs as rung, i (rung.id)}
			{@const here = i === currentIndex}
			{@const past = i < currentIndex}
			{#if i > 0}
				<span class="self-center text-xs text-text-faint" aria-hidden="true">→</span>
			{/if}
			<button
				type="button"
				aria-current={here ? 'step' : undefined}
				class={cn(
					'flex min-w-0 flex-1 cursor-pointer flex-col items-center gap-1 rounded-lg border px-2 py-2 text-center transition-colors duration-(--duration-quick) outline-none focus-visible:ring-2 focus-visible:ring-brand',
					here
						? 'border-brand bg-brand-wash shadow-card'
						: past
							? 'border-line bg-surface-raised/60 text-text-faint hover:border-brand/50'
							: 'border-line-strong bg-surface-raised text-text-soft hover:border-brand/50'
				)}
				onclick={() => onstage(rung.id)}
			>
				<span
					aria-hidden="true"
					class={cn(
						'flex size-5 items-center justify-center rounded-full border text-2xs font-bold',
						here
							? 'border-brand bg-brand text-white'
							: past
								? 'border-line-strong bg-line/50 text-text-soft'
								: 'border-line-strong text-text-soft'
					)}
				>
					{past ? '✓' : i + 1}
				</span>
				<span class={cn('text-xs leading-tight', here ? 'font-bold text-brand-deep' : '')}>
					{rung.label}
				</span>
			</button>
		{/each}
	</div>

	<p class="m-0 text-center text-2xs leading-relaxed text-text-soft">
		{rungs[currentIndex].description}
	</p>
</div>
