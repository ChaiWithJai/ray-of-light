/**
 * The retrieval corpus — the method's own words, cut into passages (#48,
 * Phase H1 / tier T1 of `docs/design/bonsai-aside-harness.md` §5).
 *
 * The wiki content module is the substrate (spec §8): it already ships in the
 * main bundle, it is zod-validated at import, and it is the destination every
 * citation links to. This file does one job — project `WIKI_PAGES` and
 * `GLOSSARY` into flat, addressable passages with a source href — so the
 * scorer never has to know the wiki's shape and the wiki never has to know a
 * scorer exists.
 *
 * Read-only by construction: nothing here mutates or re-exports wiki content,
 * so the wiki module stays owned by #47.
 */
import { GLOSSARY, WIKI_PAGES, type WikiPage } from '$lib/content/wiki/index.js';

/** Where a passage came from, in the wiki's own vocabulary. */
export type PassageKind = 'lead' | 'unstuck' | 'section' | 'glossary';

export type Passage = {
	/** Stable, deterministic, unique — also the tie-break key when scores tie. */
	id: string;
	kind: PassageKind;
	/** Wiki page slug or glossary entry id. */
	sourceId: string;
	/** The page/term title, rendered above the excerpt. */
	title: string;
	/** The section heading this passage sits under, when it has one. */
	heading?: string;
	/** The method's own sentence(s). Never paraphrased, never generated. */
	text: string;
	/** The wiki route this passage links to. */
	href: string;
	/**
	 * How much this passage's provenance is worth before any query is seen.
	 * `unstuck` lines are written to unblock a stuck learner, so they outrank
	 * body prose when both match equally; leads orient; glossary defines.
	 */
	weight: number;
};

const KIND_WEIGHT: Record<PassageKind, number> = {
	unstuck: 1.35,
	lead: 1.15,
	glossary: 1.1,
	section: 1
};

export function wikiPageHref(page: Pick<WikiPage, 'slug' | 'section'>): string {
	if (page.section === 'technique') return `/wiki/techniques/${page.slug}`;
	return `/wiki/${page.section}`;
}

export function glossaryHref(id: string): string {
	return `/wiki/glossary/${id}`;
}

function pagePassages(page: WikiPage): Passage[] {
	const href = wikiPageHref(page);
	const out: Passage[] = [
		{
			id: `page:${page.slug}:lead`,
			kind: 'lead',
			sourceId: page.slug,
			title: page.title,
			text: page.lead,
			href,
			weight: KIND_WEIGHT.lead
		}
	];
	page.unstuck.forEach((line, i) => {
		out.push({
			id: `page:${page.slug}:unstuck:${i}`,
			kind: 'unstuck',
			sourceId: page.slug,
			title: page.title,
			heading: 'If you are stuck',
			text: line,
			href,
			weight: KIND_WEIGHT.unstuck
		});
	});
	page.sections.forEach((section, s) => {
		section.paragraphs.forEach((paragraph, p) => {
			out.push({
				id: `page:${page.slug}:section:${s}:${p}`,
				kind: 'section',
				sourceId: page.slug,
				title: page.title,
				heading: section.heading,
				text: paragraph,
				href,
				weight: KIND_WEIGHT.section
			});
		});
	});
	return out;
}

function buildCorpus(): Passage[] {
	const passages: Passage[] = [];
	for (const page of WIKI_PAGES) passages.push(...pagePassages(page));
	for (const entry of GLOSSARY) {
		const href = glossaryHref(entry.id);
		passages.push({
			id: `term:${entry.id}:one-liner`,
			kind: 'glossary',
			sourceId: entry.id,
			title: entry.term,
			heading: 'In one line',
			text: entry.oneLiner,
			href,
			weight: KIND_WEIGHT.glossary
		});
		entry.body.forEach((paragraph, i) => {
			passages.push({
				id: `term:${entry.id}:body:${i}`,
				kind: 'glossary',
				sourceId: entry.id,
				title: entry.term,
				text: paragraph,
				href,
				weight: KIND_WEIGHT.section
			});
		});
	}
	// Deterministic order in, deterministic order out: the scorer's tie-break
	// and the tests both lean on it.
	return passages.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
}

/**
 * Built once at module load. The wiki is static content, so there is nothing
 * to invalidate and every later `ask` is a pure function of this array.
 *
 * Degradation floor (spec §5, and the task's "hide rather than show an empty
 * box"): if the wiki module fails to produce passages for any reason, the
 * corpus is empty and `methodCorpusAvailable()` is false — the surface then
 * declines to render at all rather than offering an input that cannot answer.
 */
function safeCorpus(): Passage[] {
	try {
		return buildCorpus();
	} catch {
		return [];
	}
}

export const METHOD_CORPUS: readonly Passage[] = safeCorpus();

export function methodCorpusAvailable(): boolean {
	return METHOD_CORPUS.length > 0;
}
