<script lang="ts">
	/**
	 * A construction's sprite (issue #46, phases S0–S2).
	 *
	 * One small hand-inked margin character per construction. Identity (accent
	 * hue, tilt, accessory, girth) is hashed from the stable construction id
	 * (`$lib/sprites.ts`); the *only* varying dimension is the capability stage,
	 * which callers pass straight from `deriveConstructionState` output. This
	 * component never advances, stores or animates a stage.
	 *
	 * Two tiers (spec §5 — "2 as the substrate, 1 as the skin"):
	 *  - substrate: the parametric SVG, drawn by `$lib/sprite-render.ts` (the
	 *    same string the ink pipeline's fallback engine rasterises);
	 *  - ink: a generated PNG from `static/sprites/ink/`, rendered ONLY when
	 *    the owner-review gate (`$lib/sprite-ink.ts`, D8) holds an approved
	 *    record for this construction. No record → substrate, always.
	 *
	 * Calm-first: still by default, no idle animation, no celebration frames —
	 * therefore reduced-motion safe by construction. Decorative marginalia: the
	 * stage is always also present as text on the surface, so the sprite is
	 * hidden from assistive tech rather than narrating a duplicate.
	 */
	import { spriteStage } from '$lib/sprites.js';
	import { spriteMarkup } from '$lib/sprite-render.js';
	import { approvedInkUrl } from '$lib/sprite-ink.js';
	import type { ConstructionState } from '$lib/schemas/learner.js';
	import { cn } from '$lib/utils.js';

	let {
		constructionId,
		// Renamed locally so the `$state` rune is not shadowed by a prop called `state`.
		state: capabilityState,
		size = 44,
		class: className
	}: {
		constructionId: string;
		state: ConstructionState | null;
		size?: number;
		class?: string;
	} = $props();

	const stage = $derived(spriteStage(capabilityState));
	const inkUrl = $derived(approvedInkUrl(constructionId));
	const markup = $derived(
		spriteMarkup(constructionId, capabilityState, { size, class: cn('shrink-0', className) })
	);

	/**
	 * A surface can server-render a sprite before the learner's profile has
	 * loaded, which draws the `unmet` outline; the real stage arrives a moment
	 * later. A hydrated `{@html}` block keeps the nodes it claimed, so without
	 * this the drawing would sit at `unmet` beside a state word that says
	 * `recalled` — precisely the desync spec §6 forbids. Redrawing the host when
	 * the DOM disagrees with the derivation keeps the two identical.
	 */
	let host: HTMLElement | undefined = $state.raw(undefined);
	$effect(() => {
		const drawn = host?.firstElementChild;
		if (!host || !drawn) return;
		if (drawn.getAttribute('data-stage') === stage && drawn.getAttribute('data-sprite') === constructionId) {
			return;
		}
		host.innerHTML = markup;
	});
</script>

{#if inkUrl}
	<img
		src={inkUrl}
		width={size}
		height={size}
		class={cn('shrink-0', className)}
		data-sprite={constructionId}
		data-stage={stage}
		data-ink
		alt=""
		aria-hidden="true"
	/>
{:else}
	<!-- `display: contents`, so the host adds nothing to the layout the sprite
	     sits in; the svg itself remains the laid-out box. -->
	<span class="contents" bind:this={host}>
		<!-- eslint-disable-next-line svelte/no-at-html-tags — trusted, project-generated markup -->
		{@html markup}
	</span>
{/if}
