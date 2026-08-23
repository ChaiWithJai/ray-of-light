/**
 * Morphological lookup, derived from Universal Dependencies.
 *
 * Reference annotation only — never teaching content (D8). It answers "what *is*
 * this word form" so the notes drawer can be precise, but it never decides what a
 * lesson teaches.
 *
 * ## ⚠️ The Tamil lexicon is non-commercial-only
 *
 * UD_Tamil-TTB is CC BY-NC-SA 3.0. This project is personal and non-commercial,
 * which is exactly what that licence grants. It is a one-way door: **if this ever
 * ships commercially, `data/reference/ta/` must be removed** and Tamil morphology
 * re-sourced from something else.
 *
 * `hasCommercialRestriction()` exists so that constraint is queryable in code
 * rather than remembered, and a test asserts the restriction stays recorded.
 *
 * See `data/reference/LICENSE.md`.
 */
import frMorphology from '../../data/reference/fr/morphology.json';
import taMorphology from '../../data/reference/ta/morphology.json';
import type { LanguageCode } from './schemas/content.js';

type Entry = { lemma: string; upos: string; feats: string | null; count: number };
type Lexicon = {
	license: string;
	commercialUse: string;
	attribution: string;
	lexicon: Record<string, Entry>;
};

const SOURCES: Record<LanguageCode, Lexicon> = {
	fr: frMorphology as Lexicon,
	ta: taMorphology as Lexicon
};

const POS_LABELS: Record<string, string> = {
	ADJ: 'adjective',
	ADP: 'postposition',
	ADV: 'adverb',
	AUX: 'auxiliary',
	CCONJ: 'conjunction',
	DET: 'determiner',
	INTJ: 'interjection',
	NOUN: 'noun',
	NUM: 'numeral',
	PART: 'particle',
	PRON: 'pronoun',
	PROPN: 'proper noun',
	PUNCT: 'punctuation',
	SCONJ: 'conjunction',
	VERB: 'verb',
	X: 'other'
};

const FEATURE_LABELS: Record<string, string> = {
	// Shared
	'Number=Sing': 'singular',
	'Number=Plur': 'plural',
	'Person=1': '1st person',
	'Person=2': '2nd person',
	'Person=3': '3rd person',
	'Gender=Fem': 'feminine',
	'Gender=Masc': 'masculine',
	'Tense=Fut': 'future',
	'Tense=Past': 'past',
	'Tense=Pres': 'present',
	'VerbForm=Inf': 'infinitive',
	'VerbForm=Part': 'participle',
	'VerbForm=Fin': 'finite',
	// French
	'Mood=Cnd': 'conditional',
	'Mood=Imp': 'imperative',
	'Mood=Ind': 'indicative',
	'Mood=Sub': 'subjunctive',
	'Tense=Imp': 'imperfect',
	// Tamil — case is the load-bearing one: the whole `எனக்கு … வேணும்` pattern
	// is "the wanter goes in the dative", so naming the case makes the note real.
	'Case=Nom': 'nominative',
	'Case=Acc': 'accusative',
	'Case=Dat': 'dative',
	'Case=Gen': 'genitive',
	'Case=Loc': 'locative',
	'Case=Abl': 'ablative',
	'Case=Ins': 'instrumental',
	'Case=Com': 'comitative',
	'Animacy=Anim': 'animate',
	'Animacy=Inan': 'inanimate',
	'PronType=Prs': 'personal',
	'PronType=Dem': 'demonstrative',
	'PronType=Int': 'interrogative'
};

export type Morphology = {
	form: string;
	lemma: string;
	pos: string;
	features: string[];
};

/** Strip punctuation and case so lookups match the corpus keys. */
function key(word: string): string {
	return word
		.toLowerCase()
		.replace(/[.,!?;:«»"()]/g, '')
		.replace(/[’]/g, "'")
		.trim();
}

export function lookup(language: LanguageCode, word: string): Morphology | null {
	const source = SOURCES[language];
	if (!source) return null;

	const entry = source.lexicon[key(word)];
	if (!entry) return null;

	const features = (entry.feats ?? '')
		.split('|')
		.map((f) => FEATURE_LABELS[f])
		.filter((f): f is string => Boolean(f));

	return {
		form: key(word),
		lemma: entry.lemma,
		pos: POS_LABELS[entry.upos] ?? entry.upos.toLowerCase(),
		features
	};
}

/** "vouloir · verb · conditional, present, 1st person, singular" */
export function describe(language: LanguageCode, word: string): string | null {
	const m = lookup(language, word);
	if (!m) return null;
	const parts = [m.lemma, m.pos];
	if (m.features.length) parts.push(m.features.join(', '));
	return parts.join(' · ');
}

export function hasMorphology(language: LanguageCode): boolean {
	return Boolean(SOURCES[language]);
}

/**
 * True when this language's annotation may not be used commercially.
 *
 * Queryable rather than remembered: anything that would ship this data
 * commercially should check here first and drop the language's lexicon.
 */
export function hasCommercialRestriction(language: LanguageCode): boolean {
	return SOURCES[language]?.commercialUse === 'prohibited';
}

/** Attribution string, for wherever the annotation surfaces. */
export function attributionFor(language: LanguageCode): string | null {
	return SOURCES[language]?.attribution ?? null;
}
