<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	/** `.mic` — the hold-to-speak affordance. */
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
		'mx-auto flex size-[52px] shrink-0 items-center justify-center rounded-full border-[2.5px] border-accent-blue bg-accent-blue-wash p-0 text-[18px] text-accent-blue transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent-blue disabled:pointer-events-none disabled:opacity-50',
		recording && 'animate-pulse border-note bg-note/15 text-note',
		className
	)}
	{...restProps}
>
	{#if children}{@render children()}{:else}<span aria-hidden="true">🎙</span>{/if}
</button>
