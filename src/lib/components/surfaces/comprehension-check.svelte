<script lang="ts">
	import * as W from '$lib/components/wireframe/index.js';
</script>

<!-- 1i · 9 · Comprehension check — 1e with the English column removed -->
<W.Phone width={340}>
	<W.TitleBar left="✕" center="Do you get it?" />

	<div class="flex items-center justify-between text-[12px] text-ink-soft">
		<span>FRANÇAIS</span><span>ENGLISH</span>
	</div>

	<W.PairRow>
		<W.Fr n={1}>Bonjour, madame.</W.Fr>
		<W.CoveredCell>covered</W.CoveredCell>
	</W.PairRow>

	<W.PairRow highlight>
		<W.Fr n={2}>Je voudrais un kilo de tomates. ▶</W.Fr>
		<W.CoveredCell>covered</W.CoveredCell>
	</W.PairRow>

	<W.PairRow>
		<W.Fr n={3}>Et avec ceci ?</W.Fr>
		<W.CoveredCell>covered</W.CoveredCell>
	</W.PairRow>

	<W.SketchCard>
		<div class="text-[13.5px]">Line 2 means…</div>
		<W.SketchButton class="text-[13.5px]">"I'd like a kilo of tomatoes"</W.SketchButton>
		<W.SketchButton class="text-[13.5px]">"Do you have any tomatoes?"</W.SketchButton>
	</W.SketchCard>

	<W.Muted class="text-center">
		tap-and-hold a covered line to peek (counts as a hint)
	</W.Muted>

	<W.RationaleNote>
		same spread as <W.SurfaceLink id="1e" />, English removed — translation dependency comes
		off first
	</W.RationaleNote>
</W.Phone>
