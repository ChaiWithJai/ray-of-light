<script lang="ts">
	import * as W from '$lib/components/wireframe/index.js';
</script>

<!-- 1k · 11 · Translation exercise (FR → EN) -->
<W.Phone>
	<W.TitleBar left="✕" center="Exercise 1 · 2/5" />

	<W.Muted>Translate into English:</W.Muted>

	<W.SketchCard tone="accent">
		<W.Fr class="text-[17px]">Et avec ceci ? ▶</W.Fr>
	</W.SketchCard>

	<W.AnswerField placeholder="type or dictate your English…" minHeight={64} />

	<div class="flex items-center gap-2">
		<W.SketchButton class="flex-1">🎙</W.SketchButton>
		<W.SketchButton tone="primary" class="flex-3">Check</W.SketchButton>
	</div>

	<W.SketchCard tone="good">
		<div class="text-[13px] text-good">✓ "Anything else?" — literal: "and with this?"</div>
	</W.SketchCard>

	<W.RationaleNote>
		confirms precise comprehension; literal gloss shows the FR structure
	</W.RationaleNote>
</W.Phone>
