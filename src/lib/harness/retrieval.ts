/**
 * Retrieval — tier T1 of the harness (#48, spec §5).
 *
 * "No WebGPU, no weights, no model" is not a downgrade dressed up as a
 * feature: it is a different, honest promise. This module *finds* the passages
 * of the method wiki that best match a learner's question and hands them back
 * with their source links. It never composes an answer, never paraphrases, and
 * never returns a sentence that is not already in the wiki. The UI says so.
 *
 * Implementation is a deterministic BM25-style lexical scorer over the
 * pre-built passage corpus, plus a context boost from `HarnessContext`. No
 * dependencies, no async, browser-safe, and a pure function of
 * (query, context, corpus) — so the same question always returns the same
 * ranking, and the whole thing is testable without a DOM.
 */
import { METHOD_CORPUS, type Passage } from './corpus.js';
import type { HarnessContext } from './context.js';

/* -------------------------------------------------------------------------- */
/* Tokenisation                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Function words carry no retrieval signal but dominate a learner's phrasing
 * ("why does this keep coming back?"). Deliberately small: an aggressive stop
 * list would swallow method vocabulary like "state" or "line".
 */
const STOPWORDS = new Set([
	'a', 'about', 'after', 'again', 'all', 'am', 'an', 'and', 'any', 'are', 'as', 'at', 'be',
	'because', 'been', 'before', 'being', 'but', 'by', 'can', 'could', 'did', 'do', 'does',
	'doing', 'for', 'from', 'get', 'had', 'has', 'have', 'how', 'i', 'if', 'in', 'into', 'is',
	'it', 'its', 'just', 'me', 'my', 'no', 'not', 'of', 'on', 'or', 'should', 'so', 'some',
	'than', 'that', 'the', 'their', 'them', 'then', 'there', 'these', 'they', 'this', 'to',
	'up', 'was', 'we', 'were', 'what', 'when', 'where', 'which', 'who', 'why', 'will', 'with',
	'would', 'you', 'your'
]);

/**
 * A deliberately tiny suffix stemmer. Enough to bridge the gaps a learner
 * actually writes across ("recalling"/"recall", "hints"/"hint",
 * "constructions"/"construction"); not enough to conflate distinct method
 * terms. Anything cleverer would need a dependency, which T1 does not get.
 */
export function stem(token: string): string {
	let t = token;
	if (t.length > 4 && t.endsWith('ies')) return `${t.slice(0, -3)}y`;
	for (const suffix of ['ings', 'edly', 'ing', 'ers', 'est', 'ed', 'es', 'er', 'ly', 's']) {
		if (t.length > suffix.length + 3 && t.endsWith(suffix)) {
			t = t.slice(0, -suffix.length);
			break;
		}
	}
	return t;
}

export function tokenize(text: string): string[] {
	return text
		.toLowerCase()
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.split(/[^\p{L}\p{N}]+/u)
		.filter((token) => token.length > 1 && !STOPWORDS.has(token))
		.map(stem);
}

/* -------------------------------------------------------------------------- */
/* Index                                                                       */
/* -------------------------------------------------------------------------- */

type IndexedPassage = {
	passage: Passage;
	terms: Map<string, number>;
	length: number;
};

export type MethodIndex = {
	passages: IndexedPassage[];
	documentFrequency: Map<string, number>;
	averageLength: number;
};

export function buildIndex(corpus: readonly Passage[] = METHOD_CORPUS): MethodIndex {
	const passages: IndexedPassage[] = [];
	const documentFrequency = new Map<string, number>();
	let total = 0;

	for (const passage of corpus) {
		// The heading and title are part of what the passage is *about*, so they
		// are indexed with it — a question naming a technique should find that
		// technique's paragraphs even when the prose never repeats the name.
		const tokens = tokenize(`${passage.title} ${passage.heading ?? ''} ${passage.text}`);
		const terms = new Map<string, number>();
		for (const token of tokens) terms.set(token, (terms.get(token) ?? 0) + 1);
		for (const token of terms.keys()) {
			documentFrequency.set(token, (documentFrequency.get(token) ?? 0) + 1);
		}
		total += tokens.length;
		passages.push({ passage, terms, length: tokens.length });
	}

	return {
		passages,
		documentFrequency,
		averageLength: passages.length ? total / passages.length : 0
	};
}

/** Built once; the corpus is static, so the index is too. */
let cached: MethodIndex | null = null;
export function methodIndex(): MethodIndex {
	cached ??= buildIndex();
	return cached;
}

/* -------------------------------------------------------------------------- */
/* Scoring                                                                     */
/* -------------------------------------------------------------------------- */

/** BM25 term-frequency saturation and length-normalisation constants. */
const K1 = 1.2;
const B = 0.6;

/** How much the current lesson/line/construction vocabulary tilts the ranking. */
const CONTEXT_TERM_WEIGHT = 0.35;
/** How much the step's own technique page is favoured, when in a session. */
const TECHNIQUE_BOOST = 0.45;
/** A passage must clear this to be shown at all — better nothing than noise. */
export const MIN_SCORE = 0.35;
/** How many passages the surface offers. Three fits the aside without scrolling. */
export const DEFAULT_LIMIT = 3;

export type RetrievalMatch = {
	passage: Passage;
	score: number;
	/** Query terms this passage actually contains — rendered as "matched on". */
	matchedTerms: string[];
	/** True when the current lesson/step tilted this passage upward. */
	contextual: boolean;
};

function idf(df: number, n: number): number {
	return Math.log(1 + (n - df + 0.5) / (df + 0.5));
}

export type AskOptions = {
	limit?: number;
	index?: MethodIndex;
	minScore?: number;
};

/**
 * Ask the method. Returns ranked passages, never prose.
 *
 * Determinism: ties break on passage id, so the ranking is a total order and
 * the same (query, context) pair always produces the identical array.
 */
export function askTheMethod(
	query: string,
	context: HarnessContext | null = null,
	options: AskOptions = {}
): RetrievalMatch[] {
	const index = options.index ?? methodIndex();
	const limit = options.limit ?? DEFAULT_LIMIT;
	const minScore = options.minScore ?? MIN_SCORE;

	const queryTerms = [...new Set(tokenize(query))];
	if (queryTerms.length === 0 || index.passages.length === 0) return [];

	const contextTerms = new Set((context?.terms ?? []).flatMap((term) => tokenize(term)));
	const n = index.passages.length;

	const scored: RetrievalMatch[] = [];
	for (const entry of index.passages) {
		let score = 0;
		const matchedTerms: string[] = [];
		for (const term of queryTerms) {
			const tf = entry.terms.get(term);
			if (!tf) continue;
			matchedTerms.push(term);
			const df = index.documentFrequency.get(term) ?? 1;
			const norm = 1 - B + (B * entry.length) / (index.averageLength || 1);
			score += idf(df, n) * ((tf * (K1 + 1)) / (tf + K1 * norm));
		}
		if (score <= 0) continue;
		score *= entry.passage.weight;

		// Context boost (spec §4.2–4.4): what the learner is looking at right now
		// tilts the ranking, it does not replace the question.
		let contextual = false;
		if (contextTerms.size > 0) {
			let overlap = 0;
			for (const term of contextTerms) if (entry.terms.has(term)) overlap += 1;
			if (overlap > 0) {
				contextual = true;
				score *= 1 + CONTEXT_TERM_WEIGHT * (overlap / contextTerms.size);
			}
		}
		if (context?.techniqueSlug && entry.passage.sourceId === context.techniqueSlug) {
			contextual = true;
			score *= 1 + TECHNIQUE_BOOST;
		}

		scored.push({ passage: entry.passage, score, matchedTerms: matchedTerms.sort(), contextual });
	}

	return scored
		.filter((match) => match.score >= minScore)
		.sort((a, b) =>
			b.score - a.score ||
			(a.passage.id < b.passage.id ? -1 : a.passage.id > b.passage.id ? 1 : 0)
		)
		.slice(0, limit);
}
