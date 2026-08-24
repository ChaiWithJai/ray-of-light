/**
 * Sprite substrate renderer (issue #46, phase S2).
 *
 * The one source of the parametric substrate's geometry. `<Sprite>` renders
 * this markup in the app, and the ink pipeline's deterministic `stylize`
 * engine (`scripts/generate-sprite-ink.mts`) rasterises the very same string —
 * so the fallback ink tier can never drift from what the UI draws.
 *
 * Pure string-in, string-out: no DOM, no Svelte, importable from Node scripts
 * outside the Vite alias graph (hence the explicit relative imports).
 *
 * Stage grammar (spec §3.3 — growth is honest and legible):
 *   unmet         a faint dashed outline — the future visible, not a checklist
 *   exposed       inked outline resting on the ground, eyes closed
 *   recognized    the ink fills with the character's wash; eyes open
 *   recalled      standing — taller posture, a first quiet smile
 *   stabilized    rooted — small roots under the ground line
 *   transferable  in motion — a lean and a stride mark; maturity, no fireworks
 */
import { spriteIdentity, spriteStage, type SpriteStage } from './sprites.js';
import type { ConstructionState } from './schemas/learner.js';

/** Per-stage posture; everything else derives from these few numbers. */
export const POSTURE: Record<
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

export type SpriteMarkupOptions = {
	size?: number;
	/** Extra class attribute value for the root `<svg>`. */
	class?: string;
	/**
	 * Concrete ink colors for headless rasterisation. In the app the defaults
	 * reference the theme's CSS variables; a rasteriser has no stylesheet, so
	 * the pipeline passes paper-real values.
	 */
	inkColor?: string;
	faintColor?: string;
};

/** The substrate `<svg>` for one character at one honest stage. */
export function spriteMarkup(
	constructionId: string,
	state: ConstructionState | null,
	{ size = 44, class: className, inkColor, faintColor }: SpriteMarkupOptions = {}
): string {
	const identity = spriteIdentity(constructionId);
	const stage = spriteStage(state);
	const p = POSTURE[stage];

	const rx = Math.min(13.5, p.ry * p.rxF * identity.girth);
	const cy = GROUND - p.ry;
	const eyeY = cy - p.ry * 0.22;
	const eyeDx = 3.1 * identity.eyeSpread;
	const headY = cy - p.ry;

	// One muted accent per character (spec §3.2): low saturation, paper-friendly.
	const wash = `hsl(${identity.hue} 30% ${p.fill === 2 ? 86 : 90}%)`;
	const accent = `hsl(${identity.hue} 30% 42%)`;
	const ink =
		stage === 'unmet'
			? (faintColor ?? 'var(--color-text-faint)')
			: (inkColor ?? 'var(--color-text-soft)');

	const parts: string[] = [];

	// body
	parts.push(
		`<ellipse cx="24" cy="${cy}" rx="${rx}" ry="${p.ry}" fill="${p.fill === 0 ? 'none' : wash}" stroke="${ink}" stroke-width="1.6"${
			stage === 'unmet' ? ' stroke-dasharray="3 3" opacity="0.65"' : ''
		}/>`
	);

	// face
	if (p.eyes === 'closed') {
		parts.push(
			`<path d="M ${24 - eyeDx - 1.2} ${eyeY} h 2.4 M ${24 + eyeDx - 1.2} ${eyeY} h 2.4" stroke="${ink}" stroke-width="1.4" fill="none"/>`
		);
	} else if (p.eyes === 'open') {
		parts.push(`<circle cx="${24 - eyeDx}" cy="${eyeY}" r="1.15" fill="${ink}"/>`);
		parts.push(`<circle cx="${24 + eyeDx}" cy="${eyeY}" r="1.15" fill="${ink}"/>`);
	}
	if (p.smile) {
		parts.push(
			`<path d="M ${24 - 2.2} ${eyeY + 3.4} q 2.2 2 4.4 0" stroke="${ink}" stroke-width="1.3" fill="none"/>`
		);
	}

	// accessory: the identity detail that grows with maturity
	if (p.accessory === 1) {
		parts.push(
			`<path d="M 24 ${headY} q 0.6 -2.4 0.2 -3.6" stroke="${accent}" stroke-width="1.3" fill="none"/>`
		);
		parts.push(`<circle cx="24.2" cy="${headY - 4.4}" r="0.9" fill="${accent}"/>`);
	} else if (p.accessory === 2) {
		if (identity.accessory === 'sprout') {
			parts.push(
				`<path d="M 24 ${headY} q 0.4 -3 0 -4.6 M 24 ${headY - 3} q -2.6 -0.4 -3.4 -2.6 q 2.8 -0.6 3.4 2.6 M 24 ${headY - 4} q 2.6 -1 3 -3.2 q -3 0 -3 3.2" stroke="${accent}" stroke-width="1.3" fill="none"/>`
			);
		} else if (identity.accessory === 'tuft') {
			parts.push(
				`<path d="M ${24 - 3} ${headY + 0.5} q -0.6 -2.6 0.4 -3.8 M 24 ${headY} q 0 -3 0.4 -4.2 M ${24 + 3} ${headY + 0.5} q 1 -2.4 0.2 -3.6" stroke="${accent}" stroke-width="1.3" fill="none"/>`
			);
		} else {
			parts.push(
				`<path d="M 24 ${headY} q 0.4 -3.4 0 -5" stroke="${accent}" stroke-width="1.3" fill="none"/>`
			);
			parts.push(
				`<circle cx="24" cy="${headY - 6.2}" r="1.4" fill="none" stroke="${accent}" stroke-width="1.2"/>`
			);
		}
	}

	// rooted: stabilized only — repetition across distinct days, made literal
	if (p.roots) {
		parts.push(
			`<path d="M ${24 - rx * 0.5} ${GROUND} q -1.4 3 -3.2 4.2 M 24 ${GROUND + 0.5} q 0.3 3 0 4.4 M ${24 + rx * 0.5} ${GROUND} q 1.6 2.8 3.4 4" stroke="${ink}" stroke-width="1.5" fill="none"/>`
		);
	}

	// in motion: transferable's stride marks — maturity, not fireworks
	if (p.stride) {
		parts.push(
			`<path d="M ${24 - rx - 3} ${cy - 2.5} h -4.5 M ${24 - rx - 2} ${cy + 3} h -6" stroke="${accent}" stroke-width="1.4" fill="none" opacity="0.75"/>`
		);
	}

	return (
		`<svg xmlns="http://www.w3.org/2000/svg" viewBox="3 5 42 42" width="${size}" height="${size}"` +
		(className ? ` class="${className}"` : '') +
		` data-sprite="${constructionId}" data-stage="${stage}" aria-hidden="true">` +
		`<g transform="rotate(${identity.tilt + p.lean} 24 ${GROUND})" stroke-linecap="round" stroke-linejoin="round">` +
		parts.join('') +
		`</g></svg>`
	);
}
