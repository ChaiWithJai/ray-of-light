<script lang="ts" module>
	/** The persistent nav from the design: Today · Book · Phrases · Progress. */
	export const TAB_BAR_ITEMS = [
		{ label: 'Today', href: '/today' },
		{ label: 'Book', href: '/book' },
		{ label: 'Phrases', href: '/phrases' },
		{ label: 'Progress', href: '/progress' }
	] as const;

	export type TabBarItem = (typeof TAB_BAR_ITEMS)[number]['label'];
</script>

<script lang="ts">
	import { page } from '$app/state';
	import { cn } from '$lib/utils.js';

	/**
	 * These are the app's four destinations (D6), so this is real navigation —
	 * anchors, not a tab widget. Active state comes from the router.
	 */
	let { class: className }: { class?: string } = $props();

	const isActive = (href: string) =>
		page.url.pathname === href || page.url.pathname.startsWith(`${href}/`);
</script>

<nav
	aria-label="Primary"
	class={cn(
		'mt-auto flex w-full justify-around border-t-[1.5px] border-ink pt-[8px] text-[12.5px] text-ink-soft',
		className
	)}
>
	{#each TAB_BAR_ITEMS as item (item.href)}
		<a
			href={item.href}
			aria-current={isActive(item.href) ? 'page' : undefined}
			class={cn(
				'rounded-[4px] px-1 no-underline outline-none focus-visible:ring-2 focus-visible:ring-accent-blue',
				isActive(item.href)
					? 'font-semibold text-accent-blue'
					: 'text-ink-soft hover:text-ink'
			)}
		>
			{item.label}
		</a>
	{/each}
</nav>
