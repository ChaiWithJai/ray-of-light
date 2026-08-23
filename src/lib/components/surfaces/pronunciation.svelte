<script lang="ts">
	import * as W from '$lib/components/wireframe/index.js';
</script>

<!-- 1g · 7 · Pronunciation layer -->
<W.Phone>
	<W.TitleBar left="◁ spread" center="Pronounce" />

	<W.SketchCard tone="accent">
		<W.Fr class="text-[18px]">Je voudrais un kilo de tomates.</W.Fr>
		<W.Muted>zhuh voo-DREH uh(n) kee-LO…</W.Muted>
	</W.SketchCard>

	<W.SketchCard>
		<W.Muted class="text-[12px]">native</W.Muted>
		<W.Waveform bars={[{ h: 10 }, { h: 24 }, { h: 30 }, { h: 14 }, { h: 26 }, { h: 8 }, { h: 20 }]} />

		<W.Muted class="mt-[4px] text-[12px]">you</W.Muted>
		<W.Waveform
			tone="blue"
			bars={[{ h: 8 }, { h: 20 }, { h: 31 }, { h: 10 }, { h: 28 }, { h: 6 }, { h: 16 }]}
		/>
	</W.SketchCard>

	<div class="flex items-center justify-center gap-2">
		<W.Chip>▶ normal</W.Chip>
		<W.Chip>🐢 slow</W.Chip>
	</div>

	<W.MicButton />
	<W.Muted class="text-center">compare by ear — no scores, no red marks</W.Muted>

	<W.RationaleNote>
		imitation over evaluation; rhythm &amp; liaison, not points
	</W.RationaleNote>
</W.Phone>
