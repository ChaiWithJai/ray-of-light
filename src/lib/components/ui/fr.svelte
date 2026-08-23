<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	/**
	 * A target-language line. The language is the hero: serif, reading size.
	 * Tamil glyphs fall through Fraunces to Noto Serif Tamil inside the same
	 * stack, so both scripts keep one typographic voice.
	 */
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
	data-slot="target-line"
	class={cn('font-serif text-lg leading-snug text-text', className)}
	{...restProps}
>
	{#if n !== undefined}
		<span class="inline-block w-5 font-sans text-xs text-text-faint tabular-nums">{n}</span>
	{/if}
	{@render children?.()}
</div>
