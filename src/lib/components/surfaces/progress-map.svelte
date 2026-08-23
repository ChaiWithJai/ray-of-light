<script lang="ts">
	import * as W from '$lib/components/wireframe/index.js';

	/** Capability, not lesson count — how far each construction has travelled. */
	const constructions = [
		{ label: 'je voudrais +', filled: 5 },
		{ label: 'quantité + de', filled: 3 },
		{ label: 'est-ce que… ?', filled: 2 },
		{ label: 'il y a…', filled: 1 }
	];

	const states = ['exposed', 'recognized', 'recalled', 'stabilized', 'transferable'];
</script>

<!-- 1s · 19 · Progress map -->
<W.Phone>
	<W.TitleBar left="☰" center="Progress" />

	<W.Muted>Capability, not lesson count. 5 states per construction:</W.Muted>

	<div class="flex items-center gap-[4px] text-[10.5px] text-ink-soft">
		{#each states as state, i (state)}
			{#if i > 0}<span>→</span>{/if}
			<span>{state}</span>
		{/each}
	</div>

	<div class="flex flex-col gap-[6px]">
		{#each constructions as c (c.label)}
			<W.SketchCard class="p-[8px]">
				<div class="flex items-center justify-between gap-2">
					<W.Fr class="text-[13.5px]">{c.label}</W.Fr>
					<W.StageMeter filled={c.filled} />
				</div>
			</W.SketchCard>
		{/each}
	</div>

	<W.RationaleNote>
		no "completed" flag anywhere; a lesson can be finished but not yet retrievable
	</W.RationaleNote>

	<W.TabBar />
</W.Phone>
