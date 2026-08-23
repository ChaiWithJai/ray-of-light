import { describe, expect, it } from 'vitest';
import { COURSES } from './content/index.js';
import { TransferPrompt, type RecallPrompt } from './schemas/content.js';
import {
	containsPhrase,
	evaluateRecallAttempt,
	evaluateTransferAttempt,
	hasRecallAttempt,
	matchesTransferCriteria,
	normalise,
	recallEvidenceKind
} from './answers.js';

describe('hasRecallAttempt', () => {
	it('rejects empty and whitespace-only productions before reveal', () => {
		expect(hasRecallAttempt('')).toBe(false);
		expect(hasRecallAttempt('  \n\t ')).toBe(false);
	});

	it('allows reveal after a nonblank learner production', () => {
		expect(hasRecallAttempt('Je voudrais essayer.')).toBe(true);
	});
});

describe('recallEvidenceKind', () => {
	it('classifies an authored accepted answer as truthful recall evidence', () => {
		expect(
			recallEvidenceKind("je voudrais un cafe, s'il vous plait", [
				"Je voudrais un café, s'il vous plaît.",
				'Je voudrais un café.'
			])
		).toBe('recall-correct');
	});

	it('classifies a nonblank wrong answer as incorrect evidence', () => {
		expect(
			recallEvidenceKind('Bonjour, monsieur.', ["Je voudrais un café, s'il vous plaît."])
		).toBe('attempt-incorrect');
	});

	it('accepts an explicitly authored alternate without fuzzy matching', () => {
		expect(
			recallEvidenceKind('Je voudrais un café.', [
				"Je voudrais un café, s'il vous plaît.",
				'Je voudrais un café.'
			])
		).toBe('recall-correct');
	});
});

describe('authored recall prompt conformance', () => {
	it('classifies every canonical answer from both courses against its authored prompt', () => {
		const cases = Object.values(COURSES).flatMap((course) =>
			course.lessons.flatMap((lesson) =>
				lesson.exercises
					.filter((exercise): exercise is RecallPrompt => exercise.kind === 'recall')
					.map((prompt) => ({ lesson, prompt }))
			)
		);

		expect(cases).toHaveLength(47);
		const promptsWithoutExactLine = cases.filter(
			({ lesson, prompt }) =>
				!lesson.lines.some(
					(line) => normalise(line.targetScript) === normalise(prompt.canonicalAnswer)
				)
		);
		expect(promptsWithoutExactLine).toHaveLength(29);

		for (const { lesson, prompt } of cases) {
			const result = evaluateRecallAttempt(prompt.canonicalAnswer, prompt, lesson.lines[0]);
			expect(result.kind, `${lesson.id}: ${prompt.canonicalAnswer}`).toBe('recall-correct');
			expect(result.canonicalAnswer).toBe(prompt.canonicalAnswer);
			expect(result.constructionIds).toEqual(prompt.constructions);
		}
	});

	it('carries an accepted Tamil transliteration into comparison without replacing canonical script', () => {
		const lesson = COURSES.ta.lessons[1];
		const prompt = lesson.exercises.find(
			(exercise): exercise is RecallPrompt => exercise.kind === 'recall'
		)!;
		const result = evaluateRecallAttempt('room irukkā', prompt, lesson.lines[0]);

		expect(result.kind).toBe('recall-correct');
		expect(result.matchedAcceptedAnswer).toBe('room irukkā');
		expect(result.canonicalAnswer).toBe('ரூம் இருக்கா?');
		expect(result.constructionIds).toEqual(['ta.irukka-q']);
	});
});

describe('transfer evaluation', () => {
	const transfers = Object.values(COURSES).flatMap((course) =>
		course.lessons.flatMap((lesson) =>
			lesson.exercises.filter((exercise): exercise is TransferPrompt => exercise.kind === 'transfer')
		)
	);

	it('accepts all 49 authored exemplars using explicit criteria', () => {
		expect(transfers).toHaveLength(49);
		for (const prompt of transfers) {
			expect(
				matchesTransferCriteria(prompt.exemplar, prompt.criteria),
				`${prompt.lessonId}: ${prompt.exemplar}`
			).toBe(true);
		}
	});

	it('matches whole phrases rather than substrings', () => {
		expect(containsPhrase('Je vais regarder un film.', 'je vais')).toBe(true);
		expect(containsPhrase('Ce film est mauvais.', 'vais')).toBe(false);
		expect(containsPhrase('Je veux deux kilogrammes de pommes.', 'grammes de')).toBe(false);
	});

	it('rejects unrelated words and requires every construction and context group', () => {
		const frenchMarkerOnly = transfers.find((prompt) => prompt.lessonId === 'fr-01')!;
		expect(matchesTransferCriteria('Je voudrais absolument.', frenchMarkerOnly.criteria)).toBe(false);
		// Context is evaluated separately from construction order: word order across
		// those two evidence domains must not turn scenario vocabulary into grammar.
		expect(matchesTransferCriteria('Croissant je voudrais.', frenchMarkerOnly.criteria)).toBe(true);

		const french = transfers.find((prompt) => prompt.lessonId === 'fr-11')!;
		expect(matchesTransferCriteria('Ce film est mauvais.', french.criteria)).toBe(false);
		expect(matchesTransferCriteria('Je vais au cinéma.', french.criteria)).toBe(false);

		const tamil = transfers.find((prompt) => prompt.lessonId === 'ta-08')!;
		expect(matchesTransferCriteria('எனக்கு பல் வலி.', tamil.criteria)).toBe(false);
		expect(matchesTransferCriteria('தலைவலி நேற்று.', tamil.criteria)).toBe(false);
		expect(
			matchesTransferCriteria('இருந்து வலி பல் எனக்கு.', tamil.criteria)
		).toBe(false);
	});

	it('separates scenario fidelity from construction evidence', () => {
		const prompt = transfers.find((candidate) => candidate.lessonId === 'fr-01')!;
		expect(evaluateTransferAttempt('Je voudrais du pain.', prompt)).toEqual({
			matchedConstructionIds: ['fr.je-voudrais'],
			unmatchedConstructionIds: [],
			contextMatched: false
		});
	});

	it('does not accept a quantity construction without a quantity', () => {
		const prompt = transfers.find((candidate) => candidate.lessonId === 'fr-03')!;
		expect(evaluateTransferAttempt('grammes de comté', prompt)).toEqual({
			matchedConstructionIds: [],
			unmatchedConstructionIds: ['fr.quantite-de'],
			contextMatched: true
		});
	});

	it('accepts an explicitly authored Tamil transliteration realization', () => {
		const tamil = transfers.find((prompt) => prompt.lessonId === 'ta-08')!;
		expect(
			matchesTransferCriteria('enakku pal vali, nethikku irundhu.', tamil.criteria)
		).toBe(true);
	});

	it('classifies each construction independently', () => {
		const prompt = transfers.find((candidate) => candidate.lessonId === 'ta-08')!;
		const correct = evaluateTransferAttempt(prompt.exemplar, prompt);
		const partial = evaluateTransferAttempt('எனக்கு பல் வலி.', prompt);

		expect(correct).toEqual({
			matchedConstructionIds: ['ta.vali', 'ta.irundhu'],
			unmatchedConstructionIds: [],
			contextMatched: true
		});
		expect(partial).toEqual({
			matchedConstructionIds: ['ta.vali'],
			unmatchedConstructionIds: ['ta.irundhu'],
			contextMatched: false
		});
	});

	it('attributes a French pattern match to the exact authored construction ids', () => {
		const prompt = transfers.find((candidate) => candidate.lessonId === 'fr-03')!;
		expect(evaluateTransferAttempt(prompt.exemplar, prompt)).toEqual({
			matchedConstructionIds: ['fr.quantite-de'],
			unmatchedConstructionIds: [],
			contextMatched: true
		});
	});

	it('requires explicit criteria in the runtime schema', () => {
		const { criteria: _criteria, ...withoutCriteria } = transfers[0];
		expect(TransferPrompt.safeParse(withoutCriteria).success).toBe(false);
	});

	it.each([' ', '.', '!!!', '\u0301'])(
		'rejects a criterion alternative with no tokenizable content: %j',
		(alternative) => {
			const malformed = structuredClone(transfers[0]);
			malformed.criteria.constructions[0].orderedGroups = [[alternative]];
			expect(TransferPrompt.safeParse(malformed).success).toBe(false);
		}
	);
});
