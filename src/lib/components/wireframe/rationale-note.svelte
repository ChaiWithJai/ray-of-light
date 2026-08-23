<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { Snippet } from 'svelte';

	/**
	 * `.note` — the handwritten margin note explaining why a surface exists.
	 * These are part of the wireframe, not app chrome, so they render with it.
	 */
	let { class: className, children }: { class?: string; children?: Snippet } = $props();
</script>

<p
	data-slot="rationale-note"
	class={cn('m-0 font-script text-[15px] leading-[1.25] text-note', className)}
>
	→ {@render children?.()}
</p>
