<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	/** `.fr` — a target-language line, optionally numbered with `.num`. */
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
	data-slot="fr"
	class={cn('text-[14.5px] text-ink', className)}
	{...restProps}
>
	{#if n !== undefined}
		<span class="inline-block w-[16px] text-[12px] text-ink-faint">{n}</span>
	{/if}
	{@render children?.()}
</div>
