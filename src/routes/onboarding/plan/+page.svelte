<script lang="ts">
	/** 1b · Learning plan. The commitment sets scheduler pacing; it is not cosmetic. */
	import { goto } from '$app/navigation';
	import * as W from '$lib/components/ui/index.js';
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

<W.Shell title="Getting started · 3/3" back="/onboarding/assessment">
	{#snippet aside()}
		<div class="flex flex-col gap-3 border-l border-line pl-6">
			<div class="text-2xs font-bold tracking-[0.14em] text-text-faint uppercase">
				Two waves
			</div>
			<W.Muted>
				First you absorb (the passive wave). Later, earlier lessons come back to be produced
				from memory (the active wave). The commitment sets that pacing — it is not cosmetic.
			</W.Muted>
			<p class="m-0 font-script text-lg leading-snug text-caution">
				→ no streaks, no confetti. Just the schedule.
			</p>
		</div>
	{/snippet}

	<div class="anim-rise pt-2">
		<W.Heading>How much, daily?</W.Heading>
	</div>

	<div class="flex items-center gap-2">
		{#each MINUTES as m (m)}
			<W.Chip active={minutes === m} onclick={() => (minutes = m)}>{m} min</W.Chip>
		{/each}
	</div>

	<W.Card>
		<div class="text-sm font-semibold">Your projected path</div>
		<div class="mt-1.5 flex items-center gap-2">
			<div class="flex-1">
				<W.Rail value={100} label="Passive wave" />
				<W.Muted class="mt-1">L1–{activeWaveAt - 1} passive wave</W.Muted>
			</div>
			<div class="flex-1">
				<W.Rail value={0} label="Active wave" />
				<W.Muted class="mt-1">L{activeWaveAt}+ active wave</W.Muted>
			</div>
		</div>
		<W.Muted class="mt-2">
			From lesson {activeWaveAt} you'll start producing earlier lessons from English — from
			memory. That's {passivePercent}% of the way in.
		</W.Muted>
	</W.Card>

	<W.Card>
		<div class="text-sm font-semibold">Goal</div>
		<div class="flex flex-wrap items-center gap-2">
			{#each GOALS as g (g.id)}
				<W.Chip active={goal === g.id} onclick={() => (goal = g.id)}>{g.label}</W.Chip>
			{/each}
		</div>
	</W.Card>

	<W.Muted>Every 7th lesson is a review day — that's built in, not extra.</W.Muted>

	<W.Button tone="primary" onclick={commit}>Set my plan</W.Button>
	<W.Muted class="text-center text-2xs">
		Commitment sets pacing. No streaks, no confetti.
	</W.Muted>
</W.Shell>
