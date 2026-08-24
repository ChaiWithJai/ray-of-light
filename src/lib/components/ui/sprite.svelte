<script lang="ts">
	/**
	 * A construction's sprite — parametric substrate tier (issue #46, phase S0).
	 *
	 * One small hand-inked margin character per construction. Identity (accent
	 * hue, tilt, accessory, girth) is hashed from the stable construction id
	 * (`$lib/sprites.ts`); the *only* varying dimension is the capability stage,
	 * which callers pass straight from `deriveConstructionState` output. This
	 * component never advances, stores or animates a stage.
	 *
	 * Stage grammar (spec §3.3 — growth is honest and legible):
	 *   unmet         a faint dashed outline — the future visible, not a checklist
	 *   exposed       inked outline resting on the ground, eyes closed
	 *   recognized    the ink fills with the character's wash; eyes open
	 *   recalled      standing — taller posture, a first quiet smile
	 *   stabilized    rooted — small roots under the ground line
	 *   transferable  in motion — a lean and a stride mark; maturity, no fireworks
	 *
	 * Calm-first: still by default, no idle animation, no celebration frames —
	 * therefore reduced-motion safe by construction. Decorative marginalia: the
	 * stage is always also present as text on the surface, so the SVG is hidden
	 * from assistive tech rather than narrating a duplicate.
	 */
	import { spriteIdentity, spriteStage, type SpriteStage } from '$lib/sprites.js';
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

	const identity = $derived(spriteIdentity(constructionId));
	const stage = $derived(spriteStage(state));

	/** Per-stage posture; everything else derives from these few numbers. */
	const POSTURE: Record<
		SpriteStage,
		{
			/** Body half-height — the character literally sits lower early on. */
			ry: number;
			/** Width factor: young sprites are puddles, mature ones stand. */
			rxF: number;
			/** 0 none · 1 wash · 2 fuller wash. */
			fill: 0 | 1 | 2;
			eyes: 'none' | 'closed' | 'open';
			smile: boolean;
			roots: boolean;
			stride: boolean;
			/** Forward lean in degrees, added to the identity tilt. */
			lean: number;
			/** 0 none · 1 bud · 2 the full accessory. */
			accessory: 0 | 1 | 2;
		}
	> = {
		unmet: { ry: 7, rxF: 1.5, fill: 0, eyes: 'none', smile: false, roots: false, stride: false, lean: 0, accessory: 0 },
		exposed: { ry: 7, rxF: 1.5, fill: 0, eyes: 'closed', smile: false, roots: false, stride: false, lean: 0, accessory: 0 },
		recognized: { ry: 9.5, rxF: 1.2, fill: 1, eyes: 'open', smile: false, roots: false, stride: false, lean: 0, accessory: 1 },
		recalled: { ry: 12, rxF: 0.98, fill: 1, eyes: 'open', smile: true, roots: false, stride: false, lean: 0, accessory: 1 },
		stabilized: { ry: 12, rxF: 0.98, fill: 2, eyes: 'open', smile: true, roots: true, stride: false, lean: 0, accessory: 2 },
		transferable: { ry: 12.5, rxF: 0.94, fill: 2, eyes: 'open', smile: true, roots: false, stride: true, lean: -6, accessory: 2 }
	};

	const GROUND = 38;
	const p = $derived(POSTURE[stage]);
	const rx = $derived(Math.min(13.5, p.ry * p.rxF * identity.girth));
	const cy = $derived(GROUND - p.ry);
	const eyeY = $derived(cy - p.ry * 0.22);
	const eyeDx = $derived(3.1 * identity.eyeSpread);
	const headY = $derived(cy - p.ry);

	// One muted accent per character (spec §3.2): low saturation, paper-friendly.
	const wash = $derived(`hsl(${identity.hue} 30% ${p.fill === 2 ? 86 : 90}%)`);
	const accent = $derived(`hsl(${identity.hue} 30% 42%)`);
	const ink = $derived(stage === 'unmet' ? 'var(--color-text-faint)' : 'var(--color-text-soft)');
</script>

<svg
	viewBox="3 5 42 42"
	width={size}
	height={size}
	class={cn('shrink-0', className)}
	data-sprite={constructionId}
	data-stage={stage}
	aria-hidden="true"
>
	<g
		transform="rotate({identity.tilt + p.lean} 24 {GROUND})"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<!-- body -->
		<ellipse
			cx="24"
			cy={cy}
			{rx}
			ry={p.ry}
			fill={p.fill === 0 ? 'none' : wash}
			stroke={ink}
			stroke-width="1.6"
			stroke-dasharray={stage === 'unmet' ? '3 3' : undefined}
			opacity={stage === 'unmet' ? 0.65 : 1}
		/>

		<!-- face -->
		{#if p.eyes === 'closed'}
			<path d="M {24 - eyeDx - 1.2} {eyeY} h 2.4 M {24 + eyeDx - 1.2} {eyeY} h 2.4" stroke={ink} stroke-width="1.4" fill="none" />
		{:else if p.eyes === 'open'}
			<circle cx={24 - eyeDx} cy={eyeY} r="1.15" fill={ink} />
			<circle cx={24 + eyeDx} cy={eyeY} r="1.15" fill={ink} />
		{/if}
		{#if p.smile}
			<path d="M {24 - 2.2} {eyeY + 3.4} q 2.2 2 4.4 0" stroke={ink} stroke-width="1.3" fill="none" />
		{/if}

		<!-- accessory: the identity detail that grows with maturity -->
		{#if p.accessory === 1}
			<path d="M 24 {headY} q 0.6 -2.4 0.2 -3.6" stroke={accent} stroke-width="1.3" fill="none" />
			<circle cx={24.2} cy={headY - 4.4} r="0.9" fill={accent} />
		{:else if p.accessory === 2}
			{#if identity.accessory === 'sprout'}
				<path
					d="M 24 {headY} q 0.4 -3 0 -4.6 M 24 {headY - 3} q -2.6 -0.4 -3.4 -2.6 q 2.8 -0.6 3.4 2.6 M 24 {headY - 4} q 2.6 -1 3 -3.2 q -3 0 -3 3.2"
					stroke={accent}
					stroke-width="1.3"
					fill="none"
				/>
			{:else if identity.accessory === 'tuft'}
				<path
					d="M {24 - 3} {headY + 0.5} q -0.6 -2.6 0.4 -3.8 M 24 {headY} q 0 -3 0.4 -4.2 M {24 + 3} {headY + 0.5} q 1 -2.4 0.2 -3.6"
					stroke={accent}
					stroke-width="1.3"
					fill="none"
				/>
			{:else}
				<path d="M 24 {headY} q 0.4 -3.4 0 -5" stroke={accent} stroke-width="1.3" fill="none" />
				<circle cx={24} cy={headY - 6.2} r="1.4" fill="none" stroke={accent} stroke-width="1.2" />
			{/if}
		{/if}

		<!-- rooted: stabilized only — repetition across distinct days, made literal -->
		{#if p.roots}
			<path
				d="M {24 - rx * 0.5} {GROUND} q -1.4 3 -3.2 4.2 M 24 {GROUND + 0.5} q 0.3 3 0 4.4 M {24 + rx * 0.5} {GROUND} q 1.6 2.8 3.4 4"
				stroke={ink}
				stroke-width="1.5"
				fill="none"
			/>
		{/if}

		<!-- in motion: transferable's stride marks — maturity, not fireworks -->
		{#if p.stride}
			<path
				d="M {24 - rx - 3} {cy - 2.5} h -4.5 M {24 - rx - 2} {cy + 3} h -6"
				stroke={accent}
				stroke-width="1.4"
				fill="none"
				opacity="0.75"
			/>
		{/if}
	</g>
</svg>
