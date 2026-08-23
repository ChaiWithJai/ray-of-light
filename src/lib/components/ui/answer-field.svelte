<script lang="ts">
	import { cn, type WithElementRef, type WithoutChildren } from '$lib/utils.js';
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	/** The "type or dictate your answer" box. */
	let {
		ref = $bindable(null),
		value = $bindable(''),
		minHeight = 64,
		class: className,
		...restProps
	}: WithoutChildren<WithElementRef<HTMLTextareaAttributes, HTMLTextAreaElement>> & {
		minHeight?: number;
	} = $props();
</script>

<textarea
	bind:this={ref}
	bind:value
	data-slot="answer-field"
	style="min-height: {minHeight}px"
	class={cn(
		'w-full resize-none rounded-xl border border-line-strong bg-surface-raised p-3 font-serif text-base leading-normal text-text shadow-card transition-colors duration-(--duration-quick) outline-none placeholder:font-sans placeholder:text-sm placeholder:text-text-faint focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/40 disabled:opacity-50',
		className
	)}
	{...restProps}
></textarea>
