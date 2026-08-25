<script lang="ts">
	/**
	 * /wiki/constructions — the cast, grouped by what the learner owns (#47 W3,
	 * #46 S2). Two questions, answered in order: what do I own, what is still
	 * coming. Grouping is by derived capability state, so the page cannot flatter
	 * anyone; an untouched pattern sits under "not yet met" with its faint sprite.
	 */
	import * as W from '$lib/components/ui/index.js';
	import { cn } from '$lib/utils.js';
	import { LANGUAGE_LABELS } from '$lib/content/index.js';
	import {
		CONSTRUCTION_COPY,
		constructionEntries,
		constructionHref,
		groupByState
	} from '$lib/content/wiki/constructions.js';
	import { profile } from '$lib/stores/profile.svelte.js';

	const entries = $derived(constructionEntries(profile.language));
	const groups = $derived(groupByState(entries, profile.states));
</script>

<svelte:head><title>{CONSTRUCTION_COPY.indexTitle}</title></svelte:head>

<W.Shell title="Method guide" back="/wiki">
	<div class="anim-rise pt-2">
		<W.Heading>{CONSTRUCTION_COPY.indexTitle}</W.Heading>
		<W.Muted class="mt-1">{CONSTRUCTION_COPY.indexLead}</W.Muted>
	</div>

	<W.Muted class="text-2xs">
		{LANGUAGE_LABELS[profile.language]} · {entries.length} patterns ·
		<a
			href="/wiki/capability"
			class="font-bold text-brand-deep underline decoration-dotted underline-offset-2 outline-none hover:text-brand focus-visible:ring-2 focus-visible:ring-brand"
		>
			{CONSTRUCTION_COPY.ladderLink}
		</a>
	</W.Muted>

	<section class="flex flex-col gap-2" data-testid="constructions-owned">
		<h2 class="m-0 font-display text-lg leading-tight font-semibold">
			{CONSTRUCTION_COPY.ownedHeading}
		</h2>
		{#if groups.owned.length === 0}
			<W.Card><W.Muted class="text-sm">{CONSTRUCTION_COPY.nothingYet}</W.Muted></W.Card>
		{:else}
			<W.Muted class="text-2xs">{CONSTRUCTION_COPY.ownedLead}</W.Muted>
			{#each groups.owned as group (group.stage)}
				<div class="flex flex-col gap-1.5" data-testid="construction-group-{group.stage}">
					<div class="flex items-baseline gap-2">
						<span class="text-2xs font-bold tracking-[0.14em] text-brand-deep uppercase">
							{group.label}
						</span>
						<span class="text-2xs text-text-faint">{group.entries.length}</span>
					</div>
					<ul class="m-0 grid list-none grid-cols-1 gap-1.5 p-0 sm:grid-cols-2">
						{#each group.entries as entry (entry.id)}
							<li>
								<a
									href={constructionHref(entry.id)}
									data-testid="construction-card-{entry.id}"
									class={cn(W.cardVariants(), 'flex-row items-center gap-2.5 p-3 no-underline transition-colors hover:border-brand focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none')}
								>
									<W.Sprite
										constructionId={entry.id}
										state={group.stage === 'unmet' ? null : group.stage}
										size={36}
									/>
									<div class="min-w-0">
										<W.Fr class="truncate text-sm">{entry.label}</W.Fr>
										<W.Muted class="mt-0.5 line-clamp-2 text-2xs">{entry.gloss}</W.Muted>
									</div>
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		{/if}
	</section>

	{#if groups.coming.entries.length > 0}
		<section class="flex flex-col gap-2 border-t border-line pt-4" data-testid="constructions-coming">
			<h2 class="m-0 font-display text-lg leading-tight font-semibold">
				{CONSTRUCTION_COPY.comingHeading}
			</h2>
			<W.Muted class="text-2xs">{CONSTRUCTION_COPY.comingLead}</W.Muted>
			<div class="flex items-baseline gap-2">
				<span class="text-2xs font-bold tracking-[0.14em] text-text-faint uppercase">
					{groups.coming.label}
				</span>
				<span class="text-2xs text-text-faint">{groups.coming.entries.length}</span>
			</div>
			<ul class="m-0 grid list-none grid-cols-1 gap-1.5 p-0 sm:grid-cols-2">
				{#each groups.coming.entries as entry (entry.id)}
					<li>
						<a
							href={constructionHref(entry.id)}
							data-testid="construction-card-{entry.id}"
							class={cn(W.cardVariants(), 'flex-row items-center gap-2.5 p-3 opacity-70 no-underline transition-colors hover:opacity-100 focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none')}
						>
							<W.Sprite constructionId={entry.id} state={null} size={36} />
							<div class="min-w-0">
								<W.Fr class="truncate text-sm">{entry.label}</W.Fr>
								<W.Muted class="mt-0.5 line-clamp-1 text-2xs">{entry.gloss}</W.Muted>
								<W.Muted class="text-2xs text-text-faint">
									lesson {entry.introducedIn.index}
								</W.Muted>
							</div>
						</a>
					</li>
				{/each}
			</ul>
		</section>
	{/if}
</W.Shell>
