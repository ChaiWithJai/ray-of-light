/**
 * Sprite cast conformance (issue #46 §5).
 *
 * The manifest is generated (`scripts/generate-sprite-manifest.mts`), never
 * hand-maintained; these tests pin the committed `sprites.json` to the live
 * curriculum so the cast and the courses cannot drift:
 *
 *  - every construction id in both courses has exactly one cast entry;
 *  - every cast entry names a construction that actually exists;
 *  - each entry's label/gloss/first-appearance match the content verbatim;
 *  - identity is deterministic from the stable id (a regenerated manifest can
 *    never reroll a character).
 *
 * When these fail after editing content, run:
 *   npx tsx scripts/generate-sprite-manifest.mts
 */
import { describe, expect, it } from 'vitest';
import { COURSES } from './index.js';
import manifest from './sprites.json';
import { SPRITE_STAGES, spriteIdentity } from '$lib/sprites.js';
import type { LanguageCode } from '$lib/schemas/content.js';

const LANGUAGES: LanguageCode[] = ['fr', 'ta'];

it('declares the six honest stages, in ladder order', () => {
	// `unmet` + the five derived states — nothing invented, no regression art.
	expect(manifest.stages).toEqual([...SPRITE_STAGES]);
	expect(manifest.stages).toEqual([
		'unmet',
		'exposed',
		'recognized',
		'recalled',
		'stabilized',
		'transferable'
	]);
});

describe.each(LANGUAGES)('cast: %s', (language) => {
	const course = COURSES[language];
	const cast: Record<
		string,
		{ label: string; gloss: string; introducedIn: string; seed: number; hue: number }
	> = manifest.cast[language];

	it('covers every construction in the course, and nothing else', () => {
		expect(Object.keys(cast).sort()).toEqual([...course.constructions.keys()].sort());
	});

	it('matches the curriculum verbatim (label, gloss, first appearance)', () => {
		for (const construction of course.constructions.values()) {
			const entry = cast[construction.id];
			expect(entry, construction.id).toBeDefined();
			expect(entry.label, construction.id).toBe(construction.label);
			expect(entry.gloss, construction.id).toBe(construction.gloss);
			expect(entry.introducedIn, construction.id).toBe(construction.introducedIn);
		}
	});

	it('derives identity deterministically from the stable id', () => {
		for (const [id, entry] of Object.entries(cast)) {
			const identity = spriteIdentity(id);
			expect(entry.seed, id).toBe(identity.seed);
			expect(entry.hue, id).toBe(identity.hue);
		}
	});
});
