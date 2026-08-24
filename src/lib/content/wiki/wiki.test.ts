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
import { PASSIVE_FLOW, RECALL_FLOW, SYNTHESIS_FLOW, type StepId } from '$lib/flow.js';
import { TECHNIQUE_INTROS } from '$lib/intros.js';
import { CONSTRUCTION_STATES } from '$lib/schemas/learner.js';
import { POC_WAVE_CONFIG } from '$lib/schemas/schedule.js';

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
