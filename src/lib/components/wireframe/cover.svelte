<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { Snippet } from 'svelte';

	/**
	 * Layout-preserving support removal (AC 4: "either language column can be
	 * covered without changing the spatial layout").
	 *
	 * A covered cell that simply *replaces* the text with a hatched box does
	 * change the layout — the box and the text it stands in for are different
	 * heights, so lines shift the moment you cover a column. That would break the
	 * one thing the spread is for.
	 *
	 * So the text is never removed. It stays in the DOM reserving exactly its own
	 * space, is hidden from sight and from screen readers, and the hatch is
	 * painted over the top.
	 */
	let {
		covered = false,
		label = 'covered',
		tone = 'default',
		class: className,
		children
	}: {
		covered?: boolean;
		label?: string;
		tone?: 'default' | 'accent';
		class?: string;
		children?: Snippet;
	} = $props();
</script>

<div data-slot="cover" class={cn('relative', className)}>
	<div class={covered ? 'invisible' : ''} aria-hidden={covered ? 'true' : undefined}>
		{@render children?.()}
	</div>

	{#if covered}
		<div
			class={cn(
				'sketch-cover absolute inset-0 flex items-center justify-center rounded-[6px] border-[1.5px] border-dashed text-center text-[12px]',
				tone === 'accent'
					? 'border-accent-blue text-accent-blue'
					: 'border-cover-line text-cover-ink'
			)}
		>
			{label}
		</div>
	{/if}
</div>
