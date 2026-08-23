<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	/** The hold-to-speak affordance. */
	let {
		ref = $bindable(null),
		recording = false,
		label = 'Hold to speak',
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLButtonAttributes> & { recording?: boolean; label?: string } = $props();
</script>

<button
	bind:this={ref}
	type="button"
	data-slot="mic-button"
	aria-label={label}
	aria-pressed={recording}
	class={cn(
		'mx-auto flex size-13 shrink-0 items-center justify-center rounded-full border-2 border-brand/60 bg-brand-wash p-0 text-lg text-brand-deep shadow-card transition-colors duration-(--duration-quick) outline-none hover:border-brand focus-visible:ring-2 focus-visible:ring-brand disabled:pointer-events-none disabled:opacity-50',
		recording && 'animate-pulse border-caution bg-caution-wash text-caution',
		className
	)}
	{...restProps}
>
	{#if children}{@render children()}{:else}<span aria-hidden="true">🎙</span>{/if}
</button>
