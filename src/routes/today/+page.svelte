<script lang="ts">
	/**
	 * 1c · Today. At most one new lesson and one recall lesson, chosen by the
	 * scheduler. There is deliberately no lesson picker here.
	 */
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import * as W from '$lib/components/ui/index.js';
	import { COURSES, getConstruction, getLesson, getLessonByIndex } from '$lib/content/index.js';
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
					completedCount: profile.completedLessons.length,
					entryLessonIndex: profile.plan.entryLessonIndex,
					assignmentDays: Object.keys(profile.current.dailyAssignments[profile.language] ?? {})
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

	// Missed constructions due for another retrieval — derived from evidence,
	// never a persisted deck. At most one lesson is offered at a time.
	const dueResurface = $derived(profile.loaded ? profile.dueResurfaceItems(day) : []);
	const resurfaceLesson = $derived(
		dueResurface.length > 0 ? getLesson(profile.language, dueResurface[0].lessonId) : undefined
	);
	const resurfaceCount = $derived(
		resurfaceLesson
			? dueResurface.filter((item) => item.lessonId === resurfaceLesson.id).length
			: 0
	);
	// Name what is actually due: the first due construction's label and gloss,
	// not just "a line you stumbled on".
	const resurfaceConstruction = $derived(
		dueResurface.length > 0
			? getConstruction(profile.language, dueResurface[0].constructionId)
			: undefined
	);

	// The journey arc renders only what the schedule and evidence agree on.
	const completedIndexes = $derived(
		profile.completedLessons
			.map((id) => getLesson(profile.language, id)?.index)
			.filter((index): index is number => typeof index === 'number')
	);
	const arcCurrent = $derived(
		assignedNewLesson && !newDone ? assignedNewLesson.index : (plan?.newLessonIndex ?? null)
	);
</script>

<svelte:head><title>Today</title></svelte:head>

<W.Shell brand title={plan ? `Day ${plan.dayNumber}` : ''} settingsLink nav>
	<div class="anim-rise flex items-baseline justify-between gap-2 pt-2">
		<W.Heading>Today</W.Heading>
		{#if plan}
			<span class="font-script text-xl text-text-soft">day {plan.dayNumber}</span>
		{/if}
	</div>

	{#if plan}
		<W.JourneyArc
			language={profile.language}
			current={arcCurrent}
			{completedIndexes}
			class="anim-rise anim-d1"
			caption={assignmentComplete
				? `Today's work is done: ${completedIndexes.length} of ${course.lessons.length} lessons worked through. The path continues tomorrow.`
				: ''}
		/>
	{/if}

	{#if !plan || (!assignment && !profile.activeSession)}
		<W.Muted>Loading your plan…</W.Muted>
	{:else if profile.activeSession && activeLesson}
		<W.Card thick tone="parchment" class="anim-rise anim-d1 gap-3 p-5">
			<div class="flex items-center justify-between gap-2">
				<div class="font-display text-xl leading-tight font-semibold">
					Resume · {activeLesson.title}
				</div>
				<W.Pill active>{profile.activeSession.mode}</W.Pill>
			</div>
			<W.Muted>
				You left off at the {profile.activeSession.currentStep} step. Everything you did is
				saved, so you can pick up right where you stopped.
			</W.Muted>
			<W.Button
				tone="primary"
				class="mt-1.5"
				onclick={() => profile.activeSessionHref && goto(profile.activeSessionHref)}
			>
				Resume lesson
			</W.Button>
			<W.Button onclick={() => profile.abandonSession()}>Abandon session</W.Button>
			<W.Muted>
				Your saved progress and evidence are kept. You can start this assignment again.
			</W.Muted>
		</W.Card>
	{:else if plan.courseComplete && assignment && !assignment.newLessonId && !assignment.recallLessonId}
		<W.Card tone="good" class="anim-rise anim-d1 p-5">
			<div class="font-display text-xl font-semibold text-insight">Course complete</div>
			<W.Muted>You've worked through and recalled every authored lesson in this course.</W.Muted>
			<W.Button class="mt-1.5" onclick={() => goto('/progress')}>See what stuck</W.Button>
		</W.Card>
	{:else if assignmentComplete}
		<W.Card tone="good" class="anim-rise anim-d1 p-5">
			<div class="font-display text-xl font-semibold text-insight">Today's session complete</div>
			<W.Muted>
				Tomorrow brings the next lesson, plus an earlier one to say from memory.
			</W.Muted>
		</W.Card>
	{:else if plan.courseComplete && !assignedRecallLesson}
		<W.Card tone="good" class="anim-rise anim-d1 p-5">
			<div class="font-display text-xl font-semibold text-insight">Course complete</div>
			<W.Muted>
				You've worked through all {course.lessons.length} lessons. From here, growth lives in
				what you can still retrieve; the Progress page shows it.
			</W.Muted>
			<W.Button class="mt-1.5" onclick={() => goto('/progress')}>
				See what stuck
			</W.Button>
		</W.Card>
	{:else}
		{#if assignedNewLesson && !newDone}
			<W.Card thick class="anim-rise anim-d1 gap-3 p-5">
				<div>
					<div class="flex items-baseline justify-between gap-2">
						<div class="text-2xs font-bold tracking-[0.14em] text-brand uppercase">
							Lesson {assignedNewLesson.index} · {assignedNewLesson.kind === 'synthesis'
								? 'review'
								: 'new'}
						</div>
						<span class="text-xs text-text-faint">~{Math.round(minutes * 0.6)} min</span>
					</div>
					<div class="font-display text-xl leading-tight font-semibold">
						{assignedNewLesson.title}
					</div>
				</div>
				<W.Muted>
					{assignedNewLesson.kind === 'synthesis'
						? 'A review session: you already know every piece; today you reassemble them.'
						: 'A guided session: listen to the dialogue, read both languages side by side, then try a few lines yourself.'}
				</W.Muted>
				<W.Button
					tone="primary"
					class="mt-1.5"
					onclick={() =>
						goto(
							profile.startSession(
								'learn',
								assignedNewLesson.id,
								flowFor(assignedNewLesson.kind),
								day
							)
						)}
				>
					Start
				</W.Button>
			</W.Card>
		{/if}

		{#if assignedRecallLesson && !recallDone}
			<W.Card class="anim-rise anim-d2 gap-3 p-5">
				<div>
					<div class="flex items-baseline justify-between gap-2">
						<div class="text-2xs font-bold tracking-[0.14em] text-text-faint uppercase">
							Lesson {assignedRecallLesson.index} · recall
						</div>
						<span class="text-xs text-text-faint">~{Math.round(minutes * 0.4)} min</span>
					</div>
					<div class="font-display text-xl leading-tight font-semibold">
						{assignedRecallLesson.title}
					</div>
				</div>
				<W.Muted>
					You worked through this lesson a few days ago. Today, say its lines in
					{profile.language === 'ta' ? 'Tamil' : 'French'} from the English, from memory.
				</W.Muted>
				<W.Button
					class="mt-1.5"
					onclick={() =>
						goto(profile.startSession('recall', assignedRecallLesson.id, RECALL_FLOW, day))}
				>
					Start recall
				</W.Button>
			</W.Card>
		{/if}

	{/if}

	{#if plan && !profile.activeSession && resurfaceLesson}
		<W.Card class="anim-rise anim-d3 gap-3 p-5">
			<div>
				<div class="flex items-baseline justify-between gap-2">
					<div class="text-2xs font-bold tracking-[0.14em] text-text-faint uppercase">
						Worth another look
					</div>
					<span class="text-xs text-text-faint">~5 min</span>
				</div>
				<div class="font-display text-xl leading-tight font-semibold">
					{resurfaceLesson.title}
				</div>
			</div>
			{#if resurfaceConstruction}
				<div class="flex flex-wrap items-baseline gap-2">
					<W.Chip active>{resurfaceConstruction.label}</W.Chip>
					<W.Muted class="text-2xs">{resurfaceConstruction.gloss}</W.Muted>
				</div>
			{/if}
			<W.Muted>
				{resurfaceCount === 1 ? 'A line' : `${resurfaceCount} lines`} you stumbled on {resurfaceCount ===
				1
					? 'is'
					: 'are'} ready for another try. Say it from memory; a rough attempt still counts.
			</W.Muted>
			<W.Button
				class="mt-1.5"
				onclick={() => goto(profile.startResurfaceSession(resurfaceLesson.id))}
			>
				Retrieve it again
			</W.Button>
		</W.Card>
	{/if}
</W.Shell>
