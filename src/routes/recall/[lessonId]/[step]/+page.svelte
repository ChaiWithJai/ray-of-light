<script lang="ts">
	/**
	 * The active wave. Its attempt lives in the persisted active session so a
	 * refresh on comparison cannot reveal a canonical answer without the attempt.
	 */
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import * as W from '$lib/components/wireframe/index.js';
	import RecallStep from '$lib/components/steps/recall-step.svelte';
	import Compare from '$lib/components/steps/compare.svelte';
	import Closure from '$lib/components/steps/closure.svelte';
	import { getLesson } from '$lib/content/index.js';
	import type { RecallAttempt } from '$lib/answers.js';
	import { isStepId, RECALL_FLOW, stepDef, stepProgress } from '$lib/flow.js';
	import type { RecallSessionDraft } from '$lib/schemas/learner.js';
	import { profile } from '$lib/stores/profile.svelte.js';

	const lessonId = $derived(page.params.lessonId!);
	const rawStep = $derived(page.params.step!);
	const lesson = $derived(getLesson(profile.language, lessonId));
	const step = $derived(
		isStepId(rawStep) && RECALL_FLOW.includes(rawStep) ? rawStep : null
	);
	const progress = $derived(step ? stepProgress(RECALL_FLOW, step) : null);
	const access = $derived(
		lesson && step ? profile.sessionAccess('recall', lesson.id, step, RECALL_FLOW) : 'forbidden'
	);
	const draft = $derived(profile.activeSession?.recallDraft);
	const attempt = $derived.by((): RecallAttempt | null => {
		if (!draft?.canonicalAnswer) return null;
		return {
			lineId: draft.lineId,
			text: draft.text,
			canonicalAnswer: draft.canonicalAnswer,
			matchedAcceptedAnswer: draft.matchedAcceptedAnswer
		};
	});

	$effect(() => {
		if (profile.loaded && lesson && step && access === 'forbidden') {
			goto(profile.activeSessionHref ?? '/today', { replaceState: true });
		}
	});

	function saveDraft(next: RecallSessionDraft) {
		if (lesson) profile.saveRecallDraft(lesson.id, next);
	}

	function advance(finalAttempt?: RecallAttempt) {
		if (!lesson || !step) return;
		const persistedDraft = profile.activeSession?.recallDraft;
		const finalDraft = finalAttempt
			? {
					...persistedDraft,
					...finalAttempt,
					hinted: persistedDraft?.hinted ?? false,
					revealed: persistedDraft?.revealed ?? false
				}
			: undefined;
		const destination = profile.advanceSession('recall', lesson.id, step, RECALL_FLOW, finalDraft);
		if (destination) goto(destination);
	}
</script>

<svelte:head>
	<title>{lesson ? `Recall · ${lesson.title}` : 'Recall'}</title>
</svelte:head>

<W.Phone width={step === 'recall' ? 340 : 300}>
		{#if !profile.loaded}
			<W.Muted>Restoring your recall session…</W.Muted>
		{:else if !lesson || !step}
		<W.TitleBar left="✕" center="Not found" />
		<W.Muted>That recall session does not exist.</W.Muted>
		<W.SketchButton class="mt-auto" href="/today">Back to Today</W.SketchButton>
		{:else if access === 'forbidden'}
			<W.Muted>Returning to your authorized session step…</W.Muted>
		{:else if access === 'completed'}
			<W.TitleBar left="✕" center="Completed step" />
			<W.Muted>This step is available for review, but cannot record evidence again.</W.Muted>
			<W.SketchButton
				tone="primary"
				class="mt-auto"
				onclick={() => profile.activeSessionHref && goto(profile.activeSessionHref)}
			>
				Resume current step
			</W.SketchButton>
		{:else}
		<W.TitleBar
			left="✕"
			center="Recall · {lesson.title}"
			right={progress ? `${progress.position}/${progress.total}` : ''}
		/>

			{#if step === 'recall'}
				{#key lesson.id}
					<RecallStep
						{lesson}
						initialDraft={draft}
						onDraftChange={saveDraft}
						onDone={(a) => advance(a)}
					/>
				{/key}
			{:else if step === 'compare'}
				<Compare {lesson} {attempt} onDone={() => advance()} />
			{:else if step === 'closure'}
				<Closure {lesson} mode="recall" flow={RECALL_FLOW} onDone={() => goto('/today')} />
		{/if}
	{/if}
</W.Phone>
