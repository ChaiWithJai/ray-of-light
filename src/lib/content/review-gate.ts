/**
 * The native-review queue and promotion gate (issue #13).
 *
 * "Pending native review" must be a closeable state, not permanent prose. This
 * module gives it edges:
 *
 *   reviewQueue(language)      what still needs a reviewer, itemized by scope
 *   validateReviewGate(...)    a reviewStatus above `draft` without matching
 *                              approved records for the CURRENT content version
 *                              is a build failure, not a wording problem
 *
 * The gate is deliberately version-strict: bumping CONTENT_VERSION after
 * editing reviewed text demotes the claim automatically, because the records
 * no longer match. Reviewing is re-done, not inherited.
 */
import type { LanguageCode, Lesson } from '$lib/schemas/content.js';
import { ReviewRecord, type ReviewScope } from '$lib/schemas/review.js';
import { z } from 'zod';
import rawReviews from './reviews.json';
import { CONTENT_VERSION, COURSES } from './index.js';

/** Parsed once, loudly — a malformed review record is a build failure too. */
export const REVIEW_RECORDS: ReviewRecord[] = z.array(ReviewRecord).parse(rawReviews);

/**
 * The scopes a line of this language needs before its dialogue can be called
 * reviewed. Tamil's scaffolding layers are review surfaces in their own right.
 */
export function requiredScopes(language: LanguageCode): ReviewScope[] {
	return language === 'ta'
		? ['dialogue', 'transliteration', 'literal-gloss']
		: ['dialogue'];
}

function approvedRecordsFor(itemId: string): ReviewRecord[] {
	return REVIEW_RECORDS.filter(
		(r) =>
			r.itemId === itemId &&
			r.disposition === 'approved' &&
			r.contentVersion === CONTENT_VERSION
	);
}

/** Distinct named reviewers whose current-version approvals cover `scopes`. */
function reviewersCovering(itemId: string, scopes: ReviewScope[]): string[] {
	const records = approvedRecordsFor(itemId);
	const reviewers = new Set(records.map((r) => r.reviewer));
	return [...reviewers].filter((reviewer) =>
		scopes.every((scope) =>
			records.some((r) => r.reviewer === reviewer && r.scopes.includes(scope))
		)
	);
}

const CLAIM_REQUIRES: Record<string, number> = {
	draft: 0,
	'one-native-review': 1,
	'two-native-review': 2
};

/**
 * Every reviewStatus claim in the course must be backed by enough distinct
 * qualified reviewers, at the current content version, across every required
 * scope. Throws with the full list of unbacked claims.
 */
export function validateReviewGate(
	courses: Record<LanguageCode, { lessons: Lesson[] }> = COURSES
): void {
	const unbacked: string[] = [];
	for (const language of Object.keys(courses) as LanguageCode[]) {
		const scopes = requiredScopes(language);
		for (const lesson of courses[language].lessons) {
			for (const line of lesson.lines) {
				const needed = CLAIM_REQUIRES[line.reviewStatus] ?? 0;
				if (needed === 0) continue;
				const have = reviewersCovering(line.id, scopes).length;
				if (have < needed) {
					unbacked.push(
						`${line.id} claims ${line.reviewStatus} but ${have}/${needed} reviewer(s) ` +
							`cover [${scopes.join(', ')}] at ${CONTENT_VERSION}`
					);
				}
			}
		}
	}
	if (unbacked.length > 0) {
		throw new Error(
			`Review claims without backing records (see docs/NATIVE-REVIEW.md):\n  ${unbacked.join('\n  ')}`
		);
	}
}

export type QueueItem = {
	lessonId: string;
	lineId: string;
	targetScript: string;
	missingScopes: ReviewScope[];
};

/**
 * Everything a native reviewer of this language still needs to look at for
 * the current content version. Empty means the corpus is fully reviewed —
 * which is a statement this function can actually make, unlike a docs file.
 */
export function reviewQueue(language: LanguageCode): QueueItem[] {
	const scopes = requiredScopes(language);
	const queue: QueueItem[] = [];
	for (const lesson of COURSES[language].lessons) {
		for (const line of lesson.lines) {
			const covered = reviewersCovering(line.id, scopes).length > 0;
			if (covered) continue;
			const records = approvedRecordsFor(line.id);
			const missingScopes = scopes.filter(
				(scope) => !records.some((r) => r.scopes.includes(scope))
			);
			queue.push({
				lessonId: lesson.id,
				lineId: line.id,
				targetScript: line.targetScript,
				missingScopes: missingScopes.length > 0 ? missingScopes : scopes
			});
		}
	}
	return queue;
}
