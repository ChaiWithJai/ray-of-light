<script lang="ts" module>
	import { tv, type VariantProps } from 'tailwind-variants';

	/** Small status tokens ("new", "recall", "on"). */
	export const pillVariants = tv({
		base: 'inline-flex w-fit shrink-0 items-center justify-center rounded-full px-2.5 py-0.5 text-2xs font-bold tracking-wide uppercase whitespace-nowrap',
		variants: {
			active: {
				true: 'bg-brand text-white',
				false: 'border border-line-strong bg-surface text-text-soft'
			}
		},
		defaultVariants: { active: false }
	});

	export type PillVariants = VariantProps<typeof pillVariants>;
</script>

<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		active = false,
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLSpanElement>> & { active?: boolean } = $props();
</script>

<span
	bind:this={ref}
	data-slot="pill"
	class={cn(pillVariants({ active }), className)}
	{...restProps}
>
	{@render children?.()}
</span>
