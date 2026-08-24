/**
 * Cast lookups over the generated sprite manifest (issue #46, phase S2).
 *
 * The manifest (`sprites.json`, emitted by `scripts/generate-sprite-manifest.mts`)
 * is the roster of every construction character across both curricula. This
 * module is the read side used by wiki-linked surfaces: a Term popover or a
 * glossary page shows a sprite exactly when the id it names is a real cast
 * member — method terms like "wave" or "support" are not characters and never
 * get one.
 */
import manifest from './sprites.json';

export type SpriteCastEntry = {
	label: string;
	gloss: string;
	introducedIn: string;
	seed: number;
	hue: number;
};

/** The cast entry for a construction id, whichever curriculum it lives in. */
export function spriteCastEntry(constructionId: string): SpriteCastEntry | undefined {
	for (const cast of Object.values(manifest.cast) as Record<string, SpriteCastEntry>[]) {
		const entry = cast[constructionId];
		if (entry) return entry;
	}
	return undefined;
}

/**
 * The stable sample character wiki surfaces use to illustrate the stage
 * grammar (`/wiki/capability`) — a real cast member, never an invented one;
 * a conformance test pins its existence in the manifest.
 */
export const SAMPLE_CAST_ID = 'fr.je-voudrais';
