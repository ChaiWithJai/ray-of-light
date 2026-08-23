import { describe as group, expect, it } from 'vitest';
import { describe, hasMorphology, lookup } from './morphology.js';

group('morphology lookup', () => {
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

	it('has no Tamil lexicon, because UD_Tamil-TTB is non-commercial', () => {
		// Not an oversight — see data/reference/LICENSE.md. If this ever starts
		// passing, check the licence before celebrating.
		expect(hasMorphology('ta')).toBe(false);
		expect(lookup('ta', 'வேணும்')).toBeNull();
	});
});
