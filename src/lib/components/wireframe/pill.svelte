<script lang="ts" module>
	import { tv, type VariantProps } from 'tailwind-variants';

	/** `.pill` / `.pillOn` — the small status tokens ("new", "recall", "on"). */
	export const pillVariants = tv({
		base: 'inline-flex w-fit shrink-0 items-center justify-center rounded-full border-[1.5px] px-[8px] py-px text-[11px] font-normal whitespace-nowrap',
		variants: {
			active: {
				true: 'border-accent-blue bg-accent-blue text-white',
				false: 'border-ink bg-white text-ink'
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
