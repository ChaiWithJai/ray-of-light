<script lang="ts">
	/**
	 * 1c · Today. At most one new lesson and one recall lesson, chosen by the
	 * scheduler. There is deliberately no lesson picker here.
	 */
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import * as W from '$lib/components/wireframe/index.js';
	import { COURSES, getLesson, getLessonByIndex } from '$lib/content/index.js';
	import { flowFor, RECALL_FLOW } from '$lib/flow.js';
	import { planToday, POC_WAVE_CONFIG, toDayKey } from '$lib/schemas/schedule.js';
	import { profile } from '$lib/stores/profile.svelte.js';

	$effect(() => {
		if (profile.loaded && !profile.onboarded) goto('/onboarding/language', { replaceState: true });
	});

	let clock = $state(new Date());
	const course = $derived(COURSES[profile.language]);
	const day = $derived(toDayKey(clock));
	onMount(() => {
		const refreshClock = () => (clock = new Date());
		const timer = window.setInterval(refreshClock, 30_000);
		window.addEventListener('focus', refreshClock);
		document.addEventListener('visibilitychange', refreshClock);
		return () => {
			window.clearInterval(timer);
			window.removeEventListener('focus', refreshClock);
			document.removeEventListener('visibilitychange', refreshClock);
		};
	});
	const activeLesson = $derived(
		profile.activeSession ? getLesson(profile.language, profile.activeSession.lessonId) : undefined
	);

	const plan = $derived(
		profile.plan
			? planToday({
					language: profile.language,
					startedOn: profile.plan.startedOn,
					today: day,
					lessonCount: course.lessons.length,
					completedCount: profile.completedLessons.length
				})
			: null
	);

	const newLesson = $derived(
		plan?.newLessonIndex ? getLessonByIndex(profile.language, plan.newLessonIndex) : undefined
	);
	const recallLesson = $derived.by(() => {
		if (!plan) return undefined;
		const ceiling = plan.courseComplete
			? course.lessons.length
			: Math.max(0, (plan.newLessonIndex ?? 1) - POC_WAVE_CONFIG.activeWaveLagLessons);
		return course.lessons.find(
			(candidate) =>
				candidate.index <= ceiling &&
				profile.completedLessons.includes(candidate.id) &&
				!profile.completedRecallLessons.includes(candidate.id) &&
				candidate.exercises.some((exercise) => exercise.kind === 'recall')
		);
	});

	const minutes = $derived(profile.plan?.dailyMinutes ?? 25);
	const assignment = $derived(profile.dailyAssignment(day));
	const assignedNewLesson = $derived(
		assignment?.newLessonId ? getLesson(profile.language, assignment.newLessonId) : undefined
	);
	const assignedRecallLesson = $derived(
		assignment?.recallLessonId ? getLesson(profile.language, assignment.recallLessonId) : undefined
	);
	const newDone = $derived(assignment?.completedModes.includes('learn') ?? false);
	const recallDone = $derived(assignment?.completedModes.includes('recall') ?? false);
	const assignmentComplete = $derived(
		Boolean(assignment) &&
			(!assignment?.newLessonId || newDone) &&
			(!assignment?.recallLessonId || recallDone)
	);

	$effect(() => {
		if (!profile.loaded || !plan || assignment || profile.activeSession) return;
		profile.ensureDailyAssignment(day, newLesson?.id ?? null, recallLesson?.id ?? null);
	});
</script>

<svelte:head><title>Today</title></svelte:head>

<W.Phone>
	<W.TitleBar left="☰" center={plan ? `Day ${plan.dayNumber}` : ''} right="⚙" />
	<W.Heading>Today</W.Heading>

	{#if !plan || (!assignment && !profile.activeSession)}
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
				<W.SketchButton onclick={() => profile.abandonSession()}>
					Abandon session
				</W.SketchButton>
				<W.Muted>Your saved progress and evidence are kept. You can start this assignment again.</W.Muted>
			</W.SketchCard>
		{:else if plan.courseComplete && assignment && !assignment.newLessonId && !assignment.recallLessonId}
		<W.SketchCard tone="good">
			<div class="font-semibold text-good">Course complete</div>
			<W.Muted>You've worked through and recalled every authored lesson in this course.</W.Muted>
			<W.SketchButton class="mt-[4px]" onclick={() => goto('/progress')}>See what stuck</W.SketchButton>
		</W.SketchCard>
		{:else if assignmentComplete}
			<W.SketchCard tone="good">
				<div class="font-semibold text-good">Today's session complete</div>
				<W.Muted>Your next two-wave assignment will be prepared tomorrow.</W.Muted>
			</W.SketchCard>
		{:else if plan.courseComplete && !assignedRecallLesson}
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
		{#if assignedNewLesson && !newDone}
			<W.SketchCard thick>
				<div class="flex items-center justify-between gap-2">
					<div class="font-semibold">Lesson {assignedNewLesson.index} · {assignedNewLesson.title}</div>
					<W.Pill>{assignedNewLesson.kind === 'synthesis' ? 'review' : 'new'}</W.Pill>
				</div>
				<W.Muted>
					{assignedNewLesson.kind === 'synthesis'
						? 'Nothing new — only reassembly'
						: 'Passive procedure'} · ~{Math.round(minutes * 0.6)} min
				</W.Muted>
				<W.SketchButton
					tone="primary"
					class="mt-[4px]"
						onclick={() => goto(profile.startSession('learn', assignedNewLesson.id, flowFor(assignedNewLesson.kind), day))}
				>
					Start
				</W.SketchButton>
			</W.SketchCard>
		{/if}

		{#if assignedRecallLesson && !recallDone}
			<W.SketchCard>
				<div class="flex items-center justify-between gap-2">
					<div class="font-semibold">Lesson {assignedRecallLesson.index} · {assignedRecallLesson.title}</div>
					<W.Pill active>recall</W.Pill>
				</div>
				<W.Muted>
					Active wave: say it from the English · ~{Math.round(minutes * 0.4)} min
				</W.Muted>
				<W.SketchButton
					class="mt-[4px]"
						onclick={() => goto(profile.startSession('recall', assignedRecallLesson.id, RECALL_FLOW, day))}
				>
					Start recall
				</W.SketchButton>
			</W.SketchCard>
		{/if}

		<W.Muted class="text-center">Nothing else to choose. That's the point.</W.Muted>
	{/if}

	<W.TabBar />
</W.Phone>
