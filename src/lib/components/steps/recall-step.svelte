<script lang="ts">
	/**
	 * 1m · Active-wave spread. The same layout as parallel reading, mirrored:
	 * the target column is covered and produced aloud, line by line (AC 5).
	 *
	 * Hints are graded, and taking one caps the evidence for that attempt — a
	 * hinted retrieval is real information, but it is not `recalled`.
	 */
	import Spread from '$lib/components/app/spread.svelte';
	import * as W from '$lib/components/ui/index.js';
	import {
		evaluateRecallAttempt,
		hasRecallAttempt,
		normalise,
		type RecallAttempt,
		type RecallEvaluation
	} from '$lib/answers.js';
	import type { Lesson, RecallPrompt } from '$lib/schemas/content.js';
	import type { RecallSessionDraft } from '$lib/schemas/learner.js';
	import { profile } from '$lib/stores/profile.svelte.js';

	let {
		lesson,
		initialDraft,
		onDraftChange,
		onDone
	}: {
		lesson: Lesson;
		initialDraft?: RecallSessionDraft;
		onDraftChange?: (draft: RecallSessionDraft) => void;
		onDone: (attempt: RecallAttempt, evaluation: RecallEvaluation, hinted: boolean) => void;
	} = $props();

	const recallPrompt = $derived(
		lesson.exercises.find((exercise): exercise is RecallPrompt => exercise.kind === 'recall')
	);
	const promptedLineIndex = $derived(
		(() => {
			const exact = lesson.lines.findIndex(
			(line) =>
				line.id === recallPrompt?.lineId ||
				normalise(line.targetScript) === normalise(recallPrompt?.canonicalAnswer ?? '')
			);
			if (exact >= 0) return exact;

			const contextual = lesson.lines.findIndex((line) =>
				line.constructions.some((id) => recallPrompt?.constructions.includes(id))
			);
			return Math.max(0, contextual);
		})()
	);

	const initial = (() => {
		const restoredLineIndex = initialDraft
			? lesson.lines.findIndex((candidate) => candidate.id === initialDraft.lineId)
			: -1;
		return {
			index: restoredLineIndex >= 0 ? restoredLineIndex : promptedLineIndex,
			hinted: initialDraft?.hinted ?? false,
			revealed: initialDraft?.revealed ?? false,
			attempt: initialDraft?.text ?? ''
		};
	})();
	let index = $state(initial.index);
	let hinted = $state(initial.hinted);
	let revealed = $state(initial.revealed);
	let attempt = $state(initial.attempt);
	let submitted = $state(false);

	const line = $derived(lesson.lines[index]);
	const daysAgo = $derived(lesson.index);
	const hasAttempt = $derived(hasRecallAttempt(attempt));
	const showReveal = $derived(revealed && hasAttempt);

	function persistDraft() {
		if (!line) return;
		onDraftChange?.({ lineId: line.id, text: attempt, hinted, revealed });
	}

	$effect(() => {
		index;
		hinted;
		revealed;
		persistDraft();
	});

	function produce() {
		if (!hasAttempt || submitted) return;

		const evaluation = evaluateRecallAttempt(attempt, recallPrompt, line);
		submitted = true;
		onDone({
			lineId: line.id,
			text: attempt,
			canonicalAnswer: evaluation.canonicalAnswer,
			matchedAcceptedAnswer: evaluation.matchedAcceptedAnswer
		}, evaluation, hinted);
	}
</script>

<W.Muted class="text-center">
	You met this line in lesson {daysAgo}. Now say it in
	{lesson.language === 'ta' ? 'Tamil' : 'French'}, using the English as your cue.
</W.Muted>

{#if recallPrompt}
	<W.Card tone="parchment">
		<div class="text-sm">{recallPrompt.prompt}</div>
	</W.Card>
{/if}

<Spread
	{lesson}
	state="active-retrieval"
	bind:index
	settings={profile.settings}
	onlineactivate={persistDraft}
/>

<W.AnswerField
	bind:value={attempt}
	placeholder="say or type the line…"
	minHeight={56}
	aria-label="Your production"
	oninput={persistDraft}
/>
<W.MicButton />

<div class="flex flex-wrap items-center justify-center gap-2">
	<W.Chip
		active={hinted}
		onclick={() => {
			hinted = true;
			persistDraft();
		}}
	>
		hint: first word
	</W.Chip>
	{#if hasAttempt}
		<W.Chip
			active={revealed}
			onclick={() => {
				hinted = true;
				revealed = true;
				persistDraft();
			}}
		>
			reveal
		</W.Chip>
	{:else}
		<W.Chip disabled onclick={() => {}}>reveal</W.Chip>
	{/if}
</div>

{#if hinted}
	<W.Card tone="warn">
		<W.Muted class="text-xs text-caution">
			You used a hint, so this attempt counts as practice rather than recall.
		</W.Muted>
		<W.Fr class="text-sm">
			{showReveal
				? (recallPrompt?.canonicalAnswer ?? line.targetScript)
				: (recallPrompt?.hints[0] ?? `${line.targetScript.split(' ')[0]}…`)}
		</W.Fr>
	</W.Card>
{/if}

<W.Button
	tone="primary"
	class="mt-auto"
	disabled={!hasAttempt || submitted}
	onclick={produce}
>
	Compare with the original line →
</W.Button>
