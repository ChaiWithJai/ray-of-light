<script lang="ts">
	/**
	 * The parallel bilingual spread — the centre of the product.
	 *
	 * One layout, seven states. Covering a column swaps a cell's *contents*; the
	 * cell keeps its box, so nothing reflows when support is removed (AC 4).
	 *
	 * Tracking (AC 3) is handled by one current-pair cursor with four drivers:
	 * pointer (tap/drag either column), keyboard (↑/↓ move one aligned pair),
	 * the two-finger / single-guide modes from settings, and — in the stack
	 * projection — the thumb rail (press-hold-slide pair stepping; mobile-method
	 * spike, Model A). Multitouch is never required to progress.
	 */
	import * as W from '$lib/components/ui/index.js';
	import { coveredLabel, spreadSupport, type SpreadState } from '$lib/spread.js';
	import type { Lesson, LessonLine } from '$lib/schemas/content.js';
	import type { LearnerSettings } from '$lib/schemas/learner.js';
	import { SvelteMap } from 'svelte/reactivity';

	type PointerTrack = { startIndex: number; index: number; moved: boolean; inside: boolean };

	let {
		lesson,
		// Renamed off `state` internally: that identifier collides with the `$state`
		// rune in any component that also uses runes.
		state: spreadState = 'parallel-reading',
		index = $bindable(0),
		settings,
		layout = 'columns',
		pinned = false,
		onlineactivate
	}: {
		lesson: Lesson;
		state?: SpreadState;
		index?: number;
		settings: LearnerSettings;
		/**
		 * Two projections of the same state machine (mobile-method spike):
		 * `columns` is the desktop two-column page; `stack` shows one pair at a
		 * time as a vertical stack — target above, English below, both in a
		 * single fixation zone — stepped by swipe/keys.
		 */
		layout?: 'columns' | 'stack';
		/** Hold the stack on one pair (the chunked exercise item, #39). */
		pinned?: boolean;
		onlineactivate?: (line: LessonLine) => void;
	} = $props();

	const support = $derived(spreadSupport(spreadState));
	const lines = $derived(lesson.lines);
	const isTamil = $derived(lesson.language === 'ta');
	const showTranslit = $derived(isTamil && settings.transliteration);
	const activePointers = new SvelteMap<number, PointerTrack>();
	let previewIndex = $state<number | null>(null);
	let pendingCommitIndex: number | null = null;
	let gestureCancelled = false;
	let ignoreClicksUntil = 0;
	const displayIndex = $derived(previewIndex ?? index);

	function move(delta: number) {
		activate(Math.min(lines.length - 1, Math.max(0, index + delta)));
	}

	function activate(i: number) {
		previewIndex = null;
		index = i;
		onlineactivate?.(lines[i]);
	}

	function accessibleLabel(line: LessonLine, i: number): string {
		const target = support.targetVisible
			? `${line.targetScript}${showTranslit && line.transliteration ? ` (${line.transliteration})` : ''}`
			: 'target language covered';
		const source = support.sourceVisible ? line.naturalEnglish : 'English covered';
		return `Line ${i + 1}: ${target} — ${source}`;
	}

	function lineIndexAt(event: PointerEvent): number | null {
		const target = document
			.elementFromPoint(event.clientX, event.clientY)
			?.closest<HTMLElement>('[data-line-index]');
		const root = event.currentTarget as HTMLElement;
		if (!target || !root.contains(target)) return null;
		const next = Number(target.dataset.lineIndex);
		return Number.isInteger(next) && next >= 0 && next < lines.length ? next : null;
	}

	function onpointerdown(event: PointerEvent) {
		if (event.pointerType === 'mouse' && event.button !== 0) return;
		if (
			settings.trackingMode === 'two-finger' &&
			event.pointerType === 'touch' &&
			!(event.target as Element).closest('[data-tracking-handle]')
		) return;
		const next = lineIndexAt(event);
		if (next === null) return;
		if (activePointers.size === 0) {
			pendingCommitIndex = null;
			gestureCancelled = false;
		}
		activePointers.set(event.pointerId, {
			startIndex: next,
			index: next,
			moved: false,
			inside: true
		});
		(event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
		previewIndex = next;
	}

	function onpointermove(event: PointerEvent) {
		const track = activePointers.get(event.pointerId);
		if (!track) return;
		if (event.pointerType === 'mouse' && event.buttons === 0) {
			activePointers.delete(event.pointerId);
			previewIndex = null;
			return;
		}
		const next = lineIndexAt(event);
		if (next === null) {
			activePointers.set(event.pointerId, { ...track, inside: false });
			if (activePointers.size === 1) previewIndex = null;
			return;
		}
		activePointers.set(event.pointerId, {
			...track,
			index: next,
			moved: track.moved || next !== track.startIndex,
			inside: true
		});
		previewIndex = next;
	}

	function finishPointer(event: PointerEvent, cancelled: boolean) {
		const track = activePointers.get(event.pointerId);
		if (!track) return;
		const root = event.currentTarget as HTMLElement;
		if (root.hasPointerCapture?.(event.pointerId)) root.releasePointerCapture(event.pointerId);
		const aborted = cancelled || !track.inside;
		if (aborted) gestureCancelled = true;
		else pendingCommitIndex = previewIndex ?? track.index;
		activePointers.delete(event.pointerId);
		if (activePointers.size > 0) return;

		if (!gestureCancelled && pendingCommitIndex !== null) {
			ignoreClicksUntil = performance.now() + 500;
			activate(pendingCommitIndex);
		} else {
			previewIndex = null;
		}
		pendingCommitIndex = null;
		gestureCancelled = false;
	}

	function onpointerup(event: PointerEvent) {
		const track = activePointers.get(event.pointerId);
		const next = lineIndexAt(event);
		if (track && next !== null) {
			activePointers.set(event.pointerId, {
				...track,
				index: next,
				moved: track.moved || next !== track.startIndex,
				inside: true
			});
		} else if (track) {
			activePointers.set(event.pointerId, { ...track, inside: false });
		}
		finishPointer(event, false);
	}

	function onpointercancel(event: PointerEvent) {
		finishPointer(event, true);
	}

	function onmouseleave() {
		if (activePointers.size === 0) previewIndex = null;
	}

	function onkeydown(event: KeyboardEvent) {
		if (!pinned && (event.key === 'ArrowDown' || event.key === 'j')) {
			event.preventDefault();
			move(1);
		} else if (!pinned && (event.key === 'ArrowUp' || event.key === 'k')) {
			event.preventDefault();
			move(-1);
		} else if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			activate(index);
		}
	}

	/* Stack projection: swipe-sequential pair stepping (no scroll, no tracking
	 * machinery — the pair is the unit). A horizontal swipe steps one pair;
	 * vertical movement is left to the page. */
	let swipeStart: { x: number; y: number } | null = null;

	function onstackpointerdown(event: PointerEvent) {
		if (pinned) return;
		swipeStart = { x: event.clientX, y: event.clientY };
	}

	function onstackpointerup(event: PointerEvent) {
		if (pinned || !swipeStart) return;
		const dx = event.clientX - swipeStart.x;
		const dy = event.clientY - swipeStart.y;
		swipeStart = null;
		if (Math.abs(dx) >= 48 && Math.abs(dx) > Math.abs(dy) * 1.5) {
			move(dx < 0 ? 1 : -1);
			// A swipe is one discrete step. The browser still synthesizes a
			// compatibility click at the touch-end point, which after the
			// re-render can land on whatever now sits there (a chevron, a
			// replay affordance) and turn one gesture into two actions — the
			// same reason the column projection suppresses post-gesture
			// clicks. Swallow exactly that one click.
			suppressStackClick = true;
		}
	}

	let suppressStackClick = false;

	function onstackclickcapture(event: MouseEvent) {
		if (!suppressStackClick) return;
		suppressStackClick = false;
		event.stopPropagation();
		event.preventDefault();
	}

	/* Thumb-rail driver (mobile-method spike, Model A): a fourth ReadingAnchor
	 * driver beside pointer/keyboard/guide. Press-and-hold engages tracking,
	 * sliding steps pair → pair, release stays put. Every step is a commit —
	 * activate() re-anchors line audio synchronously (D4; well under the spike's
	 * 150 ms causality budget). The rail lives below the text, never over it. */
	let railEngaged = $state(false);
	let railEl = $state<HTMLElement | null>(null);
	/** Horizontal padding inside the rail; the knob travels between the insets. */
	const RAIL_INSET = 12;

	function railIndexFrom(clientX: number): number {
		if (!railEl || lines.length < 2) return index;
		const rect = railEl.getBoundingClientRect();
		const fraction = (clientX - rect.left - RAIL_INSET) / Math.max(1, rect.width - RAIL_INSET * 2);
		return Math.min(lines.length - 1, Math.max(0, Math.round(fraction * (lines.length - 1))));
	}

	function railStep(clientX: number) {
		const next = railIndexFrom(clientX);
		if (next !== index) activate(next);
	}

	function onrailpointerdown(event: PointerEvent) {
		if (event.pointerType === 'mouse' && event.button !== 0) return;
		railEngaged = true;
		railEl?.setPointerCapture?.(event.pointerId);
		railStep(event.clientX);
	}

	function onrailpointermove(event: PointerEvent) {
		if (!railEngaged) return;
		railStep(event.clientX);
	}

	function onrailpointerend(event: PointerEvent) {
		if (!railEngaged) return;
		railEngaged = false;
		if (railEl?.hasPointerCapture?.(event.pointerId)) railEl.releasePointerCapture(event.pointerId);
	}

	function onrailkeydown(event: KeyboardEvent) {
		const delta =
			event.key === 'ArrowRight' || event.key === 'ArrowUp'
				? 1
				: event.key === 'ArrowLeft' || event.key === 'ArrowDown'
					? -1
					: null;
		if (delta !== null) {
			event.preventDefault();
			event.stopPropagation();
			move(delta);
		} else if (event.key === 'Home') {
			event.preventDefault();
			event.stopPropagation();
			activate(0);
		} else if (event.key === 'End') {
			event.preventDefault();
			event.stopPropagation();
			activate(lines.length - 1);
		}
	}

	const railKnobLeft = $derived(
		lines.length > 1 ? (displayIndex / (lines.length - 1)) * 100 : 50
	);
</script>

{#if !pinned}
	<!-- The step's ask, stated over the spread rather than whispered under it (#34). -->
	<p class="anim-rise m-0 text-center font-display text-base leading-snug font-semibold sm:text-lg">
		{support.instruction}
	</p>
{/if}

{#if layout === 'columns'}
<div
	role="listbox"
	tabindex="0"
	aria-label="Parallel bilingual spread. Use up and down arrows to move between line pairs."
	aria-activedescendant="pair-{displayIndex}"
	class="flex flex-col gap-1 rounded-2xl border border-effort-edge/70 bg-page px-3 py-4 shadow-card outline-none focus-visible:ring-2 focus-visible:ring-brand sm:px-5"
	class:touch-pan-y={true}
	{onkeydown}
	{onpointerdown}
	{onpointermove}
	{onpointerup}
	{onpointercancel}
	{onmouseleave}
>
	<div
		class="mb-2 flex items-baseline justify-between border-b border-line pb-2 {isTamil
			? 'text-lang-ta'
			: 'text-lang-fr'}"
	>
		<span
			class={isTamil
				? 'font-tamil text-sm font-bold'
				: 'text-2xs font-bold tracking-[0.14em] uppercase'}>{isTamil ? 'தமிழ்' : 'Français'}</span
		><span class="text-2xs font-bold tracking-[0.14em] text-text-faint uppercase">English</span>
	</div>

	{#each lines as line, i (line.id)}
		{@const current = i === displayIndex}
		<div
			id="pair-{i}"
			data-line-index={i}
			role="option"
			aria-selected={current}
			aria-label={accessibleLabel(line, i)}
			tabindex="-1"
			class="cursor-pointer"
			onclick={(event) => {
				if (performance.now() >= ignoreClicksUntil) activate(i);
			}}
			onkeydown={(event) => {
				if (event.key === 'Enter' || event.key === ' ') activate(i);
			}}
			onmouseenter={() => {
				if (activePointers.size === 0) previewIndex = i;
			}}
		>
			<W.PairRow
				highlight={current}
				class="relative {current ? 'shadow-card ring-1 ring-brand/30' : 'opacity-90'}"
			>
				<!-- Target column -->
				<W.Cover
					covered={!support.targetVisible}
					label={current ? coveredLabel(spreadState) : '···'}
					tone={current && spreadState === 'active-retrieval' ? 'accent' : 'default'}
				>
					<W.Fr n={i + 1} class={current ? 'font-semibold' : ''}>
						{line.targetScript}
						{#if current && !line.audio.pending}<span class="text-2xs" aria-hidden="true">▶</span
							>{/if}
					</W.Fr>
					{#if showTranslit && line.transliteration}
						<div class="pl-[16px] text-2xs text-text-faint italic">
							{line.transliteration}
						</div>
					{/if}
				</W.Cover>

				<!-- Source column -->
				<W.Cover
					covered={!support.sourceVisible}
					label={current ? 'covered' : '···'}
				>
					<W.En n={i + 1}>{line.naturalEnglish}</W.En>
					{#if isTamil && line.literalEnglish && current}
						<div class="pl-[16px] text-2xs text-text-faint">
							lit. {line.literalEnglish}
						</div>
					{/if}
				</W.Cover>

				{#if settings.trackingMode === 'two-finger'}
					<!-- The handles are the invitation: both fingers hold their place
					     while the eyes and ears do the mapping. The current pair's
					     handles carry a soft halo so the ritual reads at a glance. -->
					<span
						data-tracking-handle
						data-side="target"
						aria-hidden="true"
						class="absolute top-1/2 left-[calc(50%-30px)] z-10 flex size-[28px] -translate-y-1/2 touch-none items-center justify-center rounded-full border border-brand bg-surface-raised text-brand shadow-card {current
							? 'ring-4 ring-brand/15'
							: ''}"
					>↕</span>
					<span
						data-tracking-handle
						data-side="source"
						aria-hidden="true"
						class="absolute top-1/2 right-[2px] z-10 flex size-[28px] -translate-y-1/2 touch-none items-center justify-center rounded-full border border-brand bg-surface-raised text-brand shadow-card {current
							? 'ring-4 ring-brand/15'
							: ''}"
					>↕</span>
				{:else if current}
					<!-- Single-guide mode: display-only anchor marks on the tracked
					     pair — the same two held places, drawn rather than touched. -->
					<span
						aria-hidden="true"
						class="anim-breathe pointer-events-none absolute top-1/2 left-[calc(50%-12px)] size-1.5 -translate-y-1/2 rounded-full bg-brand/40"
					></span>
					<span
						aria-hidden="true"
						class="anim-breathe pointer-events-none absolute top-1/2 right-2 size-1.5 -translate-y-1/2 rounded-full bg-brand/40"
					></span>
				{/if}
			</W.PairRow>
		</div>
	{/each}
</div>

{#if settings.trackingMode === 'single-guide'}
	<W.Hint>
		↑ ↓ moves one pair · tap either column to jump
	</W.Hint>
{:else}
	<W.Hint>
		drag either side and both anchors move together
	</W.Hint>
{/if}
{:else}
	<!-- Stack projection: one pair fills the card — target above, English
	     below, both in one fixation zone. Same states, same covers, same
	     evidence; only the rendering differs (mobile-method spike, Model A/B). -->
	{@const line = lines[displayIndex]}
	<div
		role="listbox"
		tabindex="0"
		aria-label={pinned
			? 'Bilingual pair.'
			: 'Bilingual pair stack. Use up and down arrows, or swipe, to move between line pairs.'}
		aria-activedescendant="pair-{displayIndex}"
		class="flex touch-pan-y flex-col gap-2 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-brand"
		{onkeydown}
		onpointerdown={onstackpointerdown}
		onpointerup={onstackpointerup}
		onclickcapture={onstackclickcapture}
		onpointercancel={() => (swipeStart = null)}
	>
		{#key line.id}
			<div
				id="pair-{displayIndex}"
				data-line-index={displayIndex}
				role="option"
				aria-selected={true}
				aria-label={accessibleLabel(line, displayIndex)}
				tabindex="-1"
				class="anim-rise flex cursor-pointer flex-col gap-3 rounded-2xl border border-effort-edge/70 bg-page px-4 py-5 shadow-card sm:px-6"
				onclick={() => activate(displayIndex)}
				onkeydown={(event) => {
					if (event.key === 'Enter' || event.key === ' ') activate(displayIndex);
				}}
			>
				<W.Cover
					covered={!support.targetVisible}
					label={coveredLabel(spreadState)}
					tone={spreadState === 'active-retrieval' ? 'accent' : 'default'}
					class="min-h-9"
				>
					<W.Fr n={displayIndex + 1} class="text-lg font-semibold sm:text-xl">
						{line.targetScript}
						{#if !line.audio.pending}<span class="text-2xs" aria-hidden="true">▶</span>{/if}
					</W.Fr>
					{#if showTranslit && line.transliteration}
						<div class="pl-[16px] text-xs text-text-faint italic">
							{line.transliteration}
						</div>
					{/if}
				</W.Cover>

				<W.Cover covered={!support.sourceVisible} label="covered" class="min-h-6">
					<W.En n={displayIndex + 1} class="text-base">{line.naturalEnglish}</W.En>
					{#if isTamil && line.literalEnglish}
						<div class="pl-[16px] text-2xs text-text-faint">
							lit. {line.literalEnglish}
						</div>
					{/if}
				</W.Cover>
			</div>
		{/key}

		{#if pinned}
			<div class="text-center font-mono text-2xs text-text-faint">
				line {displayIndex + 1} of {lines.length} in this dialogue
			</div>
		{:else}
			<div class="flex items-center justify-between gap-2">
				<button
					type="button"
					aria-label="Previous pair"
					disabled={index === 0}
					class="flex size-9 cursor-pointer items-center justify-center rounded-full border border-line-strong bg-surface-raised text-text-soft transition-colors duration-(--duration-quick) outline-none hover:border-brand/60 hover:text-brand-deep focus-visible:ring-2 focus-visible:ring-brand disabled:pointer-events-none disabled:opacity-40"
					onclick={() => move(-1)}
				>‹</button>
				<span class="font-mono text-2xs text-text-faint">
					pair {displayIndex + 1} of {lines.length}
				</span>
				<button
					type="button"
					aria-label="Next pair"
					disabled={index === lines.length - 1}
					class="flex size-9 cursor-pointer items-center justify-center rounded-full border border-line-strong bg-surface-raised text-text-soft transition-colors duration-(--duration-quick) outline-none hover:border-brand/60 hover:text-brand-deep focus-visible:ring-2 focus-visible:ring-brand disabled:pointer-events-none disabled:opacity-40"
					onclick={() => move(1)}
				>›</button>
			</div>
		{/if}
	</div>

	{#if !pinned}
		<!-- The thumb rail: the held place. It sits in the thumb zone below the
		     text — never over it (C5) — and does on mobile what two fingers did
		     on the desktop columns: hold the place so the eyes and ears are free
		     for the mapping. Press engages, sliding steps pair → pair, release
		     stays put. Sibling of the listbox: a slider may not live inside one. -->
		<div
			bind:this={railEl}
			data-thumb-rail
			role="slider"
			tabindex="0"
			aria-label="Pair position"
			aria-orientation="horizontal"
			aria-valuemin={1}
			aria-valuemax={lines.length}
			aria-valuenow={displayIndex + 1}
			aria-valuetext="pair {displayIndex + 1} of {lines.length}"
			class="relative mt-1 h-11 touch-none cursor-ew-resize rounded-full border bg-surface-raised shadow-card transition-colors duration-(--duration-quick) outline-none select-none focus-visible:ring-2 focus-visible:ring-brand {railEngaged
				? 'border-brand/70 ring-4 ring-brand/15'
				: 'border-line-strong'}"
			onpointerdown={onrailpointerdown}
			onpointermove={onrailpointermove}
			onpointerup={onrailpointerend}
			onpointercancel={onrailpointerend}
			onkeydown={onrailkeydown}
		>
			<span
				aria-hidden="true"
				class="absolute top-1/2 right-3 left-3 h-px -translate-y-1/2 bg-line"
			></span>
			{#each lines as tick, i (tick.id)}
				<span
					aria-hidden="true"
					class="absolute top-1/2 size-1 -translate-x-1/2 -translate-y-1/2 rounded-full {i <=
					displayIndex
						? 'bg-brand/50'
						: 'bg-line-strong'}"
					style="left: calc(12px + (100% - 24px) * {lines.length > 1
						? i / (lines.length - 1)
						: 0.5})"
				></span>
			{/each}
			<span
				aria-hidden="true"
				data-thumb-rail-knob
				class="absolute top-1/2 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-brand font-mono text-2xs font-bold shadow-card transition-[left,scale] duration-(--duration-quick) {railEngaged
					? 'scale-125 bg-brand text-page ring-4 ring-brand/20'
					: 'bg-surface-raised text-brand'}"
				style="left: calc(12px + (100% - 24px) * {railKnobLeft / 100})"
			>{displayIndex + 1}</span>
		</div>
		<W.Hint>hold the rail and slide — the pair and its audio follow</W.Hint>
	{/if}
{/if}
