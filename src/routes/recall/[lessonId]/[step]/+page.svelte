<script lang="ts">
	/**
	 * The active wave. The learner's production is held here rather than in a
	 * store, because it only needs to survive from `recall` to `compare` — and
	 * keeping it out of the profile means it is never persisted by accident.
	 */
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import * as W from '$lib/components/wireframe/index.js';
	import RecallStep from '$lib/components/steps/recall-step.svelte';
	import Compare from '$lib/components/steps/compare.svelte';
	import Closure from '$lib/components/steps/closure.svelte';
	import { getLesson } from '$lib/content/index.js';
	import type { RecallAttempt } from '$lib/answers.js';
	import { afterStep, isStepId, RECALL_FLOW, stepDef, stepProgress } from '$lib/flow.js';
	import { profile } from '$lib/stores/profile.svelte.js';

	const lessonId = $derived(page.params.lessonId!);
	const rawStep = $derived(page.params.step!);
	const lesson = $derived(getLesson(profile.language, lessonId));
	const step = $derived(
		isStepId(rawStep) && RECALL_FLOW.includes(rawStep) ? rawStep : null
	);
	const progress = $derived(step ? stepProgress(RECALL_FLOW, step) : null);

	let attempt = $state<RecallAttempt | null>(null);

	const advance = () => {
		if (lesson && step) goto(afterStep('recall', lesson.id, RECALL_FLOW, step));
	};
</script>

<svelte:head>
	<title>{lesson ? `Recall · ${lesson.title}` : 'Recall'}</title>
</svelte:head>

<W.Phone width={step === 'recall' ? 340 : 300}>
	{#if !lesson || !step}
		<W.TitleBar left="✕" center="Not found" />
		<W.Muted>That recall session does not exist.</W.Muted>
		<W.SketchButton class="mt-auto" href="/today">Back to Today</W.SketchButton>
	{:else}
		<W.TitleBar
			left="✕"
			center="Recall · {lesson.title}"
			right={progress ? `${progress.position}/${progress.total}` : ''}
		/>

		{#if step === 'recall'}
			<RecallStep
				{lesson}
				onDone={(a) => {
					attempt = a;
					advance();
				}}
			/>
		{:else if step === 'compare'}
			<Compare {lesson} {attempt} onDone={advance} />
		{:else if step === 'closure'}
			<Closure {lesson} onDone={advance} />
		{/if}
	{/if}
</W.Phone>
