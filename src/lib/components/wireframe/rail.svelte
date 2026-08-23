<script lang="ts">
	import { Progress } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	/** `.ln` — the flat progress rail used on the projected-path card (1b). */
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
	class={cn('relative h-[8px] w-full overflow-hidden rounded-[4px] bg-rule', className)}
>
	<div
		data-slot="progress-indicator"
		class="h-full w-full flex-1 bg-accent-blue transition-transform"
		style="transform: translateX(-{100 - value}%)"
	></div>
</Progress.Root>
