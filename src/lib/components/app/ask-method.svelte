<script lang="ts">
	/**
	 * AskMethod — tier T1 of the Bonsai aside harness (#48, spec §5).
	 *
	 * The learner asks in their own words; the app answers by *finding* the
	 * method's own passages and linking to them. There is no model here, no
	 * WebGPU, no generated prose — and the surface says so out loud rather than
	 * implying an intelligence it does not have. It sits beside the notebook in
	 * the desktop aside and inside the mobile session sheet, the same surface
	 * in both places.
	 *
	 * The hint boundary (spec §9, unresolved) is applied here and stated before
	 * the learner asks: see `$lib/harness/hint-boundary.ts`.
	 */
	import { ArrowUpRight } from '@lucide/svelte';
	import * as W from '$lib/components/ui/index.js';
	import { getLesson } from '$lib/content/index.js';
	import { methodCorpusAvailable } from '$lib/harness/corpus.js';
	import { buildHarnessContext } from '$lib/harness/context.js';
	import {
		MID_ATTEMPT_NOTICE,
		MID_ATTEMPT_RECORDED,
		retrievalCountsAsHint
	} from '$lib/harness/hint-boundary.js';
	import { askTheMethod, type RetrievalMatch } from '$lib/harness/retrieval.js';
	import type { StepId } from '$lib/flow.js';
	import type { SessionMode } from '$lib/schemas/index.js';
	import { toDayKey } from '$lib/schemas/schedule.js';
	import { activeLine } from '$lib/stores/active-line.svelte.js';
	import { attempt } from '$lib/stores/attempt.svelte.js';
	import { profile } from '$lib/stores/profile.svelte.js';

	let {
		lessonId,
		step,
		mode = 'learn'
	}: { lessonId?: string; step?: StepId; mode?: SessionMode } = $props();

	// Degradation floor (spec §5): no corpus, no surface. An input box that
	// cannot answer is worse than no input box.
	const available = methodCorpusAvailable();

	const lesson = $derived(lessonId ? getLesson(profile.language, lessonId) : undefined);
	const line = $derived(
		lesson && activeLine.current?.lessonId === lesson.id
			? lesson.lines.find((candidate) => candidate.id === activeLine.current?.lineId)
			: undefined
	);
	const openAttempt = $derived(
		attempt.lessonId && attempt.lessonId === lessonId ? attempt.current : null
	);

	const context = $derived(
		buildHarnessContext({
			language: profile.language,
			mode: lessonId ? mode : null,
			step: step ?? null,
			lesson: lesson ?? null,
			line: line ?? null,
			constructions: lesson?.constructions,
			states: profile.states,
			resurfaceQueue: profile.loaded ? profile.dueResurfaceItems(toDayKey(new Date())) : [],
			attempt: openAttempt
		})
	);

	/** Would asking right now cap the open attempt? The owner's open ruling. */
	const wouldCap = $derived(retrievalCountsAsHint(context.attempt));

	let query = $state('');
	let asked = $state('');
	let matches = $state<RetrievalMatch[]>([]);
	let capped = $state(false);

	function ask() {
		const text = query.trim();
		if (!text) return;
		// The boundary is applied at the moment of asking, from the same value
		// the notice above was rendered from — no second, later judgement.
		if (wouldCap) {
			attempt.markHinted();
			capped = true;
		}
		asked = text;
		matches = askTheMethod(text, context);
	}
</script>

{#if available}
	<div class="flex flex-col gap-3" data-testid="ask-method">
		<div class="text-2xs font-bold tracking-[0.14em] text-text-faint uppercase">
			Ask the method
		</div>
		<W.Muted class="text-xs" data-testid="ask-method-honesty">
			This finds the method's own words and links you to them. It does not write answers.
		</W.Muted>

		{#if wouldCap}
			<!-- #49 register: invite, don't threaten. The fact lands before the
			     learner asks, because unlike a peek they cannot see from outside
			     that this question touches their open attempt. -->
			<W.Card tone="parchment" data-testid="ask-method-hint-notice">
				<W.Muted class="text-xs">{MID_ATTEMPT_NOTICE}</W.Muted>
			</W.Card>
		{/if}

		<W.AnswerField
			bind:value={query}
			data-testid="ask-method-input"
			aria-label="Ask the method a question"
			minHeight={52}
			class="p-2.5 text-sm"
			placeholder="Why does this keep coming back?"
		/>
		<W.Button
			data-testid="ask-method-submit"
			disabled={!query.trim()}
			class="w-auto self-start px-4 text-sm"
			onclick={ask}
		>
			Find the passage
		</W.Button>

		{#if capped}
			<W.Muted class="text-xs" data-testid="ask-method-hint-recorded">
				{MID_ATTEMPT_RECORDED}
			</W.Muted>
		{/if}

		{#if asked}
			{#if matches.length === 0}
				<W.Muted class="text-xs" data-testid="ask-method-empty">
					Nothing in the method matches that yet. Try naming what you are doing — recall,
					transfer, a cover, a construction.
				</W.Muted>
			{:else}
				<ul class="m-0 flex list-none flex-col gap-2 p-0" data-testid="ask-method-results">
					{#each matches as match (match.passage.id)}
						<li
							class="flex flex-col gap-1.5 rounded-lg border border-line bg-surface-raised/70 px-3 py-2"
						>
							<div class="flex items-center justify-between gap-2">
								<!-- The pill names the source, not the excerpt's kind: three
								     "if you are stuck" pills in a row say nothing about where
								     the words came from. -->
								<W.Pill active={match.contextual}>{match.passage.title}</W.Pill>
								{#if match.contextual}
									<span class="text-2xs text-text-faint">this step</span>
								{/if}
							</div>
							{#if match.passage.heading}
								<div class="text-2xs text-text-faint">{match.passage.heading}</div>
							{/if}
							<p class="m-0 text-sm leading-relaxed">{match.passage.text}</p>
							<a
								href={match.passage.href}
								data-testid="ask-method-source"
								class="flex items-center gap-1 self-start text-2xs text-text-faint underline decoration-dotted underline-offset-2 outline-none hover:text-text-soft focus-visible:ring-2 focus-visible:ring-brand"
							>
								Read the page
								<ArrowUpRight size={11} aria-hidden="true" />
							</a>
						</li>
					{/each}
				</ul>
				<W.Muted class="text-2xs" data-testid="ask-method-provenance">
					{matches.length === 1 ? 'One passage' : `${matches.length} passages`}, quoted from the
					method wiki exactly as written.
				</W.Muted>
			{/if}
		{/if}
	</div>
{/if}
