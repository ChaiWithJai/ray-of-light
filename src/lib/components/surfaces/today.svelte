<script lang="ts">
	import * as W from '$lib/components/wireframe/index.js';
</script>

<!-- 1c · 3 · Today -->
<W.Phone>
	<W.TitleBar left="☰" center="Day 51" right="⚙" />
	<W.Heading>Today</W.Heading>

	<W.SketchCard thick>
		<div class="flex items-center justify-between gap-2">
			<div class="font-semibold">Lesson 51 · Au marché</div>
			<W.Pill>new</W.Pill>
		</div>
		<W.Muted>Passive procedure · ~15 min</W.Muted>
		<W.SketchButton tone="primary" class="mt-[4px]">Start</W.SketchButton>
	</W.SketchCard>

	<W.SketchCard>
		<div class="flex items-center justify-between gap-2">
			<div class="font-semibold">Lesson 2 · Au café</div>
			<W.Pill active>recall</W.Pill>
		</div>
		<W.Muted>Active wave: say it in French from the English · ~10 min</W.Muted>
		<W.SketchButton class="mt-[4px]">Start recall</W.SketchButton>
	</W.SketchCard>

	<W.Muted class="text-center">Nothing else to choose. That's the point.</W.Muted>

	<W.RationaleNote>one screen kills choice paralysis &amp; enforces spacing</W.RationaleNote>

	<W.TabBar />
</W.Phone>
