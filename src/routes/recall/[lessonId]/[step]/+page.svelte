<script lang="ts">
	/**
	 * The active wave. The learner's production is held here rather than in a
	 * store, because it only needs to survive from `recall` to `compare` — and
	 * keeping it out of the profile means it is never persisted by accident.
	 */
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import * as W from '$lib/components/ui/index.js';
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

{#if !lesson || !step}
	<W.Shell title="Not found" back="/today" backKind="close">
		<W.Muted>That recall session does not exist.</W.Muted>
		<W.Button href="/today">Back to Today</W.Button>
	</W.Shell>
{:else}
	<W.Shell
		title="Recall · {lesson.title}"
		back="/today"
		backKind="close"
		meta={progress ? `${progress.position}/${progress.total}` : ''}
		wide={step === 'recall'}
	>
		{#snippet aside()}
			<div class="flex flex-col gap-4 border-l border-line pl-6">
				<div>
					<div class="text-2xs font-bold tracking-[0.14em] text-text-faint uppercase">
						Active wave
					</div>
					<div class="font-display text-lg leading-tight font-semibold">{lesson.title}</div>
					<W.Muted class="mt-1 text-xs">
						Produce from the English, then diagnose the difference yourself. A hinted
						retrieval is real information — but it is not `recalled`.
					</W.Muted>
				</div>
				<ol class="m-0 flex list-none flex-col gap-1 p-0" aria-label="Session steps">
					{#each RECALL_FLOW as id, i (id)}
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
			</div>
		{/key}
	</W.Shell>
{/if}
