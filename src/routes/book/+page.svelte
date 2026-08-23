<script lang="ts">
	/**
	 * Book · browse the canonical course. Reviewing a finished lesson is allowed;
	 * jumping ahead is not — the whole scheduling model depends on the order.
	 */
	import * as W from '$lib/components/ui/index.js';
	import { COURSES, audioPending } from '$lib/content/index.js';
	import { flowFor } from '$lib/flow.js';
	import { profile } from '$lib/stores/profile.svelte.js';

	const course = $derived(COURSES[profile.language]);
	const nextIndex = $derived(profile.completedLessons.length + 1);
</script>

<svelte:head><title>Book</title></svelte:head>

<W.Shell brand title="Book" nav settingsLink>
	<div class="anim-rise flex items-baseline justify-between gap-2 pt-2">
		<W.Heading>The book</W.Heading>
	</div>
	<W.Muted>
		{course.lessons.length} lessons · {course.constructions.size} constructions
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
			{@const open = done || lesson.index <= nextIndex}
			<W.Card
				tone={lesson.kind === 'synthesis' ? 'parchment' : 'default'}
				class="p-3 {open ? '' : 'opacity-45'}"
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
					<W.Button
						class="mt-1.5 text-sm"
						href="/learn/{lesson.id}/{flowFor(lesson.kind)[0]}"
					>
						{done ? 'Review' : 'Start'}
					</W.Button>
				{:else}
					<W.Muted class="text-2xs">
						Opens after lesson {lesson.index - 1}.
					</W.Muted>
				{/if}
			</W.Card>
		{/each}
	</div>

</W.Shell>
