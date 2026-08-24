<script lang="ts">
	/**
	 * WikiArticle — the full-page reading form of a wiki entry (#47, job 2).
	 *
	 * The one surface where a long scroll is legitimate: entered deliberately,
	 * read top to bottom. The unstuck lines lead, mirroring the page shape the
	 * stuck panel excerpts; related terms close the page as glossary links.
	 */
	import * as W from '$lib/components/ui/index.js';
	import { glossaryEntry, type WikiPage } from '$lib/content/wiki/index.js';

	let { page }: { page: WikiPage } = $props();

	const related = $derived(
		page.terms
			.map((id) => glossaryEntry(id))
			.filter((entry): entry is NonNullable<typeof entry> => entry !== undefined)
	);
</script>

<div class="anim-rise pt-2">
	<W.Heading>{page.title}</W.Heading>
	<W.Muted class="mt-1">{page.lead}</W.Muted>
</div>

<W.Card tone="parchment" class="gap-1.5">
	<div class="text-2xs font-bold tracking-[0.14em] text-brand uppercase">If you are stuck</div>
	{#each page.unstuck as line, i (i)}
		<p class="m-0 text-sm leading-relaxed">{line}</p>
	{/each}
</W.Card>

{#each page.sections as section (section.heading)}
	<div class="flex flex-col gap-1.5">
		<h2 class="m-0 font-display text-lg leading-tight font-semibold">{section.heading}</h2>
		{#each section.paragraphs as paragraph, i (i)}
			<W.Muted class="text-sm leading-relaxed">{paragraph}</W.Muted>
		{/each}
	</div>
{/each}

{#if related.length > 0}
	<div class="flex flex-col gap-2 border-t border-line pt-4">
		<div class="text-2xs font-bold tracking-[0.14em] text-text-faint uppercase">Related terms</div>
		<div class="flex flex-wrap gap-2">
			{#each related as entry (entry.id)}
				<a
					href="/wiki/glossary/{entry.id}"
					class="{W.chipVariants({ interactive: true })} no-underline"
				>
					{entry.term}
				</a>
			{/each}
		</div>
	</div>
{/if}
