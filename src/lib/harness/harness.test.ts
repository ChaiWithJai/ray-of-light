import { describe, expect, it } from 'vitest';
import { METHOD_CORPUS, methodCorpusAvailable, wikiPageHref } from './corpus.js';
import { buildHarnessContext, emptyHarnessContext } from './context.js';
import {
	ATTEMPT_STEPS,
	MID_ATTEMPT_NOTICE,
	RETRIEVAL_MID_ATTEMPT_COUNTS_AS_HINT,
	isAttemptStep,
	retrievalCountsAsHint
} from './hint-boundary.js';
import { askTheMethod, buildIndex, stem, tokenize } from './retrieval.js';
import { STEP_TECHNIQUE, WIKI_PAGES } from '$lib/content/wiki/index.js';
import { getLesson } from '$lib/content/index.js';
import type { ConstructionState } from '$lib/schemas/learner.js';
import { attempt as attemptStore } from '$lib/stores/attempt.svelte.js';

/* -------------------------------------------------------------------------- */
/* Corpus                                                                      */
/* -------------------------------------------------------------------------- */

describe('the retrieval corpus', () => {
	it('projects every wiki page and glossary entry into linked passages', () => {
		expect(methodCorpusAvailable()).toBe(true);
		for (const page of WIKI_PAGES) {
			// Page ids are namespaced: a glossary entry may legitimately share a
			// slug with a page (both "synthesis"), and they link to different routes.
			const passages = METHOD_CORPUS.filter((p) => p.id.startsWith(`page:${page.slug}:`));
			expect(passages.length).toBeGreaterThanOrEqual(1 + page.unstuck.length);
			for (const passage of passages) expect(passage.href).toBe(wikiPageHref(page));
		}
	});

	it('quotes the wiki verbatim — every passage text exists in the source module', () => {
		const source = new Set<string>();
		for (const page of WIKI_PAGES) {
			source.add(page.lead);
			for (const line of page.unstuck) source.add(line);
			for (const section of page.sections) for (const p of section.paragraphs) source.add(p);
		}
		const fromPages = METHOD_CORPUS.filter((p) => p.id.startsWith('page:'));
		expect(fromPages.length).toBeGreaterThan(0);
		for (const passage of fromPages) expect(source.has(passage.text)).toBe(true);
	});

	it('has unique, stably ordered ids', () => {
		const ids = METHOD_CORPUS.map((p) => p.id);
		expect(new Set(ids).size).toBe(ids.length);
		expect(ids).toEqual([...ids].sort());
	});
});

/* -------------------------------------------------------------------------- */
/* Scorer                                                                      */
/* -------------------------------------------------------------------------- */

describe('tokenisation', () => {
	it('strips function words, accents and inflection', () => {
		expect(tokenize('Why do the constructions keep RESURFACING?')).toEqual([
			'construction',
			'keep',
			'resurfac'
		]);
		expect(tokenize('répétée')).toEqual(['repetee']);
	});

	it('never stems a short method word into nothing', () => {
		for (const word of ['line', 'wave', 'state', 'cover', 'hint']) {
			expect(stem(word)).toBe(word);
		}
	});
});

describe('askTheMethod', () => {
	it('is deterministic: identical inputs give an identical ranking', () => {
		const a = askTheMethod('why does a line come back after a few days');
		const b = askTheMethod('why does a line come back after a few days');
		expect(a.map((m) => m.passage.id)).toEqual(b.map((m) => m.passage.id));
		expect(a.map((m) => m.score)).toEqual(b.map((m) => m.score));
		expect(a.length).toBeGreaterThan(0);
	});

	it('ranks the topic the question names above the rest of the wiki', () => {
		const matches = askTheMethod('what does shadowing do for my pronunciation');
		expect(matches[0].passage.sourceId).toBe('shadowing');
	});

	it('returns passages with their source link, never generated prose', () => {
		for (const match of askTheMethod('what is a construction')) {
			expect(match.passage.href).toMatch(/^\/wiki\//);
			const source = METHOD_CORPUS.find((p) => p.id === match.passage.id);
			expect(match.passage.text).toBe(source?.text);
		}
	});

	it('says nothing rather than guessing when nothing matches', () => {
		expect(askTheMethod('quarterly revenue forecast spreadsheet')).toEqual([]);
		expect(askTheMethod('   ')).toEqual([]);
		expect(askTheMethod('anything', null, { index: buildIndex([]) })).toEqual([]);
	});

	it('honours the limit and orders strictly by descending score', () => {
		const matches = askTheMethod('recall the line from the English cue', null, { limit: 2 });
		expect(matches.length).toBeLessThanOrEqual(2);
		for (let i = 1; i < matches.length; i += 1) {
			expect(matches[i - 1].score).toBeGreaterThanOrEqual(matches[i].score);
		}
	});

	it('lets the current step tilt an ambiguous question toward its technique', () => {
		const lesson = getLesson('fr', 'fr-01')!;
		// A question several techniques could answer: without context the shadow
		// page ranks fifth; standing on the shadow step it comes second.
		const question = 'why do I say the line out loud';
		const options = { limit: 6, minScore: 0 };
		const plain = askTheMethod(question, null, options);
		const inContext = askTheMethod(
			question,
			buildHarnessContext({ language: 'fr', mode: 'learn', step: 'shadow', lesson }),
			options
		);
		const rank = (matches: typeof plain) =>
			matches.findIndex((m) => m.passage.sourceId === STEP_TECHNIQUE.shadow);
		expect(rank(plain)).toBeGreaterThan(0);
		expect(rank(inContext)).toBeGreaterThanOrEqual(0);
		expect(rank(inContext)).toBeLessThan(rank(plain));
		expect(inContext.some((m) => m.contextual)).toBe(true);
		// The boost tilts; it does not overrule the question.
		expect(inContext[0].passage.sourceId).toBe(plain[0].passage.sourceId);
	});
});

/* -------------------------------------------------------------------------- */
/* Context assembly                                                            */
/* -------------------------------------------------------------------------- */

describe('buildHarnessContext', () => {
	const lesson = getLesson('fr', 'fr-01')!;
	const line = lesson.lines.find((l) => l.constructions.length > 0)!;

	it('assembles lesson, line, constructions and learner state in one typed value', () => {
		const states = new Map<string, ConstructionState>([
			[line.constructions[0], 'recognized']
		]);
		const context = buildHarnessContext({
			language: 'fr',
			mode: 'learn',
			step: 'translate',
			lesson,
			line,
			constructions: lesson.constructions,
			states,
			resurfaceQueue: [
				{
					constructionId: line.constructions[0],
					language: 'fr',
					lessonId: lesson.id,
					step: 0,
					dueOn: '2026-08-24'
				}
			]
		});

		expect(context.version).toBe(1);
		expect(context.lesson).toMatchObject({ id: lesson.id, title: lesson.title });
		expect(context.line).toMatchObject({ id: line.id, naturalEnglish: line.naturalEnglish });
		expect(context.techniqueSlug).toBe(STEP_TECHNIQUE.translate);
		expect(context.learner.dueConstructionIds).toEqual([line.constructions[0]]);
		expect(context.learner.stateCounts).toEqual({ recognized: 1 });
		expect(context.constructions.find((c) => c.id === line.constructions[0])).toMatchObject({
			state: 'recognized',
			due: true
		});
	});

	it("puts the active line's constructions first and de-duplicates", () => {
		const context = buildHarnessContext({
			language: 'fr',
			lesson,
			line,
			constructions: [...lesson.constructions, ...lesson.constructions]
		});
		const ids = context.constructions.map((c) => c.id);
		expect(new Set(ids).size).toBe(ids.length);
		expect(line.constructions).toContain(ids[0]);
	});

	it('harvests search terms from the lesson, line and constructions', () => {
		const context = buildHarnessContext({ language: 'fr', lesson, line });
		expect(context.terms).toEqual([...context.terms].sort());
		expect(context.terms.length).toBeGreaterThan(0);
		expect(context.terms.every((t) => t.length > 2)).toBe(true);
	});

	it('is total: an empty context is a valid context', () => {
		const context = emptyHarnessContext('fr');
		expect(context).toMatchObject({
			lesson: null,
			line: null,
			step: null,
			techniqueSlug: null,
			attempt: null,
			constructions: [],
			terms: []
		});
	});
});

/* -------------------------------------------------------------------------- */
/* The hint boundary — the owner's open ruling                                 */
/* -------------------------------------------------------------------------- */

describe('the hint boundary', () => {
	it('names every step that has an attempt to cap', () => {
		expect([...ATTEMPT_STEPS].sort()).toEqual(
			['completion', 'comprehension', 'recall', 'transfer', 'translate'].sort()
		);
		expect(isAttemptStep('preview')).toBe(false);
		expect(isAttemptStep('closure')).toBe(false);
		expect(isAttemptStep(null)).toBe(false);
	});

	it('caps an open, unsubmitted attempt and nothing else', () => {
		expect(RETRIEVAL_MID_ATTEMPT_COUNTS_AS_HINT).toBe(true);
		expect(retrievalCountsAsHint({ open: true, step: 'recall', constructionIds: ['c'] })).toBe(
			true
		);
		// Submitted, so there is nothing left to under-credit.
		expect(retrievalCountsAsHint({ open: false, step: 'recall', constructionIds: ['c'] })).toBe(
			false
		);
		// A step with no graded answer costs nothing to read about.
		expect(retrievalCountsAsHint({ open: true, step: 'spread', constructionIds: [] })).toBe(false);
		expect(retrievalCountsAsHint(null)).toBe(false);
	});

	it('states the honesty before the learner asks, in the invitation register', () => {
		expect(MID_ATTEMPT_NOTICE).toMatch(/counts as a hint/);
		expect(MID_ATTEMPT_NOTICE).toMatch(/still counts as practice/);
		// Invite, don't threaten (#49): no penalty vocabulary.
		expect(MID_ATTEMPT_NOTICE).not.toMatch(/penal|lose|lost|forfeit|warning|cannot earn/i);
	});
});

describe('the attempt store', () => {
	it('records a hint only while an attempt is open, and forgets it on close', () => {
		attemptStore.close();
		attemptStore.markHinted();
		expect(attemptStore.hinted).toBe(false); // no attempt to cap

		attemptStore.open('recall', 'fr-01', ['fr-c1']);
		expect(attemptStore.current).toEqual({
			open: true,
			step: 'recall',
			constructionIds: ['fr-c1']
		});
		expect(retrievalCountsAsHint(attemptStore.current)).toBe(true);

		attemptStore.markHinted();
		expect(attemptStore.hinted).toBe(true);

		// Reactive re-publication of the same attempt must not launder the hint.
		attemptStore.open('recall', 'fr-01', ['fr-c1', 'fr-c2']);
		expect(attemptStore.hinted).toBe(true);

		// A different attempt starts clean.
		attemptStore.open('transfer', 'fr-01', ['fr-c1']);
		expect(attemptStore.hinted).toBe(false);

		attemptStore.close();
		expect(attemptStore.current).toBeNull();
		expect(attemptStore.hinted).toBe(false);
	});
});
