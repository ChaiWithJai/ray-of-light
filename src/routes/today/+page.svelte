<script lang="ts">
	/**
	 * 1c · Today. At most one new lesson and one recall lesson, chosen by the
	 * scheduler. There is deliberately no lesson picker here.
	 */
	import { goto } from '$app/navigation';
	import * as W from '$lib/components/wireframe/index.js';
	import { COURSES, getLesson, getLessonByIndex } from '$lib/content/index.js';
	import { flowFor, RECALL_FLOW } from '$lib/flow.js';
	import { planToday, toDayKey } from '$lib/schemas/schedule.js';
	import { profile } from '$lib/stores/profile.svelte.js';

	$effect(() => {
		if (profile.loaded && !profile.onboarded) goto('/onboarding/language', { replaceState: true });
	});

	const course = $derived(COURSES[profile.language]);
	const activeLesson = $derived(
		profile.activeSession ? getLesson(profile.language, profile.activeSession.lessonId) : undefined
	);

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

<W.Phone>
	<W.TitleBar left="☰" center={plan ? `Day ${plan.dayNumber}` : ''} right="⚙" />
	<W.Heading>Today</W.Heading>

	{#if !plan}
		<W.Muted>Loading your plan…</W.Muted>
		{:else if profile.activeSession && activeLesson}
			<W.SketchCard thick tone="parchment">
				<div class="flex items-center justify-between gap-2">
					<div class="font-semibold">Resume · {activeLesson.title}</div>
					<W.Pill active>{profile.activeSession.mode}</W.Pill>
				</div>
				<W.Muted>
					Your unfinished session is saved at {profile.activeSession.currentStep}.
				</W.Muted>
				<W.SketchButton
					tone="primary"
					class="mt-[4px]"
					onclick={() => profile.activeSessionHref && goto(profile.activeSessionHref)}
				>
					Resume lesson
				</W.SketchButton>
			</W.SketchCard>
		{:else if plan.courseComplete}
		<W.SketchCard tone="good">
			<div class="font-semibold text-good">Course complete</div>
			<W.Muted>
				You've worked through all {course.lessons.length} lessons. Progress now lives in what
				you can still retrieve — see Progress.
			</W.Muted>
			<W.SketchButton class="mt-[4px]" onclick={() => goto('/progress')}>
				See what stuck
			</W.SketchButton>
		</W.SketchCard>
	{:else}
		{#if newLesson}
			<W.SketchCard thick>
				<div class="flex items-center justify-between gap-2">
					<div class="font-semibold">Lesson {newLesson.index} · {newLesson.title}</div>
					<W.Pill>{newLesson.kind === 'synthesis' ? 'review' : 'new'}</W.Pill>
				</div>
				<W.Muted>
					{newLesson.kind === 'synthesis'
						? 'Nothing new — only reassembly'
						: 'Passive procedure'} · ~{Math.round(minutes * 0.6)} min
				</W.Muted>
				<W.SketchButton
					tone="primary"
					class="mt-[4px]"
						onclick={() => goto(profile.startSession('learn', newLesson.id, flowFor(newLesson.kind)))}
				>
					Start
				</W.SketchButton>
			</W.SketchCard>
		{/if}

		{#if recallLesson}
			<W.SketchCard>
				<div class="flex items-center justify-between gap-2">
					<div class="font-semibold">Lesson {recallLesson.index} · {recallLesson.title}</div>
					<W.Pill active>recall</W.Pill>
				</div>
				<W.Muted>
					Active wave: say it from the English · ~{Math.round(minutes * 0.4)} min
				</W.Muted>
				<W.SketchButton
					class="mt-[4px]"
						onclick={() => goto(profile.startSession('recall', recallLesson.id, RECALL_FLOW))}
				>
					Start recall
				</W.SketchButton>
			</W.SketchCard>
		{/if}

		<W.Muted class="text-center">Nothing else to choose. That's the point.</W.Muted>
	{/if}

	<W.TabBar />
</W.Phone>
