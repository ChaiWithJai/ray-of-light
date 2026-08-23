<script lang="ts" module>
	import { tv, type VariantProps } from 'tailwind-variants';

	/**
	 * Action hierarchy: `primary` is the single next step of the method on a
	 * screen; `outline` is a supporting choice; `ghost` is chrome.
	 */
	export const buttonVariants = tv({
		base: 'inline-flex w-full shrink-0 items-center justify-center rounded-lg text-center text-base font-bold whitespace-normal transition-[background-color,border-color,color,box-shadow,transform] duration-(--duration-quick) outline-none select-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-ground active:translate-y-px disabled:pointer-events-none disabled:opacity-50',
		variants: {
			tone: {
				outline:
					'border border-line-strong bg-surface-raised px-4 py-2.5 text-text shadow-card hover:border-brand/60 hover:text-brand-deep',
				primary:
					'border border-brand-deep/30 bg-brand px-4 py-3 text-white shadow-raised hover:bg-brand-deep',
				ghost: 'px-3 py-2 font-normal text-text-soft hover:bg-line/40 hover:text-text'
			}
		},
		defaultVariants: { tone: 'outline' }
	});

	export type ButtonTone = VariantProps<typeof buttonVariants>['tone'];
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
		WithElementRef<HTMLAnchorAttributes> & { tone?: ButtonTone } = $props();
</script>

{#if href}
	<a
		bind:this={ref}
		data-slot="button"
		class={cn(buttonVariants({ tone }), 'no-underline', className)}
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
		class={cn(buttonVariants({ tone }), className)}
		{type}
		{disabled}
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}
