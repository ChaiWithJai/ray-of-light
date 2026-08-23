<script lang="ts">
	import * as W from '$lib/components/wireframe/index.js';
</script>

<!-- 1a · 1 · Entry assessment -->
<W.Phone>
	<W.TitleBar left="◁" center="Getting started · 1/3" />
	<W.Heading>Let's find your starting point</W.Heading>
	<W.Muted>Respond naturally — there are no wrong answers.</W.Muted>

	<W.SketchCard>
		<div class="flex items-center gap-2">
			<W.PlayButton />
			<div class="flex flex-col gap-[3px]">
				<div class="text-[13px]">Listen, then pick what you heard</div>
				<W.Waveform bars={[{ h: 8 }, { h: 18 }, { h: 26 }, { h: 12 }, { h: 22 }, { h: 9 }]} />
			</div>
		</div>
	</W.SketchCard>

	<W.SketchButton>"He is ordering a coffee"</W.SketchButton>
	<W.Chip active class="w-full rounded-[8px] px-[7px] py-[7px] text-center">
		"She would like a coffee"
	</W.Chip>
	<W.SketchButton>"They don't like coffee"</W.SketchButton>

	<W.SketchCard>
		<div class="text-[13px]">Now say it back:</div>
		<W.MicButton />
		<W.Muted class="text-center">hold to speak</W.Muted>
	</W.SketchCard>

	<W.RationaleNote>
		listening, reading &amp; speaking samples set the entry lesson
	</W.RationaleNote>

	<W.SketchButton tone="primary">Continue</W.SketchButton>
</W.Phone>
