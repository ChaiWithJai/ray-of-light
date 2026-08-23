<script lang="ts" module>
	import { tv, type VariantProps } from 'tailwind-variants';

	/** `.card` and its recoloured variants from the prototype stylesheet. */
	export const sketchCardVariants = tv({
		base: 'flex flex-col gap-[6px] rounded-[10px] border-[1.5px] border-ink bg-white p-[10px] text-ink',
		variants: {
			tone: {
				default: '',
				accent: 'border-accent-blue',
				good: 'border-good bg-good-card',
				warn: 'border-note',
				parchment: 'bg-parchment'
			},
			thick: { true: 'border-2', false: '' }
		},
		defaultVariants: { tone: 'default', thick: false }
	});

	export type SketchCardTone = VariantProps<typeof sketchCardVariants>['tone'];
</script>

<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		tone = 'default',
		thick = false,
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		tone?: SketchCardTone;
		thick?: boolean;
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="card"
	class={cn(sketchCardVariants({ tone, thick }), className)}
	{...restProps}
>
	{@render children?.()}
</div>
