<script lang="ts">
	/**
	 * WikiPanel — the overlay reading form of the method wiki (#47).
	 *
	 * Lesson steps never leave their route to explain themselves, so both wiki
	 * jobs that occur mid-exercise render here as an overlay: `unstuck` shows a
	 * technique page's front-loaded unblocking lines (job 1, the stuck panel)
	 * with the rest one tap away; `full` shows the whole page (job 2, opened
	 * from a concept intro's "learn more"). One action returns to the exercise
	 * with its state intact.
	 */
	import { X } from '@lucide/svelte';
	import { wikiPage } from '$lib/content/wiki/index.js';
	import Button from './button.svelte';
	import Card from './card.svelte';
	import Muted from './muted.svelte';

	let {
		slug,
		mode = 'unstuck',
		closeLabel = 'Back to the exercise',
		onclose
	}: {
		slug: string;
		mode?: 'unstuck' | 'full';
		closeLabel?: string;
		onclose: () => void;
	} = $props();

	const page = $derived(wikiPage(slug));
	let readingOn = $state(false);
	const showBody = $derived(mode === 'full' || readingOn);

	let panel = $state<HTMLElement | null>(null);
	$effect(() => {
		panel?.focus();
	});
</script>

<svelte:window
	onkeydown={(e) => {
		if (e.key === 'Escape') onclose();
	}}
/>

{#if page}
	<div class="fixed inset-0 z-40 flex items-end justify-center sm:items-center">
		<button
			type="button"
			aria-label="Close and return"
			class="absolute inset-0 cursor-default bg-stage/45 backdrop-blur-[2px]"
			onclick={onclose}
			tabindex={-1}
		></button>
		<div
			bind:this={panel}
			role="dialog"
			aria-modal="true"
			aria-label={page.title}
			tabindex={-1}
			data-testid="wiki-panel"
			class="anim-rise relative m-0 flex max-h-[85vh] w-full max-w-lg flex-col gap-3 overflow-y-auto rounded-t-xl border border-line bg-surface p-5 shadow-raised outline-none sm:m-4 sm:rounded-xl"
		>
			<div class="flex items-start justify-between gap-3">
				<div>
					<div class="text-2xs font-bold tracking-[0.14em] text-brand uppercase">
						{mode === 'unstuck' ? 'A way through' : 'About this technique'}
					</div>
					<div class="font-display text-lg leading-tight font-semibold">{page.title}</div>
				</div>
				<button
					type="button"
					aria-label="Close and return"
					class="-mt-1 -mr-1 flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-text-soft outline-none hover:bg-line/40 hover:text-text focus-visible:ring-2 focus-visible:ring-brand"
					onclick={onclose}
				>
					<X size={16} />
				</button>
			</div>

			{#if mode === 'full'}
				<Muted class="text-sm">{page.lead}</Muted>
			{/if}

			<Card tone="parchment" class="gap-1.5" data-testid="wiki-panel-unstuck">
				{#each page.unstuck as line, i (i)}
					<p class="m-0 text-sm leading-relaxed">{line}</p>
				{/each}
			</Card>

			{#if showBody}
				{#each page.sections as section (section.heading)}
					<div class="flex flex-col gap-1.5">
						<div class="text-sm font-semibold">{section.heading}</div>
						{#each section.paragraphs as paragraph, i (i)}
							<Muted class="text-sm leading-relaxed">{paragraph}</Muted>
						{/each}
					</div>
				{/each}
			{:else}
				<button
					type="button"
					data-testid="wiki-panel-more"
					class="cursor-pointer self-start text-2xs text-text-faint underline decoration-dotted underline-offset-2 outline-none hover:text-text-soft focus-visible:ring-2 focus-visible:ring-brand"
					onclick={() => (readingOn = true)}
				>
					Keep reading about this technique
				</button>
			{/if}

			<Button tone="primary" class="mt-1" data-testid="wiki-panel-close" onclick={onclose}>
				{closeLabel}
			</Button>
		</div>
	</div>
{/if}
