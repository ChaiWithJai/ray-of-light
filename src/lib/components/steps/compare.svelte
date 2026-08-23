<script lang="ts">
	/**
	 * 1n · Answer comparison. The learner notices the difference *before* being
	 * told what it was — error discrimination, not red X's. No score is shown.
	 */
	import * as W from '$lib/components/wireframe/index.js';
	import { diffWords } from '$lib/answers.js';
	import type { Lesson } from '$lib/schemas/content.js';

	let {
		lesson,
		attempt,
		onDone
	}: {
		lesson: Lesson;
		attempt: { lineId: string; text: string } | null;
		onDone: () => void;
	} = $props();

	const line = $derived(
		lesson.lines.find((l) => l.id === attempt?.lineId) ?? lesson.lines[0]
	);
	const diff = $derived(diffWords(attempt?.text ?? '', line.targetScript));
	const identical = $derived(diff.attempt.every((w) => w.same) && diff.canonical.every((w) => w.same));

	let noticed = $state(false);
</script>

<W.SketchCard>
	<W.Muted class="text-[12px]">YOU SAID</W.Muted>
	<W.Fr>
		{#each diff.attempt as word, i (i)}
			{#if word.same}{word.text}{:else}<W.Diff tone="bad">{word.text}</W.Diff>{/if}{' '}
		{/each}
	</W.Fr>
</W.SketchCard>

<div class="text-center text-ink-soft">↕ spot the difference</div>

{#if noticed}
	<W.SketchCard class="border-good">
		<W.Muted class="text-[12px]">CANONICAL ▶</W.Muted>
		<W.Fr>
			{#each diff.canonical as word, i (i)}
				{#if word.same}{word.text}{:else}<W.Diff tone="good">{word.text}</W.Diff>{/if}{' '}
			{/each}
		</W.Fr>
		{#if line.transliteration}
			<W.Muted class="text-[12px] italic">{line.transliteration}</W.Muted>
		{/if}
	</W.SketchCard>

	<W.SketchCard>
		<W.Muted>
			{#if identical}
				That matches the canonical line.
			{:else}
				Compare word by word. Differences that sound identical are spelling only; ones that
				change the sound are worth saying aloud again.
			{/if}
		</W.Muted>
	</W.SketchCard>

	<W.SketchButton tone="primary" onclick={onDone}>Say the corrected line 🎙</W.SketchButton>
	<W.Muted class="text-center text-[11px]">
		Tricky lines come back in 1 · 3 · 7 days.
	</W.Muted>
{:else}
	<W.SketchCard>
		<W.Muted>
			Look at your line again first. What would you change before you see the original?
		</W.Muted>
	</W.SketchCard>
	<W.SketchButton class="mt-auto" onclick={() => (noticed = true)}>
		Show the canonical line
	</W.SketchButton>
{/if}
