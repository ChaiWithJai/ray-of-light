<script lang="ts">
	/**
	 * 1s · Progress map. Capability, not consumption. Everything here is derived
	 * from the evidence log — there is no stored progress field to render (AC 10).
	 */
	import * as W from '$lib/components/wireframe/index.js';
	import { COURSES } from '$lib/content/index.js';
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
</script>

<svelte:head><title>Progress</title></svelte:head>

<W.Phone>
	<W.TitleBar left="☰" center="Progress" />

	<W.Muted>Capability, not lesson count. 5 states per construction:</W.Muted>
	<div class="flex flex-wrap items-center gap-[4px] text-[10.5px] text-ink-soft">
		{#each CONSTRUCTION_STATES as state, i (state)}
			{#if i > 0}<span>→</span>{/if}<span>{state}</span>
		{/each}
	</div>

	{#if seen.length === 0}
		<W.SketchCard>
			<W.Muted>
				Nothing yet. Constructions appear here once you've met them in a lesson — not when
				you finish one.
			</W.Muted>
		</W.SketchCard>
	{:else}
		<div class="flex flex-col gap-[6px]">
			{#each seen as row (row.construction.id)}
				<W.SketchCard class="p-[8px]">
					<div class="flex items-center justify-between gap-2">
						<W.Fr class="text-[13.5px]">{row.construction.label}</W.Fr>
						<W.StageMeter filled={stateRank(row.state) + 1} />
					</div>
					<W.Muted class="text-[11px]">{row.construction.gloss}</W.Muted>
				</W.SketchCard>
			{/each}
		</div>
	{/if}

	{#if completed > 0 && seen.every((r) => stateRank(r.state) < 2)}
		<W.SketchCard tone="warn">
			<W.Muted class="text-[11.5px] text-note">
				You've finished {completed}
				{completed === 1 ? 'lesson' : 'lessons'}, but nothing is retrievable yet. That is
				expected this early — and it is why there is no "completed" badge here.
			</W.Muted>
		</W.SketchCard>
	{/if}

	<W.Muted class="text-center text-[11px]">
		{seen.length} of {course.constructions.size} constructions met
	</W.Muted>

	<W.TabBar />
</W.Phone>
