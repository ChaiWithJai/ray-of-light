<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { Snippet } from 'svelte';

	/**
	 * Layout-preserving support removal (AC 4). The text is never removed: it
	 * stays in the DOM reserving exactly its own space, hidden from sight and
	 * screen readers, and the woven cover is painted over the top. Covering or
	 * uncovering therefore never reflows the spread.
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
				'covered-weave absolute inset-0 flex items-center justify-center rounded-md border border-dashed text-center text-xs',
				tone === 'accent' ? 'border-brand/70 text-brand-deep' : 'border-line-strong text-text-faint'
			)}
		>
			{label}
		</div>
	{/if}
</div>
