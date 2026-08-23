<script lang="ts">
	import { surfaceHref } from '$lib/surfaces.js';
	import { cn } from '$lib/utils.js';

	/**
	 * `.dv-oid` — the little id chip the design uses to cross-reference another
	 * surface from inside a margin note. Here it links to that surface's route.
	 */
	let { id, class: className }: { id: string; class?: string } = $props();
</script>

<a
	href={surfaceHref(id)}
	data-slot="surface-link"
	class={cn(
		'rounded-[5px] bg-black/8 px-[7px] py-[3px] font-mono text-[10.5px] font-semibold text-[#1a1a1a] no-underline hover:bg-black/15 hover:text-[#1a1a1a]',
		className
	)}>{id}</a
>
