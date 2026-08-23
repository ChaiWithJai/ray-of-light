<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { Snippet } from 'svelte';

	/** The one large headline per screen — display serif, a real `<h1>`. */
	let { class: className, children }: { class?: string; children?: Snippet } = $props();
</script>

<h1
	data-slot="heading"
	class={cn('m-0 font-display text-2xl leading-tight font-semibold tracking-tight', className)}
>
	{@render children?.()}
</h1>
