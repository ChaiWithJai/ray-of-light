/**
 * Sprite world — the parametric substrate (issue #46, phase S0).
 *
 * Constructions are the cast (docs/design/sprite-world.md §2). This module is
 * the *grammar* under every sprite: a deterministic identity derived from the
 * construction's stable id, and a stage vocabulary that mirrors — never
 * extends — the capability ladder in `deriveConstructionState`.
 *
 * Honesty rules (spec §6) enforced by construction:
 *  - a sprite's stage is the derived capability state, or `unmet` when there
 *    is no evidence at all; nothing here can advance or store a stage.
 *  - the state machine has no regression, so neither does this vocabulary —
 *    there is no "withered" stage.
 *  - identity is a pure hash of the id, so regenerating the manifest or
 *    re-rendering a sprite can never reroll a character.
 *
 * Kept dependency-light on purpose: `scripts/generate-sprite-manifest.mts`
 * imports this file outside the Vite alias graph.
 */
import { CONSTRUCTION_STATES, type ConstructionState } from './schemas/learner.js';

/** `unmet` (faint outline, spec §3.3) + the five evidence-derived states. */
export const SPRITE_STAGES = ['unmet', ...CONSTRUCTION_STATES] as const;
export type SpriteStage = (typeof SPRITE_STAGES)[number];

/** The one mapping from derivation output to sprite stage. */
export function spriteStage(state: ConstructionState | null): SpriteStage {
	return state ?? 'unmet';
}

/**
 * FNV-1a 32-bit over the construction id. Ids are stable and already
 * language-prefixed (`fr.je-voudrais`, `ta.vanakkam`), so the seed is unique
 * per character and identical on every device and every rebuild.
 */
export function spriteSeed(constructionId: string): number {
	let hash = 0x811c9dc5;
	for (let i = 0; i < constructionId.length; i++) {
		hash ^= constructionId.charCodeAt(i);
		hash = Math.imul(hash, 0x01000193);
	}
	return hash >>> 0;
}

/**
 * A character's fixed traits — everything about a sprite that is *not* its
 * capability stage. One muted accent hue and small posture variations, per the
 * art direction ("marginalia, not mascots", spec §3.2).
 */
export type SpriteIdentity = {
	seed: number;
	/** Muted accent hue, 0–359. Rendered at low saturation only. */
	hue: number;
	/** Resting head tilt in degrees, −4…4. */
	tilt: number;
	/** Which of the three marginalia accessories this character grows. */
	accessory: 'sprout' | 'tuft' | 'stem';
	/** Body width factor, 0.90–1.06 — some characters are rounder. */
	girth: number;
	/** Eye spacing factor, 0.85–1.15. */
	eyeSpread: number;
};

const ACCESSORIES = ['sprout', 'tuft', 'stem'] as const;

export function spriteIdentity(constructionId: string): SpriteIdentity {
	const seed = spriteSeed(constructionId);
	return {
		seed,
		hue: seed % 360,
		tilt: ((seed >>> 9) % 9) - 4,
		accessory: ACCESSORIES[(seed >>> 13) % 3],
		girth: 0.9 + ((seed >>> 17) % 9) / 50,
		eyeSpread: 0.85 + ((seed >>> 21) % 7) / 20
	};
}
