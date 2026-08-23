<script lang="ts">
	import { cn } from '$lib/utils.js';

	/**
	 * The five capability states per construction:
	 * exposed → recognized → recalled → stabilized → transferable.
	 */
	let {
		filled,
		total = 5,
		class: className
	}: { filled: number; total?: number; class?: string } = $props();
</script>

<div data-slot="stage-meter" class={cn('flex gap-1', className)}>
	{#each { length: total } as _, i (i)}
		<div
			class={cn(
				'h-2 w-3.5 rounded-xs transition-colors',
				i < filled ? 'bg-brand' : 'border border-line-strong bg-transparent'
			)}
		></div>
	{/each}
</div>
