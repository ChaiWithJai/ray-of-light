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
	import { activeLine } from '$lib/stores/active-line.svelte.js';
	import { profile } from '$lib/stores/profile.svelte.js';
	import { SvelteSet } from 'svelte/reactivity';

	let { lesson, onDone }: { lesson: Lesson; onDone: () => void } = $props();

	import type { SpreadState } from '$lib/spread.js';

	let index = $state(0);
	let overlay = $state<'none' | 'notes' | 'pronounce'>('none');
	/**
	 * Phone widths get the stack projection of the same spread state machine
	 * (mobile-method spike): one pair per viewport, stepped by swipe, rail,
	 * keys or audio — the compressed two-column grid never renders on a phone.
	 * Breakpoint matches Tailwind's `sm`. SSR renders columns; the first client
	 * measurement corrects it before interaction.
	 */
	let viewportWidth = $state<number | undefined>(undefined);
	const layout = $derived(
		viewportWidth !== undefined && viewportWidth < 640 ? ('stack' as const) : ('columns' as const)
	);
	/** The rung of the support-removal ladder the learner is on (#34). */
	let ladderStage = $state<SpreadState>('parallel-reading');
	const line = $derived(lesson.lines[index]);
	const read = new SvelteSet<string>();
	/**
	 * #49: pairs that have been the active pair, in any ladder stage. On the
	 * stack layout (one pair per viewport) this is a knowable completion state:
	 * every pair has at least been in front of the learner. On columns every
	 * pair is visible at once, so no such state exists and the CTA stays
	 * primary there.
	 */
	const seen = new SvelteSet<string>();
	const seenAll = $derived(layout === 'columns' || seen.size >= lesson.lines.length);
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
	const spreadState = $derived(ladderStage);

	// Reading a pair in the parallel state is what `exposed` means (D3).
	$effect(() => {
		if (spreadState !== 'parallel-reading' || !line || read.has(line.id)) return;
		read.add(line.id);
		profile.record('parallel-read', lesson.id, line.constructions, {
			contentVersion: CONTENT_VERSION
		});
	});

	$effect(() => {
		if (line) seen.add(line.id);
	});

	// The spread's current line is the notes aside's line-scope anchor (#48).
	$effect(() => {
		if (line) activeLine.set({ lessonId: lesson.id, lineId: line.id, label: `Line ${index + 1}` });
	});
	$effect(() => {
		return () => activeLine.clear();
	});

	// The word a note is anchored to, else the line's first substantive word.
	const anchorWord = $derived(
		line?.notes[0]?.anchor?.split(/\s+/).at(-1) ?? line?.targetScript.split(/\s+/)[0] ?? ''
	);
	const morphology = $derived(
		anchorWord ? describe(lesson.language, anchorWord) : null
	);

	/**
	 * Audio-led auto driver (mobile-method spike, Model D): the default,
	 * no-gesture driver of the same anchor — while `following`, the current
	 * pair tracks the recording. An explicit user commit (rail, swipe, tap,
	 * keys) OWNS the anchor: it disengages following before re-slicing audio
	 * to the chosen line, so a stale `timeupdate` from the dialogue playback
	 * can never yank the anchor back after a user action. "Listen" re-engages
	 * following, resuming the karaoke from the pair the user is on.
	 */
	let following = $state(false);

	function onlineactivate(l: LessonLine) {
		following = false;
		const lineIndex = lesson.lines.findIndex((candidate) => candidate.id === l.id);
		if (lineIndex >= 0) player.playLine(lineIndex);
		if (l.notes.length > 0) overlay = 'notes';
	}

	function togglefollow() {
		if (player.playing) {
			following = false;
			player.pause();
		} else {
			following = true;
			player.playFrom(index, () => (following = false));
		}
	}

	$effect(() => {
		if (layout !== 'stack' || !following || !player.playing) return;
		const sounding = player.activeLine;
		if (sounding >= 0 && sounding !== index) index = sounding;
	});
</script>

<svelte:window bind:innerWidth={viewportWidth} />

<Spread {lesson} state={spreadState} bind:index settings={profile.settings} {layout} {onlineactivate} />

{#if layout === 'stack'}
	<!-- The zero-gesture way through the spread: listen, and the pair follows. -->
	<div class="flex justify-center">
		<W.Chip active={player.playing} onclick={togglefollow}>
			{player.playing ? '❚❚ pause' : '▶ listen — the pair follows the audio'}
		</W.Chip>
	</div>
{/if}

{#if player.error}
	<W.Muted role="alert" class="text-center text-caution">{player.error}</W.Muted>
{/if}

<W.ConceptIntro technique="cover-ladder" />

<W.CoverLadder
	stage={ladderStage}
	targetName={lesson.language === 'ta' ? 'Tamil' : 'French'}
	onstage={(next) => (ladderStage = next)}
/>

<div class="flex flex-wrap items-center justify-center gap-2">
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
			<W.Muted>No note on this line. When a line needs one, it appears here.</W.Muted>
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
		<W.Muted class="text-center">listen to both and match the shape by ear</W.Muted>
	</W.Card>
{/if}

<!-- #49: the advance is demoted, not disabled, until every pair has been in
     front of the learner — reading order stays the learner's own. -->
<W.Button tone={seenAll ? 'primary' : 'outline'} class="mt-auto" onclick={onDone}>
	I've read the spread →
</W.Button>
