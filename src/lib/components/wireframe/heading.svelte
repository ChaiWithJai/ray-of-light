<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { Snippet } from 'svelte';

	/** `.h1` — the one large in-frame headline. */
	let { class: className, children }: { class?: string; children?: Snippet } = $props();
</script>

<div data-slot="heading" class={cn('text-[19px] leading-[1.15]', className)}>
	{@render children?.()}
</div>
