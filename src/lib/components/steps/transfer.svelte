<script lang="ts">
	/**
	 * 1o · Transfer challenge. AC 7: every lesson ends with a novel transfer
	 * prompt. The machine check only detects an authored ordered token pattern;
	 * it cannot establish grammatical, pragmatic, or native-quality transfer.
	 */
	import * as W from '$lib/components/ui/index.js';
	import { CONTENT_VERSION, getConstruction } from '$lib/content/index.js';
	import { evaluateTransferAttempt, type TransferEvaluation } from '$lib/answers.js';
	import type { Lesson, TransferPrompt } from '$lib/schemas/content.js';
	import { profile } from '$lib/stores/profile.svelte.js';

	let { lesson, onDone }: { lesson: Lesson; onDone: () => void } = $props();

	const prompt = $derived(
		lesson.exercises.find((e): e is TransferPrompt => e.kind === 'transfer')
	);
	const construction = $derived(
		prompt ? getConstruction(lesson.language, prompt.useConstruction) : undefined
	);

	let answer = $state('');
	let submitted = $state(false);
	let evaluation = $state<TransferEvaluation | null>(null);
	const allConstructionsMatched = $derived(evaluation?.unmatchedConstructionIds.length === 0);
	const anyConstructionMatched = $derived((evaluation?.matchedConstructionIds.length ?? 0) > 0);

	function submit() {
		if (submitted || answer.trim() === '' || !prompt) return;
		submitted = true;
		evaluation = evaluateTransferAttempt(answer, prompt);
		profile.recordOutcomes(
			[
				{
					kind: 'transfer-pattern-matched',
					constructionIds: evaluation.matchedConstructionIds,
					assessmentSource: 'authored-pattern'
				},
				{ kind: 'attempt-incorrect', constructionIds: evaluation.unmatchedConstructionIds }
			],
			lesson.id,
			{ contentVersion: CONTENT_VERSION }
		);
	}
</script>

{#if prompt}
	<W.Card tone="parchment">
		<div class="text-sm">{prompt.situation}</div>
		<W.Muted>{prompt.prompt}</W.Muted>
	</W.Card>

	<W.Muted>Use a construction you already own:</W.Muted>
	<W.Chip active class="self-start">{construction?.label ?? prompt.useConstruction}</W.Chip>
	{#if construction}
		<W.Muted class="text-2xs">{construction.gloss}</W.Muted>
	{/if}

	<W.AnswerField
		bind:value={answer}
		placeholder="say or type your new sentence…"
		minHeight={56}
		disabled={submitted}
		aria-label="Your new sentence"
	/>

	<!-- The graded result sits directly under the attempt it grades, above the
	     mic — the evidence-honesty caveat lives in Settings, not on the card. -->
	{#if submitted}
		<W.Card
			tone={allConstructionsMatched && evaluation?.contextMatched ? 'good' : 'warn'}
			class="anim-uncover"
		>
			<div
				class="text-sm {allConstructionsMatched && evaluation?.contextMatched
					? 'text-insight'
					: 'text-caution'}"
			>
				{allConstructionsMatched && evaluation?.contextMatched
					? '✓ Your answer matched the target construction and situation patterns.'
					: allConstructionsMatched
						? '→ The construction matched, but some situation details did not. Compare:'
						: anyConstructionMatched
							? '→ Some construction patterns matched; the unmatched ones need another look. Compare:'
							: '→ The target construction pattern did not match. Compare:'}
			</div>
			<W.Fr class="text-sm">{prompt.exemplar}</W.Fr>
		</W.Card>
	{/if}

	<W.MicButton />

	{#if submitted}
		<W.Button tone="primary" onclick={onDone}>Continue</W.Button>
	{:else}
		<W.Button tone="primary" disabled={answer.trim() === ''} onclick={submit}>
			Check
		</W.Button>
	{/if}
{:else}
	<W.Muted>No transfer prompt in this lesson.</W.Muted>
	<W.Button tone="primary" class="mt-auto" onclick={onDone}>Continue</W.Button>
{/if}
