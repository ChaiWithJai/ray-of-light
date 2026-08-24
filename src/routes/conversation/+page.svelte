<script lang="ts">
	/**
	 * 1u · Conversation bridge. The partner is constrained to material the learner
	 * has met — and the constraint is *enforced* by drawing turns from the met
	 * corpus, not by asking a model nicely. See docs/ISSUE-1-LIMITATIONS.md for
	 * why the model-backed version is deferred.
	 */
	import * as W from '$lib/components/ui/index.js';
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

<W.Shell title="At the market" back="/today" backKind="close">
	<div class="anim-rise pt-2">
		<W.Heading>At the market</W.Heading>
	</div>

	{#if metIndex === 0}
		<W.Card>
			<W.Muted>
				Nothing to talk about yet. Finish a lesson first: your conversation partner speaks
				only lines you have already met, so it grows as you do.
			</W.Muted>
		</W.Card>
		<W.Button class="mt-auto" href="/today">Back to Today</W.Button>
	{:else}
		<W.Muted>
			Built only from lessons 1–{metIndex}. Nothing you haven't met.
		</W.Muted>

		<div class="flex flex-1 flex-col gap-2">
			{#each turns as turn, i (i)}
				<W.Card
					tone={turn.who === 'you' ? 'accent' : 'default'}
					class="max-w-[85%] {turn.who === 'you' ? 'self-end' : 'self-start'}"
				>
					<W.Fr class="text-sm">
						{turn.who === 'you' ? '🎙 ' : ''}{turn.text}
					</W.Fr>
				</W.Card>
			{/each}
		</div>

		<W.AnswerField bind:value={said} placeholder="say your line…" minHeight={44} aria-label="Your turn" />
		<div class="flex items-center gap-2">
			<W.MicButton />
			<W.Button tone="primary" onclick={send} disabled={said.trim() === ''}>
				Send
			</W.Button>
		</div>

		<W.Hint>
			Stuck? Every phrase you need is in Phrases. {corpus.length} lines are in play.
		</W.Hint>
	{/if}
</W.Shell>
