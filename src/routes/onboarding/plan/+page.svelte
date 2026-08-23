<script lang="ts">
	/** 1b · Learning plan. The commitment sets scheduler pacing; it is not cosmetic. */
	import { goto } from '$app/navigation';
	import * as W from '$lib/components/wireframe/index.js';
	import { COURSES } from '$lib/content/index.js';
	import type { DailyMinutes, LearningGoal } from '$lib/schemas/learner.js';
	import { POC_WAVE_CONFIG, toDayKey } from '$lib/schemas/schedule.js';
	import { profile } from '$lib/stores/profile.svelte.js';

	const MINUTES: DailyMinutes[] = [15, 25, 40];
	const GOALS: { id: LearningGoal; label: string }[] = [
		{ id: 'travel', label: 'Travel' },
		{ id: 'family', label: 'Family' },
		{ id: 'work', label: 'Work' },
		{ id: 'reading', label: 'Reading' }
	];

	let minutes = $state<DailyMinutes>(25);
	let goal = $state<LearningGoal>('travel');

	const total = $derived(COURSES[profile.language].lessons.length);
	const activeWaveAt = $derived(POC_WAVE_CONFIG.activeWaveStartsAtLesson);
	const passivePercent = $derived(Math.round(((activeWaveAt - 1) / total) * 100));

	function commit() {
		profile.setPlan({
			dailyMinutes: minutes,
			goal,
			startedOn: toDayKey(new Date()),
			entryLessonIndex: 1
		});
		goto('/today');
	}
</script>

<svelte:head><title>Learning plan</title></svelte:head>

<W.Phone>
	<W.TitleBar left="◁" center="Getting started · 3/3" />
	<W.Heading>How much, daily?</W.Heading>

	<div class="flex items-center gap-2">
		{#each MINUTES as m (m)}
			<W.Chip active={minutes === m} onclick={() => (minutes = m)}>{m} min</W.Chip>
		{/each}
	</div>

	<W.SketchCard>
		<div class="text-[13px] font-semibold">Your projected path</div>
		<div class="mt-[4px] flex items-center gap-2">
			<div class="flex-1">
				<W.Rail value={100} label="Passive wave" />
				<W.Muted class="mt-[3px]">L1–{activeWaveAt - 1} passive wave</W.Muted>
			</div>
			<div class="flex-1">
				<W.Rail value={0} label="Active wave" />
				<W.Muted class="mt-[3px]">L{activeWaveAt}+ active wave</W.Muted>
			</div>
		</div>
		<W.Muted class="mt-[6px]">
			From lesson {activeWaveAt} you'll start producing earlier lessons from English — from
			memory. That's {passivePercent}% of the way in.
		</W.Muted>
	</W.SketchCard>

	<W.SketchCard>
		<div class="text-[13px] font-semibold">Goal</div>
		<div class="flex flex-wrap items-center gap-2">
			{#each GOALS as g (g.id)}
				<W.Chip active={goal === g.id} onclick={() => (goal = g.id)}>{g.label}</W.Chip>
			{/each}
		</div>
	</W.SketchCard>

	<W.Muted>Every 7th lesson is a review day — that's built in, not extra.</W.Muted>

	<W.SketchButton tone="primary" onclick={commit}>Set my plan</W.SketchButton>
	<W.Muted class="text-center text-[11px]">
		Commitment sets pacing. No streaks, no confetti.
	</W.Muted>
</W.Phone>
