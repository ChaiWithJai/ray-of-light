<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { Snippet } from 'svelte';

	/**
	 * `.diffBad` / `.diffGood` — the spot-the-difference marks in 1n. The
	 * learner notices the difference first, so both readings stay legible.
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
		'rounded-[3px] px-[3px]',
		tone === 'bad' ? 'bg-bad-wash text-bad line-through' : 'bg-good-wash text-good',
		className
	)}
>
	{@render children?.()}
</span>
