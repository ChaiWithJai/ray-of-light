<script lang="ts">
	import * as W from '$lib/components/wireframe/index.js';
</script>

<!-- 1n · 14 · Answer comparison -->
<W.Phone>
	<W.TitleBar left="◁" center="Compare" />

	<W.SketchCard>
		<W.Muted class="text-[12px]">YOU SAID</W.Muted>
		<W.Fr>Je <W.Diff tone="bad">voudrait</W.Diff> un café.</W.Fr>
	</W.SketchCard>

	<div class="text-center text-ink-soft">↕ spot the difference</div>

	<W.SketchCard class="border-good">
		<W.Muted class="text-[12px]">CANONICAL ▶</W.Muted>
		<W.Fr>Je <W.Diff tone="good">voudrais</W.Diff> un café.</W.Fr>
	</W.SketchCard>

	<W.SketchCard>
		<W.Muted>
			<i>-s</i> for <i>je</i>; <i>-t</i> is the il/elle form. Sounds identical — spelling only.
		</W.Muted>
	</W.SketchCard>

	<W.SketchButton tone="primary">Say the corrected line 🎙</W.SketchButton>

	<W.Muted class="text-center">tricky lines come back in 1 · 3 · 7 days</W.Muted>

	<W.RationaleNote>
		learner notices the diff first, then reproduces the fix — error discrimination, not red X's
	</W.RationaleNote>
</W.Phone>
