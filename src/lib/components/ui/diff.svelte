<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { Snippet } from 'svelte';

	/**
	 * Spot-the-difference marks. The learner notices the difference first, so
	 * both readings stay legible — never colour alone: misses are struck
	 * through, corrections carry weight.
	 */
	let {
		tone,
		class: className,
		children
	}: { tone: 'bad' | 'good'; class?: string; children?: Snippet } = $props();
</script>

<span
	data-slot="diff"
	class={cn(
		'rounded-sm px-1',
		tone === 'bad'
			? 'bg-miss-wash text-miss line-through decoration-miss/60'
			: 'bg-insight-wash font-bold text-insight',
		className
	)}
>
	{@render children?.()}
</span>
