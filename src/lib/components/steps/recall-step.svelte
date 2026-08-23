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
	import { evaluateRecallAttempt, normalise, type RecallAttempt } from '$lib/answers.js';
	import { CONTENT_VERSION } from '$lib/content/index.js';
	import type { Lesson, RecallPrompt } from '$lib/schemas/content.js';
	import { profile } from '$lib/stores/profile.svelte.js';

	let {
		lesson,
		onDone
	}: { lesson: Lesson; onDone: (attempt: RecallAttempt) => void } = $props();

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

	let index = $state(0);
	let initializedLessonId = $state<string | null>(null);
	let hinted = $state(false);
	let revealed = $state(false);
	let attempt = $state('');

	const line = $derived(lesson.lines[index]);
	const daysAgo = $derived(lesson.index);

	$effect(() => {
		if (initializedLessonId === lesson.id) return;
		index = promptedLineIndex;
		hinted = false;
		revealed = false;
		attempt = '';
		initializedLessonId = lesson.id;
	});

	function produce() {
		if (attempt.trim() === '') return;

		const evaluation = evaluateRecallAttempt(attempt, recallPrompt, line);
		profile.record(evaluation.kind, lesson.id, evaluation.constructionIds, {
			hinted,
			contentVersion: CONTENT_VERSION
		});
		onDone({
			lineId: line.id,
			text: attempt,
			canonicalAnswer: evaluation.canonicalAnswer,
			matchedAcceptedAnswer: evaluation.matchedAcceptedAnswer
		});
	}
</script>

<W.Muted class="text-center">
	You read this in lesson {daysAgo}. Say it in {lesson.language === 'ta' ? 'Tamil' : 'French'}.
</W.Muted>

{#if recallPrompt}
	<W.Card tone="parchment">
		<div class="text-sm">{recallPrompt.prompt}</div>
	</W.Card>
{/if}

<Spread {lesson} state="active-retrieval" bind:index settings={profile.settings} />

<W.AnswerField
	bind:value={attempt}
	placeholder="say or type the line…"
	minHeight={56}
	aria-label="Your production"
/>
<W.MicButton />

<div class="flex flex-wrap items-center justify-center gap-2">
	<W.Chip
		active={hinted}
		onclick={() => {
			hinted = true;
		}}
	>
		hint: first word
	</W.Chip>
	<W.Chip
		active={revealed}
		onclick={() => {
			hinted = true;
			revealed = true;
		}}
	>
		reveal
	</W.Chip>
</div>

{#if hinted}
	<W.Card tone="warn">
		<W.Muted class="text-xs text-caution">
			Hint used — this line won't count as recalled.
		</W.Muted>
		<W.Fr class="text-sm">
			{revealed
				? (recallPrompt?.canonicalAnswer ?? line.targetScript)
				: (recallPrompt?.hints[0] ?? `${line.targetScript.split(' ')[0]}…`)}
		</W.Fr>
	</W.Card>
{/if}

<W.Button
	tone="primary"
	class="mt-auto"
	disabled={attempt.trim() === ''}
	onclick={produce}
>
	Compare with the canonical line →
</W.Button>
