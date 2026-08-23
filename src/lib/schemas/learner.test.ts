import { describe, expect, it } from 'vitest';
import {
	deriveAllStates,
	deriveConstructionState,
	emptyProfile,
	LearnerProfile,
	type EvidenceEvent
} from './learner.js';

let seq = 0;
function ev(partial: Partial<EvidenceEvent> & Pick<EvidenceEvent, 'kind'>): EvidenceEvent {
	return {
		id: `e${seq++}`,
		constructionId: 'fr.je-voudrais',
		language: 'fr',
		lessonId: 'fr-02',
		at: 0,
		day: '2026-01-01',
		hinted: false,
		...partial
	};
}

describe('deriveConstructionState', () => {
	it('returns null with no evidence', () => {
		expect(deriveConstructionState([])).toBeNull();
	});

	it('grants the highest state any single event justifies', () => {
		expect(deriveConstructionState([ev({ kind: 'parallel-read' })])).toBe('exposed');
		expect(deriveConstructionState([ev({ kind: 'comprehension-correct' })])).toBe('recognized');
		expect(deriveConstructionState([ev({ kind: 'recall-correct' })])).toBe('recalled');
		expect(deriveConstructionState([ev({ kind: 'transfer-correct' })])).toBe('transferable');
	});

	it('never regresses when weaker evidence arrives later', () => {
		const state = deriveConstructionState([
			ev({ kind: 'recall-correct' }),
			ev({ kind: 'parallel-read' })
		]);
		expect(state).toBe('recalled');
	});

	it('is order-independent', () => {
		const events = [
			ev({ kind: 'parallel-read' }),
			ev({ kind: 'comprehension-correct' }),
			ev({ kind: 'recall-correct' })
		];
		const forward = deriveConstructionState(events);
		const backward = deriveConstructionState([...events].reverse());
		expect(forward).toBe(backward);
	});

	it('ignores hinted evidence entirely', () => {
		expect(
			deriveConstructionState([ev({ kind: 'recall-correct', hinted: true })])
		).toBeNull();

		// A hinted recall alongside a clean read leaves it at `exposed`.
		expect(
			deriveConstructionState([
				ev({ kind: 'parallel-read' }),
				ev({ kind: 'recall-correct', hinted: true })
			])
		).toBe('exposed');
	});

	it('grants nothing for an incorrect attempt', () => {
		expect(deriveConstructionState([ev({ kind: 'attempt-incorrect' })])).toBeNull();
	});

	describe('stabilized', () => {
		it('requires retrieval on two distinct days', () => {
			const sameDay = deriveConstructionState([
				ev({ kind: 'recall-correct', day: '2026-01-01' }),
				ev({ kind: 'recall-correct', day: '2026-01-01' })
			]);
			expect(sameDay).toBe('recalled');

			const twoDays = deriveConstructionState([
				ev({ kind: 'recall-correct', day: '2026-01-01' }),
				ev({ kind: 'recall-correct', day: '2026-01-08' })
			]);
			expect(twoDays).toBe('stabilized');
		});

		it('does not count hinted retrievals toward distinct days', () => {
			const state = deriveConstructionState([
				ev({ kind: 'recall-correct', day: '2026-01-01' }),
				ev({ kind: 'recall-correct', day: '2026-01-08', hinted: true })
			]);
			expect(state).toBe('recalled');
		});

		it('does not downgrade a construction that already transferred', () => {
			const state = deriveConstructionState([
				ev({ kind: 'transfer-correct', day: '2026-01-01' }),
				ev({ kind: 'recall-correct', day: '2026-01-08' })
			]);
			expect(state).toBe('transferable');
		});
	});
});

describe('deriveAllStates', () => {
	it('derives each construction independently', () => {
		const states = deriveAllStates([
			ev({ constructionId: 'a', kind: 'parallel-read' }),
			ev({ constructionId: 'b', kind: 'recall-correct' }),
			ev({ constructionId: 'c', kind: 'attempt-incorrect' })
		]);

		expect(states.get('a')).toBe('exposed');
		expect(states.get('b')).toBe('recalled');
		// No evidence that grants anything, so `c` is absent rather than present-and-null.
		expect(states.has('c')).toBe(false);
	});
});

describe('LearnerProfile', () => {
	it('builds an empty profile with defaults applied', () => {
		const profile = emptyProfile('ta');
		expect(profile.activeLanguage).toBe('ta');
		expect(profile.evidence).toEqual([]);
		expect(profile.settings.trackingMode).toBe('single-guide');
		expect(profile.settings.transliteration).toBe(true);
	});

	it('round-trips through parse', () => {
		const profile = emptyProfile('fr');
		expect(LearnerProfile.parse(JSON.parse(JSON.stringify(profile)))).toEqual(profile);
	});

	it('rejects a malformed day key', () => {
		const result = LearnerProfile.safeParse({
			...emptyProfile('fr'),
			evidence: [{ ...ev({ kind: 'parallel-read' }), day: '01-01-2026' }]
		});
		expect(result.success).toBe(false);
	});
});
