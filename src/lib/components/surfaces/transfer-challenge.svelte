<script lang="ts">
	import * as W from '$lib/components/wireframe/index.js';
</script>

<!-- 1o · 15 · Transfer challenge -->
<W.Phone>
	<W.TitleBar left="✕" center="Make it yours" />

	<W.SketchCard tone="parchment">
		<div class="text-[13px]">🏨 New situation: a hotel desk, 10 pm.</div>
		<W.Muted>You want to book a room for two nights.</W.Muted>
	</W.SketchCard>

	<W.Muted>Use a construction you already own:</W.Muted>

	<W.Chip active class="self-start">Je voudrais + inf/noun</W.Chip>

	<W.AnswerField placeholder="say or type your new sentence…" minHeight={56} />

	<W.MicButton />

	<W.SketchCard tone="good">
		<div class="text-[13px] text-good">
			✓ "Je voudrais réserver une chambre pour deux nuits."
		</div>
	</W.SketchCard>

	<W.RationaleNote>
		generalization beyond the memorized dialogue = the "transferable" state in
		<W.SurfaceLink id="1s" />
	</W.RationaleNote>
</W.Phone>
