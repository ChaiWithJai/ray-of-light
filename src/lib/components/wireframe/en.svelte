<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	/** `.en` — the English gloss column of the spread. */
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
	data-slot="en"
	class={cn('text-[13.5px] text-ink-en', className)}
	{...restProps}
>
	{#if n !== undefined}
		<span class="inline-block w-[16px] text-[12px] text-ink-faint">{n}</span>
	{/if}
	{@render children?.()}
</div>
