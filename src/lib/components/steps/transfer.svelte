<script lang="ts">
	/**
	 * 1o · Transfer challenge. AC 7: every lesson ends with a novel transfer
	 * prompt. Validity is judged on whether the owned construction was used, not
	 * on exact string match — otherwise it would be recall wearing a new hat.
	 */
	import * as W from '$lib/components/wireframe/index.js';
	import { CONTENT_VERSION, getConstruction } from '$lib/content/index.js';
	import { normalise } from '$lib/answers.js';
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

	/**
	 * A light check that the learner reached for the right construction: does the
	 * attempt share a distinctive chunk with the construction's label? Generous on
	 * purpose — a novel sentence is *supposed* to differ from the exemplar.
	 */
	const usedConstruction = $derived.by(() => {
		if (!construction) return false;
		const stem = construction.label
			.split(/[+/]/)[0]
			.trim()
			.split(/\s+/)
			.filter((w) => w.length > 2);
		const attempt = normalise(answer);
		return stem.length === 0 || stem.some((w) => attempt.includes(normalise(w)));
	});

	function submit() {
		if (submitted || answer.trim() === '' || !prompt) return;
		submitted = true;
		profile.record(
			usedConstruction ? 'transfer-correct' : 'attempt-incorrect',
			lesson.id,
			[prompt.useConstruction, ...prompt.constructions],
			{ contentVersion: CONTENT_VERSION }
		);
	}
</script>

{#if prompt}
	<W.SketchCard tone="parchment">
		<div class="text-[13px]">{prompt.situation}</div>
		<W.Muted>{prompt.prompt}</W.Muted>
	</W.SketchCard>

	<W.Muted>Use a construction you already own:</W.Muted>
	<W.Chip active class="self-start">{construction?.label ?? prompt.useConstruction}</W.Chip>
	{#if construction}
		<W.Muted class="text-[11.5px]">{construction.gloss}</W.Muted>
	{/if}

	<W.AnswerField
		bind:value={answer}
		placeholder="say or type your new sentence…"
		minHeight={56}
		disabled={submitted}
		aria-label="Your new sentence"
	/>
	<W.MicButton />

	{#if submitted}
		<W.SketchCard tone={usedConstruction ? 'good' : 'warn'}>
			<div class="text-[13px] {usedConstruction ? 'text-good' : 'text-note'}">
				{usedConstruction
					? '✓ You reused the construction in a new situation.'
					: '→ That did not use the construction. Compare:'}
			</div>
			<W.Fr class="text-[13.5px]">{prompt.exemplar}</W.Fr>
			<W.Muted class="text-[11.5px]">
				One valid answer, not the only one — yours can differ.
			</W.Muted>
		</W.SketchCard>
		<W.SketchButton tone="primary" onclick={onDone}>Continue</W.SketchButton>
	{:else}
		<W.SketchButton tone="primary" disabled={answer.trim() === ''} onclick={submit}>
			Check
		</W.SketchButton>
	{/if}
{:else}
	<W.Muted>No transfer prompt in this lesson.</W.Muted>
	<W.SketchButton tone="primary" class="mt-auto" onclick={onDone}>Continue</W.SketchButton>
{/if}
