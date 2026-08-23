<script lang="ts" module>
	/** The app's four destinations (D6). Real navigation — anchors, not tabs. */
	export const NAV_ITEMS = [
		{ label: 'Today', href: '/today' },
		{ label: 'Book', href: '/book' },
		{ label: 'Phrases', href: '/phrases' },
		{ label: 'Progress', href: '/progress' }
	] as const;
</script>

<script lang="ts">
	import { page } from '$app/state';
	import { cn } from '$lib/utils.js';

	/**
	 * One nav, two postures: a fixed bottom bar on small screens, an inline row
	 * inside the shell header on wide ones.
	 */
	let { variant = 'bar' }: { variant?: 'bar' | 'inline' } = $props();

	const isActive = (href: string) =>
		page.url.pathname === href || page.url.pathname.startsWith(`${href}/`);
</script>

{#if variant === 'bar'}
	<nav
		aria-label="Primary"
		class="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-surface-raised/95 backdrop-blur lg:hidden"
	>
		<div class="mx-auto flex h-14 max-w-xl items-stretch justify-around px-2">
			{#each NAV_ITEMS as item (item.href)}
				{@const active = isActive(item.href)}
				<a
					href={item.href}
					aria-current={active ? 'page' : undefined}
					class={cn(
						'flex min-w-16 flex-col items-center justify-center gap-0.5 rounded-lg text-xs no-underline transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand',
						active ? 'font-bold text-brand-deep' : 'text-text-soft hover:text-text'
					)}
				>
					<span
						class={cn(
							'h-0.5 w-6 rounded-full transition-colors',
							active ? 'bg-brand' : 'bg-transparent'
						)}
					></span>
					{item.label}
				</a>
			{/each}
		</div>
	</nav>
{:else}
	<nav aria-label="Sections" class="hidden items-center gap-1 lg:flex">
		{#each NAV_ITEMS as item (item.href)}
			{@const active = isActive(item.href)}
			<a
				href={item.href}
				aria-current={active ? 'page' : undefined}
				class={cn(
					'rounded-full px-3 py-1.5 text-sm no-underline transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand',
					active
						? 'bg-brand-wash font-bold text-brand-deep'
						: 'text-text-soft hover:bg-line/40 hover:text-text'
				)}
			>
				{item.label}
			</a>
		{/each}
	</nav>
{/if}
