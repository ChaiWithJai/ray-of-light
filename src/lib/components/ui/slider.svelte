<script lang="ts">
	import { Slider } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	/**
	 * Self-rating and text-size control. bits-ui gives us the keyboard and ARIA
	 * behaviour; the skin is ours.
	 */
	let {
		value = $bindable(50),
		label,
		class: className
	}: { value?: number; label?: string; class?: string } = $props();
</script>

<Slider.Root
	type="single"
	bind:value
	min={0}
	max={100}
	step={1}
	aria-label={label}
	class={cn('relative flex h-5 w-full touch-none items-center select-none', className)}
>
	{#snippet children({ thumbItems })}
		<span
			data-slot="slider-track"
			class="relative h-1.5 w-full grow overflow-hidden rounded-full bg-line"
		>
			<Slider.Range class="absolute h-full rounded-full bg-brand" />
		</span>
		{#each thumbItems as thumb (thumb.index)}
			<Slider.Thumb
				index={thumb.index}
				class="block size-4.5 shrink-0 rounded-full border-2 border-brand bg-surface-raised shadow-card select-none outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
			/>
		{/each}
	{/snippet}
</Slider.Root>
