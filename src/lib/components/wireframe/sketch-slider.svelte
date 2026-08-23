<script lang="ts">
	import { Slider } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	/**
	 * `.slider` + `.knob` — the self-rating (1q) and text-size (1v) controls.
	 * bits-ui gives us the keyboard and ARIA behaviour; the skin is ours.
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
	class={cn('relative flex h-[16px] w-full touch-none items-center select-none', className)}
>
	{#snippet children({ thumbItems })}
		<span
			data-slot="slider-track"
			class="relative h-[6px] w-full grow overflow-hidden rounded-[3px] bg-rule"
		>
			<Slider.Range class="absolute h-full bg-accent-blue" />
		</span>
		{#each thumbItems as thumb (thumb.index)}
			<Slider.Thumb
				index={thumb.index}
				class="block size-[16px] shrink-0 rounded-full border-2 border-ink bg-white select-none outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
			/>
		{/each}
	{/snippet}
</Slider.Root>
