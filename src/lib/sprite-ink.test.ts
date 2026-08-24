/**
 * The ink layer's owner-review gate (issue #46, phase S2; D8) — the pure,
 * browser-safe side: the gate refuses unreviewed, unhashed, or malformed
 * records, and a fixture-approved record renders (returns the asset URL).
 *
 * The node-side checks — committed records re-hashed against the assets on
 * disk, and the pipeline smoke over the fallback engine — live in
 * `scripts/sprite-ink.pipeline.test.mts`, outside the app's DOM tsconfig.
 */
import { describe, expect, it } from 'vitest';

import { approvedInkUrl, inkAssetUrl } from './sprite-ink.js';
import { spriteMarkup } from './sprite-render.js';
import { SAMPLE_CAST_ID, spriteCastEntry } from './content/sprite-cast.js';
import { SPRITE_STAGES } from './sprites.js';

const FIXTURE_ID = 'fr.je-voudrais';
const FIXTURE_HASH = 'a'.repeat(64);
const approvedFixture = {
	constructionId: FIXTURE_ID,
	assetSha256: FIXTURE_HASH,
	reviewer: 'owner',
	date: '2026-08-24',
	decision: 'approved',
	engine: 'stylize'
};

describe('the review gate (D8)', () => {
	it('renders substrate everywhere while no records exist', () => {
		// The committed reviews file starts empty; the gate must say "no ink".
		expect(approvedInkUrl(FIXTURE_ID)).toBeNull();
	});

	it('accepts a fixture-approved record and yields the asset URL', () => {
		expect(approvedInkUrl(FIXTURE_ID, [approvedFixture])).toBe(inkAssetUrl(FIXTURE_ID));
		expect(inkAssetUrl(FIXTURE_ID)).toBe(`/sprites/ink/${FIXTURE_ID}.png`);
	});

	it('refuses unhashed, malformed, or unapproved records', () => {
		const refused: unknown[] = [
			{ ...approvedFixture, assetSha256: undefined }, // unhashed
			{ ...approvedFixture, assetSha256: 'not-a-hash' }, // malformed hash
			{ ...approvedFixture, assetSha256: FIXTURE_HASH.slice(1) }, // wrong length
			{ ...approvedFixture, decision: 'pending' }, // not approved
			{ ...approvedFixture, decision: 'rejected' },
			{ ...approvedFixture, reviewer: '' }, // anonymous review
			{ ...approvedFixture, date: '24/08/2026' }, // malformed date
			{ ...approvedFixture, engine: '' } // no provenance
		];
		for (const record of refused) {
			expect(approvedInkUrl(FIXTURE_ID, [record]), JSON.stringify(record)).toBeNull();
		}
	});

	it('never matches a different construction id', () => {
		expect(approvedInkUrl('fr.bonjour-politesse', [approvedFixture])).toBeNull();
	});

	it('degrades to substrate on garbage instead of throwing', () => {
		expect(approvedInkUrl(FIXTURE_ID, [null, 42, 'x', {}])).toBeNull();
	});
});

describe('substrate renderer (the stylize engine’s source of truth)', () => {
	it('is deterministic and stage-total', () => {
		for (const stage of SPRITE_STAGES) {
			const state = stage === 'unmet' ? null : stage;
			const a = spriteMarkup(FIXTURE_ID, state);
			expect(a).toBe(spriteMarkup(FIXTURE_ID, state));
			expect(a).toContain(`data-sprite="${FIXTURE_ID}"`);
			expect(a).toContain(`data-stage="${stage}"`);
		}
	});

	it('substitutes concrete ink colors for headless rasterisation', () => {
		const themed = spriteMarkup(FIXTURE_ID, 'recalled');
		const concrete = spriteMarkup(FIXTURE_ID, 'recalled', { inkColor: '#4a4437' });
		expect(themed).toContain('var(--color-text-soft)');
		expect(concrete).not.toContain('var(');
		expect(concrete).toContain('#4a4437');
	});
});

describe('cast lookups for wiki-linked surfaces', () => {
	it('resolves real construction ids and nothing else', () => {
		expect(spriteCastEntry('fr.je-voudrais')?.label).toBe('je voudrais + noun');
		expect(spriteCastEntry('ta.vanakkam')).toBeDefined();
		for (const methodTerm of ['construction', 'wave', 'support', 'evidence']) {
			expect(spriteCastEntry(methodTerm), methodTerm).toBeUndefined();
		}
	});

	it('pins the capability page’s sample character to the manifest', () => {
		expect(spriteCastEntry(SAMPLE_CAST_ID)).toBeDefined();
	});
});

