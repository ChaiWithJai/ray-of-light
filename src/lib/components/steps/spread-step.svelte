<script lang="ts">
	/**
	 * 1e · Parallel spread, with the 1f tracking layer, the 1g pronunciation
	 * overlay and the 1h notes drawer. These are overlays on one mounted spread,
	 * not separate screens — the layout never changes underneath them.
	 */
	import Spread from '$lib/components/app/spread.svelte';
	import * as W from '$lib/components/ui/index.js';
	import { LessonPlayer } from '$lib/audio/lesson-player.svelte.js';
	import { CONTENT_VERSION } from '$lib/content/index.js';
	import { describe } from '$lib/morphology.js';
	import type { Lesson, LessonLine } from '$lib/schemas/content.js';
	import { profile } from '$lib/stores/profile.svelte.js';
	import { SvelteSet } from 'svelte/reactivity';

	let { lesson, onDone }: { lesson: Lesson; onDone: () => void } = $props();

	let index = $state(0);
	let overlay = $state<'none' | 'notes' | 'pronounce'>('none');
	let coverSource = $state(false);
	let coverTarget = $state(false);
	const line = $derived(lesson.lines[index]);
	const read = new SvelteSet<string>();
	const player = $derived(new LessonPlayer(lesson));

	$effect(() => {
		const current = player;
		return () => current.destroy();
	});

	$effect(() => {
		player.setRate(profile.settings.audioSpeed);
	});

	// NB: must not be called `state` — declaring that identifier makes Svelte parse
	// `$state` as store-subscription syntax and every rune in this file breaks.
	const spreadState = $derived(
		coverTarget ? 'active-retrieval' : coverSource ? 'target-reading' : 'parallel-reading'
	);

	// Reading a pair in the parallel state is what `exposed` means (D3).
	$effect(() => {
		if (spreadState !== 'parallel-reading' || !line || read.has(line.id)) return;
		read.add(line.id);
		profile.record('parallel-read', lesson.id, line.constructions, {
			contentVersion: CONTENT_VERSION
		});
	});

	// The word a note is anchored to, else the line's first substantive word.
	const anchorWord = $derived(
		line?.notes[0]?.anchor?.split(/\s+/).at(-1) ?? line?.targetScript.split(/\s+/)[0] ?? ''
	);
	const morphology = $derived(
		anchorWord ? describe(lesson.language, anchorWord) : null
	);

	function onlineactivate(l: LessonLine) {
		const lineIndex = lesson.lines.findIndex((candidate) => candidate.id === l.id);
		if (lineIndex >= 0) player.playLine(lineIndex);
		if (l.notes.length > 0) overlay = 'notes';
	}
</script>

<Spread {lesson} state={spreadState} bind:index settings={profile.settings} {onlineactivate} />

{#if player.error}
	<W.Muted role="alert" class="text-center text-caution">{player.error}</W.Muted>
{/if}

<div class="flex flex-wrap items-center justify-center gap-2">
	<W.Chip active={coverSource} onclick={() => ((coverSource = !coverSource), (coverTarget = false))}>
		cover EN
	</W.Chip>
	<W.Chip active={coverTarget} onclick={() => ((coverTarget = !coverTarget), (coverSource = false))}>
		cover {lesson.language === 'ta' ? 'TA' : 'FR'}
	</W.Chip>
	<W.Chip
		active={overlay === 'notes'}
		onclick={() => (overlay = overlay === 'notes' ? 'none' : 'notes')}
	>
		notes
	</W.Chip>
	<W.Chip
		active={overlay === 'pronounce'}
		onclick={() => (overlay = overlay === 'pronounce' ? 'none' : 'pronounce')}
	>
		pronounce
	</W.Chip>
</div>

{#if overlay === 'notes'}
	<!-- 1h · anchored to the exact word, opened only on demand -->
	<W.Card thick class="rounded-t-[14px]">
		<div class="flex items-center justify-between gap-2">
			<div class="text-sm font-semibold">
				📎 {line?.notes[0]?.anchor ?? `Line ${index + 1}`}
			</div>
			<button class="text-text-soft" onclick={() => (overlay = 'none')} aria-label="Close notes">
				✕
			</button>
		</div>
		{#if line?.notes.length}
			{#each line.notes as note (note.text)}
				<div class="text-sm leading-[1.35]">
					<W.Pill class="mr-1">{note.type}</W.Pill>
					{note.text}
				</div>
			{/each}
		{:else}
			<W.Muted>No note on this line. Notes appear only where they earn their place.</W.Muted>
		{/if}

		<!-- Morphology from Universal Dependencies: reference annotation, not
		     teaching content. Only shown for the anchored word, so it stays
		     just-in-time rather than becoming a grammar table. -->
		{#if morphology}
			<W.Muted class="border-t border-line pt-2 text-2xs">
				<span class="font-mono">{anchorWord}</span> — {morphology}
			</W.Muted>
		{/if}
	</W.Card>
{:else if overlay === 'pronounce'}
	<!-- 1g · imitation over evaluation: no score, no red marks -->
	<W.Card tone="accent">
		<W.Fr class="text-lg">{line?.targetScript}</W.Fr>
		{#if line?.transliteration}<W.Muted>{line.transliteration}</W.Muted>{/if}
		<W.Muted class="text-xs">native</W.Muted>
		<W.Waveform bars={[{ h: 10 }, { h: 24 }, { h: 30 }, { h: 14 }, { h: 26 }, { h: 8 }]} />
		<W.Muted class="text-xs">you</W.Muted>
		<W.Waveform tone="blue" bars={[{ h: 8 }, { h: 20 }, { h: 31 }, { h: 10 }, { h: 28 }, { h: 6 }]} />
		<W.MicButton />
		<W.Muted class="text-center">compare by ear — no scores, no red marks</W.Muted>
	</W.Card>
{/if}

<W.Button tone="primary" class="mt-auto" onclick={onDone}>
	I've read the spread →
</W.Button>
