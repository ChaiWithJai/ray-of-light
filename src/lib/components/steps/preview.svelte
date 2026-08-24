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
	import * as W from '$lib/components/ui/index.js';
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

<!-- Immersion: the lights dim. The stage is the only dark surface in the app,
     and the recording is the only actor on it. -->
<div class="flex flex-1 flex-col justify-center gap-4">
	<W.Card tone="stage" class="items-center gap-6 px-6 py-12 sm:py-16">
		<div class="relative">
			{#if player.playing}
				<span
					class="anim-breathe pointer-events-none absolute -inset-3 rounded-full border-2 border-stage-muted"
					aria-hidden="true"
				></span>
			{/if}
			<W.PlayButton
				size="lg"
				tone="stage"
				glyph={player.playing ? '❚❚' : '▶'}
				label={player.playing ? 'Pause' : 'Play the lesson'}
				onclick={play}
			/>
		</div>

		<div class="text-center">
			<div class="font-display text-2xl font-semibold text-stage-text">Just listen.</div>
			<div class="mt-1.5 text-sm text-stage-muted">
				Play the dialogue through twice, at any speed. Understanding can wait; for now, get
				used to the sound.
			</div>
		</div>

		{#if player.available}
			<div class="flex items-center justify-center gap-2">
				{#each RATES as rate (rate)}
					<button
						type="button"
						class="rounded-full border px-3 py-1 text-xs transition-colors duration-(--duration-quick) outline-none focus-visible:ring-2 focus-visible:ring-stage-text {player.rate ===
						rate
							? 'border-stage-text font-bold text-stage-text'
							: 'border-stage-muted/50 text-stage-muted hover:text-stage-text'}"
						onclick={() => player.setRate(rate)}
					>
						{rate === 1 ? '1×' : `${rate}×`}
					</button>
				{/each}
				<button
					type="button"
					class="rounded-full border border-stage-muted/50 px-3 py-1 text-xs text-stage-muted transition-colors duration-(--duration-quick) outline-none hover:text-stage-text focus-visible:ring-2 focus-visible:ring-stage-text"
					onclick={() => player.playAll(() => (listens = Math.min(2, listens + 1)))}
				>
					↺ replay
				</button>
			</div>
		{/if}

		<div class="flex flex-col items-center gap-2">
			<div class="flex items-center justify-center gap-2">
				{#each [0, 1] as i (i)}
					<div
						class="size-2 rounded-full transition-colors duration-(--duration-move) {listens > i
							? 'bg-stage-text'
							: 'border border-stage-muted/60'}"
					></div>
				{/each}
			</div>
			<div class="text-sm text-stage-muted">
				listen {Math.min(listens + (enough ? 0 : 1), 2)} of 2
			</div>
		</div>
	</W.Card>

	{#if !player.available}
		<W.Card tone="warn">
			<W.Muted class="text-2xs text-caution">
				No recording is available on this machine — audio is generated locally and never
				committed (docs/AUDIO.md). Run the generator, then reload. The step is kept in the
				flow because removing it would put orthography first and break the method.
			</W.Muted>
		</W.Card>
	{/if}
</div>

{#if enough}
	<W.Button tone="primary" onclick={onDone}>I've listened twice →</W.Button>
{:else}
	<!-- #34: Play is the step's one event; skipping is possible but whispered. -->
	<button
		type="button"
		class="mx-auto cursor-pointer self-center bg-transparent p-1 text-xs text-text-faint underline decoration-dotted underline-offset-2 transition-colors duration-(--duration-quick) outline-none hover:text-text-soft focus-visible:ring-2 focus-visible:ring-brand"
		onclick={onDone}
	>
		Skip ahead →
	</button>
{/if}
