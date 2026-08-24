<script lang="ts">
	/** /wiki/glossary/[term] — one short entry per term, the popover's "more". */
	import { page as route } from '$app/state';
	import * as W from '$lib/components/ui/index.js';
	import { glossaryEntry } from '$lib/content/wiki/index.js';

	const entry = $derived(glossaryEntry(route.params.term!));
</script>

<svelte:head><title>{entry ? entry.term : 'Glossary'}</title></svelte:head>

<W.Shell title="Method guide" back="/wiki/glossary">
	{#if entry}
		<div class="anim-rise pt-2">
			<W.Heading>{entry.term}</W.Heading>
			<W.Muted class="mt-1">{entry.oneLiner}</W.Muted>
		</div>
		{#each entry.body as paragraph, i (i)}
			<W.Muted class="text-sm leading-relaxed">{paragraph}</W.Muted>
		{/each}
	{:else}
		<W.Muted>There is no glossary entry called <code>{route.params.term}</code>.</W.Muted>
		<W.Button href="/wiki/glossary">Back to the glossary</W.Button>
	{/if}
</W.Shell>
