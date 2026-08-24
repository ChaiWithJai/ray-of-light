<script lang="ts">
	/**
	 * /wiki/capability — the ladder page. Generated from CONSTRUCTION_STATES,
	 * so the page cannot drift from the schema (a conformance test holds it).
	 */
	import * as W from '$lib/components/ui/index.js';
	import WikiArticle from '$lib/components/app/wiki-article.svelte';
	import { wikiPage } from '$lib/content/wiki/index.js';
	import { SAMPLE_CAST_ID, spriteCastEntry } from '$lib/content/sprite-cast.js';
	import { SPRITE_STAGES } from '$lib/sprites.js';

	const page = wikiPage('capability')!;
	// #46 S2: the ladder, drawn — one real cast member at every stage. The
	// sample is a fixed manifest entry, so the illustration uses exactly the
	// grammar the progress map renders, never bespoke celebration art.
	const sample = spriteCastEntry(SAMPLE_CAST_ID)!;
</script>

<svelte:head><title>{page.title}</title></svelte:head>

<W.Shell title="Method guide" back="/wiki">
	<WikiArticle {page} />

	<W.Card tone="parchment" class="gap-2" data-testid="capability-stage-strip">
		<div class="text-2xs font-bold tracking-[0.14em] text-brand uppercase">The ladder, drawn</div>
		<div class="flex flex-wrap items-end gap-x-4 gap-y-2">
			{#each SPRITE_STAGES as stage (stage)}
				<div class="flex flex-col items-center gap-1">
					<W.Sprite
						constructionId={SAMPLE_CAST_ID}
						state={stage === 'unmet' ? null : stage}
						size={44}
					/>
					<span class="text-2xs text-text-faint">{stage === 'unmet' ? 'not yet met' : stage}</span>
				</div>
			{/each}
		</div>
		<W.Muted class="text-2xs">
			One character — {sample.label} — at each stage. Every construction on your Progress page is
			drawn with this same grammar, always at the stage its evidence earned.
		</W.Muted>
	</W.Card>
</W.Shell>
