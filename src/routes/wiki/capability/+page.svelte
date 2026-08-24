<script lang="ts">
	/**
	 * /wiki/capability — the ladder page. Generated from CONSTRUCTION_STATES,
	 * so the page cannot drift from the schema (a conformance test holds it).
	 */
	import * as W from '$lib/components/ui/index.js';
	import WikiArticle from '$lib/components/app/wiki-article.svelte';
	import { wikiPage } from '$lib/content/wiki/index.js';

	const page = wikiPage('capability')!;
</script>

<svelte:head><title>{page.title}</title></svelte:head>

<W.Shell title="Method guide" back="/wiki">
	<WikiArticle {page} />
</W.Shell>
