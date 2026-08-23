<script lang="ts">
	import { cn, type WithElementRef, type WithoutChildren } from '$lib/utils.js';
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	/**
	 * The "type or dictate your answer" box (1k, 1o), drawn in the prototype as a
	 * `.card` holding a `.mut` prompt.
	 */
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
		'w-full resize-none rounded-[10px] border-[1.5px] border-ink bg-white p-[10px] text-[13px] leading-[1.3] text-ink outline-none placeholder:text-ink-soft focus-visible:ring-2 focus-visible:ring-accent-blue disabled:opacity-50',
		className
	)}
	{...restProps}
></textarea>
