import { describe, expect, it } from 'vitest';
import { RECALL_FLOW, PASSIVE_FLOW } from './flow.js';
import type { ActiveSession } from './schemas/learner.js';
import { accessFor, advanceSession, canFinishSession, createSession, resumeHref } from './session.js';

describe('persisted session state', () => {
	const recallDraft = {
		lineId: 'fr-01-l3',
		text: 'Je voudrais un café.',
		hinted: false,
		revealed: false,
		canonicalAnswer: 'Je voudrais un café.'
	};
	it('allows only the current step and completed steps', () => {
		const started = createSession('learn', 'fr', 'fr-01', PASSIVE_FLOW, 1);
		expect(accessFor(started, 'learn', 'fr', 'fr-01', 'preview', PASSIVE_FLOW)).toBe('current');
		expect(accessFor(started, 'learn', 'fr', 'fr-01', 'closure', PASSIVE_FLOW)).toBe('forbidden');
		const advanced = advanceSession(started, 'preview', PASSIVE_FLOW, 2)!;
		expect(accessFor(advanced, 'learn', 'fr', 'fr-01', 'preview', PASSIVE_FLOW)).toBe('completed');
		expect(accessFor(advanced, 'learn', 'fr', 'fr-01', 'spread', PASSIVE_FLOW)).toBe('current');
	});

	it('cannot advance from a forged or previously completed step', () => {
		const started = createSession('recall', 'fr', 'fr-01', RECALL_FLOW, 1);
		expect(advanceSession(started, 'compare', RECALL_FLOW, 2)).toBeNull();
		const comparison = advanceSession(started, 'recall', RECALL_FLOW, 2, recallDraft)!;
		expect(advanceSession(comparison, 'recall', RECALL_FLOW, 3)).toBeNull();
	});

	it('rejects recall comparison without the persisted attempt and canonical answer', () => {
		const forged = {
			...createSession('recall', 'fr', 'fr-01', RECALL_FLOW, 1),
			currentStep: 'compare' as const,
			completedSteps: ['recall' as const]
		};
		expect(accessFor(forged, 'recall', 'fr', 'fr-01', 'compare', RECALL_FLOW)).toBe('forbidden');
	});

	it('preserves a recall attempt while advancing to comparison', () => {
		const started = createSession('recall', 'ta', 'ta-01', RECALL_FLOW, 1);
		const draft = {
			lineId: 'ta-01-l3', text: 'enakku oru kaapi venum', hinted: false, revealed: false,
			canonicalAnswer: 'எனக்கு ஒரு காபி வேணும்.'
		};
		const comparison = advanceSession(started, 'recall', RECALL_FLOW, 2, draft)!;
		expect(comparison.currentStep).toBe('compare');
		expect(comparison.recallDraft).toEqual(draft);
		expect(resumeHref(comparison)).toBe('/recall/ta-01/compare');
	});

	it('authorizes finish only after every prerequisite step', () => {
		let session = createSession('recall', 'fr', 'fr-01', RECALL_FLOW, 1);
		expect(canFinishSession(session, RECALL_FLOW)).toBe(false);
		session = advanceSession(session, 'recall', RECALL_FLOW, 2, recallDraft)!;
		session = advanceSession(session, 'compare', RECALL_FLOW, 3)!;
		expect(canFinishSession(session, RECALL_FLOW)).toBe(true);
	});

	it('rejects closure with an incomplete, duplicate, or out-of-order chain', () => {
		const closure = {
			...createSession('learn', 'fr', 'fr-01', PASSIVE_FLOW, 1),
			currentStep: 'closure' as const,
			completedSteps: ['preview', 'spread'] as ActiveSession['completedSteps']
		};
		expect(canFinishSession(closure, PASSIVE_FLOW)).toBe(false);
		expect(
			canFinishSession(
				{ ...closure, completedSteps: ['spread', 'preview', 'comprehension', 'shadow', 'translate', 'completion', 'transfer'] },
				PASSIVE_FLOW
			)
		).toBe(false);
	});
});
