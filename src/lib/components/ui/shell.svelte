<script lang="ts">
	/**
	 * AppShell — the responsive composition that replaced the 300/340px phone
	 * artboard. Mobile-first fluid column; from `lg` up, a content column plus a
	 * supporting-context aside. Space carries meaning: the aside holds method
	 * context, never decoration, and no route renders inside a fixed frame.
	 */
	import { ChevronLeft, Settings, Sun, X } from '@lucide/svelte';
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils.js';
	import Nav from './nav.svelte';

	let {
		title = '',
		back = undefined,
		backKind = 'back',
		meta = '',
		settingsLink = false,
		brand = false,
		nav = false,
		wide = false,
		aside = undefined,
		children
	}: {
		/** Small-caps context label in the header. */
		title?: string;
		/** Where the back/close affordance leads; omitted = none. */
		back?: string;
		backKind?: 'back' | 'close';
		/** Right-hand annotation, e.g. step "2/8". */
		meta?: string;
		settingsLink?: boolean;
		/** Show the wordmark instead of a back affordance. */
		brand?: boolean;
		nav?: boolean;
		/** Reading spreads get a wider measure. */
		wide?: boolean;
		aside?: Snippet;
		children?: Snippet;
	} = $props();
</script>

<div class="flex min-h-screen flex-col">
	<header class="sticky top-0 z-10 border-b border-line bg-surface/85 backdrop-blur">
		<div class="mx-auto flex h-14 w-full max-w-6xl items-center gap-3 px-4 sm:px-6">
			{#if back}
				<a
					href={back}
					aria-label={backKind === 'close' ? 'Leave and return' : 'Back'}
					class="-ml-2 flex size-9 shrink-0 items-center justify-center rounded-full text-text-soft transition-colors outline-none hover:bg-line/40 hover:text-text focus-visible:ring-2 focus-visible:ring-brand"
				>
					{#if backKind === 'close'}<X size={18} />{:else}<ChevronLeft size={20} />{/if}
				</a>
			{:else if brand}
				<span class="flex items-center gap-1.5 font-display text-base font-semibold tracking-tight">
					<Sun size={16} class="text-caution" aria-hidden="true" />
					Ray of Light
				</span>
			{/if}

			<span class="min-w-0 truncate text-xs font-bold tracking-[0.14em] text-text-soft uppercase">
				{title}
			</span>

			<div class="ml-auto flex shrink-0 items-center gap-3">
				{#if meta}
					<span class="font-mono text-xs text-text-faint">{meta}</span>
				{/if}
				{#if nav}<Nav variant="inline" />{/if}
				{#if settingsLink}
					<a
						href="/settings"
						aria-label="Settings"
						class="flex size-9 items-center justify-center rounded-full text-text-soft transition-colors outline-none hover:bg-line/40 hover:text-text focus-visible:ring-2 focus-visible:ring-brand"
					>
						<Settings size={18} />
					</a>
				{/if}
			</div>
		</div>
	</header>

	<div
		class={cn(
			'mx-auto flex w-full max-w-6xl flex-1 justify-center gap-12 px-4 pt-6 sm:px-6 lg:pt-10',
			nav ? 'pb-24 lg:pb-12' : 'pb-12'
		)}
	>
		<main
			class={cn('flex w-full min-w-0 flex-col gap-4', wide ? 'max-w-3xl' : 'max-w-xl')}
		>
			{@render children?.()}
		</main>

		{#if aside}
			<aside class="hidden w-72 shrink-0 pt-1 lg:block xl:w-80" aria-label="Context">
				{@render aside()}
			</aside>
		{/if}
	</div>

	{#if nav}<Nav variant="bar" />{/if}
</div>
