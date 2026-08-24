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
		state,
		size = 44,
		class: className
	}: {
		constructionId: string;
		state: ConstructionState | null;
		size?: number;
		class?: string;
	} = $props();

	const stage = $derived(spriteStage(state));
	const inkUrl = $derived(approvedInkUrl(constructionId));
	const markup = $derived(
		spriteMarkup(constructionId, state, { size, class: cn('shrink-0', className) })
	);
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
	<!-- eslint-disable-next-line svelte/no-at-html-tags — trusted, project-generated markup -->
	{@html markup}
{/if}
