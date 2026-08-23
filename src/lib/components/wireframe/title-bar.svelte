<script lang="ts">
	import { cn } from '$lib/utils.js';

	/** `.tbar` — the in-frame status/nav strip at the top of each phone. */
	let {
		left = '',
		center = '',
		right = '',
		class: className
	}: { left?: string; center?: string; right?: string; class?: string } = $props();
</script>

<div
	data-slot="title-bar"
	class={cn(
		'flex items-center justify-between border-b-[1.5px] border-ink pb-[6px] text-[13px] text-ink-soft',
		className
	)}
>
	<span>{left}</span>
	<span>{center}</span>
	<span>{right}</span>
</div>
