<script lang="ts" module>
	import { tv, type VariantProps } from 'tailwind-variants';

	/** `.btn` / `.btnP` — the two button weights used across the wireframes. */
	export const sketchButtonVariants = tv({
		base: 'inline-flex w-full shrink-0 items-center justify-center rounded-[8px] border-2 border-ink text-center text-[15px] font-normal whitespace-normal transition-colors outline-none select-none focus-visible:ring-2 focus-visible:ring-accent-blue disabled:pointer-events-none disabled:opacity-50',
		variants: {
			tone: {
				outline: 'bg-white px-[10px] py-[7px] text-ink hover:bg-accent-blue-wash',
				primary: 'bg-accent-blue px-[10px] py-[8px] text-white hover:bg-accent-blue-dark'
			}
		},
		defaultVariants: { tone: 'outline' }
	});

	export type SketchButtonTone = VariantProps<typeof sketchButtonVariants>['tone'];
</script>

<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		tone = 'outline',
		href = undefined,
		type = 'button',
		disabled,
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & { tone?: SketchButtonTone } = $props();
</script>

{#if href}
	<a
		bind:this={ref}
		data-slot="button"
		class={cn(sketchButtonVariants({ tone }), className)}
		href={disabled ? undefined : href}
		aria-disabled={disabled}
		tabindex={disabled ? -1 : undefined}
		{...restProps}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		bind:this={ref}
		data-slot="button"
		class={cn(sketchButtonVariants({ tone }), className)}
		{type}
		{disabled}
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}
