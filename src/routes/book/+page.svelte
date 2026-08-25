<script lang="ts">
	/**
	 * Book · browse the canonical course. Reviewing a finished lesson is allowed;
	 * jumping ahead is not — the whole scheduling model depends on the order.
	 */
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import * as W from '$lib/components/ui/index.js';
	import { COURSES, audioPending } from '$lib/content/index.js';
	import { flowFor } from '$lib/flow.js';
	import { toDayKey } from '$lib/schemas/schedule.js';
	import { profile } from '$lib/stores/profile.svelte.js';

	const course = $derived(COURSES[profile.language]);
	const activeLessonId = $derived(profile.activeSession?.lessonId);
	let clock = $state(new Date());
	const today = $derived(toDayKey(clock));
	const assignedNewLessonId = $derived(profile.dailyAssignment(today)?.newLessonId);
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

	function start(lessonId: string, kind: 'regular' | 'synthesis') {
		if (profile.hasCompleted(lessonId)) {
			goto(profile.startSession('learn', lessonId, flowFor(kind)));
			return;
		}
		const clickDay = toDayKey(new Date());
		const assignment = profile.dailyAssignment(clickDay);
		if (assignment?.newLessonId !== lessonId || assignment.completedModes.includes('learn')) {
			goto('/today');
			return;
		}
		goto(profile.startSession('learn', lessonId, flowFor(kind), clickDay));
	}
</script>

<svelte:head><title>Book</title></svelte:head>

<W.Shell brand title="Book" nav settingsLink>
	<div class="anim-rise flex items-baseline justify-between gap-2 pt-2">
		<W.Heading>The book</W.Heading>
	</div>
	<W.Muted>
		{course.lessons.length} lessons · {course.constructions.size} constructions
	</W.Muted>
	<W.Muted class="text-2xs">
		Reviews stay separate from Today. Starting Today's assigned new lesson from here still
		counts toward today's session.
	</W.Muted>

	{#if audioPending(profile.language)}
		<W.Card tone="warn">
			<W.Muted class="text-2xs text-caution">
				No native recordings exist yet, so audio is inert throughout. Text, notes and
				exercises all work. See docs/ISSUE-1-LIMITATIONS.md L1.
			</W.Muted>
		</W.Card>
	{/if}

	<div class="flex flex-col gap-2">
		{#each course.lessons as lesson (lesson.id)}
			{@const done = profile.hasCompleted(lesson.id)}
			{@const open = done || lesson.id === assignedNewLessonId}
			<!-- #47 W3: a construction's wiki entry links to the lesson that teaches
			     it, so every lesson card carries a stable anchor to land on. -->
			<W.Card
				id="lesson-{lesson.id}"
				tone={lesson.kind === 'synthesis' ? 'parchment' : 'default'}
				class="scroll-mt-20 p-3 {open ? '' : 'opacity-45'}"
			>
				<div class="flex items-center justify-between gap-2">
					<div class="text-sm">
						{lesson.index}. {lesson.title}
					</div>
					{#if lesson.kind === 'synthesis'}
						<W.Pill>review</W.Pill>
					{:else if done}
						<W.Pill active>done</W.Pill>
					{/if}
				</div>
				<W.Muted class="text-2xs">{lesson.situation}</W.Muted>
				{#if open}
					{#if profile.activeSession}
						{#if activeLessonId === lesson.id}
							<W.Button
								class="mt-1.5 text-sm"
								onclick={() => profile.activeSessionHref && goto(profile.activeSessionHref)}
							>
								Resume current session
							</W.Button>
						{:else}
							<W.Muted class="text-2xs">Another session is in progress.</W.Muted>
						{/if}
					{:else}
						<W.Button class="mt-1.5 text-sm" onclick={() => start(lesson.id, lesson.kind)}>
							{done ? 'Review' : 'Start'}
						</W.Button>
					{/if}
				{:else}
					<W.Muted class="text-2xs">
						Opens when Today assigns this lesson.
					</W.Muted>
				{/if}
			</W.Card>
		{/each}
	</div>

</W.Shell>
