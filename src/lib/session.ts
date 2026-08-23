import { PASSIVE_FLOW, RECALL_FLOW, SYNTHESIS_FLOW, type StepId } from './flow.js';
import type { ActiveSession, LanguageCode, RecallSessionDraft, SessionMode } from './schemas/index.js';

export type SessionAccess = 'current' | 'completed' | 'forbidden';

function hasRecallAttempt(session: ActiveSession): boolean {
	return Boolean(session.recallDraft?.text.trim() && session.recallDraft.canonicalAnswer?.trim());
}

function sameFlow(left: readonly StepId[], right: readonly StepId[]): boolean {
	return left.length === right.length && left.every((step, index) => step === right[index]);
}

export function currentSessionIsValid(session: ActiveSession): boolean {
	const expectedModeFlow =
		session.mode === 'recall'
			? sameFlow(session.flow, RECALL_FLOW)
			: sameFlow(session.flow, PASSIVE_FLOW) || sameFlow(session.flow, SYNTHESIS_FLOW);
	if (!expectedModeFlow) return false;
	const currentIndex = session.flow.indexOf(session.currentStep);
	if (currentIndex < 0 || new Set(session.flow).size !== session.flow.length) return false;
	const expectedCompleted = session.flow.slice(0, currentIndex);
	if (!sameFlow(session.completedSteps, expectedCompleted)) return false;
	return !(
		session.mode === 'recall' &&
		(session.currentStep === 'compare' || session.currentStep === 'closure') &&
		!hasRecallAttempt(session)
	);
}

/** Validate persisted routing state against the actual active course. */
export function currentSessionMatchesExpected(
	session: ActiveSession,
	activeLanguage: LanguageCode,
	expectedFlow: readonly StepId[] | null
): boolean {
	return Boolean(
		expectedFlow &&
			currentSessionIsValid(session) &&
			session.language === activeLanguage &&
			sameFlow(session.flow, expectedFlow)
	);
}

export function createSession(
	mode: SessionMode,
	language: LanguageCode,
	lessonId: string,
	flow: readonly StepId[],
	now = Date.now(),
	assignmentDay?: string,
	origin: 'today' | 'book' = assignmentDay ? 'today' : 'book'
): ActiveSession {
	const first = flow[0];
	if (!first) throw new Error('Cannot start an empty session flow');
	return {
		id: `${now}-${mode}-${lessonId}`,
		mode,
		language,
		lessonId,
		flow: [...flow],
		currentStep: first,
		completedSteps: [],
		origin,
		assignmentDay,
		startedAt: now,
		updatedAt: now
	};
}

export function accessFor(
	session: ActiveSession | null,
	mode: SessionMode,
	language: LanguageCode,
	lessonId: string,
	step: StepId,
	flow: readonly StepId[]
): SessionAccess {
	if (
		!session ||
		session.mode !== mode ||
		session.language !== language ||
		session.lessonId !== lessonId ||
		!flow.includes(step)
	) return 'forbidden';
	if (!sameFlow(session.flow, flow) || !currentSessionIsValid(session)) return 'forbidden';
	if (session.currentStep === step) return currentSessionIsValid(session) ? 'current' : 'forbidden';
	return session.completedSteps.includes(step) ? 'completed' : 'forbidden';
}

export function advanceSession(
	session: ActiveSession,
	step: StepId,
	flow: readonly StepId[],
	now = Date.now(),
	recallDraft?: RecallSessionDraft
): ActiveSession | null {
	if (session.currentStep !== step) return null;
	if (!sameFlow(session.flow, flow) || !currentSessionIsValid(session)) return null;
	if (session.mode === 'recall' && step === 'recall') {
		if (!recallDraft?.text.trim() || !recallDraft.canonicalAnswer?.trim()) return null;
	}
	const index = flow.indexOf(step);
	const next = index >= 0 ? flow[index + 1] : undefined;
	if (!next) return null;
	return {
		...session,
		currentStep: next,
		completedSteps: [...session.completedSteps, step],
		recallDraft: recallDraft ?? session.recallDraft,
		updatedAt: now
	};
}

export function canFinishSession(session: ActiveSession, flow: readonly StepId[]): boolean {
	const closureIndex = flow.indexOf('closure');
	if (closureIndex < 0 || session.currentStep !== 'closure') return false;
	if (!sameFlow(session.flow, flow) || !currentSessionIsValid(session)) return false;
	const required = flow.slice(0, closureIndex);
	if (session.completedSteps.length !== required.length) return false;
	if (!required.every((step, index) => session.completedSteps[index] === step)) return false;
	return session.mode !== 'recall' || hasRecallAttempt(session);
}

export function resumeHref(session: ActiveSession): string {
	return `/${session.mode}/${session.lessonId}/${session.currentStep}`;
}
