<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	/**
	 * `.ph` — the phone artboard every surface is drawn inside.
	 * The spread-based surfaces (1e, 1f, 1i, 1m) are 340px wide; the rest are 300px.
	 */
	let {
		ref = $bindable(null),
		width = 300,
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & { width?: number } = $props();
</script>

<div
	bind:this={ref}
	data-slot="phone"
	style:width="{width}px"
	class={cn(
		'sketch-shadow flex min-h-[420px] shrink-0 flex-col gap-[10px] rounded-[14px] border-2 border-ink bg-white px-[14px] pt-[14px] pb-[18px]',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
