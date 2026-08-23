<script lang="ts">
	import * as W from '$lib/components/wireframe/index.js';
</script>

<!-- 1m · 13 · Active-wave spread — 1e mirrored, French covered -->
<W.Phone width={340}>
	<W.TitleBar left="✕" center="Recall · Lesson 2" />

	<W.Muted class="text-center">You read this 49 days ago. Say it in French.</W.Muted>

	<div class="flex items-center justify-between text-[12px] text-ink-soft">
		<span>FRANÇAIS</span><span>ENGLISH</span>
	</div>

	<W.PairRow>
		<W.CoveredCell>said ✓</W.CoveredCell>
		<W.En n={1}>Good morning, sir.</W.En>
	</W.PairRow>

	<W.PairRow highlight>
		<W.CoveredCell tone="accent">your turn 🎙</W.CoveredCell>
		<W.En n={2}>I would like a coffee.</W.En>
	</W.PairRow>

	<W.PairRow>
		<W.CoveredCell>···</W.CoveredCell>
		<W.En n={3}>With milk?</W.En>
	</W.PairRow>

	<W.MicButton />

	<div class="flex items-center justify-center gap-2">
		<W.Chip>hint: first word</W.Chip>
		<W.Chip>reveal</W.Chip>
	</div>

	<W.RationaleNote>
		the strongest part of Assimil: same spread as <W.SurfaceLink id="1e" />, mirrored — French
		covered, produced aloud line by line
	</W.RationaleNote>
</W.Phone>
