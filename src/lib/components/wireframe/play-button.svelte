<script lang="ts" module>
	import { tv, type VariantProps } from 'tailwind-variants';

	/** `.play` (30px), its 24px inline variant, and `.playBig` (64px). */
	export const playButtonVariants = tv({
		base: 'flex shrink-0 items-center justify-center rounded-full bg-transparent p-0 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent-blue disabled:pointer-events-none disabled:opacity-50',
		variants: {
			size: {
				sm: 'size-[24px] border-2 text-[10px]',
				md: 'size-[30px] border-2 text-[12px]',
				lg: 'mx-auto size-[64px] border-[3px] text-[24px]'
			},
			tone: {
				ink: 'border-ink text-ink hover:bg-black/5',
				blue: 'border-accent-blue text-accent-blue hover:bg-accent-blue-wash'
			}
		},
		defaultVariants: { size: 'md', tone: 'ink' }
	});

	export type PlayButtonVariants = VariantProps<typeof playButtonVariants>;
</script>

<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		size = 'md',
		tone = 'ink',
		glyph = '▶',
		label = 'Play',
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLButtonAttributes> &
		PlayButtonVariants & { glyph?: string; label?: string } = $props();
</script>

<button
	bind:this={ref}
	type="button"
	data-slot="play-button"
	aria-label={label}
	class={cn(playButtonVariants({ size, tone }), className)}
	{...restProps}
>
	{#if children}{@render children()}{:else}<span aria-hidden="true">{glyph}</span>{/if}
</button>
