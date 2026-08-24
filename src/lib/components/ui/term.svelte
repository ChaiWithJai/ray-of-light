<script lang="ts">
	/**
	 * Term — quick on-the-fly reference (#47, job 3).
	 *
	 * Any method term in copy renders through this: a quietly marked word that
	 * opens a small in-place popover with the glossary one-liner and a "more"
	 * link to the full entry. No navigation happens on open, and dismissing
	 * returns focus to the word. Shares the guidance grammar of Hint: this is
	 * help for working the method, visually distinct from content.
	 */
	import { Popover } from 'bits-ui';
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils.js';
	import { glossaryEntry } from '$lib/content/wiki/index.js';
	import { spriteCastEntry } from '$lib/content/sprite-cast.js';
	import { profile } from '$lib/stores/profile.svelte.js';
	import Sprite from './sprite.svelte';

	let {
		id,
		class: className = '',
		children
	}: {
		/** Glossary entry id; conformance tests require it to resolve. */
		id: string;
		class?: string;
		children?: Snippet;
	} = $props();

	const entry = $derived(glossaryEntry(id));
	// #46 S2: a term that names a real cast member (a construction id in the
	// sprite manifest) shows its character at the learner's honest derived
	// stage. Method terms are not characters and never get one.
	const castEntry = $derived(spriteCastEntry(id));
	const castState = $derived(castEntry ? profile.stateOf(id) : null);
</script>

{#if entry}
	<Popover.Root>
		<Popover.Trigger
			data-testid="term-{id}"
			class={cn(
				'inline cursor-pointer rounded-xs p-0 align-baseline font-inherit text-inherit underline decoration-line-strong decoration-dotted underline-offset-2 outline-none transition-colors hover:decoration-brand hover:text-brand-deep focus-visible:ring-2 focus-visible:ring-brand',
				className
			)}
		>
			{#if children}{@render children()}{:else}{entry.term}{/if}
		</Popover.Trigger>
		<Popover.Portal>
			<Popover.Content
				sideOffset={6}
				collisionPadding={12}
				data-testid="term-popover"
				class="z-50 w-64 rounded-lg border border-dashed border-line-strong/70 bg-surface-raised p-3 text-left shadow-raised"
			>
				<div class="text-2xs font-bold tracking-[0.14em] text-text-faint uppercase">
					{entry.term}
				</div>
				<p class="m-0 mt-1 text-xs leading-relaxed text-text-soft">{entry.oneLiner}</p>
				{#if castEntry}
					<div class="mt-2 flex items-center gap-2" data-testid="term-sprite-{id}">
						<Sprite constructionId={id} state={castState} size={32} />
						<span class="text-2xs text-text-faint">{castState ?? 'not yet met'}</span>
					</div>
				{/if}
				<a
					href="/wiki/glossary/{entry.id}"
					class="mt-2 inline-block text-2xs font-bold text-brand-deep underline decoration-dotted underline-offset-2 outline-none hover:text-brand focus-visible:ring-2 focus-visible:ring-brand"
				>
					more
				</a>
			</Popover.Content>
		</Popover.Portal>
	</Popover.Root>
{:else}
	<!-- An unknown id renders its text unmarked; the conformance test is what fails. -->
	{#if children}{@render children()}{:else}{id}{/if}
{/if}
