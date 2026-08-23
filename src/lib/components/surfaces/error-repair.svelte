<script lang="ts">
	import * as W from '$lib/components/wireframe/index.js';

	const drills = ['un kilo', 'je bois', 'beaucoup'];
	const tails = ['tomates', 'café', 'pain'];
</script>

<!-- 1p · 16 · Error repair — one recurring error, many contexts -->
<W.Phone>
	<W.TitleBar left="✕" center="Your pattern" />

	<W.SketchCard tone="warn">
		<div class="text-[14px] font-semibold">You keep mixing <i>du</i> / <i>de</i></div>
		<W.Muted>seen 4× this week — let's fix just this one</W.Muted>
	</W.SketchCard>

	<div class="flex flex-col gap-[6px]">
		{#each drills as head, i (head)}
			<W.SketchCard>
				<W.Fr class="text-[14px]">
					{head} <W.Blank width="sm" /> {tails[i]}
				</W.Fr>
			</W.SketchCard>
		{/each}
	</div>

	<div class="flex items-center justify-center gap-2">
		<W.Chip>du</W.Chip>
		<W.Chip>de</W.Chip>
	</div>

	<W.Muted class="text-center">then say each full sentence aloud</W.Muted>

	<W.RationaleNote>
		one recurring error, many contexts — never a mixed "mistakes review" pile
	</W.RationaleNote>
</W.Phone>
