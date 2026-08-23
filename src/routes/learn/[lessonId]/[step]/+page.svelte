<script lang="ts">
	/**
	 * The passive-wave session. Steps are routes, so back/refresh/deep-links all
	 * work, but the *order* comes from `flowFor` rather than being encoded here.
	 */
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import * as W from '$lib/components/wireframe/index.js';
	import Preview from '$lib/components/steps/preview.svelte';
	import SpreadStep from '$lib/components/steps/spread-step.svelte';
	import Comprehension from '$lib/components/steps/comprehension.svelte';
	import Shadow from '$lib/components/steps/shadow.svelte';
	import Translate from '$lib/components/steps/translate.svelte';
	import Completion from '$lib/components/steps/completion.svelte';
	import Transfer from '$lib/components/steps/transfer.svelte';
	import Closure from '$lib/components/steps/closure.svelte';
	import Synthesis from '$lib/components/steps/synthesis.svelte';
	import { getLesson } from '$lib/content/index.js';
	import { flowFor, isStepId, stepDef, stepProgress } from '$lib/flow.js';
	import { profile } from '$lib/stores/profile.svelte.js';

	const lessonId = $derived(page.params.lessonId!);
	const rawStep = $derived(page.params.step!);
	const lesson = $derived(getLesson(profile.language, lessonId));
	const flow = $derived(lesson ? flowFor(lesson.kind) : []);
	const step = $derived(isStepId(rawStep) && flow.includes(rawStep) ? rawStep : null);
	const progress = $derived(step ? stepProgress(flow, step) : null);
	const access = $derived(
		lesson && step ? profile.sessionAccess('learn', lesson.id, step, flow) : 'forbidden'
	);

	$effect(() => {
		if (profile.loaded && lesson && step && access === 'forbidden') {
			goto(profile.activeSessionHref ?? '/today', { replaceState: true });
		}
	});

	const advance = () => {
		if (!lesson || !step) return;
		const destination = profile.advanceSession('learn', lesson.id, step, flow);
		if (destination) goto(destination);
	};
</script>

<svelte:head>
	<title>{lesson ? `${lesson.title} · ${step ?? ''}` : 'Lesson'}</title>
</svelte:head>

<W.Phone width={step === 'spread' || step === 'comprehension' ? 340 : 300}>
		{#if !profile.loaded}
			<W.Muted>Restoring your lesson…</W.Muted>
		{:else if !lesson}
		<W.TitleBar left="✕" center="Not found" />
		<W.Muted>
			No lesson <code>{lessonId}</code> in the {profile.language === 'ta' ? 'Tamil' : 'French'}
			course.
		</W.Muted>
		<W.SketchButton class="mt-auto" href="/today">Back to Today</W.SketchButton>
	{:else if !step}
		<W.TitleBar left="✕" center="Unknown step" />
		<W.Muted>
			<code>{rawStep}</code> is not a step of this lesson. Its flow is: {flow.join(' → ')}.
		</W.Muted>
			<W.SketchButton class="mt-auto" href="/today">Back to Today</W.SketchButton>
		{:else if access === 'forbidden'}
			<W.Muted>Returning to your authorized session step…</W.Muted>
		{:else if access === 'completed'}
			<W.TitleBar left="✕" center="Completed step" />
			<W.Muted>This step is available for review, but cannot record progress again.</W.Muted>
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
			center="{lesson.title} · {stepDef(step).label}"
			right={progress ? `${progress.position}/${progress.total}` : ''}
		/>

		{#key step}
			{#if step === 'preview'}
				<Preview {lesson} onDone={advance} />
			{:else if step === 'spread'}
				<SpreadStep {lesson} onDone={advance} />
			{:else if step === 'comprehension'}
				<Comprehension {lesson} onDone={advance} />
			{:else if step === 'shadow'}
				<Shadow {lesson} onDone={advance} />
			{:else if step === 'translate'}
				<Translate {lesson} onDone={advance} />
			{:else if step === 'completion'}
				<Completion {lesson} onDone={advance} />
			{:else if step === 'transfer'}
				<Transfer {lesson} onDone={advance} />
			{:else if step === 'synthesis'}
				<Synthesis {lesson} onDone={advance} />
				{:else if step === 'closure'}
					<Closure {lesson} mode="learn" {flow} onDone={() => goto('/today')} />
			{/if}
		{/key}
	{/if}
</W.Phone>
