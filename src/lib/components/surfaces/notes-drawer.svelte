<script lang="ts">
	import * as W from '$lib/components/wireframe/index.js';
</script>

<!-- 1h · 8 · Notes drawer -->
<W.Phone>
	<W.TitleBar left="✕" center="Lesson 51" right="♪" />

	<div class="flex flex-col gap-[6px] opacity-35">
		<W.PairRow>
			<W.Fr n={1}>Bonjour, madame.</W.Fr>
			<W.En n={1}>Good morning…</W.En>
		</W.PairRow>
		<W.PairRow>
			<W.Fr n={2}>
				Je <u class="[text-decoration-color:var(--color-note)]">voudrais</u> un kilo…
			</W.Fr>
			<W.En n={2}>I would like…</W.En>
		</W.PairRow>
	</div>

	<W.SketchCard thick class="mt-auto rounded-t-[14px] rounded-b-[10px]">
		<div class="flex items-center justify-between gap-2">
			<div class="text-[14px] font-semibold">📎 voudrais</div>
			<W.Muted>✕</W.Muted>
		</div>
		<div class="text-[13.5px] leading-[1.35]">
			Conditional of <i>vouloir</i> — the polite "would like". Blunter: <i>je veux</i> ("I
			want") — fine with family, brusque with strangers.
		</div>
		<W.Muted>Culture: shopkeepers expect <i>bonjour</i> before any request.</W.Muted>
	</W.SketchCard>

	<W.RationaleNote>
		note is anchored to the exact word, opens only on demand — just-in-time, never a grammar
		chapter
	</W.RationaleNote>
</W.Phone>
