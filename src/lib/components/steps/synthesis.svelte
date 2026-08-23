<script lang="ts">
	/**
	 * 1r · Weekly synthesis, every 7th lesson. Interleaving: familiar
	 * constructions in unfamiliar combinations. Nothing new is introduced.
	 */
	import * as W from '$lib/components/ui/index.js';
	import { getConstruction } from '$lib/content/index.js';
	import type { Lesson } from '$lib/schemas/content.js';
	import { profile } from '$lib/stores/profile.svelte.js';

	let { lesson, onDone }: { lesson: Lesson; onDone: () => void } = $props();

	const patterns = $derived(
		lesson.constructions
			.map((c) => getConstruction(lesson.language, c.id))
			.filter((c) => c !== undefined)
	);
	const showTranslit = $derived(lesson.language === 'ta' && profile.settings.transliteration);
</script>

<W.Heading>This week, condensed</W.Heading>

<W.Card>
	<W.Muted class="text-xs">PATTERNS YOU MET</W.Muted>
	<div class="flex flex-wrap items-center gap-2">
		{#each patterns as pattern (pattern.id)}
			<W.Chip>{pattern.label}</W.Chip>
		{/each}
	</div>
</W.Card>

<W.Card>
	<W.Muted class="text-xs">ONE NEW DIALOGUE, ALL OLD PIECES ▶</W.Muted>
	{#each lesson.lines as line (line.id)}
		<div>
			<W.Fr class="text-sm">— {line.targetScript}</W.Fr>
			{#if showTranslit && line.transliteration}
				<W.Muted class="pl-2 text-2xs italic">{line.transliteration}</W.Muted>
			{/if}
			<W.En class="pl-2 text-xs">{line.naturalEnglish}</W.En>
		</div>
	{/each}
</W.Card>

<W.Button tone="primary" onclick={onDone}>Perform it 🎙</W.Button>
<W.Muted class="text-center">nothing new to learn today — only reassembly</W.Muted>
