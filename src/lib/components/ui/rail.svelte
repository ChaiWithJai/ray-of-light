<script lang="ts">
	import { Progress } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	/** A flat progress rail (projected path, step progress). */
	let {
		value = 0,
		label,
		class: className
	}: { value?: number; label?: string; class?: string } = $props();
</script>

<Progress.Root
	{value}
	max={100}
	aria-label={label}
	class={cn('relative h-2 w-full overflow-hidden rounded-full bg-line', className)}
>
	<div
		data-slot="progress-indicator"
		class="h-full w-full flex-1 rounded-full bg-brand transition-transform duration-(--duration-move)"
		style="transform: translateX(-{100 - value}%)"
	></div>
</Progress.Root>
