<script lang="ts">
	/**
	 * The passive-wave session. Steps are routes, so back/refresh/deep-links all
	 * work, but the *order* comes from `flowFor` rather than being encoded here.
	 */
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import * as W from '$lib/components/ui/index.js';
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

{#if !profile.loaded}
	<W.Shell title="Lesson" back="/today" backKind="close">
		<W.Muted>Restoring your lesson…</W.Muted>
	</W.Shell>
{:else if !lesson}
	<W.Shell title="Not found" back="/today" backKind="close">
		<W.Muted>
			No lesson <code>{lessonId}</code> in the {profile.language === 'ta' ? 'Tamil' : 'French'}
			course.
		</W.Muted>
		<W.Button href="/today">Back to Today</W.Button>
	</W.Shell>
{:else if !step}
	<W.Shell title="Unknown step" back="/today" backKind="close">
		<W.Muted>
			<code>{rawStep}</code> is not a step of this lesson. Its flow is: {flow.join(' → ')}.
		</W.Muted>
		<W.Button href="/learn/{lesson.id}/{flow[0]}">
			Start at the beginning
		</W.Button>
	</W.Shell>
{:else if access === 'forbidden'}
	<W.Shell title="{lesson.title} · {stepDef(step).label}" back="/today" backKind="close">
		<W.Muted>Returning to your authorized session step…</W.Muted>
	</W.Shell>
{:else if access === 'completed'}
	<W.Shell title="Completed step" back="/today" backKind="close">
		<!-- Kept on one line: the e2e guard asserts this copy with a regex, and regex
		     text matching does not normalize source-formatting whitespace. -->
		<W.Muted>
			This step is complete. Return to the current step to continue; completed-step review is not available in this POC.
		</W.Muted>
		<W.Button
			tone="primary"
			class="mt-auto"
			onclick={() => profile.activeSessionHref && goto(profile.activeSessionHref)}
		>
			Resume current step
		</W.Button>
	</W.Shell>
{:else}
	<W.Shell
		title="{lesson.title} · {stepDef(step).label}"
		back="/today"
		backKind="close"
		meta={progress ? `${progress.position}/${progress.total}` : ''}
		wide={step === 'spread' || step === 'comprehension'}
	>
		{#snippet aside()}
			<div class="flex flex-col gap-4 border-l border-line pl-6">
				<div>
					<div class="text-2xs font-bold tracking-[0.14em] text-text-faint uppercase">
						Lesson {lesson.index}
					</div>
					<div class="font-display text-lg leading-tight font-semibold">{lesson.title}</div>
					<W.Muted class="mt-1 text-xs">{lesson.situation}</W.Muted>
				</div>
				<ol class="m-0 flex list-none flex-col gap-1 p-0" aria-label="Session steps">
					{#each flow as id, i (id)}
						{@const here = id === step}
						{@const past = progress ? i < progress.position - 1 : false}
						<li
							class="flex items-center gap-2.5 rounded-lg px-2 py-1 text-sm {here
								? 'bg-brand-wash font-bold text-brand-deep'
								: past
									? 'text-text-faint'
									: 'text-text-soft'}"
							aria-current={here ? 'step' : undefined}
						>
							<span
								class="size-1.5 shrink-0 rounded-full {here
									? 'bg-brand'
									: past
										? 'bg-line-strong'
										: 'border border-line-strong'}"
							></span>
							{stepDef(id).title}
						</li>
					{/each}
				</ol>
			</div>
		{/snippet}

		{#key step}
			<div class="anim-rise flex min-h-[70vh] flex-1 flex-col gap-4">
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
			</div>
		{/key}
	</W.Shell>
{/if}
