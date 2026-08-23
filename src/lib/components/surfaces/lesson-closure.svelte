<script lang="ts">
	import * as W from '$lib/components/wireframe/index.js';

	let understood = $state(80);
	let couldSay = $state(45);
</script>

<!-- 1q · 17 · Lesson closure -->
<W.Phone>
	<W.TitleBar center="Lesson 51 done" />
	<W.Heading>Before you go —</W.Heading>

	<W.SketchCard>
		<div class="text-[13.5px]">I understood the dialogue</div>
		<W.SketchSlider bind:value={understood} />
	</W.SketchCard>

	<W.SketchCard>
		<div class="text-[13.5px]">I could say the key lines myself</div>
		<W.SketchSlider bind:value={couldSay} />
	</W.SketchCard>

	<W.SketchCard>
		<div class="text-[13.5px]">Effort today felt…</div>
		<div class="flex items-center gap-2">
			<W.Chip>easy</W.Chip>
			<W.Chip active>just right</W.Chip>
			<W.Chip>too hard</W.Chip>
		</div>
	</W.SketchCard>

	<W.Muted>Your ratings tune when lines resurface — be honest, not kind.</W.Muted>

	<W.RationaleNote>calibration, not celebration; no confetti</W.RationaleNote>

	<W.SketchButton tone="primary">Done for today</W.SketchButton>
</W.Phone>
