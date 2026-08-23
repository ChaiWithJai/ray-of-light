<script lang="ts">
	/**
	 * 1k · Translation exercise, target → English. Confirms precise comprehension,
	 * and the literal gloss shows the target structure behind the natural reading.
	 *
	 * This deliberately does *not* reuse the lesson's `recall` exercise: that one
	 * runs English → target (production), which is the opposite direction and
	 * belongs to the active wave. Mixing them would quietly turn a comprehension
	 * check into a production test.
	 */
	import * as W from '$lib/components/ui/index.js';
	import { CONTENT_VERSION } from '$lib/content/index.js';
	import { normalise } from '$lib/answers.js';
	import type { Lesson } from '$lib/schemas/content.js';
	import { profile } from '$lib/stores/profile.svelte.js';

	let { lesson, onDone }: { lesson: Lesson; onDone: () => void } = $props();

	/**
	 * The last line that actually carries a construction — later lines are further
	 * into the dialogue, so this avoids re-testing the greeting the comprehension
	 * check already used.
	 */
	const line = $derived(
		[...lesson.lines].reverse().find((l) => l.constructions.length > 0) ?? lesson.lines[0]
	);

	let answer = $state('');
	let checked = $state(false);
	let correct = $state(false);

	function check() {
		if (checked || answer.trim() === '') return;
		checked = true;
		correct = normalise(answer) === normalise(line.naturalEnglish);
		profile.record(
			correct ? 'comprehension-correct' : 'attempt-incorrect',
			lesson.id,
			line.constructions,
			{ contentVersion: CONTENT_VERSION }
		);
	}
</script>

<W.Muted>Translate into English:</W.Muted>

<W.Card tone="accent">
	<W.Fr class="text-lg">{line.targetScript}</W.Fr>
	{#if line.transliteration}
		<W.Muted class="text-xs italic">{line.transliteration}</W.Muted>
	{/if}
</W.Card>

<W.AnswerField
	bind:value={answer}
	placeholder="type or dictate your English…"
	minHeight={64}
	disabled={checked}
	aria-label="Your English translation"
/>

<div class="flex items-center gap-2">
	<W.Button class="flex-1" aria-label="Dictate">🎙</W.Button>
	<W.Button
		tone="primary"
		class="flex-3"
		disabled={checked || answer.trim() === ''}
		onclick={check}
	>
		Check
	</W.Button>
</div>

{#if checked}
	<W.Card tone={correct ? 'good' : 'warn'} class="anim-uncover">
		<div data-testid="reveal" class="text-sm {correct ? 'text-insight' : 'text-caution'}">
			{correct ? '✓' : '→'} "{line.naturalEnglish}"
		</div>
		{#if line.literalEnglish}
			<W.Muted class="text-xs">literal: "{line.literalEnglish}"</W.Muted>
		{/if}
	</W.Card>
	<W.Button tone="primary" onclick={onDone}>Continue</W.Button>
{:else}
	<W.Muted class="text-center text-2xs">
		Answer before you check — the reveal is the point of the exercise.
	</W.Muted>
{/if}
