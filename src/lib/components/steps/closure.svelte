<script lang="ts">
	/**
	 * 1q · Lesson closure. Calibration, not celebration — no confetti anywhere.
	 * The ratings tune when lines resurface, which is what makes honest
	 * self-rating instrumentally rational for the learner.
	 */
	import * as W from '$lib/components/ui/index.js';
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

<!-- The quiet completion moment: dusk, not confetti. The session settles into
     place, acknowledges the work, and asks for one honest calibration. -->
<div
	class="anim-settle flex flex-col items-center gap-1.5 rounded-2xl bg-linear-to-b from-dusk-a to-dusk-b px-6 py-10 text-center shadow-stage"
>
	<div class="text-2xs font-bold tracking-[0.2em] text-stage-muted uppercase">
		The session is done
	</div>
	<div class="font-display text-2xl font-semibold text-stage-text">{lesson.title}</div>
	<div class="mt-1 font-script text-lg text-stage-muted">
		that's the day's work; the rest happens while you sleep
	</div>
</div>

<W.Heading class="anim-rise anim-d1 pt-2 text-xl">Before you go</W.Heading>

<W.Card class="anim-rise anim-d2">
	<div class="text-sm font-bold">I understood the dialogue</div>
	<W.Slider bind:value={understood} label="How well you understood the dialogue" />
</W.Card>

<W.Card class="anim-rise anim-d2">
	<div class="text-sm font-bold">I could say the key lines myself</div>
	<W.Slider bind:value={couldProduce} label="How well you could produce the key lines" />
</W.Card>

<W.Card class="anim-rise anim-d3">
	<div class="text-sm font-bold">Effort today felt…</div>
	<div class="flex items-center gap-2">
		{#each EFFORTS as option (option)}
			<W.Chip active={effort === option} onclick={() => (effort = option)}>
				{option.replace('-', ' ')}
			</W.Chip>
		{/each}
	</div>
</W.Card>

<W.Muted class="anim-rise anim-d3">
	Rate what actually happened: your honest answers decide when these lines come back for
	review, at the moment that helps you most.
</W.Muted>

<W.Button tone="primary" class="anim-rise anim-d4 mt-auto" onclick={finish}>
	Done for today
</W.Button>
