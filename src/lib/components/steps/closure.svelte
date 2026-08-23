<script lang="ts">
	/**
	 * 1q · Lesson closure. Calibration, not celebration — no confetti anywhere.
	 * The ratings tune when lines resurface, which is what makes honest
	 * self-rating instrumentally rational for the learner.
	 */
	import * as W from '$lib/components/wireframe/index.js';
	import type { SessionMode, StepId } from '$lib/flow.js';
	import type { Lesson } from '$lib/schemas/content.js';
	import { profile } from '$lib/stores/profile.svelte.js';

	let {
		lesson,
		mode,
		flow,
		onDone
	}: { lesson: Lesson; mode: SessionMode; flow: readonly StepId[]; onDone: () => void } = $props();

	let understood = $state(80);
	let couldProduce = $state(45);
	let effort = $state<'easy' | 'just-right' | 'too-hard'>('just-right');

	const EFFORTS = ['easy', 'just-right', 'too-hard'] as const;

	function finish() {
		const finished = profile.finishSession(mode, lesson.id, flow, {
			lessonId: lesson.id,
			understood,
			couldProduce,
			effort,
			at: Date.now()
		});
		if (finished) onDone();
	}
</script>

<W.Heading>Before you go —</W.Heading>

<W.SketchCard>
	<div class="text-[13.5px]">I understood the dialogue</div>
	<W.SketchSlider bind:value={understood} label="How well you understood the dialogue" />
</W.SketchCard>

<W.SketchCard>
	<div class="text-[13.5px]">I could say the key lines myself</div>
	<W.SketchSlider bind:value={couldProduce} label="How well you could produce the key lines" />
</W.SketchCard>

<W.SketchCard>
	<div class="text-[13.5px]">Effort today felt…</div>
	<div class="flex items-center gap-2">
		{#each EFFORTS as option (option)}
			<W.Chip active={effort === option} onclick={() => (effort = option)}>
				{option.replace('-', ' ')}
			</W.Chip>
		{/each}
	</div>
</W.SketchCard>

<W.Muted>Your ratings tune when lines resurface — be honest, not kind.</W.Muted>

<W.SketchButton tone="primary" class="mt-auto" onclick={finish}>Done for today</W.SketchButton>
