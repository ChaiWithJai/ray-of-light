<script lang="ts">
	/**
	 * 1j · Echo practice. Segmented audio builds phrase chunking — chunks are
	 * phrase-level, never word-by-word.
	 */
	import * as W from '$lib/components/ui/index.js';
	import type { Lesson } from '$lib/schemas/content.js';

	let { lesson, onDone }: { lesson: Lesson; onDone: () => void } = $props();

	// Shadow the lines that actually carry chunk boundaries; fall back to the first few.
	const targets = $derived(
		lesson.lines.filter((l) => l.chunks.length > 0).slice(0, 3).length > 0
			? lesson.lines.filter((l) => l.chunks.length > 0).slice(0, 3)
			: lesson.lines.slice(0, 3)
	);

	let lineIdx = $state(0);
	let chunkIdx = $state(0);
	const line = $derived(targets[lineIdx]);
	const chunks = $derived(line?.chunks ?? []);

	function nextChunk() {
		if (chunkIdx < chunks.length - 1) chunkIdx += 1;
		else if (lineIdx < targets.length - 1) {
			lineIdx += 1;
			chunkIdx = 0;
		} else onDone();
	}
</script>

<W.ConceptIntro technique="shadowing" />

<W.Muted>Repeat each chunk right on the speaker's heels.</W.Muted>

<W.Card tone="accent">
	<W.Fr class="text-base">{line?.targetScript}</W.Fr>
	{#if line?.transliteration}
		<W.Muted class="text-xs italic">{line.transliteration}</W.Muted>
	{/if}

	{#if chunks.length}
		<div class="flex flex-wrap items-center gap-1.5">
			{#each chunks as chunk, i (chunk.label)}
				<W.Chip active={i === chunkIdx}>{chunk.label}</W.Chip>
			{/each}
		</div>
	{:else}
		<W.Muted class="text-2xs">
			This line works as a single phrase: shadow it in one breath.
		</W.Muted>
	{/if}

	<W.Waveform
		class="mt-2"
		bars={[
			{ h: 12, tone: 'blue' },
			{ h: 26, tone: 'blue' },
			{ h: 18, tone: 'blue' },
			{ h: 8, dim: true },
			{ h: 20, dim: true },
			{ h: 10, dim: true }
		]}
	/>
</W.Card>

<W.Hint>
	▶ chunk … <b class="text-brand">your turn</b> … next chunk
</W.Hint>

<W.MicButton />

<div class="flex items-center justify-center gap-2">
	<W.Chip onclick={() => (chunkIdx = 0)}>replay line</W.Chip>
	<W.Chip onclick={nextChunk}>next chunk</W.Chip>
</div>

<W.Muted class="text-center text-2xs">
	line {lineIdx + 1} of {targets.length}
</W.Muted>

<W.Button tone="primary" class="mt-auto" onclick={onDone}>Continue</W.Button>
