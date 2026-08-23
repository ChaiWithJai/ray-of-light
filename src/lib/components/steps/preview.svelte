<script lang="ts">
	/**
	 * 1d · Audio preview. AC 2: a session begins with audio before orthography.
	 * No target text is reachable from this step — that is the entire point.
	 */
	import * as W from '$lib/components/wireframe/index.js';
	import type { Lesson } from '$lib/schemas/content.js';

	let { lesson, onDone }: { lesson: Lesson; onDone: () => void } = $props();

	let listens = $state(0);
	const audioPending = $derived(lesson.lines[0]?.audio.pending ?? true);
	const enough = $derived(listens >= 2);
</script>

<div class="flex flex-1 flex-col items-center justify-center gap-[18px]">
	<W.PlayButton
		size="lg"
		label="Play the lesson"
		onclick={() => (listens = Math.min(2, listens + 1))}
	/>
	<div class="text-center text-[16px]">Just listen.</div>
	<W.Muted class="text-center">No text yet — let your ears go first.</W.Muted>

	<div class="flex items-center justify-center gap-2">
		{#each [0, 1] as i (i)}
			<div
				class="size-[8px] rounded-full {listens > i
					? 'bg-accent-blue'
					: 'border-[1.5px] border-ink-faint'}"
			></div>
		{/each}
	</div>
	<W.Muted class="text-center">listen {Math.min(listens + (enough ? 0 : 1), 2)} of 2</W.Muted>

	{#if audioPending}
		<W.SketchCard tone="warn">
			<W.Muted class="text-[11.5px] text-note">
				No native recording exists for this lesson yet, so the player is inert. The step is
				kept in the flow because removing it would put orthography first and break the
				method. See docs/ISSUE-1-LIMITATIONS.md L1.
			</W.Muted>
		</W.SketchCard>
	{/if}
</div>

<W.SketchButton tone={enough ? 'primary' : 'outline'} onclick={onDone}>
	{enough ? "I've listened twice →" : 'Skip ahead →'}
</W.SketchButton>
