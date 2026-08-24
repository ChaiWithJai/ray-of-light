<script lang="ts">
	/** /wiki/glossary — every method term, each a short entry (#47, job 3's home). */
	import * as W from '$lib/components/ui/index.js';
	import { GLOSSARY } from '$lib/content/wiki/index.js';
</script>

<svelte:head><title>Glossary</title></svelte:head>

<W.Shell title="Method guide" back="/wiki">
	<div class="anim-rise pt-2">
		<W.Heading>Glossary</W.Heading>
		<W.Muted class="mt-1">
			The words this course uses around the lessons, each explained in a sentence here and in
			full on its own entry.
		</W.Muted>
	</div>

	{#each GLOSSARY as entry (entry.id)}
		<W.Card class="gap-1">
			<a
				href="/wiki/glossary/{entry.id}"
				class="text-base font-bold text-text no-underline hover:text-brand-deep"
			>
				{entry.term}
			</a>
			<W.Muted class="text-sm">{entry.oneLiner}</W.Muted>
		</W.Card>
	{/each}
</W.Shell>
