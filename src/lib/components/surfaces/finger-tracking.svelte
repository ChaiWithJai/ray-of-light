<script lang="ts">
	import * as W from '$lib/components/wireframe/index.js';
</script>

<!-- 1f · 6 · Finger-tracking layer -->
<W.Phone width={340}>
	<W.TitleBar left="✕" center="Parallel reading" right="♪" />

	<W.PairRow class="opacity-45">
		<W.Fr n={1}>Bonjour, madame.</W.Fr>
		<W.En n={1}>Good morning, madam.</W.En>
	</W.PairRow>

	<div class="relative">
		<W.PairRow highlight>
			<W.Fr n={2}>Je voudrais un kilo…</W.Fr>
			<W.En n={2}>I would like a kilo…</W.En>
		</W.PairRow>
		<W.TrackPoint class="absolute top-[-6px] left-[8px]" />
		<W.TrackPoint class="absolute top-[-6px] right-[8px]" />
		<div class="absolute top-[8px] right-[44px] left-[44px] border-t-2 border-dashed border-accent-blue"></div>
	</div>

	<W.PairRow class="opacity-45">
		<W.Fr n={3}>Et avec ceci ?</W.Fr>
		<W.En n={3}>Anything else?</W.En>
	</W.PairRow>

	<W.PairRow class="opacity-45">
		<W.Fr n={4}>C'est tout, merci.</W.Fr>
		<W.En n={4}>That's all, thanks.</W.En>
	</W.PairRow>

	<div class="text-center text-[22px] text-accent-blue">↓</div>
	<W.Muted class="text-center">
		drag either side — both anchors move together;<br />audio follows the pair
	</W.Muted>

	<W.RationaleNote>
		two linked touchpoints = joint attention on form + meaning. Desktop: one cross-column
		reading guide, hover links both, ↑↓ moves a pair.
	</W.RationaleNote>
</W.Phone>
