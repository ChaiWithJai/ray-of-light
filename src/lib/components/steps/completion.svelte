<script lang="ts">
	/**
	 * 1l · Completion exercise. Cue-supported retrieval — the missing element is
	 * always the lesson's target construction, never an arbitrary word.
	 */
	import * as W from '$lib/components/ui/index.js';
	import { CONTENT_VERSION } from '$lib/content/index.js';
	import type { CompletionPrompt, Lesson } from '$lib/schemas/content.js';
	import { profile } from '$lib/stores/profile.svelte.js';

	let { lesson, onDone }: { lesson: Lesson; onDone: () => void } = $props();

	const prompt = $derived(
		lesson.exercises.find((e): e is CompletionPrompt => e.kind === 'completion')
	);
	let picked = $state<string | null>(null);
	const correct = $derived(picked !== null && picked === prompt?.answer);
	const parts = $derived(prompt ? prompt.template.split('___') : []);

	function pick(option: string) {
		if (picked !== null || !prompt) return;
		picked = option;
		profile.record(
			option === prompt.answer ? 'completion-correct' : 'attempt-incorrect',
			lesson.id,
			prompt.constructions,
			{ contentVersion: CONTENT_VERSION }
		);
	}
</script>

{#if prompt}
	<W.Muted>{prompt.prompt}</W.Muted>

	<W.Card tone="accent">
		<W.Fr class="text-lg">
			{parts[0]}<W.Blank>{picked ?? '?'}</W.Blank>{parts[1] ?? ''}
		</W.Fr>
	</W.Card>

	<div class="flex flex-wrap items-center justify-center gap-2">
		{#each prompt.options as option (option)}
			<W.Chip
				active={picked === option}
				onclick={picked === null ? () => pick(option) : undefined}
			>
				{option}
			</W.Chip>
		{/each}
	</div>

	{#if picked !== null}
		<W.Card tone={correct ? 'good' : 'warn'} class="anim-uncover">
			<div class="text-sm {correct ? 'text-insight' : 'text-caution'}">
				{correct ? '✓ ' : `→ ${prompt.answer}. `}{prompt.rule}
			</div>
		</W.Card>
		<W.Button tone="primary" class="mt-auto" onclick={onDone}>Continue</W.Button>
	{/if}
{:else}
	<W.Muted>No completion exercise in this lesson.</W.Muted>
	<W.Button tone="primary" class="mt-auto" onclick={onDone}>Continue</W.Button>
{/if}
