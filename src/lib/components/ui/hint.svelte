<script lang="ts">
	/**
	 * Hint — the callout grammar for guidance text. Informational, no-action
	 * copy ("tap a line to replay it") renders here so it reads as help for
	 * working the interface, visually distinct from lesson content and from
	 * controls. Never put content or actions inside a Hint.
	 */
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils.js';

	let {
		class: className = '',
		children
	}: {
		class?: string;
		children?: Snippet;
	} = $props();
</script>

<div
	role="note"
	class={cn(
		'mx-auto flex max-w-md items-baseline justify-center gap-2 rounded-lg border border-dashed border-line-strong/60 bg-surface-raised/60 px-3 py-1.5 text-center text-2xs leading-relaxed text-text-soft',
		className
	)}
>
	<span aria-hidden="true" class="shrink-0 text-text-faint">✱</span>
	<span>{@render children?.()}</span>
</div>
