<script lang="ts">
	/**
	 * /wiki — the method guide's front door (#47).
	 *
	 * Not a fifth nav destination (D6): reached from Settings, from term links
	 * and from technique pages, never from the tab bar. Entered deliberately;
	 * the back affordance returns toward Settings.
	 */
	import * as W from '$lib/components/ui/index.js';
	import { GLOSSARY, TECHNIQUE_PAGES } from '$lib/content/wiki/index.js';
</script>

<svelte:head><title>Method guide</title></svelte:head>

<W.Shell title="Method guide" back="/settings">
	<div class="anim-rise pt-2">
		<W.Heading>The method, explained</W.Heading>
		<W.Muted class="mt-1">
			Everything the course asks of you has a reason. This guide holds the reasons: how the
			two waves work, what each technique trains, and what the words around the lessons mean.
		</W.Muted>
	</div>

	<W.Card class="gap-1">
		<a href="/wiki/method" class="font-display text-lg font-semibold text-text no-underline hover:text-brand-deep">
			How this course works
		</a>
		<W.Muted class="text-sm">
			The two waves, why sound comes first, and where you end up.
		</W.Muted>
	</W.Card>

	<W.Card class="gap-1">
		<a href="/wiki/capability" class="font-display text-lg font-semibold text-text no-underline hover:text-brand-deep">
			The capability ladder
		</a>
		<W.Muted class="text-sm">
			The five states every phrase pattern climbs, and what earns each one.
		</W.Muted>
	</W.Card>

	<W.Card class="gap-2">
		<div class="font-display text-lg font-semibold">Techniques</div>
		<ul class="m-0 flex list-none flex-col gap-1.5 p-0">
			{#each TECHNIQUE_PAGES as page (page.slug)}
				<li>
					<a
						href="/wiki/techniques/{page.slug}"
						class="text-sm font-bold text-brand-deep no-underline hover:underline"
					>
						{page.title}
					</a>
					<W.Muted class="text-xs">{page.lead}</W.Muted>
				</li>
			{/each}
		</ul>
	</W.Card>

	<W.Card class="gap-2">
		<a href="/wiki/glossary" class="font-display text-lg font-semibold text-text no-underline hover:text-brand-deep">
			Glossary
		</a>
		<div class="flex flex-wrap gap-2">
			{#each GLOSSARY as entry (entry.id)}
				<a
					href="/wiki/glossary/{entry.id}"
					class="{W.chipVariants({ interactive: true })} no-underline"
				>
					{entry.term}
				</a>
			{/each}
		</div>
	</W.Card>
</W.Shell>
