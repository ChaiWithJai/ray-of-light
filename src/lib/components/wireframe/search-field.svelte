<script lang="ts">
	import { cn, type WithElementRef, type WithoutChildren } from '$lib/utils.js';
	import type { HTMLInputAttributes } from 'svelte/elements';

	/** The phrase-library search box (1t), drawn as a shallow `.card`. */
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
		'w-full rounded-[10px] border-[1.5px] border-ink bg-white p-[7px] text-[13px] text-ink outline-none placeholder:text-ink-soft focus-visible:ring-2 focus-visible:ring-accent-blue',
		className
	)}
	{...restProps}
/>
