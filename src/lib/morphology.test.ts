import { describe as group, expect, it } from 'vitest';
import {
	attributionFor,
	describe,
	hasCommercialRestriction,
	hasMorphology,
	lookup
} from './morphology.js';

group('French morphology (UD_French-GSD, CC BY-SA 4.0)', () => {
	it('resolves the conditional that lesson 1 teaches', () => {
		// `je voudrais` is the polite request the whole course opens on, so this is
		// the single most load-bearing annotation in the set.
		const m = lookup('fr', 'voudrais');
		expect(m?.lemma).toBe('vouloir');
		expect(m?.pos).toBe('verb');
		expect(m?.features).toContain('conditional');
	});

	it('renders a human-readable gloss', () => {
		expect(describe('fr', 'voudrais')).toContain('vouloir · verb · conditional');
	});

	it('is case- and punctuation-insensitive', () => {
		expect(lookup('fr', 'Voudrais,')?.lemma).toBe('vouloir');
		expect(lookup('fr', 'BONJOUR')?.lemma).toBe('bonjour');
	});

	it('resolves gendered nouns from the lessons', () => {
		const m = lookup('fr', 'tomates');
		expect(m?.lemma).toBe('tomate');
		expect(m?.features).toEqual(expect.arrayContaining(['feminine', 'plural']));
	});

	it('returns null for an unknown form rather than throwing', () => {
		expect(lookup('fr', 'zzzznotaword')).toBeNull();
		expect(describe('fr', 'zzzznotaword')).toBeNull();
	});

	it('may be used commercially', () => {
		expect(hasCommercialRestriction('fr')).toBe(false);
	});
});

group('Tamil morphology (UD_Tamil-TTB, CC BY-NC-SA 3.0)', () => {
	it('resolves the dative that the whole `எனக்கு … வேணும்` pattern rests on', () => {
		// Lesson 1's grammar note is "the wanter goes in the dative". This is the
		// annotation that makes that claim checkable rather than asserted.
		const m = lookup('ta', 'எனக்கு');
		expect(m?.lemma).toBe('என்');
		expect(m?.pos).toBe('pronoun');
		expect(m?.features).toContain('dative');
	});

	it('renders a human-readable gloss', () => {
		expect(describe('ta', 'எனக்கு')).toContain('dative');
	});

	/**
	 * Coverage is thin, and the reason matters more than the number: TTB is
	 * *written* news Tamil, while the course teaches *spoken* Tamil. The forms it
	 * lacks — வேணும், இருக்கு, குடுங்க — are exactly the spoken verb forms, which
	 * is the same written/spoken gap the product exists to bridge. A bigger
	 * treebank of the same register would not fix this.
	 */
	it('lacks the spoken verb forms, because TTB annotates written Tamil', () => {
		expect(lookup('ta', 'வேணும்')).toBeNull();
		expect(lookup('ta', 'இருக்கு')).toBeNull();
		expect(lookup('ta', 'குடுங்க')).toBeNull();
	});

	it('is marked non-commercial, and that restriction is queryable in code', () => {
		// This is a one-way door: shipping commercially means deleting
		// data/reference/ta/. If this assertion ever changes, the licence must have
		// changed too — check before editing.
		expect(hasCommercialRestriction('ta')).toBe(true);
		expect(attributionFor('ta')).toContain('UD_Tamil-TTB');
	});
});

group('both languages', () => {
	it('have morphology available', () => {
		expect(hasMorphology('fr')).toBe(true);
		expect(hasMorphology('ta')).toBe(true);
	});

	it('carry attribution, as both licences require', () => {
		expect(attributionFor('fr')).toContain('Universal Dependencies');
		expect(attributionFor('ta')).toContain('Universal Dependencies');
	});
});
