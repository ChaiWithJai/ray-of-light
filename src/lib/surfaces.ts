/**
 * The 22 surface areas from the Claude Design handoff, in the order and grouping
 * the design canvas lays them out. `id` is the canvas id (1a…1v) so the screens
 * stay traceable back to `project/Surface Areas Wireframes.dc.html`.
 */
export type SurfaceGroup =
	| 'Onboarding & scheduling'
	| 'The lesson core — states of one spread'
	| 'Checks & exercises (passive wave)'
	| 'Active wave (Day 50+)'
	| 'Closure & consolidation'
	| 'Book-wide surfaces (persistent nav)';

export type Surface = {
	id: string;
	n: number;
	slug: string;
	title: string;
	group: SurfaceGroup;
};

export const surfaces = [
	{ id: '1a', n: 1, slug: 'entry-assessment', title: 'Entry assessment', group: 'Onboarding & scheduling' },
	{ id: '1b', n: 2, slug: 'learning-plan', title: 'Learning plan', group: 'Onboarding & scheduling' },
	{ id: '1c', n: 3, slug: 'today', title: 'Today', group: 'Onboarding & scheduling' },
	{ id: '1d', n: 4, slug: 'audio-preview', title: 'Audio preview', group: 'The lesson core — states of one spread' },
	{ id: '1e', n: 5, slug: 'parallel-spread', title: 'Parallel spread — the center of the product', group: 'The lesson core — states of one spread' },
	{ id: '1f', n: 6, slug: 'finger-tracking', title: 'Finger-tracking layer', group: 'The lesson core — states of one spread' },
	{ id: '1g', n: 7, slug: 'pronunciation', title: 'Pronunciation layer', group: 'The lesson core — states of one spread' },
	{ id: '1h', n: 8, slug: 'notes-drawer', title: 'Notes drawer', group: 'The lesson core — states of one spread' },
	{ id: '1i', n: 9, slug: 'comprehension-check', title: 'Comprehension check', group: 'Checks & exercises (passive wave)' },
	{ id: '1j', n: 10, slug: 'echo-practice', title: 'Echo practice', group: 'Checks & exercises (passive wave)' },
	{ id: '1k', n: 11, slug: 'translation-exercise', title: 'Translation exercise (FR → EN)', group: 'Checks & exercises (passive wave)' },
	{ id: '1l', n: 12, slug: 'completion-exercise', title: 'Completion exercise', group: 'Checks & exercises (passive wave)' },
	{ id: '1m', n: 13, slug: 'active-wave-spread', title: 'Active-wave spread', group: 'Active wave (Day 50+)' },
	{ id: '1n', n: 14, slug: 'answer-comparison', title: 'Answer comparison', group: 'Active wave (Day 50+)' },
	{ id: '1o', n: 15, slug: 'transfer-challenge', title: 'Transfer challenge', group: 'Active wave (Day 50+)' },
	{ id: '1p', n: 16, slug: 'error-repair', title: 'Error repair', group: 'Active wave (Day 50+)' },
	{ id: '1q', n: 17, slug: 'lesson-closure', title: 'Lesson closure', group: 'Closure & consolidation' },
	{ id: '1r', n: 18, slug: 'weekly-synthesis', title: 'Weekly synthesis (every 7th lesson)', group: 'Closure & consolidation' },
	{ id: '1s', n: 19, slug: 'progress-map', title: 'Progress map', group: 'Book-wide surfaces (persistent nav)' },
	{ id: '1t', n: 20, slug: 'phrase-library', title: 'Phrase library', group: 'Book-wide surfaces (persistent nav)' },
	{ id: '1u', n: 21, slug: 'conversation-bridge', title: 'Conversation bridge', group: 'Book-wide surfaces (persistent nav)' },
	{ id: '1v', n: 22, slug: 'settings', title: 'Settings / accessibility', group: 'Book-wide surfaces (persistent nav)' }
] as const satisfies readonly Surface[];

export type SurfaceSlug = (typeof surfaces)[number]['slug'];

const byId = new Map<string, Surface>(surfaces.map((s) => [s.id, s]));

/** Resolve a canvas id (e.g. "1e") to its route, for the cross-references in the margin notes. */
export function surfaceHref(id: string): string {
	const surface = byId.get(id);
	if (!surface) throw new Error(`Unknown surface id: ${id}`);
	return `/surfaces/${surface.slug}`;
}
