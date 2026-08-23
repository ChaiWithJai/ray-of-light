<script lang="ts">
	import * as W from '$lib/components/wireframe/index.js';
</script>

<!-- 1b · 2 · Learning plan -->
<W.Phone>
	<W.TitleBar left="◁" center="Getting started · 2/3" />
	<W.Heading>How much, daily?</W.Heading>

	<div class="flex items-center gap-2">
		<W.Chip>15 min</W.Chip>
		<W.Chip active>25 min</W.Chip>
		<W.Chip>40 min</W.Chip>
	</div>

	<W.SketchCard>
		<div class="text-[13px] font-semibold">Your projected path</div>
		<div class="mt-[4px] flex items-center gap-2">
			<div class="flex-1">
				<W.Rail value={100} />
				<W.Muted class="mt-[3px]">L1–49 passive wave</W.Muted>
			</div>
			<div class="flex-1">
				<W.Rail value={0} />
				<W.Muted class="mt-[3px]">L50+ active wave</W.Muted>
			</div>
		</div>
		<W.Muted class="mt-[6px]">
			Day 50: you'll start translating Lesson 1 back into French — from memory.
		</W.Muted>
	</W.SketchCard>

	<W.SketchCard>
		<div class="text-[13px] font-semibold">Goal</div>
		<div class="flex flex-wrap items-center gap-2">
			<W.Chip active>Travel</W.Chip>
			<W.Chip>Family</W.Chip>
			<W.Chip>Work</W.Chip>
			<W.Chip>Reading</W.Chip>
		</div>
	</W.SketchCard>

	<W.Muted>Every 7th lesson is a review day — that's built in, not extra.</W.Muted>

	<W.RationaleNote>
		commitment sets pacing; expectation calibration, not gamified streaks
	</W.RationaleNote>

	<W.SketchButton tone="primary">Set my plan</W.SketchButton>
</W.Phone>
