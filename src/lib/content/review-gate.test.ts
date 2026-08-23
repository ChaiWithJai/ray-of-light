import { describe, expect, it } from 'vitest';
import { CONTENT_VERSION, COURSES } from './index.js';
import {
	lessonReviewableText,
	lineReviewableText,
	requiredScopes,
	reviewQueue,
	reviewableHash,
	validateReviewGate
} from './review-gate.js';
import type { ReviewRecord, ReviewScope } from '$lib/schemas/review.js';

/** A minimal approved record for tests. */
function record(overrides: Partial<ReviewRecord>): ReviewRecord {
	return {
		id: 'rev-test-1',
		language: 'fr',
		itemId: 'fr-01-l1',
		itemKind: 'line',
		scopes: ['dialogue'],
		disposition: 'approved',
		reviewer: 'A. Reviewer',
		reviewerQualification: 'native speaker, Paris',
		reviewedAt: '2026-08-23',
		itemHash: '00000000',
		contentVersion: CONTENT_VERSION,
		...overrides
	};
}

const FR_LINE = COURSES.fr.lessons[0].lines[0];
const FR_LINE_HASH = reviewableHash(lineReviewableText(FR_LINE));
const FR_LESSON = COURSES.fr.lessons[0];
const FR_LESSON_HASH = reviewableHash(lessonReviewableText(FR_LESSON));
const FR_LINE_SCOPES: ReviewScope[] = ['dialogue', 'natural-english'];

/** A full backing record for the first fr line's current text. */
function backingLineRecord(overrides: Partial<ReviewRecord> = {}): ReviewRecord {
	return record({
		itemId: FR_LINE.id,
		itemHash: FR_LINE_HASH,
		scopes: FR_LINE_SCOPES,
		...overrides
	});
}

/** COURSES with one fr line's reviewStatus promoted, everything else untouched. */
function withPromotedLine(reviewStatus: 'one-native-review' | 'two-native-review') {
	const fr = structuredClone(COURSES.fr);
	fr.lessons[0].lines[0].reviewStatus = reviewStatus;
	return { fr, ta: COURSES.ta };
}

/** COURSES with one fr lesson's provenance promoted, everything else untouched. */
function withPromotedLesson(reviewStatus: 'one-native-review' | 'two-native-review') {
	const fr = structuredClone(COURSES.fr);
	fr.lessons[0].provenance.reviewStatus = reviewStatus;
	return { fr, ta: COURSES.ta };
}

describe('native-review promotion gate (issue #13)', () => {
	// Production enforcement: index.ts calls validateReviewGate(COURSES) at
	// module init, so simply importing COURSES above has already run the gate —
	// an unbacked claim in the shipped corpus would have failed these imports.
	it('passes on the shipped corpus — everything is honestly draft', () => {
		expect(() => validateReviewGate(COURSES)).not.toThrow();
	});

	it('rejects a promotion claim with no backing records', () => {
		expect(() => validateReviewGate(withPromotedLine('one-native-review'))).toThrowError(
			/claims one-native-review but 0\/1/
		);
	});

	it('rejects two-native-review backed by only one reviewer', () => {
		expect(() =>
			validateReviewGate(withPromotedLine('two-native-review'), [backingLineRecord()])
		).toThrowError(/1\/2 reviewer/);
	});

	it('accepts a promotion backed by a hash-matched record covering all scopes', () => {
		expect(() =>
			validateReviewGate(withPromotedLine('one-native-review'), [backingLineRecord()])
		).not.toThrow();
		expect(() =>
			validateReviewGate(withPromotedLine('two-native-review'), [
				backingLineRecord(),
				backingLineRecord({ id: 'rev-test-2', reviewer: 'B. Reviewer' })
			])
		).not.toThrow();
	});

	it('rejects a stale record whose itemHash no longer matches the text', () => {
		// Same itemId, same scopes, right version string — but the hash was taken
		// against different text. Stale = does not count.
		expect(() =>
			validateReviewGate(withPromotedLine('one-native-review'), [
				backingLineRecord({ itemHash: 'deadbeef' })
			])
		).toThrowError(/0\/1 reviewer/);
	});

	it('a partial-scope record does not cover the claim', () => {
		expect(() =>
			validateReviewGate(withPromotedLine('one-native-review'), [
				backingLineRecord({ scopes: ['dialogue'] })
			])
		).toThrowError(/natural-english/);
	});

	it('gates lesson-level claims on accepted-answers + notes records', () => {
		expect(() => validateReviewGate(withPromotedLesson('one-native-review'))).toThrowError(
			/claims one-native-review but 0\/1 reviewer\(s\) cover \[accepted-answers, notes\]/
		);
		expect(() =>
			validateReviewGate(withPromotedLesson('one-native-review'), [
				record({
					itemId: FR_LESSON.id,
					itemKind: 'lesson',
					itemHash: FR_LESSON_HASH,
					scopes: ['accepted-answers', 'notes']
				})
			])
		).not.toThrow();
		// A lesson record hashed against edited lesson text is stale too.
		expect(() =>
			validateReviewGate(withPromotedLesson('one-native-review'), [
				record({
					itemId: FR_LESSON.id,
					itemKind: 'lesson',
					itemHash: 'deadbeef',
					scopes: ['accepted-answers', 'notes']
				})
			])
		).toThrowError(/0\/1 reviewer/);
	});

	it('requires the full per-line surface, finer for Tamil, plus the lesson surface', () => {
		expect(requiredScopes('ta')).toEqual({
			line: ['dialogue', 'natural-english', 'transliteration', 'literal-gloss'],
			lesson: ['accepted-answers', 'notes']
		});
		expect(requiredScopes('fr')).toEqual({
			line: ['dialogue', 'natural-english'],
			lesson: ['accepted-answers', 'notes']
		});
	});

	it('hashes are stable, hex, and sensitive to every reviewed field', () => {
		expect(reviewableHash('')).toMatch(/^[0-9a-f]{8}$/);
		expect(reviewableHash('a')).toBe(reviewableHash('a'));
		expect(reviewableHash('a')).not.toBe(reviewableHash('b'));
		// The separator prevents field-boundary collisions.
		expect(
			reviewableHash(lineReviewableText({ ...FR_LINE, targetScript: FR_LINE.targetScript + 'x' }))
		).not.toBe(FR_LINE_HASH);
		expect(
			reviewableHash(lineReviewableText({ ...FR_LINE, naturalEnglish: FR_LINE.naturalEnglish + 'x' }))
		).not.toBe(FR_LINE_HASH);
	});

	it('queues every line and lesson of the unreviewed corpus, with hash and missing scopes', () => {
		const fr = reviewQueue('fr', COURSES);
		const ta = reviewQueue('ta', COURSES);
		expect(fr.length).toBe(
			COURSES.fr.lessons.flatMap((l) => l.lines).length + COURSES.fr.lessons.length
		);
		expect(ta.length).toBe(
			COURSES.ta.lessons.flatMap((l) => l.lines).length + COURSES.ta.lessons.length
		);
		const firstLine = ta.find((q) => q.itemKind === 'line');
		expect(firstLine?.missingScopes).toEqual([
			'dialogue',
			'natural-english',
			'transliteration',
			'literal-gloss'
		]);
		const frLine = fr.find((q) => q.itemId === FR_LINE.id);
		expect(frLine?.itemHash).toBe(FR_LINE_HASH);
		const frLesson = fr.find((q) => q.itemKind === 'lesson' && q.itemId === FR_LESSON.id);
		expect(frLesson?.itemHash).toBe(FR_LESSON_HASH);
		expect(frLesson?.missingScopes).toEqual(['accepted-answers', 'notes']);
	});

	it('a covered item leaves the queue', () => {
		const fr = reviewQueue('fr', COURSES, [backingLineRecord()]);
		expect(fr.some((q) => q.itemId === FR_LINE.id)).toBe(false);
	});

	it('review record shape rejects an unnamed reviewer or malformed hash', async () => {
		const { ReviewRecord } = await import('$lib/schemas/review.js');
		expect(ReviewRecord.safeParse(record({ reviewer: '' })).success).toBe(false);
		expect(ReviewRecord.safeParse(record({ reviewerQualification: '' })).success).toBe(false);
		expect(ReviewRecord.safeParse(record({ itemHash: 'nothex!!' })).success).toBe(false);
		expect(ReviewRecord.safeParse({ ...record({}), itemHash: undefined }).success).toBe(false);
		expect(ReviewRecord.safeParse(record({})).success).toBe(true);
	});
});
