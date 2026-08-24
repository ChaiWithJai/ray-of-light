<script lang="ts">
	/**
	 * ConceptIntro — the once-per-technique first-run introduction (#36).
	 *
	 * The first time a learner reaches a technique, a calm dismissible card
	 * explains what it is, why it works and what to do, earning buy-in before
	 * the method asks for effort. Dismissal persists in the learner profile, so
	 * the card appears exactly once; a small affordance on the step reopens it
	 * whenever the learner wants the explanation again.
	 */
	import { TECHNIQUE_INTROS, type TechniqueIntroId } from '$lib/intros.js';
	import { profile } from '$lib/stores/profile.svelte.js';
	import Card from './card.svelte';
	import Muted from './muted.svelte';

	let { technique }: { technique: TechniqueIntroId } = $props();

	const intro = $derived(TECHNIQUE_INTROS[technique]);
	const seen = $derived(profile.hasSeenIntro(technique));
	let reopened = $state(false);
	const open = $derived(!seen || reopened);

	function dismiss() {
		profile.markIntroSeen(technique);
		reopened = false;
	}
</script>

{#if profile.loaded}
	{#if open}
		<Card tone="parchment" class="anim-uncover gap-2" data-testid="concept-intro">
			<div class="text-2xs font-bold tracking-[0.14em] text-brand uppercase">
				{seen ? 'About this technique' : 'New technique'}
			</div>
			<div class="text-sm font-semibold">{intro.title}</div>
			<Muted class="text-xs leading-relaxed">{intro.body}</Muted>
			<button
				type="button"
				class="mt-1 cursor-pointer self-start rounded-full border border-line-strong px-3 py-1 text-xs font-bold text-text-soft transition-colors outline-none hover:border-brand/60 hover:text-brand-deep focus-visible:ring-2 focus-visible:ring-brand"
				onclick={dismiss}
			>
				Got it
			</button>
		</Card>
	{:else}
		<button
			type="button"
			class="cursor-pointer self-start text-2xs text-text-faint underline decoration-dotted underline-offset-2 outline-none hover:text-text-soft focus-visible:ring-2 focus-visible:ring-brand"
			onclick={() => (reopened = true)}
		>
			About this technique
		</button>
	{/if}
{/if}
