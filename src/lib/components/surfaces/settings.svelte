<script lang="ts">
	import * as W from '$lib/components/wireframe/index.js';

	let textSize = $state(55);
</script>

<!-- 1v · 22 · Settings / accessibility -->
<W.Phone>
	<W.TitleBar left="◁" center="Settings" />

	<W.SketchCard>
		<div class="text-[13.5px]">Audio speed</div>
		<div class="flex items-center gap-2">
			<W.Chip>0.75×</W.Chip>
			<W.Chip active>1×</W.Chip>
			<W.Chip>slow first listen</W.Chip>
		</div>
	</W.SketchCard>

	<W.SketchCard>
		<div class="text-[13.5px]">Text size</div>
		<W.SketchSlider bind:value={textSize} />
	</W.SketchCard>

	<W.SketchCard>
		<div class="flex items-center justify-between gap-2">
			<div class="text-[13.5px]">Transliteration (Tamil)</div>
			<W.Pill active>on</W.Pill>
		</div>
		<W.Muted>a temporary scaffold — nudges you to turn it off around L30</W.Muted>
	</W.SketchCard>

	<W.SketchCard>
		<div class="flex items-center justify-between gap-2">
			<div class="text-[13.5px]">Two-finger tracking</div>
			<W.Pill>single-guide</W.Pill>
		</div>
		<W.Muted>accessibility: one linked reading guide instead</W.Muted>
	</W.SketchCard>

	<W.SketchCard>
		<div class="flex items-center justify-between gap-2">
			<div class="text-[13.5px]">Daily reminder</div>
			<W.Pill>7:30 am</W.Pill>
		</div>
	</W.SketchCard>

	<W.RationaleNote>
		everything here reduces irrelevant load; nothing here teaches
	</W.RationaleNote>
</W.Phone>
