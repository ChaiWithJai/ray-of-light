<script lang="ts">
	/**
	 * 1i · Comprehension check — the same spread with English removed.
	 * A peeked line records a hint and cannot grant `recognized` on that attempt.
	 */
	import Spread from '$lib/components/app/spread.svelte';
	import * as W from '$lib/components/ui/index.js';
	import { CONTENT_VERSION } from '$lib/content/index.js';
	import type { ComprehensionCheck, Lesson } from '$lib/schemas/content.js';
	import { attempt } from '$lib/stores/attempt.svelte.js';
	import { profile } from '$lib/stores/profile.svelte.js';
	import { onDestroy } from 'svelte';

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

	// #48 T1: publish the open attempt so the harness's hint boundary can see
	// it. Closed the moment a choice is made — after that there is nothing left
	// to cap.
	$effect(() => {
		if (!check) return;
		if (picked === null) {
			attempt.open(
				'comprehension',
				lesson.id,
				check.constructions.length
					? check.constructions
					: (lesson.lines[lineIndex]?.constructions ?? [])
			);
		} else {
			attempt.close();
		}
	});
	onDestroy(() => attempt.close());

	function pick(i: number) {
		if (picked !== null) return;
		picked = i;
		const correct = i === check.answerIndex;
		// A peek and a mid-attempt method question cap the attempt identically.
		const hinted = peeked || attempt.hinted;
		profile.record(
			correct ? 'comprehension-correct' : 'attempt-incorrect',
			lesson.id,
			check.constructions.length ? check.constructions : lesson.lines[lineIndex].constructions,
			{ hinted, contentVersion: CONTENT_VERSION }
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
	<!-- #39: one check at a time — the line under question and its choices sit
	     together, and the set advances item by item. -->
	{#if checks.length > 1}
		<div class="text-center font-mono text-2xs text-text-faint">
			check {current + 1} of {checks.length}
		</div>
	{/if}

	{#key check.lineId}
		<Spread
			{lesson}
			state="comprehension"
			layout="stack"
			pinned
			bind:index
			settings={profile.settings}
		/>
	{/key}

	<W.Card thick class="anim-rise anim-d1 gap-2.5 p-5">
		<div class="font-display text-base leading-snug font-semibold sm:text-lg">{check.prompt}</div>
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
		<!-- #49: the peek invites; the evidence honesty lands after use, never as
		     a pre-use penalty warning. -->
		{#if !peeked}
			<W.Chip class="mx-auto" onclick={() => (peeked = true)}>peek at the English</W.Chip>
		{:else}
			<W.Card>
				<W.En>{lesson.lines[lineIndex].naturalEnglish}</W.En>
				<W.Muted class="text-2xs">
					You peeked, so this one counts as practice rather than recognition.
				</W.Muted>
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
