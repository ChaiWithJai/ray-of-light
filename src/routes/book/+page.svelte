<script lang="ts">
	/**
	 * Book · browse the canonical course. Reviewing a finished lesson is allowed;
	 * jumping ahead is not — the whole scheduling model depends on the order.
	 */
	import * as W from '$lib/components/wireframe/index.js';
	import { COURSES, audioPending } from '$lib/content/index.js';
	import { flowFor } from '$lib/flow.js';
	import { profile } from '$lib/stores/profile.svelte.js';

	const course = $derived(COURSES[profile.language]);
	const nextIndex = $derived(profile.completedLessons.length + 1);
</script>

<svelte:head><title>Book</title></svelte:head>

<W.Phone>
	<W.TitleBar left="☰" center="Book" />
	<W.Muted>
		{course.lessons.length} lessons · {course.constructions.size} constructions
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
			{@const open = done || lesson.index <= nextIndex}
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
					<W.SketchButton
						class="mt-[4px] text-[13px]"
						href="/learn/{lesson.id}/{flowFor(lesson.kind)[0]}"
					>
						{done ? 'Review' : 'Start'}
					</W.SketchButton>
				{:else}
					<W.Muted class="text-[11px]">
						Opens after lesson {lesson.index - 1}.
					</W.Muted>
				{/if}
			</W.SketchCard>
		{/each}
	</div>

	<W.TabBar />
</W.Phone>
