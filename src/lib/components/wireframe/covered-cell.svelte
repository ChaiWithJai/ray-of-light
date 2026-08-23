<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { Snippet } from 'svelte';

	/**
	 * `.cov` — a hatched cell standing in for withheld text. Removing support is
	 * the whole mechanism of the later states, so this shows up a lot.
	 */
	let {
		tone = 'default',
		class: className,
		children
	}: { tone?: 'default' | 'accent'; class?: string; children?: Snippet } = $props();
</script>

<div
	data-slot="covered-cell"
	class={cn(
		'sketch-cover rounded-[6px] border-[1.5px] border-dashed px-[6px] py-[5px] text-center text-[12px]',
		tone === 'accent'
			? 'border-accent-blue text-accent-blue'
			: 'border-cover-line text-cover-ink',
		className
	)}
>
	{@render children?.()}
</div>
