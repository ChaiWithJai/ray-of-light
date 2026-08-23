<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	/**
	 * One row of the parallel spread. The two columns stay horizontally aligned;
	 * the highlighted row is where the reader's attention is.
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
		'grid grid-cols-2 items-start gap-3 rounded-lg border-l-2 border-transparent px-2 py-1.5 transition-colors duration-(--duration-quick)',
		highlight && 'border-brand bg-brand-wash/70',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
