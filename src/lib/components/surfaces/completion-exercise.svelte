<script lang="ts">
	import * as W from '$lib/components/wireframe/index.js';
</script>

<!-- 1l · 12 · Completion exercise -->
<W.Phone>
	<W.TitleBar left="✕" center="Exercise 2 · 4/5" />

	<W.Muted>Fill in the missing piece:</W.Muted>

	<W.SketchCard tone="accent">
		<W.Fr class="text-[17px]">
			Je voudrais un kilo <W.Blank>?</W.Blank> tomates.
		</W.Fr>
	</W.SketchCard>

	<div class="flex flex-wrap items-center justify-center gap-2">
		<W.Chip>du</W.Chip>
		<W.Chip active>de</W.Chip>
		<W.Chip>des</W.Chip>
		<W.Chip>à</W.Chip>
	</div>

	<W.SketchButton tone="primary">Check</W.SketchButton>

	<W.SketchCard>
		<W.Muted>
			After quantities → always <b>de</b>: un kilo <b>de</b>, beaucoup <b>de</b>…
		</W.Muted>
	</W.SketchCard>

	<W.RationaleNote>
		cue-supported retrieval; the missing element is always the lesson's target construction
	</W.RationaleNote>
</W.Phone>
