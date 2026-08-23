<script lang="ts" module>
	import { tv, type VariantProps } from 'tailwind-variants';

	/**
	 * The surface system. Tones map to learning states, not to colors:
	 *   default   — orientation; a plain raised paper card
	 *   accent    — the current focus of attention
	 *   good      — insight: a reveal, a confirmed retrieval
	 *   warn      — caution: hints, honest friction
	 *   parchment — effort: prompt material to work on
	 *   stage     — immersion: the dimmed listening stage
	 */
	export const cardVariants = tv({
		base: 'flex flex-col gap-2 rounded-xl border p-4 text-text shadow-card',
		variants: {
			tone: {
				default: 'border-line bg-surface-raised',
				accent: 'border-brand/45 bg-surface-raised',
				good: 'border-insight/40 bg-insight-card',
				warn: 'border-caution/40 bg-caution-wash/60',
				parchment: 'border-effort-edge bg-effort',
				stage: 'border-transparent bg-stage text-stage-text shadow-stage'
			},
			thick: { true: 'border-line-strong shadow-raised', false: '' }
		},
		compoundVariants: [
			{ tone: 'accent', thick: true, class: 'border-brand/60' }
		],
		defaultVariants: { tone: 'default', thick: false }
	});

	export type CardTone = VariantProps<typeof cardVariants>['tone'];
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
		tone?: CardTone;
		thick?: boolean;
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="card"
	class={cn(cardVariants({ tone, thick }), className)}
	{...restProps}
>
	{@render children?.()}
</div>
