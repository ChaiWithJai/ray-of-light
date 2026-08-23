import { describe, expect, it } from 'vitest';
import { CONTENT_VERSION, COURSES } from './index.js';
import { requiredScopes, reviewQueue, validateReviewGate } from './review-gate.js';
import type { ReviewRecord } from '$lib/schemas/review.js';

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
		contentVersion: CONTENT_VERSION,
		...overrides
	};
}

/** COURSES with one fr line's reviewStatus promoted, everything else untouched. */
function withPromotedLine(reviewStatus: 'one-native-review' | 'two-native-review') {
	const fr = structuredClone(COURSES.fr);
	fr.lessons[0].lines[0].reviewStatus = reviewStatus;
	return { fr, ta: COURSES.ta };
}

describe('native-review promotion gate (issue #13)', () => {
	it('passes on the shipped corpus — everything is honestly draft', () => {
		expect(() => validateReviewGate()).not.toThrow();
	});

	it('rejects a promotion claim with no backing records', () => {
		expect(() => validateReviewGate(withPromotedLine('one-native-review'))).toThrowError(
			/claims one-native-review but 0\/1/
		);
	});

	it('rejects two-native-review backed by only one reviewer', () => {
		expect(() => validateReviewGate(withPromotedLine('two-native-review'))).toThrowError(
			/0\/2 reviewer/
		);
	});

	it('requires the finer Tamil scopes', () => {
		expect(requiredScopes('ta')).toEqual(['dialogue', 'transliteration', 'literal-gloss']);
		expect(requiredScopes('fr')).toEqual(['dialogue']);
	});

	it('queues every line of the unreviewed corpus, with its missing scopes', () => {
		const fr = reviewQueue('fr');
		const ta = reviewQueue('ta');
		expect(fr.length).toBe(COURSES.fr.lessons.flatMap((l) => l.lines).length);
		expect(ta.length).toBe(COURSES.ta.lessons.flatMap((l) => l.lines).length);
		expect(ta[0].missingScopes).toEqual(['dialogue', 'transliteration', 'literal-gloss']);
	});

	it('review record shape rejects an unqualified or unnamed reviewer', async () => {
		const { ReviewRecord } = await import('$lib/schemas/review.js');
		expect(ReviewRecord.safeParse(record({ reviewer: '' })).success).toBe(false);
		expect(ReviewRecord.safeParse(record({ reviewerQualification: '' })).success).toBe(false);
		expect(ReviewRecord.safeParse(record({})).success).toBe(true);
	});
});
