<script lang="ts" module>
	import { tv, type VariantProps } from 'tailwind-variants';

	/** `.chip` / `.chipOn` — pill-shaped selectable tokens. */
	export const chipVariants = tv({
		base: 'inline-flex w-fit shrink-0 items-center justify-center overflow-hidden rounded-full px-[10px] py-[3px] text-[13px] font-normal whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent-blue',
		variants: {
			active: {
				true: 'border-2 border-accent-blue bg-accent-blue-wash text-accent-blue-dark',
				false: 'border-[1.5px] border-ink bg-white text-ink'
			},
			interactive: { true: 'cursor-pointer', false: '' }
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
		Pick<HTMLButtonAttributes, 'onclick' | 'disabled'> & { active?: boolean } = $props();
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
