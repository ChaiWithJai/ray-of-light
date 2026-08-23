<script lang="ts">
	import { cn, type WithElementRef, type WithoutChildren } from '$lib/utils.js';
	import type { HTMLInputAttributes } from 'svelte/elements';

	/** The phrase-library search box. */
	let {
		ref = $bindable(null),
		value = $bindable(''),
		class: className,
		...restProps
	}: WithoutChildren<WithElementRef<HTMLInputAttributes, HTMLInputElement>> = $props();
</script>

<input
	bind:this={ref}
	bind:value
	type="search"
	data-slot="search-field"
	class={cn(
		'w-full rounded-full border border-line-strong bg-surface-raised px-4 py-2 text-sm text-text shadow-card transition-colors duration-(--duration-quick) outline-none placeholder:text-text-faint focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/40',
		className
	)}
	{...restProps}
/>
