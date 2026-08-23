<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	/** Secondary copy: instructions, captions, sub-labels. */
	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="muted"
	class={cn('text-sm leading-normal text-text-soft', className)}
	{...restProps}
>
	{@render children?.()}
</div>
