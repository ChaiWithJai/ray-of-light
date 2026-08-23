<script lang="ts">
	/**
	 * The parallel bilingual spread — the centre of the product.
	 *
	 * One layout, seven states. Covering a column swaps a cell's *contents*; the
	 * cell keeps its box, so nothing reflows when support is removed (AC 4).
	 *
	 * Tracking (AC 3) is handled by one current-pair cursor with three drivers:
	 * pointer (tap/drag either column), keyboard (↑/↓ move one aligned pair), and
	 * the two-finger / single-guide modes from settings. Multitouch is never
	 * required to progress.
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
		onlineactivate
	}: {
		lesson: Lesson;
		state?: SpreadState;
		index?: number;
		settings: LearnerSettings;
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
		if (event.key === 'ArrowDown' || event.key === 'j') {
			event.preventDefault();
			move(1);
		} else if (event.key === 'ArrowUp' || event.key === 'k') {
			event.preventDefault();
			move(-1);
		} else if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			activate(index);
		}
	}
</script>

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
			<W.PairRow highlight={current} class="relative {current ? '' : 'opacity-90'}">
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
					<span
						data-tracking-handle
						data-side="target"
						aria-hidden="true"
						class="absolute top-1/2 left-[calc(50%-30px)] z-10 flex size-[28px] -translate-y-1/2 touch-none items-center justify-center rounded-full border border-brand bg-surface-raised text-brand shadow-card"
					>↕</span>
					<span
						data-tracking-handle
						data-side="source"
						aria-hidden="true"
						class="absolute top-1/2 right-[2px] z-10 flex size-[28px] -translate-y-1/2 touch-none items-center justify-center rounded-full border border-brand bg-surface-raised text-brand shadow-card"
					>↕</span>
				{/if}
			</W.PairRow>
		</div>
	{/each}
</div>

<W.Muted class="text-center">{support.instruction}</W.Muted>

{#if settings.trackingMode === 'single-guide'}
	<W.Muted class="text-center text-2xs">
		↑ ↓ moves one pair · tap either column to jump
	</W.Muted>
{:else}
	<W.Muted class="text-center text-2xs">
		drag either side — both anchors move together
	</W.Muted>
{/if}
