<script lang="ts">
	import * as W from '$lib/components/wireframe/index.js';
</script>

<!--
	1e · 5 · Parallel spread — the center of the product.
	Every later state (1i, 1m) is this same layout with support removed.
-->
<W.Phone width={340}>
	<W.TitleBar left="✕" center="Lesson 51 · Au marché" right="♪" />

	<div class="flex items-center justify-between text-[12px] text-ink-soft">
		<span>FRANÇAIS</span><span>ENGLISH</span>
	</div>

	<W.PairRow>
		<W.Fr n={1}>Bonjour, madame.</W.Fr>
		<W.En n={1}>Good morning, madam.</W.En>
	</W.PairRow>

	<W.PairRow highlight>
		<W.Fr n={2}>
			<b>Je voudrais un kilo de tomates.</b>
			<span class="text-[11px]">▶</span>
		</W.Fr>
		<W.En n={2}>I would like a kilo of tomatoes.</W.En>
	</W.PairRow>

	<W.PairRow>
		<W.Fr n={3}>Et avec ceci ?</W.Fr>
		<W.En n={3}>Anything else?</W.En>
	</W.PairRow>

	<W.PairRow>
		<W.Fr n={4}>C'est tout, merci.</W.Fr>
		<W.En n={4}>That's all, thanks.</W.En>
	</W.PairRow>

	<div class="mt-auto flex items-center justify-center gap-[14px]">
		<W.PlayButton glyph="⏮" />
		<W.PlayButton tone="blue" />
		<W.PlayButton glyph="⏭" />
	</div>

	<div class="flex items-center justify-center gap-2">
		<W.Chip>cover EN</W.Chip>
		<W.Chip>cover FR</W.Chip>
		<W.Chip>notes</W.Chip>
	</div>

	<W.RationaleNote>
		lines stay horizontally aligned; audio belongs to the FR line; tap FR to replay. Same
		layout hosts every later state (<W.SurfaceLink id="1i" />, <W.SurfaceLink id="1m" />).
	</W.RationaleNote>
</W.Phone>
