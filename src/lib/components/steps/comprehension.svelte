<script lang="ts">
	/**
	 * 1i · Comprehension check — the same spread with English removed.
	 * A peeked line records a hint and cannot grant `recognized` on that attempt.
	 */
	import Spread from '$lib/components/app/spread.svelte';
	import * as W from '$lib/components/ui/index.js';
	import { CONTENT_VERSION } from '$lib/content/index.js';
	import type { ComprehensionCheck, Lesson } from '$lib/schemas/content.js';
	import { profile } from '$lib/stores/profile.svelte.js';

	let { lesson, onDone }: { lesson: Lesson; onDone: () => void } = $props();

	const checks = $derived(
		lesson.exercises.filter((e): e is ComprehensionCheck => e.kind === 'comprehension')
	);
	let current = $state(0);
	const check = $derived(checks[current]);
	const lineIndex = $derived(
		Math.max(0, lesson.lines.findIndex((l) => l.id === check?.lineId))
	);

	let picked = $state<number | null>(null);
	let peeked = $state(false);
	let index = $state(0);

	$effect(() => {
		index = lineIndex;
	});

	function pick(i: number) {
		if (picked !== null) return;
		picked = i;
		const correct = i === check.answerIndex;
		profile.record(
			correct ? 'comprehension-correct' : 'attempt-incorrect',
			lesson.id,
			check.constructions.length ? check.constructions : lesson.lines[lineIndex].constructions,
			{ hinted: peeked, contentVersion: CONTENT_VERSION }
		);
	}

	function next() {
		if (current < checks.length - 1) {
			current += 1;
			picked = null;
			peeked = false;
		} else {
			onDone();
		}
	}
</script>

{#if check}
	<Spread {lesson} state="comprehension" bind:index settings={profile.settings} />

	<W.Card>
		<div class="text-sm">{check.prompt}</div>
		{#each check.options as option, i (option)}
			{@const isAnswer = i === check.answerIndex}
			{@const revealed = picked !== null}
			<W.Button
				tone={revealed && isAnswer ? 'primary' : 'outline'}
				class="text-sm {revealed && picked === i && !isAnswer ? 'border-miss text-miss' : ''}"
				disabled={revealed}
				onclick={() => pick(i)}
			>
				{option}
			</W.Button>
		{/each}
	</W.Card>

	{#if picked === null}
		<W.Chip class="mx-auto" onclick={() => (peeked = true)}>
			{peeked ? 'hint used, so this one counts as practice' : 'peek (counts as a hint)'}
		</W.Chip>
		{#if peeked}
			<W.Card>
				<W.En>{lesson.lines[lineIndex].naturalEnglish}</W.En>
			</W.Card>
		{/if}
	{:else}
		<W.Card tone={picked === check.answerIndex ? 'good' : 'warn'} class="anim-uncover">
			<div class="text-sm {picked === check.answerIndex ? 'text-insight' : 'text-caution'}">
				{picked === check.answerIndex ? '✓ ' : '→ '}{lesson.lines[lineIndex].naturalEnglish}
			</div>
			{#if lesson.lines[lineIndex].literalEnglish}
				<W.Muted class="text-xs">lit. {lesson.lines[lineIndex].literalEnglish}</W.Muted>
			{/if}
		</W.Card>
		<W.Button tone="primary" onclick={next}>
			{current < checks.length - 1 ? 'Next' : 'Continue'}
		</W.Button>
	{/if}
{:else}
	<W.Muted>No comprehension check in this lesson.</W.Muted>
	<W.Button tone="primary" class="mt-auto" onclick={onDone}>Continue</W.Button>
{/if}
