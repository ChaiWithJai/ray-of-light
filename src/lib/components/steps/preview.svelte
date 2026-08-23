<script lang="ts">
	/**
	 * 1d · Audio preview. AC 2: a session begins with audio before orthography.
	 * No target text is reachable from this step — that is the entire point.
	 *
	 * Playback is real: the lesson recording plays end to end, a listen only
	 * counts when the recording actually finishes, and speed control is
	 * playbackRate time-stretch (issue #1 permits this in place of a second
	 * slow recording).
	 */
	import { LessonPlayer } from '$lib/audio/lesson-player.svelte.js';
	import * as W from '$lib/components/wireframe/index.js';
	import type { Lesson } from '$lib/schemas/content.js';

	let { lesson, onDone }: { lesson: Lesson; onDone: () => void } = $props();

	let listens = $state(0);
	const player = $derived.by(() => new LessonPlayer(lesson));
	const enough = $derived(listens >= 2);
	const RATES = [0.7, 0.85, 1];

	$effect(() => {
		const p = player;
		return () => p.destroy();
	});

	function play() {
		if (!player.available) {
			// Recording still pending (L1): keep the old honest tap-to-count so the
			// step remains completable rather than a dead end.
			listens = Math.min(2, listens + 1);
			return;
		}
		player.toggle(() => (listens = Math.min(2, listens + 1)));
	}
</script>

<div class="flex flex-1 flex-col items-center justify-center gap-[18px]">
	<W.PlayButton
		size="lg"
		glyph={player.playing ? '❚❚' : '▶'}
		label={player.playing ? 'Pause' : 'Play the lesson'}
		onclick={play}
	/>
	<div class="text-center text-[16px]">Just listen.</div>
	<W.Muted class="text-center">No text yet — let your ears go first.</W.Muted>

	{#if player.available}
		<div class="flex items-center justify-center gap-2">
			{#each RATES as rate (rate)}
				<button
					type="button"
					class="rounded-full border-[1.5px] px-3 py-1 text-[12px] {player.rate === rate
						? 'border-accent-blue text-accent-blue'
						: 'border-ink-faint text-ink-faint'}"
					onclick={() => player.setRate(rate)}
				>
					{rate === 1 ? '1×' : `${rate}×`}
				</button>
			{/each}
			<button
				type="button"
				class="rounded-full border-[1.5px] border-ink-faint px-3 py-1 text-[12px]"
				onclick={() => player.playAll(() => (listens = Math.min(2, listens + 1)))}
			>
				↺ replay
			</button>
		</div>
	{/if}

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

	{#if !player.available}
		<W.SketchCard tone="warn">
			<W.Muted class="text-[11.5px] text-note">
				No recording exists for this lesson yet, so the player is inert. The step is kept in
				the flow because removing it would put orthography first and break the method. See
				docs/ISSUE-1-LIMITATIONS.md L1.
			</W.Muted>
		</W.SketchCard>
	{/if}
</div>

<W.SketchButton tone={enough ? 'primary' : 'outline'} onclick={onDone}>
	{enough ? "I've listened twice →" : 'Skip ahead →'}
</W.SketchButton>
