<script lang="ts">
	/**
	 * 1n · Answer comparison. The learner notices the difference *before* being
	 * told what it was — error discrimination, not red X's. No score is shown.
	 */
	import * as W from '$lib/components/ui/index.js';
	import { RESURFACE_LADDER_TEXT } from '$lib/content/wiki/index.js';
	import { diffWords, normalise, type RecallAttempt } from '$lib/answers.js';
	import type { Lesson } from '$lib/schemas/content.js';

	let {
		lesson,
		attempt,
		onDone
	}: {
		lesson: Lesson;
		attempt: RecallAttempt | null;
		onDone: () => void;
	} = $props();

	const line = $derived(
		lesson.lines.find((l) => l.id === attempt?.lineId) ?? lesson.lines[0]
	);
	const canonicalAnswer = $derived(attempt?.canonicalAnswer ?? line.targetScript);
	const comparisonAnswer = $derived(attempt?.matchedAcceptedAnswer ?? canonicalAnswer);
	const acceptedFormDiffers = $derived(
		Boolean(attempt?.matchedAcceptedAnswer) &&
			normalise(comparisonAnswer) !== normalise(canonicalAnswer)
	);
	const canonicalMatchesLine = $derived(
		normalise(canonicalAnswer) === normalise(line.targetScript)
	);
	const diff = $derived(diffWords(attempt?.text ?? '', comparisonAnswer));
	const identical = $derived(diff.attempt.every((w) => w.same) && diff.canonical.every((w) => w.same));

	let noticed = $state(false);
</script>

<W.Card>
	<W.Muted class="text-xs">YOU SAID</W.Muted>
	<W.Fr>
		{#each diff.attempt as word, i (i)}
			{#if word.same}{word.text}{:else}<W.Diff tone="bad">{word.text}</W.Diff>{/if}{' '}
		{/each}
	</W.Fr>
</W.Card>

<W.Hint>↕ spot the difference</W.Hint>

{#if noticed}
	<W.Card tone="good" class="anim-uncover">
		<W.Muted class="text-xs">
			{acceptedFormDiffers ? 'ALSO ACCEPTED ▶' : 'THE ORIGINAL ▶'}
		</W.Muted>
		<W.Fr>
			{#each diff.canonical as word, i (i)}
				{#if word.same}{word.text}{:else}<W.Diff tone="good">{word.text}</W.Diff>{/if}{' '}
			{/each}
		</W.Fr>
		{#if canonicalMatchesLine && line.transliteration}
			<W.Muted class="text-xs italic">{line.transliteration}</W.Muted>
		{/if}
		{#if acceptedFormDiffers}
			<W.Muted class="text-xs">The lesson writes it: {canonicalAnswer}</W.Muted>
		{/if}
	</W.Card>

	<W.Card>
		<W.Muted>
			{#if identical}
				That matches {acceptedFormDiffers ? 'an accepted way to say it' : 'the original line'}.
			{:else}
				Read the two lines side by side. Where a difference changes the sound, say the
				original aloud a couple of times. Where it only changes the spelling, note it and
				move on.
			{/if}
		</W.Muted>
	</W.Card>

	<W.Button tone="primary" onclick={onDone}>Say the corrected line 🎙</W.Button>
	<W.Hint>
		Tricky lines <W.Term id="resurface">come back</W.Term> in {RESURFACE_LADDER_TEXT} days.
	</W.Hint>
{:else}
	<W.Card>
		<W.Muted>
			Before you look, reread your line. Would you change anything?
		</W.Muted>
	</W.Card>
	<W.Button class="mt-auto" onclick={() => (noticed = true)}>
		Show the original line
	</W.Button>
{/if}
