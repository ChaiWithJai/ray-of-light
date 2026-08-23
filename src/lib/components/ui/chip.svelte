<script lang="ts" module>
	import { tv, type VariantProps } from 'tailwind-variants';

	/** Selectable tokens — settings, hints, cover toggles. */
	export const chipVariants = tv({
		base: 'inline-flex w-fit shrink-0 items-center justify-center overflow-hidden rounded-full px-3 py-1 text-sm font-normal whitespace-nowrap transition-colors duration-(--duration-quick) outline-none focus-visible:ring-2 focus-visible:ring-brand',
		variants: {
			active: {
				true: 'border border-brand bg-brand-wash font-bold text-brand-deep',
				false: 'border border-line-strong bg-surface-raised text-text-soft'
			},
			interactive: { true: 'cursor-pointer hover:border-brand/60 hover:text-text', false: '' }
		},
		defaultVariants: { active: false, interactive: false }
	});

	export type ChipVariants = VariantProps<typeof chipVariants>;
</script>

<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		active = false,
		onclick = undefined,
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLElement>> &
		Pick<HTMLButtonAttributes, 'onclick'> & { active?: boolean } = $props();
</script>

{#if onclick}
	<button
		bind:this={ref}
		type="button"
		data-slot="chip"
		aria-pressed={active}
		class={cn(chipVariants({ active, interactive: true }), className)}
		{onclick}
		{...restProps}
	>
		{@render children?.()}
	</button>
{:else}
	<span
		bind:this={ref}
		data-slot="chip"
		class={cn(chipVariants({ active }), className)}
		{...restProps}
	>
		{@render children?.()}
	</span>
{/if}
