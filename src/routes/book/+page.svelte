<script lang="ts">
	/**
	 * Book · browse the canonical course. Reviewing a finished lesson is allowed;
	 * jumping ahead is not — the whole scheduling model depends on the order.
	 */
	import { goto } from '$app/navigation';
	import * as W from '$lib/components/wireframe/index.js';
	import { COURSES, audioPending } from '$lib/content/index.js';
	import { flowFor } from '$lib/flow.js';
	import { toDayKey } from '$lib/schemas/schedule.js';
	import { profile } from '$lib/stores/profile.svelte.js';

	const course = $derived(COURSES[profile.language]);
	const activeLessonId = $derived(profile.activeSession?.lessonId);
	const today = $derived(toDayKey(new Date()));
	const assignedNewLessonId = $derived(profile.dailyAssignment(today)?.newLessonId);

	function start(lessonId: string, kind: 'regular' | 'synthesis') {
		const dayKey = toDayKey(new Date());
		const assignment = profile.dailyAssignment(dayKey);
		const assignmentDay =
			assignment?.newLessonId === lessonId && !assignment.completedModes.includes('learn')
				? dayKey
				: undefined;
		goto(profile.startSession('learn', lessonId, flowFor(kind), assignmentDay));
	}
</script>

<svelte:head><title>Book</title></svelte:head>

<W.Phone>
	<W.TitleBar left="☰" center="Book" />
	<W.Muted>
		{course.lessons.length} lessons · {course.constructions.size} constructions
	</W.Muted>
	<W.Muted class="text-[11px]">
		Reviews stay separate from Today. Starting Today's assigned new lesson here still counts
		toward that frozen assignment.
	</W.Muted>

	{#if audioPending(profile.language)}
		<W.SketchCard tone="warn">
			<W.Muted class="text-[11.5px] text-note">
				No native recordings exist yet, so audio is inert throughout. Text, notes and
				exercises all work. See docs/ISSUE-1-LIMITATIONS.md L1.
			</W.Muted>
		</W.SketchCard>
	{/if}

	<div class="flex flex-col gap-[6px]">
		{#each course.lessons as lesson (lesson.id)}
			{@const done = profile.hasCompleted(lesson.id)}
			{@const open = done || lesson.id === assignedNewLessonId}
			<W.SketchCard
				tone={lesson.kind === 'synthesis' ? 'parchment' : 'default'}
				class="p-[8px] {open ? '' : 'opacity-45'}"
			>
				<div class="flex items-center justify-between gap-2">
					<div class="text-[13.5px]">
						{lesson.index}. {lesson.title}
					</div>
					{#if lesson.kind === 'synthesis'}
						<W.Pill>review</W.Pill>
					{:else if done}
						<W.Pill active>done</W.Pill>
					{/if}
				</div>
				<W.Muted class="text-[11px]">{lesson.situation}</W.Muted>
				{#if open}
					{#if profile.activeSession}
						{#if activeLessonId === lesson.id}
							<W.SketchButton
								class="mt-[4px] text-[13px]"
								onclick={() => profile.activeSessionHref && goto(profile.activeSessionHref)}
							>
								Resume current session
							</W.SketchButton>
						{:else}
							<W.Muted class="text-[11px]">Another session is in progress.</W.Muted>
						{/if}
					{:else}
						<W.SketchButton class="mt-[4px] text-[13px]" onclick={() => start(lesson.id, lesson.kind)}>
							{done ? 'Review' : 'Start'}
						</W.SketchButton>
					{/if}
				{:else}
					<W.Muted class="text-[11px]">
						Opens when Today assigns this lesson.
					</W.Muted>
				{/if}
			</W.SketchCard>
		{/each}
	</div>

	<W.TabBar />
</W.Phone>
