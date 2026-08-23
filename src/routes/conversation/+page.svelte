<script lang="ts">
	/**
	 * 1u · Conversation bridge. The partner is constrained to material the learner
	 * has met — and the constraint is *enforced* by drawing turns from the met
	 * corpus, not by asking a model nicely. See docs/ISSUE-1-LIMITATIONS.md for
	 * why the model-backed version is deferred.
	 */
	import * as W from '$lib/components/wireframe/index.js';
	import { COURSES, getLesson, linesMetBy } from '$lib/content/index.js';
	import { profile } from '$lib/stores/profile.svelte.js';

	const course = $derived(COURSES[profile.language]);

	/** Highest lesson index the learner has actually worked through. */
	const metIndex = $derived(
		profile.completedLessons
			.map((id) => getLesson(profile.language, id)?.index ?? 0)
			.reduce((a, b) => Math.max(a, b), 0)
	);

	const corpus = $derived(linesMetBy(profile.language, metIndex));
	const partnerTurns = $derived(corpus.filter((_, i) => i % 3 === 0).slice(0, 3));

	let said = $state('');
	let turns = $state<{ who: 'them' | 'you'; text: string }[]>([]);

	$effect(() => {
		if (turns.length === 0 && partnerTurns.length > 0) {
			turns = [{ who: 'them', text: partnerTurns[0].targetScript }];
		}
	});

	function send() {
		if (said.trim() === '') return;
		const next = partnerTurns[Math.min(turns.length, partnerTurns.length - 1)];
		turns = [...turns, { who: 'you', text: said }, { who: 'them', text: next.targetScript }];
		said = '';
	}
</script>

<svelte:head><title>Conversation</title></svelte:head>

<W.Phone>
	<W.TitleBar left="✕" center="🏪 At the market" />

	{#if metIndex === 0}
		<W.SketchCard>
			<W.Muted>
				Nothing to talk with yet. Finish a lesson first — the partner is built only from
				material you've met, so an empty course means an empty conversation.
			</W.Muted>
		</W.SketchCard>
		<W.SketchButton class="mt-auto" href="/today">Back to Today</W.SketchButton>
	{:else}
		<W.Muted>
			Built only from lessons 1–{metIndex}. Nothing you haven't met.
		</W.Muted>

		<div class="flex flex-1 flex-col gap-[6px]">
			{#each turns as turn, i (i)}
				<W.SketchCard
					tone={turn.who === 'you' ? 'accent' : 'default'}
					class="max-w-[85%] {turn.who === 'you' ? 'self-end' : 'self-start'}"
				>
					<W.Fr class="text-[13.5px]">
						{turn.who === 'you' ? '🎙 ' : ''}{turn.text}
					</W.Fr>
				</W.SketchCard>
			{/each}
		</div>

		<W.AnswerField bind:value={said} placeholder="say your line…" minHeight={44} aria-label="Your turn" />
		<div class="flex items-center gap-2">
			<W.MicButton />
			<W.SketchButton tone="primary" onclick={send} disabled={said.trim() === ''}>
				Send
			</W.SketchButton>
		</div>

		<W.Muted class="text-center text-[11px]">
			Stuck? Every phrase you need is in Phrases — {corpus.length} lines are in play.
		</W.Muted>
	{/if}
</W.Phone>
