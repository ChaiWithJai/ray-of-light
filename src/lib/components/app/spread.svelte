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
	import * as W from '$lib/components/wireframe/index.js';
	import { coveredLabel, spreadSupport, type SpreadState } from '$lib/spread.js';
	import type { Lesson, LessonLine } from '$lib/schemas/content.js';
	import type { LearnerSettings } from '$lib/schemas/learner.js';

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

	function move(delta: number) {
		index = Math.min(lines.length - 1, Math.max(0, index + delta));
	}

	function activate(i: number) {
		index = i;
		onlineactivate?.(lines[i]);
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
	aria-activedescendant="pair-{index}"
	class="flex flex-col gap-[2px] rounded-[6px] outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
	{onkeydown}
>
	<div class="flex items-center justify-between text-[12px] text-ink-soft">
		<span>{isTamil ? 'தமிழ்' : 'FRANÇAIS'}</span><span>ENGLISH</span>
	</div>

	{#each lines as line, i (line.id)}
		{@const current = i === index}
		<div
			id="pair-{i}"
			role="option"
			aria-selected={current}
			tabindex="-1"
			class="cursor-pointer"
			onclick={() => activate(i)}
			onmouseenter={() => (index = i)}
			onkeydown={() => {}}
		>
			<W.PairRow highlight={current} class={current ? '' : 'opacity-90'}>
				<!-- Target column -->
				<W.Cover
					covered={!support.targetVisible}
					label={current ? coveredLabel(spreadState) : '···'}
					tone={current && spreadState === 'active-retrieval' ? 'accent' : 'default'}
				>
					<W.Fr n={i + 1} class={current ? 'font-semibold' : ''}>
						{line.targetScript}
						{#if current && !line.audio.pending}<span class="text-[11px]">▶</span>{/if}
					</W.Fr>
					{#if showTranslit && line.transliteration}
						<div class="pl-[16px] text-[11.5px] text-ink-faint italic">
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
						<div class="pl-[16px] text-[11px] text-ink-faint">
							lit. {line.literalEnglish}
						</div>
					{/if}
				</W.Cover>
			</W.PairRow>
		</div>
	{/each}
</div>

<W.Muted class="text-center">{support.instruction}</W.Muted>

{#if settings.trackingMode === 'single-guide'}
	<W.Muted class="text-center text-[11px]">
		↑ ↓ moves one pair · tap either column to jump
	</W.Muted>
{:else}
	<W.Muted class="text-center text-[11px]">
		drag either side — both anchors move together
	</W.Muted>
{/if}
