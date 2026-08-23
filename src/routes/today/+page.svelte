<script lang="ts">
	/**
	 * 1c · Today. At most one new lesson and one recall lesson, chosen by the
	 * scheduler. There is deliberately no lesson picker here.
	 */
	import { goto } from '$app/navigation';
	import * as W from '$lib/components/ui/index.js';
	import { COURSES, getLessonByIndex } from '$lib/content/index.js';
	import { flowFor } from '$lib/flow.js';
	import { planToday, toDayKey } from '$lib/schemas/schedule.js';
	import { profile } from '$lib/stores/profile.svelte.js';

	$effect(() => {
		if (profile.loaded && !profile.onboarded) goto('/onboarding/language', { replaceState: true });
	});

	const course = $derived(COURSES[profile.language]);

	const plan = $derived(
		profile.plan
			? planToday({
					language: profile.language,
					startedOn: profile.plan.startedOn,
					today: toDayKey(new Date()),
					lessonCount: course.lessons.length,
					completedCount: profile.completedLessons.length
				})
			: null
	);

	const newLesson = $derived(
		plan?.newLessonIndex ? getLessonByIndex(profile.language, plan.newLessonIndex) : undefined
	);
	const recallLesson = $derived(
		plan?.recallLessonIndex
			? getLessonByIndex(profile.language, plan.recallLessonIndex)
			: undefined
	);

	const minutes = $derived(profile.plan?.dailyMinutes ?? 25);
</script>

<svelte:head><title>Today</title></svelte:head>

<W.Shell brand title={plan ? `Day ${plan.dayNumber}` : ''} settingsLink nav>
	{#snippet aside()}
		<div class="flex flex-col gap-3 border-l border-line pl-6">
			<div class="text-2xs font-bold tracking-[0.14em] text-text-faint uppercase">
				Your plan
			</div>
			{#if profile.plan}
				<W.Muted>
					{profile.plan.dailyMinutes} minutes a day · goal: {profile.plan.goal}
				</W.Muted>
				<W.Muted>
					{profile.completedLessons.length} of {course.lessons.length} lessons behind you.
					Every 7th is a review day — built in, not extra.
				</W.Muted>
			{/if}
			<p class="m-0 font-script text-lg leading-snug text-caution">
				→ the scheduler chooses; you just sit down.
			</p>
		</div>
	{/snippet}

	<div class="anim-rise flex items-baseline justify-between gap-2 pt-2">
		<W.Heading>Today</W.Heading>
		{#if plan}
			<span class="font-script text-xl text-text-soft">day {plan.dayNumber}</span>
		{/if}
	</div>

	{#if !plan}
		<W.Muted>Loading your plan…</W.Muted>
	{:else if plan.courseComplete}
		<W.Card tone="good" class="anim-rise anim-d1 p-5">
			<div class="font-display text-xl font-semibold text-insight">Course complete</div>
			<W.Muted>
				You've worked through all {course.lessons.length} lessons. Progress now lives in what
				you can still retrieve — see Progress.
			</W.Muted>
			<W.Button class="mt-1.5" onclick={() => goto('/progress')}>
				See what stuck
			</W.Button>
		</W.Card>
	{:else}
		{#if newLesson}
			<W.Card thick class="anim-rise anim-d1 gap-3 p-5">
				<div>
					<div class="flex items-baseline justify-between gap-2">
						<div class="text-2xs font-bold tracking-[0.14em] text-brand uppercase">
							Lesson {newLesson.index} · {newLesson.kind === 'synthesis' ? 'review' : 'new'}
						</div>
						<span class="text-xs text-text-faint">~{Math.round(minutes * 0.6)} min</span>
					</div>
					<div class="font-display text-xl leading-tight font-semibold">
						{newLesson.title}
					</div>
				</div>
				<W.Muted>
					{newLesson.kind === 'synthesis'
						? 'Nothing new — only reassembly'
						: 'Passive procedure: listen, read, retrieve'}
				</W.Muted>
				<W.Button
					tone="primary"
					class="mt-1.5"
					onclick={() => goto(`/learn/${newLesson.id}/${flowFor(newLesson.kind)[0]}`)}
				>
					Start
				</W.Button>
			</W.Card>
		{/if}

		{#if recallLesson}
			<W.Card class="anim-rise anim-d2 gap-3 p-5">
				<div>
					<div class="flex items-baseline justify-between gap-2">
						<div class="text-2xs font-bold tracking-[0.14em] text-text-faint uppercase">
							Lesson {recallLesson.index} · recall
						</div>
						<span class="text-xs text-text-faint">~{Math.round(minutes * 0.4)} min</span>
					</div>
					<div class="font-display text-xl leading-tight font-semibold">
						{recallLesson.title}
					</div>
				</div>
				<W.Muted>Active wave: say it from the English — from memory.</W.Muted>
				<W.Button
					class="mt-1.5"
					onclick={() => goto(`/recall/${recallLesson.id}/recall`)}
				>
					Start recall
				</W.Button>
			</W.Card>
		{/if}

		<W.Muted class="anim-rise anim-d3 pt-2 text-center">
			Nothing else to choose. That's the point.
		</W.Muted>
	{/if}
</W.Shell>
