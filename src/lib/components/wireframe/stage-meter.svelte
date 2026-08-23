<script lang="ts">
	import { cn } from '$lib/utils.js';

	/**
	 * `.stage` — the five capability states per construction:
	 * exposed → recognized → recalled → stabilized → transferable.
	 */
	let {
		filled,
		total = 5,
		class: className
	}: { filled: number; total?: number; class?: string } = $props();
</script>

<div data-slot="stage-meter" class={cn('flex gap-[3px]', className)}>
	{#each { length: total } as _, i (i)}
		<div
			class={cn(
				'h-[8px] w-[14px] rounded-[2px] border',
				i < filled ? 'border-accent-blue bg-accent-blue' : 'border-ink bg-transparent'
			)}
		></div>
	{/each}
</div>
