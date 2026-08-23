<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { Snippet } from 'svelte';

	/**
	 * `.h1` — the one large in-frame headline. A real `<h1>`: the wireframe drew
	 * it as a styled div, but screen readers need the landmark (AC 12).
	 */
	let { class: className, children }: { class?: string; children?: Snippet } = $props();
</script>

<h1 data-slot="heading" class={cn('m-0 text-[19px] leading-[1.15] font-normal', className)}>
	{@render children?.()}
</h1>
