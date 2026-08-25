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
	import { attempt } from '$lib/stores/attempt.svelte.js';
	import { profile } from '$lib/stores/profile.svelte.js';
	import { onDestroy } from 'svelte';

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

	// #48 T1: the open attempt, published for the harness's hint boundary.
	$effect(() => {
		if (!prompt || submitted) attempt.close();
		else attempt.open('transfer', lesson.id, [prompt.useConstruction]);
	});
	onDestroy(() => attempt.close());

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
			{ hinted: attempt.hinted, contentVersion: CONTENT_VERSION }
		);
	}
</script>

{#if prompt}
	<W.ConceptIntro technique="transfer" />

	<!-- #34: the new situation is the star — this is the lesson's payoff moment. -->
	<W.Card tone="parchment" thick class="anim-rise gap-2 p-5 sm:p-6">
		<div class="font-display text-base leading-snug font-semibold sm:text-lg">
			{prompt.situation}
		</div>
		<W.Muted class="text-sm">{prompt.prompt}</W.Muted>
	</W.Card>

	<W.Muted>
		Build your sentence around this <W.Term id="construction">pattern</W.Term> you already know:
	</W.Muted>
	<!-- #46 S2: this is the construction's own moment — its character fronts the
	     prompt at its honest derived stage, activating "you own this one". -->
	<div class="flex items-center gap-2.5">
		<W.Sprite
			constructionId={prompt.useConstruction}
			state={profile.stateOf(prompt.useConstruction)}
			size={44}
		/>
		<div class="flex min-w-0 flex-col gap-0.5">
			<W.Chip active class="self-start">{construction?.label ?? prompt.useConstruction}</W.Chip>
			{#if construction}
				<W.Muted class="text-2xs">{construction.gloss}</W.Muted>
			{/if}
		</div>
	</div>

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
