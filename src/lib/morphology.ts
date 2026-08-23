/**
 * Morphological lookup, derived from Universal Dependencies.
 *
 * Reference annotation only — never teaching content (D8). It answers "what *is*
 * this word form" so the notes drawer can be precise, but it never decides what
 * a lesson teaches.
 *
 * Source and licence: `data/reference/LICENSE.md`. French only; the Tamil
 * treebank is CC BY-NC-SA 3.0 and is deliberately not sourced.
 */
import frMorphology from '../../data/reference/fr/morphology.json';
import type { LanguageCode } from './schemas/content.js';

type Entry = { lemma: string; upos: string; feats: string | null; count: number };

const LEXICONS: Partial<Record<LanguageCode, Record<string, Entry>>> = {
	fr: frMorphology.lexicon as Record<string, Entry>
};

const POS_LABELS: Record<string, string> = {
	ADJ: 'adjective',
	ADP: 'preposition',
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
	'Mood=Cnd': 'conditional',
	'Mood=Imp': 'imperative',
	'Mood=Ind': 'indicative',
	'Mood=Sub': 'subjunctive',
	'Tense=Fut': 'future',
	'Tense=Imp': 'imperfect',
	'Tense=Past': 'past',
	'Tense=Pres': 'present',
	'Person=1': '1st person',
	'Person=2': '2nd person',
	'Person=3': '3rd person',
	'Number=Sing': 'singular',
	'Number=Plur': 'plural',
	'Gender=Fem': 'feminine',
	'Gender=Masc': 'masculine',
	'VerbForm=Inf': 'infinitive',
	'VerbForm=Part': 'participle'
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
	const lexicon = LEXICONS[language];
	if (!lexicon) return null;

	const entry = lexicon[key(word)];
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

/** Whether any morphology is available for a language at all. */
export function hasMorphology(language: LanguageCode): boolean {
	return Boolean(LEXICONS[language]);
}
