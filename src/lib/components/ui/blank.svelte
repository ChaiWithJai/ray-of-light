<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { Snippet } from 'svelte';

	/** The underlined gap in completion and error-repair drills. */
	let {
		width = 'md',
		class: className,
		children
	}: { width?: 'sm' | 'md'; class?: string; children?: Snippet } = $props();
</script>

<span
	data-slot="blank"
	class={cn(
		'border-b-2 border-brand font-bold text-brand-deep',
		width === 'sm' ? 'px-3' : 'px-4.5',
		className
	)}
>
	{@render children?.()}
</span>
