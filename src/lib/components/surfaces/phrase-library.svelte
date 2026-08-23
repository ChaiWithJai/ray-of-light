<script lang="ts">
	import * as W from '$lib/components/wireframe/index.js';

	const phrases = [
		{ fr: 'Je voudrais…', gloss: "I'd like… · from L2, Au café" },
		{ fr: 'Est-ce que vous avez… ?', gloss: 'Do you have…? · from L23' }
	];
</script>

<!-- 1t · 20 · Phrase library -->
<W.Phone>
	<W.TitleBar left="☰" center="Phrases" />

	<W.SearchField placeholder={'🔍 "how do I ask for…"'} />

	<div class="flex items-center gap-2">
		<W.Chip active>requests</W.Chip>
		<W.Chip>shopping</W.Chip>
		<W.Chip>greetings</W.Chip>
	</div>

	<div class="flex flex-col gap-[6px]">
		{#each phrases as phrase (phrase.fr)}
			<W.SketchCard>
				<div class="flex items-center justify-between gap-2">
					<W.Fr class="text-[14px]">{phrase.fr}</W.Fr>
					<W.PlayButton size="sm" />
				</div>
				<W.Muted>{phrase.gloss}</W.Muted>
			</W.SketchCard>
		{/each}
	</div>

	<W.SketchButton>Rehearse these 2 🎙</W.SketchButton>

	<W.RationaleNote>
		constructions in context, for real-world reuse — not a flashcard deck
	</W.RationaleNote>

	<W.TabBar />
</W.Phone>
