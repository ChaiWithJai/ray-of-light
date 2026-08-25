<script lang="ts">
	/**
	 * The active wave. Its attempt lives in the persisted active session so a
	 * refresh on comparison cannot reveal a canonical answer without the attempt.
	 */
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import * as W from '$lib/components/ui/index.js';
	import AskMethod from '$lib/components/app/ask-method.svelte';
	import LessonNotes from '$lib/components/app/lesson-notes.svelte';
	import NotesLink from '$lib/components/app/notes-link.svelte';
	import RecallStep from '$lib/components/steps/recall-step.svelte';
	import Compare from '$lib/components/steps/compare.svelte';
	import Closure from '$lib/components/steps/closure.svelte';
	import { CONTENT_VERSION, getLesson } from '$lib/content/index.js';
	import type { RecallAttempt, RecallEvaluation } from '$lib/answers.js';
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
	const focusConstructionId = $derived(
		profile.activeSession?.origin === 'resurface'
			? profile.activeSession.resurfaceConstructionId
			: undefined
	);
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

	function submitRecall(finalAttempt: RecallAttempt, evaluation: RecallEvaluation, hinted: boolean) {
		if (!lesson) return;
		const persistedDraft = profile.activeSession?.recallDraft;
		const finalDraft: RecallSessionDraft = {
			...persistedDraft,
			...finalAttempt,
			hinted,
			revealed: persistedDraft?.revealed ?? false
		};
		const destination = profile.submitRecallAttempt(
			lesson.id,
			RECALL_FLOW,
			finalDraft,
			evaluation.kind,
			evaluation.constructionIds,
			CONTENT_VERSION
		);
		if (destination) goto(destination);
	}
</script>

<svelte:head>
	<title>{lesson ? `Recall · ${lesson.title}` : 'Recall'}</title>
</svelte:head>

{#if !profile.loaded}
	<W.Shell session title="Recall" back="/today" backKind="close">
		<W.Muted>Restoring your recall session…</W.Muted>
	</W.Shell>
{:else if !lesson || !step}
	<W.Shell title="Not found" back="/today" backKind="close">
		<W.Muted>That recall session does not exist.</W.Muted>
		<W.Button href="/today">Back to Today</W.Button>
	</W.Shell>
{:else if access === 'forbidden'}
	<W.Shell session title="Recall · {lesson.title}" back="/today" backKind="close">
		<W.Muted>Returning to your authorized session step…</W.Muted>
	</W.Shell>
{:else if access === 'completed'}
	<W.Shell session title="Completed step" back="/today" backKind="close">
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
		session
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
						Recall session
					</div>
					<div class="font-display text-lg leading-tight font-semibold">{lesson.title}</div>
					<W.Muted class="mt-1 text-xs">
						Say the line from the English first, then compare it with the original and
						spot the differences yourself. If you take a hint, the attempt still counts
						as useful practice.
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
				<!-- #48 Phase H0: the aside's consistent job — the learner's notebook. -->
				<div class="border-t border-line pt-4">
					<LessonNotes lessonId={lesson.id} />
				</div>
				<!-- #48 Phase H1 (T1): retrieval-only "Ask the method", beside the
				     notes. No model, no WebGPU — the method's own passages, linked. -->
				<div class="border-t border-line pt-4">
					<AskMethod lessonId={lesson.id} {step} mode="recall" />
				</div>
			</div>
		{/snippet}

		{#key step}
			<div class="anim-rise flex min-h-[70vh] flex-1 flex-col gap-4">
		<!-- #47 job 1 and #48: the quiet session-chrome affordances. Both open
		     overlays; the session route never changes. The notes link renders
		     only below lg, where there is no aside column. -->
		<div class="-mb-2 flex items-center justify-end gap-4">
			<NotesLink lessonId={lesson.id} {step} mode="recall" />
			<W.Stuck {step} class="self-auto" />
		</div>
		{#if step === 'recall'}
			{#key `${lesson.id}:${focusConstructionId ?? 'default'}`}
				<RecallStep
					{lesson}
					{focusConstructionId}
					initialDraft={draft}
					onDraftChange={saveDraft}
					onDone={submitRecall}
				/>
			{/key}
		{:else if step === 'compare'}
			<Compare {lesson} {attempt} onDone={() => advance()} />
		{:else if step === 'closure'}
			<Closure {lesson} mode="recall" flow={RECALL_FLOW} onDone={() => goto('/today')} />
		{/if}
			</div>
		{/key}
	</W.Shell>
{/if}
