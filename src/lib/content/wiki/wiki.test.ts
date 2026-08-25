/**
 * Method-wiki conformance tests (#47 §7).
 *
 * Authoring is enforced, not remembered: a new step, state or marked term
 * fails here until the wiki serves it. The checks run against the same typed
 * module the app ships, so what passes is what learners get.
 */
import { describe, expect, it } from 'vitest';
import {
	GLOSSARY,
	GLOSSARY_ONE_LINER_MAX,
	INTRO_PAGE,
	RESURFACE_LADDER_TEXT,
	STEP_TECHNIQUE,
	WIKI_PAGES,
	glossaryEntry,
	wikiPage
} from './index.js';
import {
	CONSTRUCTION_COPY,
	UNMET_LABEL,
	constructionEntries,
	constructionEntry,
	constructionHref,
	groupByState,
	stageLabel
} from './constructions.js';
import { PASSIVE_FLOW, RECALL_FLOW, SYNTHESIS_FLOW, type StepId } from '$lib/flow.js';
import { TECHNIQUE_INTROS } from '$lib/intros.js';
import { CONSTRUCTION_STATES, type ConstructionState } from '$lib/schemas/learner.js';
import { POC_WAVE_CONFIG } from '$lib/schemas/schedule.js';
import { COURSES } from '$lib/content/index.js';
import { spriteCastEntry } from '$lib/content/sprite-cast.js';
import { SPRITE_STAGES } from '$lib/sprites.js';
import type { LanguageCode } from '$lib/schemas/content.js';

const LANGUAGES: LanguageCode[] = ['fr', 'ta'];

const ALL_STEPS: StepId[] = [...new Set([...PASSIVE_FLOW, ...RECALL_FLOW, ...SYNTHESIS_FLOW])];

/** Every learner-visible string in the wiki module, with a label for failures. */
function allCopy(): { where: string; text: string }[] {
	const copy: { where: string; text: string }[] = [];
	for (const page of WIKI_PAGES) {
		copy.push({ where: `${page.slug} lead`, text: page.lead });
		page.unstuck.forEach((line, i) => copy.push({ where: `${page.slug} unstuck[${i}]`, text: line }));
		for (const section of page.sections) {
			copy.push({ where: `${page.slug} heading`, text: section.heading });
			section.paragraphs.forEach((p, i) =>
				copy.push({ where: `${page.slug} · ${section.heading}[${i}]`, text: p })
			);
		}
	}
	for (const entry of GLOSSARY) {
		copy.push({ where: `glossary ${entry.id} one-liner`, text: entry.oneLiner });
		entry.body.forEach((p, i) => copy.push({ where: `glossary ${entry.id}[${i}]`, text: p }));
	}
	return copy;
}

describe('coverage', () => {
	it('maps every StepId in the flows to a technique page with an unstuck section', () => {
		for (const step of ALL_STEPS) {
			const page = wikiPage(STEP_TECHNIQUE[step]);
			expect(page, `step ${step} → ${STEP_TECHNIQUE[step]}`).toBeDefined();
			expect(page!.unstuck.length, `step ${step} unstuck`).toBeGreaterThan(0);
		}
	});

	it('gives every first-run intro a page for its "learn more"', () => {
		for (const id of Object.keys(TECHNIQUE_INTROS) as (keyof typeof TECHNIQUE_INTROS)[]) {
			expect(wikiPage(INTRO_PAGE[id]), `intro ${id} → ${INTRO_PAGE[id]}`).toBeDefined();
		}
	});

	it('gives every construction state a section on the capability page', () => {
		const headings = wikiPage('capability')!.sections.map((s) => s.heading);
		for (const state of CONSTRUCTION_STATES) {
			expect(headings, `state ${state}`).toContain(state);
		}
	});

	it('resolves every <Term id> used in components and routes in the glossary', async () => {
		const sources = import.meta.glob(
			['/src/routes/**/*.svelte', '/src/lib/components/**/*.svelte'],
			{ query: '?raw', import: 'default', eager: true }
		) as Record<string, string>;

		const used = new Map<string, string[]>();
		for (const [path, content] of Object.entries(sources)) {
			for (const match of content.matchAll(/<W?\.?Term\s+id="([^"]+)"/g)) {
				const files = used.get(match[1]) ?? [];
				files.push(path);
				used.set(match[1], files);
			}
		}

		expect(used.size, 'at least one marked term in the UI').toBeGreaterThan(0);
		for (const [id, files] of used) {
			expect(glossaryEntry(id), `term "${id}" used in ${files.join(', ')}`).toBeDefined();
		}
	});
});

describe('shape budgets', () => {
	it('front-loads at most five unstuck lines per page (the stuck panel budget)', () => {
		for (const page of WIKI_PAGES) {
			expect(page.unstuck.length, page.slug).toBeLessThanOrEqual(5);
		}
	});

	it('keeps every glossary one-liner inside the popover budget', () => {
		for (const entry of GLOSSARY) {
			expect(entry.oneLiner.length, entry.id).toBeLessThanOrEqual(GLOSSARY_ONE_LINER_MAX);
		}
	});

	it('has no dead intra-wiki term references', () => {
		for (const page of WIKI_PAGES) {
			for (const id of page.terms) {
				expect(glossaryEntry(id), `${page.slug} → term ${id}`).toBeDefined();
			}
		}
	});
});

describe('numbers come from the code', () => {
	it('renders every day-ladder mention from resurfaceLadderDays', () => {
		expect(RESURFACE_LADDER_TEXT).toBe(POC_WAVE_CONFIG.resurfaceLadderDays.join(' · '));
		for (const { where, text } of allCopy()) {
			for (const match of text.matchAll(/\d+(?: · \d+)+/g)) {
				expect(match[0], where).toBe(RESURFACE_LADDER_TEXT);
			}
		}
	});

	it('states the capability ladder exactly as the schema orders it', () => {
		const ladder = CONSTRUCTION_STATES.join(' → ');
		const mentions = allCopy().filter(({ text }) => text.includes(' → '));
		expect(mentions.length).toBeGreaterThan(0);
		for (const { where, text } of mentions) {
			for (const match of text.matchAll(/[a-z]+(?: → [a-z]+)+/g)) {
				expect(match[0], where).toBe(ladder);
			}
		}
	});
});

describe('voice (#35 sweep rules)', () => {
	it('carries no em-dash asides', () => {
		for (const { where, text } of allCopy()) {
			expect(text.includes('—'), `${where}: "${text}"`).toBe(false);
		}
	});

	it('never narrates the design at the learner ("this app", "this screen")', () => {
		const narration = /\b(this app|the app|this screen|this page does|we designed|the interface)\b/i;
		for (const { where, text } of allCopy()) {
			expect(narration.test(text), `${where}: "${text}"`).toBe(false);
		}
	});
});

/* -------------------------------------------------------------------------- */
/* W3 · per-construction entries (#47 §3, with #46 §5)                        */
/* -------------------------------------------------------------------------- */

describe.each(LANGUAGES)('construction entries: %s', (language) => {
	const course = COURSES[language];
	const entries = constructionEntries(language);

	it('gives every construction in the course exactly one entry, and invents none', () => {
		expect(entries.map((e) => e.id).sort()).toEqual([...course.constructions.keys()].sort());
	});

	it('reads label, gloss and introducing lesson straight from the curriculum', () => {
		for (const entry of entries) {
			const construction = course.constructions.get(entry.id)!;
			expect(entry.label, entry.id).toBe(construction.label);
			expect(entry.gloss, entry.id).toBe(construction.gloss);
			expect(entry.introducedIn.lessonId, entry.id).toBe(construction.introducedIn);
			const lesson = course.lessons.find((l) => l.id === construction.introducedIn);
			expect(lesson, `${entry.id} → ${construction.introducedIn}`).toBeDefined();
			expect(entry.introducedIn.index, entry.id).toBe(lesson!.index);
			expect(entry.introducedIn.title, entry.id).toBe(lesson!.title);
		}
	});

	it('cites only lines that actually reference the construction id', () => {
		const linesById = new Map(course.lessons.flatMap((l) => l.lines).map((line) => [line.id, line]));
		for (const entry of entries) {
			for (const citation of entry.lines) {
				const line = linesById.get(citation.lineId);
				expect(line, `${entry.id} cites ${citation.lineId}`).toBeDefined();
				expect(line!.constructions, `${entry.id} → ${citation.lineId}`).toContain(entry.id);
				expect(line!.targetScript, citation.lineId).toBe(citation.targetScript);
				expect(line!.naturalEnglish, citation.lineId).toBe(citation.naturalEnglish);
				expect(line!.lessonId, citation.lineId).toBe(citation.lessonId);
			}
		}
	});

	it('cites every line that references it, and marks the first appearance', () => {
		for (const entry of entries) {
			const expected = course.lessons
				.flatMap((lesson) => lesson.lines)
				.filter((line) => line.constructions.includes(entry.id))
				.map((line) => line.id);
			expect(entry.lines.map((l) => l.lineId).sort(), entry.id).toEqual(expected.sort());
			// `validateCourse` guarantees the introducing lesson teaches it, so at
			// least one citation must carry the first-appearance mark.
			const introducing = entry.lines.filter((l) => l.introducing);
			for (const citation of introducing) {
				expect(citation.lessonId, entry.id).toBe(entry.introducedIn.lessonId);
			}
		}
	});

	it('names where a pattern with no marked dialogue line is practised', () => {
		for (const entry of entries) {
			// `validateCourse` refuses a construction nothing references, so an
			// entry with no cited line must be exercised somewhere; the page shows
			// those lessons rather than an empty list.
			if (entry.lines.length === 0) {
				expect(entry.exercisedInLessons.length, entry.id).toBeGreaterThan(0);
			}
			for (const lesson of entry.exercisedInLessons) {
				const found = course.lessons.find((l) => l.id === lesson.lessonId)!;
				expect(found, `${entry.id} → ${lesson.lessonId}`).toBeDefined();
				expect(
					found.exercises.some(
						(exercise) =>
							exercise.constructions.includes(entry.id) ||
							(exercise.kind === 'transfer' && exercise.useConstruction === entry.id)
					),
					`${entry.id} claims practice in ${lesson.lessonId}`
				).toBe(true);
			}
		}
	});

	it('carries the generated sprite cast entry for every construction', () => {
		for (const entry of entries) {
			expect(entry.cast, entry.id).toEqual(spriteCastEntry(entry.id));
			expect(entry.cast.introducedIn, entry.id).toBe(entry.introducedIn.lessonId);
		}
	});

	it('resolves every construction id to an entry by id alone', () => {
		for (const id of course.constructions.keys()) {
			const entry = constructionEntry(id);
			expect(entry, id).toBeDefined();
			expect(entry!.language, id).toBe(language);
			expect(constructionHref(id)).toBe(`/wiki/constructions/${id}`);
		}
	});
});

describe('construction grouping is honest', () => {
	const entries = constructionEntries('fr');

	it('places a learner with no evidence entirely under "not yet met"', () => {
		const groups = groupByState(entries, new Map());
		expect(groups.owned).toEqual([]);
		expect(groups.coming.entries).toHaveLength(entries.length);
		expect(groups.coming.label).toBe(UNMET_LABEL);
	});

	it('sorts owned groups strongest first and lists every entry exactly once', () => {
		const states = new Map<string, ConstructionState>([
			[entries[0].id, 'exposed'],
			[entries[1].id, 'transferable']
		]);
		const groups = groupByState(entries, states);
		expect(groups.owned.map((g) => g.stage)).toEqual(['transferable', 'exposed']);
		const listed = [...groups.owned.flatMap((g) => g.entries), ...groups.coming.entries];
		expect(listed.map((e) => e.id).sort()).toEqual(entries.map((e) => e.id).sort());
	});

	it('labels the unearned stage as "not yet met", never as a zero', () => {
		expect(stageLabel('unmet')).toBe(UNMET_LABEL);
		for (const stage of SPRITE_STAGES.filter((s) => s !== 'unmet')) {
			expect(stageLabel(stage)).toBe(stage);
		}
	});
});

describe('no dead links, in either direction', () => {
	/** Every path the wiki actually serves, expanded from the same data it renders. */
	function servedWikiPaths(): Set<string> {
		const paths = new Set(['/wiki', '/wiki/glossary', '/wiki/constructions']);
		for (const page of WIKI_PAGES) {
			paths.add(page.section === 'technique' ? `/wiki/techniques/${page.slug}` : `/wiki/${page.slug}`);
		}
		for (const entry of GLOSSARY) paths.add(`/wiki/glossary/${entry.id}`);
		for (const language of LANGUAGES) {
			for (const entry of constructionEntries(language)) paths.add(constructionHref(entry.id));
		}
		return paths;
	}

	const sources = import.meta.glob(
		['/src/routes/**/*.svelte', '/src/lib/components/**/*.svelte'],
		{ query: '?raw', import: 'default', eager: true }
	) as Record<string, string>;

	it('resolves every hard-coded /wiki href in the UI', () => {
		const served = servedWikiPaths();
		let found = 0;
		for (const [path, content] of Object.entries(sources)) {
			for (const match of content.matchAll(/href="(\/wiki[^"{}]*)"/g)) {
				found += 1;
				expect(served, `${path} links to ${match[1]}`).toContain(match[1]);
			}
		}
		expect(found, 'at least one hard-coded wiki link in the UI').toBeGreaterThan(0);
	});

	it('sends every construction entry back to a lesson the Book anchors', () => {
		// The construction page links `/book#lesson-<lessonId>`; the Book renders
		// that anchor on every lesson card, so the return trip cannot dangle.
		const book = sources['/src/routes/book/+page.svelte'];
		expect(book, 'book route source').toBeDefined();
		expect(book).toContain('id="lesson-{lesson.id}"');
		for (const language of LANGUAGES) {
			const lessonIds = new Set(COURSES[language].lessons.map((l) => l.id));
			for (const entry of constructionEntries(language)) {
				expect(lessonIds, `${entry.id} → ${entry.introducedIn.lessonId}`).toContain(
					entry.introducedIn.lessonId
				);
			}
		}
	});

	it('sends every construction entry up to the capability ladder page', () => {
		expect(wikiPage('capability')).toBeDefined();
		const entryRoute = sources['/src/routes/wiki/constructions/[id]/+page.svelte'];
		expect(entryRoute, 'construction entry route source').toBeDefined();
		expect(entryRoute).toContain('/wiki/capability');
	});

	it('reaches nothing that is not a construction of a real course', () => {
		expect(constructionEntry('fr.not-a-construction')).toBeUndefined();
		expect(constructionEntry('')).toBeUndefined();
	});
});

describe('construction copy (voice)', () => {
	const authored = Object.entries(CONSTRUCTION_COPY).flatMap(([key, value]) =>
		typeof value === 'string' ? [{ where: key, text: value }] : [{ where: key, text: value('French') }]
	);

	it('carries no em-dash asides', () => {
		for (const { where, text } of authored) {
			expect(text.includes('—'), `${where}: "${text}"`).toBe(false);
		}
	});

	it('never narrates the design at the learner', () => {
		const narration = /\b(this app|the app|this screen|this page|we designed|the interface)\b/i;
		for (const { where, text } of authored) {
			expect(narration.test(text), `${where}: "${text}"`).toBe(false);
		}
	});

	it('states absence as "not yet met" rather than as failure', () => {
		expect(CONSTRUCTION_COPY.unmetMeaning).toContain('not met this pattern yet');
		expect(UNMET_LABEL).toBe('not yet met');
	});
});
