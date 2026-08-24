<script lang="ts">
	/** 1b · Learning plan. The commitment sets scheduler pacing; it is not cosmetic. */
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import * as W from '$lib/components/ui/index.js';
	import { COURSES, getLessonByIndex } from '$lib/content/index.js';
	import type { DailyMinutes, LearningGoal } from '$lib/schemas/learner.js';
	import { POC_WAVE_CONFIG, toDayKey } from '$lib/schemas/schedule.js';
	import { profile } from '$lib/stores/profile.svelte.js';

	const MINUTES: DailyMinutes[] = [15, 25, 40];
	const GOALS: { id: LearningGoal; label: string; guidance: string }[] = [
		{
			id: 'travel',
			label: 'Travel',
			guidance:
				'Treat each dialogue as a rehearsal for the real moment: ordering, asking the way, booking a room.'
		},
		{
			id: 'family',
			label: 'Family',
			guidance:
				'Say your lines aloud as if to a relative; real conversation is your finish line, so speaking practice matters most.'
		},
		{
			id: 'work',
			label: 'Work',
			guidance:
				'Give extra attention to the polite, formal turns in each dialogue; those registers carry professional conversation.'
		},
		{
			id: 'reading',
			label: 'Reading',
			guidance:
				'Linger on the parallel text: reading both languages side by side is the skill you are building.'
		}
	];

	let minutes = $state<DailyMinutes>(25);
	let goal = $state<LearningGoal>('travel');

	const total = $derived(COURSES[profile.language].lessons.length);
	const activeWaveAt = $derived(POC_WAVE_CONFIG.activeWaveStartsAtLesson);
	const passivePercent = $derived(Math.round(((activeWaveAt - 1) / total) * 100));

	// Placement from the entry assessment. It only moves where the passive wave
	// starts — the skipped lessons stay unworked and grant no evidence.
	const entryLessonIndex = $derived.by(() => {
		const raw = Number(page.url.searchParams.get('entry'));
		return Number.isInteger(raw) ? Math.min(Math.max(1, raw), total) : 1;
	});
	const entryLesson = $derived(getLessonByIndex(profile.language, entryLessonIndex));

	function commit() {
		profile.setPlan({
			dailyMinutes: minutes,
			goal,
			startedOn: toDayKey(new Date()),
			entryLessonIndex
		});
		goto('/today');
	}
</script>

<svelte:head><title>Learning plan</title></svelte:head>

<W.Shell title="Getting started · 3/3" back="/onboarding/assessment">
	<div class="anim-rise pt-2">
		<W.Heading>How much, daily?</W.Heading>
	</div>

	<div class="flex items-center gap-2">
		{#each MINUTES as m (m)}
			<W.Chip active={minutes === m} onclick={() => (minutes = m)}>{m} min</W.Chip>
		{/each}
	</div>

	<!-- #42: the commitment answers back — the session shape rebuilds from the
	     minutes the moment they change. #46 S1: and it answers back as a shape —
	     the candle's height and notches are the chosen minutes, live. -->
	{#key minutes}
		<div class="anim-uncover flex items-center gap-3">
			<W.DurationSprite {minutes} size={46} />
			<W.Muted class="text-xs">
				A {minutes}-minute day splits into about {Math.round(minutes * 0.6)} minutes with the new
				lesson and {Math.round(minutes * 0.4)} minutes of recall once the second wave opens.
			</W.Muted>
		</div>
	{/key}

	<W.JourneyArc
		language={profile.language}
		current={entryLessonIndex}
		caption={entryLessonIndex > 1
			? `Your assessment placed the ring at lesson ${entryLessonIndex}; the plan you set here walks the rest of the path.`
			: 'Your plan walks this whole path, one lesson a day.'}
	/>

	<W.Card>
		<div class="text-sm font-semibold">Your projected path</div>
		<div class="mt-1.5 flex items-center gap-2">
			<div class="flex-1">
				<W.Rail value={100} label="Absorbing" />
				<W.Muted class="mt-1">L1–{activeWaveAt - 1} · listen and read</W.Muted>
			</div>
			<div class="flex-1">
				<W.Rail value={0} label="Producing" />
				<W.Muted class="mt-1">L{activeWaveAt}+ · recall from memory</W.Muted>
			</div>
		</div>
		<W.Muted class="mt-2">
			For the first {activeWaveAt - 1} lessons you absorb: listening and reading. From lesson
			{activeWaveAt}, about {passivePercent}% of the way in, earlier lessons start coming back
			for you to say from memory.
		</W.Muted>
	</W.Card>

	<W.Card>
		<div class="text-sm font-semibold">What are you learning for?</div>
		<div class="flex flex-wrap items-center gap-2">
			{#each GOALS as g (g.id)}
				<W.Chip active={goal === g.id} onclick={() => (goal = g.id)}>{g.label}</W.Chip>
			{/each}
		</div>
		{#each GOALS as g (g.id)}
			{#if goal === g.id}
				<W.Muted class="text-xs">{g.guidance}</W.Muted>
			{/if}
		{/each}
	</W.Card>

	{#if entryLessonIndex > 1 && entryLesson}
		<W.Card tone="parchment">
			<div class="text-sm font-semibold">Your starting point</div>
			<W.Muted>
				The assessment places you at lesson {entryLessonIndex} · {entryLesson.title}. Your
				plan begins there, and your progress record starts from what you show along the way.
			</W.Muted>
		</W.Card>
	{/if}

	<W.Muted>Every 7th lesson is a review day, already built into the plan.</W.Muted>

	<!-- #42: the plan the learner is shaping, assembled live from every choice
	     above, so each tap visibly becomes part of the commitment. -->
	<W.Card tone="parchment" thick class="gap-1 p-4">
		<div class="text-2xs font-bold tracking-[0.14em] text-brand uppercase">Your plan</div>
		{#key `${minutes}-${goal}`}
			<div class="anim-uncover font-display text-lg leading-tight font-semibold">
				{minutes} minutes a day, for {GOALS.find((g) => g.id === goal)?.label.toLowerCase()}
			</div>
		{/key}
		<W.Muted class="text-xs">
			{total} lessons, one real situation each, starting at lesson {entryLessonIndex}. Recall
			joins from lesson {activeWaveAt}.
		</W.Muted>
	</W.Card>

	<W.Button tone="primary" class="py-3.5 text-lg" onclick={commit}>Set my plan</W.Button>
</W.Shell>
