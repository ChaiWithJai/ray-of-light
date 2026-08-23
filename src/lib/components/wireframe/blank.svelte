<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { Snippet } from 'svelte';

	/** The underlined gap in the completion and error-repair drills (1l, 1p). */
	let {
		width = 'md',
		class: className,
		children
	}: { width?: 'sm' | 'md'; class?: string; children?: Snippet } = $props();
</script>

<span
	data-slot="blank"
	class={cn(
		'border-b-2 border-accent-blue text-accent-blue',
		width === 'sm' ? 'px-[12px]' : 'px-[18px]',
		className
	)}
>
	{@render children?.()}
</span>
