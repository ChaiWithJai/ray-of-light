<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	/**
	 * `.pair` / `.pairHi` — one row of the parallel spread. The two columns stay
	 * horizontally aligned; the highlighted row is the one the audio is on.
	 */
	let {
		ref = $bindable(null),
		highlight = false,
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & { highlight?: boolean } = $props();
</script>

<div
	bind:this={ref}
	data-slot="pair-row"
	class={cn(
		'grid grid-cols-2 items-start gap-[8px] rounded-[6px] px-[2px] py-[4px]',
		highlight && 'bg-accent-blue-wash outline-2 outline-accent-blue',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
