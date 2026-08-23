<script lang="ts" module>
	import { tv, type VariantProps } from 'tailwind-variants';

	export const playButtonVariants = tv({
		base: 'flex shrink-0 items-center justify-center rounded-full bg-transparent p-0 transition-colors duration-(--duration-quick) outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:pointer-events-none disabled:opacity-50',
		variants: {
			size: {
				sm: 'size-7 border text-[10px]',
				md: 'size-9 border-[1.5px] text-xs',
				lg: 'relative mx-auto size-20 border-2 text-2xl'
			},
			tone: {
				ink: 'border-line-strong text-text hover:border-brand hover:text-brand-deep',
				blue: 'border-brand text-brand hover:bg-brand-wash',
				stage: 'border-stage-muted/60 bg-white/5 text-stage-text hover:border-stage-text'
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
