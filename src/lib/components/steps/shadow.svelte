<script lang="ts">
	/**
	 * 1j · Echo practice. Segmented audio builds phrase chunking — chunks are
	 * phrase-level, never word-by-word.
	 */
	import * as W from '$lib/components/wireframe/index.js';
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

<W.Muted>Repeat right on the speaker's heels — chunk by chunk.</W.Muted>

<W.SketchCard tone="accent">
	<W.Fr class="text-[15px]">{line?.targetScript}</W.Fr>
	{#if line?.transliteration}
		<W.Muted class="text-[12px] italic">{line.transliteration}</W.Muted>
	{/if}

	{#if chunks.length}
		<div class="flex flex-wrap items-center gap-[5px]">
			{#each chunks as chunk, i (chunk.label)}
				<W.Chip active={i === chunkIdx}>{chunk.label}</W.Chip>
			{/each}
		</div>
	{:else}
		<W.Muted class="text-[11.5px]">
			No chunk boundaries authored for this line — shadow the whole line.
		</W.Muted>
	{/if}

	<W.Waveform
		class="mt-[6px]"
		bars={[
			{ h: 12, tone: 'blue' },
			{ h: 26, tone: 'blue' },
			{ h: 18, tone: 'blue' },
			{ h: 8, dim: true },
			{ h: 20, dim: true },
			{ h: 10, dim: true }
		]}
	/>
</W.SketchCard>

<div class="text-center text-[14px]">
	▶ chunk … <b class="text-accent-blue">your turn</b> … next chunk
</div>

<W.MicButton />

<div class="flex items-center justify-center gap-2">
	<W.Chip onclick={() => (chunkIdx = 0)}>replay line</W.Chip>
	<W.Chip onclick={nextChunk}>next chunk</W.Chip>
</div>

<W.Muted class="text-center text-[11px]">
	line {lineIdx + 1} of {targets.length}
</W.Muted>

<W.SketchButton tone="primary" class="mt-auto" onclick={onDone}>Continue</W.SketchButton>
