<script lang="ts">
	/**
	 * JourneyArc — the one consistent picture of the run of the program (#37).
	 *
	 * A compact path of the course's lessons: review lessons marked, the wave
	 * structure indicated (recall joins partway in), lessons already worked
	 * filled, and the learner's current position ringed. Every mark derives
	 * from the real course and the real wave config; the arc can never claim
	 * something the schedule contradicts.
	 */
	import { COURSES } from '$lib/content/index.js';
	import { POC_WAVE_CONFIG } from '$lib/schemas/schedule.js';
	import type { LanguageCode } from '$lib/schemas/content.js';
	import { cn } from '$lib/utils.js';
	import Muted from './muted.svelte';

	let {
		language,
		current = null,
		completedIndexes = [],
		caption = '',
		class: className = ''
	}: {
		language: LanguageCode;
		/** 1-based index of the lesson the learner is at, if any. */
		current?: number | null;
		/** 1-based indexes of lessons already worked through. */
		completedIndexes?: number[];
		caption?: string;
		class?: string;
	} = $props();

	const lessons = $derived(COURSES[language].lessons);
	const waveStart = $derived(POC_WAVE_CONFIG.activeWaveStartsAtLesson);
	const label = $derived(
		`Course path: ${lessons.length} lessons` +
			(current ? `, you are at lesson ${current}` : '') +
			(completedIndexes.length > 0 ? `, ${completedIndexes.length} worked through` : '')
	);
</script>

<div class={cn('flex flex-col gap-1.5', className)} data-testid="journey-arc">
	<div class="flex items-center gap-[5px]" role="img" aria-label={label}>
		{#each lessons as l (l.id)}
			{@const done = completedIndexes.includes(l.index)}
			{@const here = current === l.index}
			{#if l.index === waveStart}
				<span class="mx-0.5 h-3 w-px shrink-0 bg-line-strong" aria-hidden="true"></span>
			{/if}
			<span
				aria-hidden="true"
				title="lesson {l.index}: {l.title}"
				class={cn(
					'size-2 shrink-0 transition-colors duration-(--duration-move)',
					l.kind === 'synthesis' ? 'rotate-45 rounded-[2px]' : 'rounded-full',
					done ? 'bg-brand' : here ? 'bg-brand-wash' : 'bg-line/60',
					here ? 'ring-2 ring-brand ring-offset-1 ring-offset-surface' : '',
					!done && !here ? 'border border-line-strong/70' : ''
				)}
			></span>
		{/each}
	</div>
	<div class="flex items-baseline justify-between gap-2 text-2xs text-text-faint">
		<span>listen &amp; read from lesson 1</span>
		<span>+ recall from lesson {waveStart}</span>
	</div>
	{#if caption}
		<Muted class="text-2xs">{caption}</Muted>
	{/if}
</div>
