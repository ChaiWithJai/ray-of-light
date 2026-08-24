<script lang="ts">
	/**
	 * NotesLink — the mobile affordance for the notebook during a session
	 * (#48). Below `lg` there is no aside column, so the same LessonNotes
	 * surface opens as an overlay, following the session shell's convention
	 * (Stuck/WikiPanel): never a route change, one action returns to the
	 * exercise with its state intact.
	 */
	import { X } from '@lucide/svelte';
	import * as W from '$lib/components/ui/index.js';
	import LessonNotes from './lesson-notes.svelte';

	let { lessonId, class: className = '' }: { lessonId: string; class?: string } = $props();

	let open = $state(false);
	let panel = $state<HTMLElement | null>(null);
	$effect(() => {
		if (open) panel?.focus();
	});
</script>

<svelte:window
	onkeydown={(e) => {
		if (open && e.key === 'Escape') open = false;
	}}
/>

<button
	type="button"
	data-testid="notes-link"
	class="cursor-pointer text-2xs text-text-faint underline decoration-dotted underline-offset-2 outline-none hover:text-text-soft focus-visible:ring-2 focus-visible:ring-brand lg:hidden {className}"
	aria-haspopup="dialog"
	onclick={() => (open = true)}
>
	notes
</button>

{#if open}
	<div class="fixed inset-0 z-40 flex items-end justify-center sm:items-center">
		<button
			type="button"
			aria-label="Close and return"
			class="absolute inset-0 cursor-default bg-stage/45 backdrop-blur-[2px]"
			onclick={() => (open = false)}
			tabindex={-1}
		></button>
		<div
			bind:this={panel}
			role="dialog"
			aria-modal="true"
			aria-label="Your notes"
			tabindex={-1}
			data-testid="notes-sheet"
			class="anim-rise relative m-0 flex max-h-[85vh] w-full max-w-lg flex-col gap-3 overflow-y-auto rounded-t-xl border border-line bg-surface p-5 shadow-raised outline-none sm:m-4 sm:rounded-xl"
		>
			<button
				type="button"
				aria-label="Close and return"
				class="absolute top-4 right-4 flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-text-soft outline-none hover:bg-line/40 hover:text-text focus-visible:ring-2 focus-visible:ring-brand"
				onclick={() => (open = false)}
			>
				<X size={16} />
			</button>
			<LessonNotes {lessonId} />
			<W.Button
				tone="primary"
				class="mt-1"
				data-testid="notes-sheet-close"
				onclick={() => (open = false)}
			>
				Back to the exercise
			</W.Button>
		</div>
	</div>
{/if}
