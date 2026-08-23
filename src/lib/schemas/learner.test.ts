import { describe, expect, it } from 'vitest';
import {
	deriveAllStates,
	deriveConstructionState,
	emptyProfile,
	EvidenceEvent,
	LearnerProfile,
	migrateLegacyTransferEvidence,
	placeEntryLesson,
	type EvidenceEvent as EvidenceEventType
} from './learner.js';

let seq = 0;
function ev(
	partial: Partial<EvidenceEventType> & Pick<EvidenceEventType, 'kind'>
): EvidenceEventType {
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
		expect(
			deriveConstructionState([
				ev({ kind: 'transfer-pattern-matched', assessmentSource: 'authored-pattern' })
			])
		).toBe('recognized');
		expect(deriveConstructionState([ev({ kind: 'recall-correct' })])).toBe('recalled');
		expect(
			deriveConstructionState([
				ev({ kind: 'transfer-correct', assessmentSource: 'expert-review' })
			])
		).toBe('transferable');
	});

	it('never treats heuristic pattern matches as transfer or retrieval-day evidence', () => {
		expect(
			deriveConstructionState([
				ev({
					kind: 'transfer-pattern-matched',
					day: '2026-01-01',
					assessmentSource: 'authored-pattern'
				}),
				ev({
					kind: 'transfer-pattern-matched',
					day: '2026-01-08',
					assessmentSource: 'authored-pattern'
				})
			])
	).toBe('recognized');
	});

	it('quarantines unverified legacy transfer claims', () => {
		expect(deriveConstructionState([ev({ kind: 'transfer-correct' })])).toBeNull();
		expect(
			deriveConstructionState([ev({ kind: 'transfer-legacy-unverified' })])
		).toBeNull();
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
				ev({ kind: 'transfer-correct', day: '2026-01-01', assessmentSource: 'expert-review' }),
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
	it('migrates legacy heuristic transfer claims without losing their audit record', () => {
		const profile = emptyProfile();
		const legacy = ev({ kind: 'transfer-correct' });
		const migrated = migrateLegacyTransferEvidence({ ...profile, evidence: [legacy] });
		const parsed = LearnerProfile.parse(migrated);
		expect(parsed.evidence[0]).toMatchObject({
			id: legacy.id,
			kind: 'transfer-legacy-unverified',
			assessmentSource: 'legacy-heuristic'
		});
		expect(deriveConstructionState(parsed.evidence)).toBeNull();
	});

	it('preserves genuinely expert-reviewed transfer evidence', () => {
		const profile = emptyProfile();
		const expert = ev({ kind: 'transfer-correct', assessmentSource: 'expert-review' });
		const migrated = migrateLegacyTransferEvidence({ ...profile, evidence: [expert] });
		expect(LearnerProfile.parse(migrated).evidence[0]).toEqual(expert);
	});

	it('requires explicit expert provenance for future transfer-correct evidence', () => {
		expect(EvidenceEvent.safeParse(ev({ kind: 'transfer-correct' })).success).toBe(false);
		expect(
			EvidenceEvent.safeParse(
				ev({ kind: 'transfer-correct', assessmentSource: 'expert-review' })
			).success
		).toBe(true);
	});

	it('binds every transfer evidence kind to its exact assessment provenance', () => {
		const cases = [
			['transfer-pattern-matched', 'authored-pattern'],
			['transfer-legacy-unverified', 'legacy-heuristic'],
			['transfer-correct', 'expert-review']
		] as const;
		for (const [kind, assessmentSource] of cases) {
			expect(EvidenceEvent.safeParse(ev({ kind, assessmentSource })).success).toBe(true);
			expect(EvidenceEvent.safeParse(ev({ kind })).success).toBe(false);
			expect(
				EvidenceEvent.safeParse(ev({ kind, assessmentSource: 'expert-review' })).success,
				kind
			).toBe(kind === 'transfer-correct');
		}
		expect(
			EvidenceEvent.safeParse(
				ev({ kind: 'recall-correct', assessmentSource: 'expert-review' })
			).success
		).toBe(false);
	});

	it('defensively refuses grants from mismatched transfer provenance', () => {
		expect(
			deriveConstructionState([
				ev({ kind: 'transfer-pattern-matched', assessmentSource: 'expert-review' })
			])
		).toBeNull();
		expect(
			deriveConstructionState([
				ev({ kind: 'transfer-correct', assessmentSource: 'authored-pattern' })
			])
		).toBeNull();
	});

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

describe('placeEntryLesson', () => {
	it('places a learner who heard and spoke past the opening lessons', () => {
		expect(placeEntryLesson({ heardCorrectly: true, spokeBack: true }, 14)).toBe(3);
	});

	it('places a learner who only recognized the meaning one lesson in', () => {
		expect(placeEntryLesson({ heardCorrectly: true, spokeBack: false }, 14)).toBe(2);
	});

	it('starts at lesson 1 when nothing was recognized', () => {
		expect(placeEntryLesson({ heardCorrectly: false, spokeBack: false }, 14)).toBe(1);
		expect(placeEntryLesson({ heardCorrectly: false, spokeBack: true }, 14)).toBe(1);
	});

	it('never places past the end of the course', () => {
		expect(placeEntryLesson({ heardCorrectly: true, spokeBack: true }, 2)).toBe(2);
		expect(placeEntryLesson({ heardCorrectly: true, spokeBack: true }, 0)).toBe(1);
	});
});
