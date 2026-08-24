<script lang="ts">
	/** /wiki/techniques/[slug] — one full page per technique (#47, job 2). */
	import { page as route } from '$app/state';
	import * as W from '$lib/components/ui/index.js';
	import WikiArticle from '$lib/components/app/wiki-article.svelte';
	import { wikiPage } from '$lib/content/wiki/index.js';

	const page = $derived.by(() => {
		const found = wikiPage(route.params.slug!);
		return found?.section === 'technique' ? found : undefined;
	});
</script>

<svelte:head><title>{page ? page.title : 'Technique'}</title></svelte:head>

<W.Shell title="Method guide" back="/wiki">
	{#if page}
		<WikiArticle {page} />
	{:else}
		<W.Muted>There is no technique page called <code>{route.params.slug}</code>.</W.Muted>
		<W.Button href="/wiki">Back to the method guide</W.Button>
	{/if}
</W.Shell>
