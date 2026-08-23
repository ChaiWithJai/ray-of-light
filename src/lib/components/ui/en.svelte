<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	/** The English gloss — quiet sans, clearly subordinate to the target line. */
	let {
		ref = $bindable(null),
		n = undefined,
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & { n?: number } = $props();
</script>

<div
	bind:this={ref}
	data-slot="gloss-line"
	class={cn('text-sm leading-normal text-text-soft', className)}
	{...restProps}
>
	{#if n !== undefined}
		<span class="inline-block w-5 text-xs text-text-faint tabular-nums">{n}</span>
	{/if}
	{@render children?.()}
</div>
