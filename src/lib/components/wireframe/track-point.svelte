<script lang="ts">
	import { cn } from '$lib/utils.js';

	/** `.tp` — one of the two linked finger anchors in the tracking layer (1f). */
	let { class: className }: { class?: string } = $props();
</script>

<div
	data-slot="track-point"
	class={cn(
		'size-[34px] shrink-0 rounded-full border-2 border-accent-blue bg-accent-blue/[0.18]',
		className
	)}
></div>
