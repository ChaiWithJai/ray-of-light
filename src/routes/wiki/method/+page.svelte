<script lang="ts">
	/** /wiki/method — the run of the program, the #37 orientation content's home. */
	import * as W from '$lib/components/ui/index.js';
	import WikiArticle from '$lib/components/app/wiki-article.svelte';
	import { wikiPage } from '$lib/content/wiki/index.js';

	const page = wikiPage('method')!;
</script>

<svelte:head><title>{page.title}</title></svelte:head>

<W.Shell title="Method guide" back="/wiki">
	<WikiArticle {page} />
</W.Shell>
