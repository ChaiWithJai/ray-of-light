<script lang="ts">
	/**
	 * 1j · Echo practice. Segmented audio builds phrase chunking — chunks are
	 * phrase-level, never word-by-word.
	 *
	 * Design R2 (#49): the chunk rail is the instrument of this step, not a
	 * decoration. Each segment is a real phrase slice of the lesson recording
	 * (from `line.chunks`, which carry measured offsets), sized by its actual
	 * duration. The echo pass plays a chunk, then leaves an equal silent gap
	 * for the learner to say it back, and moves on. The step's advance CTA
	 * appears only after every chunk has been heard once — the same gate
	 * grammar as the preview's two listens. Until then, the primary actions
	 * are listening and echoing; a whispered skip remains for honest escape.
	 */
	import { LessonPlayer } from '$lib/audio/lesson-player.svelte.js';
	import * as W from '$lib/components/ui/index.js';
	import type { Lesson, LessonLine } from '$lib/schemas/content.js';
	import { SvelteSet } from 'svelte/reactivity';

	let { lesson, onDone }: { lesson: Lesson; onDone: () => void } = $props();

	// Shadow the lines that actually carry chunk boundaries; fall back to the first few.
	const targets = $derived(
		lesson.lines.filter((l) => l.chunks.length > 0).slice(0, 3).length > 0
			? lesson.lines.filter((l) => l.chunks.length > 0).slice(0, 3)
			: lesson.lines.slice(0, 3)
	);

	const player = $derived.by(() => new LessonPlayer(lesson));
	$effect(() => {
		const p = player;
		return () => p.destroy();
	});

	let lineIdx = $state(0);
	const line = $derived(targets[lineIdx]);

	/** A line without authored chunks shadows as one breath — one segment. */
	type Segment = { label: string; startMs?: number; endMs?: number };
	function segmentsOf(l: LessonLine | undefined): Segment[] {
		if (!l) return [];
		if (l.chunks.length > 0) return l.chunks;
		return [{ label: l.targetScript, startMs: l.audio.startMs, endMs: l.audio.endMs }];
	}
	const segments = $derived(segmentsOf(line));

	/** Chunks heard at least once, across all target lines — the honest gate. */
	const heard = new SvelteSet<string>();
	const keyOf = (l: LessonLine, ci: number) => `${l.id}:${ci}`;

	let activeChunk = $state(-1);
	let phase = $state<'idle' | 'listen' | 'echo'>('idle');
	let passRunning = $state(false);
	let echoTimer: ReturnType<typeof setTimeout> | undefined;
	$effect(() => () => clearTimeout(echoTimer));

	const heardTotal = $derived(heard.size);
	const chunkTotal = $derived(targets.reduce((n, t) => n + segmentsOf(t).length, 0));
	const allHeard = $derived(
		targets.every((t) => segmentsOf(t).every((_, ci) => heard.has(keyOf(t, ci))))
	);
	const lineHeard = $derived(
		line !== undefined && segments.every((_, ci) => heard.has(keyOf(line, ci)))
	);
	const anyHeard = $derived(heardTotal > 0);

	/** Playhead progress through the active chunk, 0..1, from real audio time. */
	const chunkProgress = $derived.by(() => {
		const seg = segments[activeChunk];
		if (phase !== 'listen' || !seg || seg.startMs === undefined || seg.endMs === undefined)
			return 0;
		const span = seg.endMs - seg.startMs;
		if (span <= 0) return 0;
		return Math.min(1, Math.max(0, (player.positionMs - seg.startMs) / span));
	});

	function stopPass() {
		passRunning = false;
		clearTimeout(echoTimer);
		player.pause();
		phase = 'idle';
		activeChunk = -1;
	}

	/** Play one chunk; after it sounds, give an equal gap for the echo. */
	function playChunk(ci: number, then?: () => void) {
		const seg = segments[ci];
		if (!seg || seg.startMs === undefined || seg.endMs === undefined || !player.available) return;
		clearTimeout(echoTimer);
		activeChunk = ci;
		phase = 'listen';
		const l = line;
		player.playSlice(seg.startMs, seg.endMs, () => {
			if (l) heard.add(keyOf(l, ci));
			phase = 'echo';
			const gap = Math.max(700, seg.endMs! - seg.startMs!);
			echoTimer = setTimeout(() => {
				phase = 'idle';
				if (then) then();
				else activeChunk = -1;
			}, gap);
		});
	}

	/** The echo pass: chunk → gap → next chunk, continuing across target lines. */
	function runPass() {
		if (!player.available) return;
		passRunning = true;
		const step = (ci: number) => {
			if (!passRunning) return;
			if (ci >= segments.length) {
				if (lineIdx < targets.length - 1) {
					lineIdx += 1;
					activeChunk = -1;
					step(0);
				} else {
					passRunning = false;
					activeChunk = -1;
				}
				return;
			}
			playChunk(ci, () => step(ci + 1));
		};
		// Resume from the first chunk of this line not yet heard.
		const from = segments.findIndex((_, ci) => line && !heard.has(keyOf(line, ci)));
		step(from >= 0 ? from : 0);
	}

	function replayLine() {
		stopPass();
		const l = line;
		if (!l || l.audio.startMs === undefined || l.audio.endMs === undefined || !player.available)
			return;
		const idx = lesson.lines.findIndex((candidate) => candidate.id === l.id);
		if (idx >= 0) player.playLine(idx, () => segments.forEach((_, ci) => heard.add(keyOf(l, ci))));
	}

	/**
	 * No recording on this machine (L1): stepping through the chunks keeps the
	 * step completable — the same honest tap-to-count fallback as the preview.
	 */
	function stepWithoutAudio() {
		const l = line;
		if (!l) return;
		const ci = segments.findIndex((_, i) => !heard.has(keyOf(l, i)));
		if (ci >= 0) {
			heard.add(keyOf(l, ci));
			activeChunk = ci;
		}
		if (segments.every((_, i) => heard.has(keyOf(l, i))) && lineIdx < targets.length - 1) {
			lineIdx += 1;
			activeChunk = -1;
		}
	}

	function goToLine(i: number) {
		stopPass();
		lineIdx = i;
	}
</script>

<W.ConceptIntro technique="shadowing" />

<W.Muted class="text-center">
	Listen to a phrase, then say it back in the gap that follows. Tap any phrase to hear
	just that piece.
</W.Muted>

<W.Card tone="accent">
	<W.Fr class="text-base">{line?.targetScript}</W.Fr>
	{#if line?.transliteration}
		<W.Muted class="text-xs italic">{line.transliteration}</W.Muted>
	{/if}

	<!-- The chunk rail: the line's phrase chunks as real segments, widths from
	     their measured durations. Tap a segment to hear just that phrase. -->
	<div class="mt-2 flex w-full items-stretch gap-1" role="group" aria-label="Phrase chunks">
		{#each segments as seg, i (i)}
			{@const isHeard = line !== undefined && heard.has(keyOf(line, i))}
			{@const isActive = i === activeChunk}
			<button
				type="button"
				style:flex-grow={Math.max(
					1,
					seg.startMs !== undefined && seg.endMs !== undefined ? seg.endMs - seg.startMs : 1
				)}
				class="relative min-w-0 basis-0 cursor-pointer overflow-hidden rounded-md border px-1.5 py-2 text-xs leading-tight transition-colors duration-(--duration-quick) outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:cursor-default disabled:opacity-60
					{isActive
					? 'border-brand bg-brand-wash font-bold text-brand-deep'
					: isHeard
						? 'border-brand/45 bg-brand-wash/60 text-brand-deep'
						: 'border-line-strong bg-surface-raised text-text-soft hover:border-brand/60'}"
				aria-label="Play chunk: {seg.label}"
				aria-pressed={isActive}
				disabled={!player.available}
				onclick={() => {
					stopPass();
					playChunk(i);
				}}
			>
				{#if isActive && phase === 'listen'}
					<span
						aria-hidden="true"
						class="absolute inset-y-0 left-0 bg-brand/15"
						style:width="{Math.round(chunkProgress * 100)}%"
					></span>
				{/if}
				<span class="relative">{seg.label}</span>
			</button>
		{/each}
	</div>

	{#if phase === 'echo'}
		<div class="text-center text-xs font-bold text-brand-deep" role="status">
			your turn: say it back
		</div>
	{:else}
		<W.Muted class="text-center text-2xs">
			{heardTotal} of {chunkTotal} phrases heard
		</W.Muted>
	{/if}
</W.Card>

<W.MicButton />

<div class="flex flex-wrap items-center justify-center gap-2">
	{#if player.available}
		{#if passRunning}
			<W.Chip active onclick={stopPass}>❚❚ pause the pass</W.Chip>
		{:else}
			<W.Chip onclick={runPass}>
				▶ {anyHeard && !allHeard ? 'resume' : 'start'} the echo pass
			</W.Chip>
		{/if}
		<W.Chip onclick={replayLine}>replay the line</W.Chip>
	{:else}
		<W.Chip onclick={stepWithoutAudio}>next chunk</W.Chip>
	{/if}
	{#if lineHeard && lineIdx < targets.length - 1 && !passRunning}
		<W.Chip onclick={() => goToLine(lineIdx + 1)}>next line</W.Chip>
	{/if}
</div>

{#if !player.available}
	<W.Muted class="text-center text-2xs">
		No recording is available on this machine (see docs/AUDIO.md), so step through the
		chunks and say each one aloud.
	</W.Muted>
{/if}

<W.Muted class="text-center text-2xs">
	line {lineIdx + 1} of {targets.length}
</W.Muted>

{#if allHeard}
	<W.Button tone="primary" class="mt-auto" onclick={onDone}>Continue</W.Button>
{:else}
	<!-- The step owns its moment (#49): until every chunk has been heard, the
	     main actions are the pass, a replay, or leaving — never a primary
	     advance. Same whispered escape as the preview. -->
	<button
		type="button"
		class="mx-auto mt-auto cursor-pointer self-center bg-transparent p-1 text-xs text-text-faint underline decoration-dotted underline-offset-2 transition-colors duration-(--duration-quick) outline-none hover:text-text-soft focus-visible:ring-2 focus-visible:ring-brand"
		onclick={onDone}
	>
		Skip ahead →
	</button>
{/if}
