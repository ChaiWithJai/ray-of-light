<script lang="ts">
	import * as W from '$lib/components/wireframe/index.js';
</script>

<!-- 1u · 21 · Conversation bridge -->
<W.Phone>
	<W.TitleBar left="✕" center="🏪 At the market" />

	<W.Muted>Built only from lessons 1–51. Nothing you haven't met.</W.Muted>

	<div class="flex flex-1 flex-col gap-[6px]">
		<W.SketchCard class="max-w-[85%] self-start">
			<W.Fr class="text-[13.5px]">Bonjour ! Et avec ceci ? ▶</W.Fr>
		</W.SketchCard>

		<W.SketchCard tone="accent" class="max-w-[85%] self-end">
			<W.Fr class="text-[13.5px]">🎙 Je voudrais du fromage…</W.Fr>
		</W.SketchCard>

		<W.SketchCard class="max-w-[85%] self-start">
			<W.Fr class="text-[13.5px]">Combien ? ▶</W.Fr>
		</W.SketchCard>
	</div>

	<div class="flex items-center justify-center gap-2">
		<W.Chip class="text-[11px]">stuck? tap for a phrase</W.Chip>
	</div>

	<W.MicButton />

	<W.RationaleNote>
		AI (or partner) constrained to learned material — lessons become communication
	</W.RationaleNote>
</W.Phone>
