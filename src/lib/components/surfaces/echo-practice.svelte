<script lang="ts">
	import * as W from '$lib/components/wireframe/index.js';
</script>

<!-- 1j · 10 · Echo practice -->
<W.Phone>
	<W.TitleBar left="✕" center="Shadow" />

	<W.Muted>Repeat right on the speaker's heels — chunk by chunk.</W.Muted>

	<W.SketchCard tone="accent">
		<div class="flex flex-wrap items-center gap-[5px]">
			<W.Chip active>Je voudrais</W.Chip>
			<W.Chip>un kilo</W.Chip>
			<W.Chip>de tomates</W.Chip>
		</div>
		<W.Waveform
			class="mt-[6px]"
			bars={[
				{ h: 12, tone: 'blue' },
				{ h: 26, tone: 'blue' },
				{ h: 18, tone: 'blue' },
				{ h: 8, dim: true },
				{ h: 20, dim: true },
				{ h: 10, dim: true }
			]}
		/>
	</W.SketchCard>

	<div class="text-center text-[14px]">
		▶ chunk … <b class="text-accent-blue">your turn</b> … next chunk
	</div>

	<W.MicButton />

	<div class="flex items-center justify-center gap-2">
		<W.Chip>replay chunk</W.Chip>
		<W.Chip>whole line</W.Chip>
	</div>

	<W.RationaleNote>
		segmented audio builds phrase chunking, not word-by-word reading aloud
	</W.RationaleNote>
</W.Phone>
