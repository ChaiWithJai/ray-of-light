<script lang="ts">
	/**
	 * 1s · Progress map. Capability, not consumption. Everything here is derived
	 * from the evidence log — there is no stored progress field to render (AC 10).
	 */
	import * as W from '$lib/components/ui/index.js';
	import { COURSES, getLesson } from '$lib/content/index.js';
	import { CONSTRUCTION_STATES, stateRank } from '$lib/schemas/learner.js';
	import { profile } from '$lib/stores/profile.svelte.js';

	const course = $derived(COURSES[profile.language]);
	const states = $derived(profile.states);

	const rows = $derived(
		[...course.constructions.values()]
			.map((c) => ({ construction: c, state: states.get(c.id) ?? null }))
			.sort((a, b) => stateRank(b.state) - stateRank(a.state))
	);

	const seen = $derived(rows.filter((r) => r.state !== null));
	const completed = $derived(profile.completedLessons.length);

	/** Learner-voiced, one-line definitions of the five capability states (D3). */
	const STATE_MEANINGS: Record<(typeof CONSTRUCTION_STATES)[number], string> = {
		exposed: "you've met it in a lesson",
		recognized: 'you understand it when you hear or read it',
		recalled: "you've produced it yourself from the English, after a delay",
		stabilized: "you've recalled it again on separate days",
		transferable: "you've used it in a brand-new situation of your own"
	};
	let showStateMeanings = $state(false);

	// Journey orientation (#37): tie the constructions to the lesson path they
	// came from. Everything derives from evidence and the course itself.
	const completedIndexes = $derived(
		profile.completedLessons
			.map((id) => getLesson(profile.language, id)?.index)
			.filter((index): index is number => typeof index === 'number')
	);
</script>

<svelte:head><title>Progress</title></svelte:head>

<W.Shell brand title="Progress" nav settingsLink>
	<div class="anim-rise pt-2">
		<W.Heading>Progress</W.Heading>
	</div>

	<W.JourneyArc
		language={profile.language}
		{completedIndexes}
		class="anim-rise anim-d1"
		caption={seen.length > 0
			? `Your ${seen.length} ${seen.length === 1 ? 'pattern' : 'patterns'} so far come from the ${completedIndexes.length} ${completedIndexes.length === 1 ? 'lesson' : 'lessons'} you've worked. The rest of the path holds the remaining ${course.constructions.size - seen.length}.`
			: `The path ahead holds ${course.constructions.size} phrase patterns. Each one appears here as you meet it.`}
	/>

	<W.Muted>
		This page tracks what you can do with each phrase pattern you've met. Every pattern
		climbs the same ladder as you show more with it:
	</W.Muted>
	<div class="flex flex-wrap items-center gap-[4px] text-2xs text-text-soft">
		{#each CONSTRUCTION_STATES as state, i (state)}
			{#if i > 0}<span>→</span>{/if}<span>{state}</span>
		{/each}
		<button
			type="button"
			class="ml-1 cursor-pointer rounded-full border border-line px-2 py-0.5 text-2xs text-text-soft outline-none hover:text-text focus-visible:ring-2 focus-visible:ring-brand"
			aria-expanded={showStateMeanings}
			onclick={() => (showStateMeanings = !showStateMeanings)}
		>
			{showStateMeanings ? 'hide meanings' : 'what these mean'}
		</button>
	</div>
	{#if showStateMeanings}
		<W.Card class="anim-uncover p-3">
			<dl class="m-0 flex flex-col gap-1 text-2xs">
				{#each CONSTRUCTION_STATES as state (state)}
					<div class="flex gap-2">
						<dt class="w-24 shrink-0 font-bold">{state}</dt>
						<dd class="m-0 text-text-soft">{STATE_MEANINGS[state]}</dd>
					</div>
				{/each}
			</dl>
		</W.Card>
	{/if}

	{#if seen.length === 0}
		<W.Card>
			<W.Muted>
				Nothing yet. Phrase patterns appear here as soon as you meet them inside a lesson.
			</W.Muted>
		</W.Card>
	{:else}
		<!-- #34: the capability pips grown into the screen's actual story — each
		     construction shows where it stands on the ladder, by name, with what
		     that state means in the learner's own terms. -->
		<div class="flex flex-col gap-2.5">
			{#each seen as row, i (row.construction.id)}
				{@const reached = row.state ?? 'exposed'}
				{@const rank = stateRank(row.state)}
				<W.Card class="anim-rise gap-2 p-4 {i < 4 ? `anim-d${i + 1}` : ''}">
					<div class="flex items-start justify-between gap-3">
						<div class="min-w-0">
							<W.Fr class="text-base">{row.construction.label}</W.Fr>
							<W.Muted class="mt-0.5 text-2xs">{row.construction.gloss}</W.Muted>
						</div>
						<div class="flex shrink-0 flex-col items-end gap-1.5 pt-0.5">
							<span class="text-2xs font-bold tracking-[0.14em] text-brand-deep uppercase">
								{reached}
							</span>
							<W.StageMeter filled={rank + 1} segmentClass="h-2.5 w-5" class="gap-1.5" />
						</div>
					</div>
					<W.Muted class="border-t border-line/70 pt-1.5 text-2xs">
						{STATE_MEANINGS[reached]}
					</W.Muted>
				</W.Card>
			{/each}
		</div>
	{/if}

	{#if completed > 0 && seen.every((r) => stateRank(r.state) < 2)}
		<W.Card tone="warn">
			<W.Muted class="text-2xs text-caution">
				You've finished {completed}
				{completed === 1 ? 'lesson' : 'lessons'}, and nothing is retrievable yet. That is
				normal this early: retrieval strength grows when lessons return for recall a few
				days after you first meet them.
			</W.Muted>
		</W.Card>
	{/if}

	<W.Muted class="text-center text-2xs">
		{seen.length} of {course.constructions.size} constructions met
	</W.Muted>

</W.Shell>
