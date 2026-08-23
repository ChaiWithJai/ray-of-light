/**
 * Answer comparison.
 *
 * Deliberately conservative: this decides whether an *attempt* matched, and it
 * only ever compares against authored accepted answers. It is not a grader,
 * and it never scores pronunciation — see docs/ISSUE-1-LIMITATIONS.md.
 */
import type {
	LessonLine,
	RecallPrompt,
	TransferCriteria,
	TransferPrompt
} from '$lib/schemas/content.js';

/**
 * Fold away the differences that are not the learner's mistake: case, accents,
 * curly vs straight apostrophes, punctuation, and runs of whitespace.
 *
 * Accents are folded because a learner on an English keyboard cannot easily type
 * "é", and failing them for that tests their keyboard rather than their French.
 * The accent still matters pedagogically — 1n shows it in the comparison — it
 * just does not decide correct/incorrect here.
 */
export function normalise(value: string): string {
	return value
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.toLowerCase()
		.replace(/[’'`]/g, "'")
		.replace(/[.,!?;:¿¡]/g, '')
		.replace(/\s+/g, ' ')
		.trim();
}

/** True when the attempt matches any authored accepted answer. */
export function matchesAccepted(attempt: string, accepted: readonly string[]): boolean {
	const a = normalise(attempt);
	return accepted.some((candidate) => normalise(candidate) === a);
}

/** Match a normalized phrase on token boundaries, never as an arbitrary substring. */
export function containsPhrase(attempt: string, phrase: string): boolean {
	const attemptTokens = normalise(attempt).split(' ').filter(Boolean);
	const phraseTokens = normalise(phrase).split(' ').filter(Boolean);
	if (phraseTokens.length === 0 || phraseTokens.length > attemptTokens.length) return false;

	return phraseStarts(attemptTokens, phraseTokens, 0).length > 0;
}

function phraseStarts(tokens: readonly string[], phrase: readonly string[], from: number): number[] {
	const starts: number[] = [];
	for (let start = from; start <= tokens.length - phrase.length; start += 1) {
		if (phrase.every((token, offset) => tokens[start + offset] === token)) starts.push(start);
	}
	return starts;
}

/**
 * Every authored group is required in order. Alternatives within a group support
 * another valid realization, including Tamil script/transliteration. This proves
 * only that the target pattern is present; it is not a grammar or native-quality
 * judgment.
 */
function matchesOrderedGroups(
	attempt: string,
	orderedGroups: TransferCriteria['contextGroups']
): boolean {
	if (attempt.trim() === '') return false;
	const tokens = normalise(attempt).split(' ').filter(Boolean);

	function matchesFrom(groupIndex: number, tokenIndex: number): boolean {
		if (groupIndex === orderedGroups.length) return true;
		for (const alternative of orderedGroups[groupIndex]) {
			const phrase = normalise(alternative).split(' ').filter(Boolean);
			for (const start of phraseStarts(tokens, phrase, tokenIndex)) {
				if (matchesFrom(groupIndex + 1, start + phrase.length)) return true;
			}
		}
		return false;
	}

	return matchesFrom(0, 0);
}

export function matchesTransferCriteria(attempt: string, criteria: TransferCriteria): boolean {
	return (
		criteria.constructions.every((criterion) =>
			matchesOrderedGroups(attempt, criterion.orderedGroups)
		) && matchesOrderedGroups(attempt, criteria.contextGroups)
	);
}

export type TransferEvaluation = {
	matchedConstructionIds: string[];
	unmatchedConstructionIds: string[];
	contextMatched: boolean;
};

/**
 * Classify only whether the authored ordered token pattern appeared. A match is
 * deliberately not `transfer-correct`: this evaluator cannot establish full
 * grammar, meaning, pragmatic fit, pronunciation, or native naturalness.
 */
export function evaluateTransferAttempt(
	attempt: string,
	prompt: TransferPrompt
): TransferEvaluation {
	return {
		matchedConstructionIds: prompt.criteria.constructions
			.filter((criterion) => matchesOrderedGroups(attempt, criterion.orderedGroups))
			.map((criterion) => criterion.constructionId),
		unmatchedConstructionIds: prompt.criteria.constructions
			.filter((criterion) => !matchesOrderedGroups(attempt, criterion.orderedGroups))
			.map((criterion) => criterion.constructionId),
		contextMatched: matchesOrderedGroups(attempt, prompt.criteria.contextGroups)
	};
}

export type RecallEvidenceKind = 'recall-correct' | 'attempt-incorrect';

/** A reveal is earned by producing something, not by whitespace or an empty submission. */
export function hasRecallAttempt(attempt: string): boolean {
	return attempt.trim().length > 0;
}

export type RecallAttempt = {
	lineId: string;
	text: string;
	canonicalAnswer: string;
	matchedAcceptedAnswer?: string;
};

export type RecallEvaluation = {
	kind: RecallEvidenceKind;
	canonicalAnswer: string;
	constructionIds: string[];
	matchedAcceptedAnswer?: string;
};

/**
 * Classify a recall attempt before it is appended to the evidence log.
 * Keeping this decision pure makes it impossible for the UI to grant recall
 * merely because the learner typed something and moved to comparison.
 */
export function recallEvidenceKind(
	attempt: string,
	acceptedAnswers: readonly string[]
): RecallEvidenceKind {
	return matchesAccepted(attempt, acceptedAnswers) ? 'recall-correct' : 'attempt-incorrect';
}

/**
 * Evaluate against the authored recall exercise whenever it exists. The spread
 * line is contextual support; it is not allowed to replace the exercise's
 * accepted answers, canonical response, or construction attribution.
 */
export function evaluateRecallAttempt(
	attempt: string,
	prompt: RecallPrompt | undefined,
	contextLine: LessonLine
): RecallEvaluation {
	const acceptedAnswers = prompt?.acceptedAnswers ?? [contextLine.targetScript];
	const normalisedAttempt = normalise(attempt);
	const matchedAcceptedAnswer = acceptedAnswers.find(
		(candidate) => normalise(candidate) === normalisedAttempt
	);
	return {
		kind: matchedAcceptedAnswer ? 'recall-correct' : 'attempt-incorrect',
		canonicalAnswer: prompt?.canonicalAnswer ?? contextLine.targetScript,
		constructionIds: [...(prompt?.constructions ?? contextLine.constructions)],
		matchedAcceptedAnswer
	};
}

export type DiffWord = { text: string; same: boolean };

/**
 * Word-level diff for the comparison surface (1n). The learner is meant to
 * *notice* the difference before being told, so this marks both sides rather
 * than announcing a verdict.
 */
export function diffWords(
	attempt: string,
	canonical: string
): { attempt: DiffWord[]; canonical: DiffWord[] } {
	const a = attempt.trim().split(/\s+/).filter(Boolean);
	const b = canonical.trim().split(/\s+/).filter(Boolean);
	const aNorm = a.map(normalise);
	const bNorm = b.map(normalise);

	return {
		attempt: a.map((text, i) => ({ text, same: normalise(text) === bNorm[i] })),
		canonical: b.map((text, i) => ({ text, same: normalise(text) === aNorm[i] }))
	};
}
