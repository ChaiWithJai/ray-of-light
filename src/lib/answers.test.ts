import { describe, expect, it } from 'vitest';
import { COURSES } from './content/index.js';
import type { RecallPrompt } from './schemas/content.js';
import { evaluateRecallAttempt, normalise, recallEvidenceKind } from './answers.js';

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

		expect(cases).toHaveLength(27);
		const promptsWithoutExactLine = cases.filter(
			({ lesson, prompt }) =>
				!lesson.lines.some(
					(line) => normalise(line.targetScript) === normalise(prompt.canonicalAnswer)
				)
		);
		expect(promptsWithoutExactLine).toHaveLength(12);

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
