/**
 * The native-review queue and promotion gate (issue #13).
 *
 * "Pending native review" must be a closeable state, not permanent prose. This
 * module gives it edges:
 *
 *   reviewQueue(language, courses)   what still needs a reviewer, itemized by
 *                                    scope, with the exact content hash a
 *                                    review must be recorded against
 *   validateReviewGate(courses)      a reviewStatus above `draft` without
 *                                    matching approved records for the CURRENT
 *                                    text is a build failure, not a wording
 *                                    problem
 *
 * The gate is production-enforced: `src/lib/content/index.ts` calls
 * `validateReviewGate(COURSES)` at module init, immediately after COURSES is
 * built, so an unbacked claim fails at app import time exactly like a dangling
 * construction reference. To make that wiring cycle-free this module is pure —
 * it never imports `index.ts`; the course data is passed in.
 *
 * The gate is deliberately content-strict: every record carries an `itemHash`
 * of the exact reviewed text, and a record only counts while that hash still
 * matches the current text. Editing a reviewed line demotes the claim
 * automatically — reviewing is re-done, not inherited. `contentVersion` on a
 * record is kept as informational lineage only; it is not what binds the
 * review to the text (unrelated edits bump it, and a forgotten bump must not
 * let a stale review pass).
 */
import type { LanguageCode, Lesson, LessonLine } from '$lib/schemas/content.js';
import { ReviewRecord, type ReviewScope } from '$lib/schemas/review.js';
import { z } from 'zod';
import rawReviews from './reviews.json';

/** Parsed once, loudly — a malformed review record is a build failure too. */
export const REVIEW_RECORDS: ReviewRecord[] = z.array(ReviewRecord).parse(rawReviews);

/* -------------------------------------------------------------------------- */
/* Reviewable text and its hash                                                */
/* -------------------------------------------------------------------------- */

/**
 * Fixed separator between the fields of a reviewable text. A non-printing
 * ASCII unit separator, so "a" + "bc" can never collide with "ab" + "c".
 */
const FIELD_SEPARATOR = '\u001f';

/**
 * FNV-1a (32-bit) over the UTF-8 bytes of `text`, as 8 lowercase hex digits.
 * Implemented in-module on purpose: synchronous, dependency-free and
 * browser-safe (no `node:crypto`), because the gate runs at app import time
 * in every environment the content module loads in.
 */
export function reviewableHash(text: string): string {
	const bytes = new TextEncoder().encode(text);
	let hash = 0x811c9dc5;
	for (const byte of bytes) {
		hash ^= byte;
		hash = Math.imul(hash, 0x01000193) >>> 0;
	}
	return hash.toString(16).padStart(8, '0');
}

/**
 * The text a per-line review vouches for, precisely: `targetScript`,
 * `transliteration` (empty string when absent), `literalEnglish` (empty string
 * when absent) and `naturalEnglish`, in that order, joined with
 * FIELD_SEPARATOR. Changing any of these four fields is a content change that
 * invalidates the line's reviews; changing anything else (audio offsets,
 * construction links, …) is not.
 */
export function lineReviewableText(line: LessonLine): string {
	return [
		line.targetScript,
		line.transliteration ?? '',
		line.literalEnglish ?? '',
		line.naturalEnglish
	].join(FIELD_SEPARATOR);
}

/**
 * The text a per-lesson review vouches for, precisely: for every exercise in
 * lesson order — each `acceptedAnswers` entry in order followed by
 * `canonicalAnswer` for recall prompts (the other exercise kinds contribute
 * nothing lesson-level beyond their lines) — then every line note's `text` in
 * line order, all joined with FIELD_SEPARATOR. This is the 'accepted-answers'
 * + 'notes' review surface; the lines themselves are covered by per-line
 * records.
 */
export function lessonReviewableText(lesson: Lesson): string {
	const parts: string[] = [];
	for (const exercise of lesson.exercises) {
		if (exercise.kind === 'recall') {
			parts.push(...exercise.acceptedAnswers, exercise.canonicalAnswer);
		}
	}
	for (const line of lesson.lines) {
		for (const note of line.notes) {
			parts.push(note.text);
		}
	}
	return parts.join(FIELD_SEPARATOR);
}

/* -------------------------------------------------------------------------- */
/* Required scopes                                                             */
/* -------------------------------------------------------------------------- */

/**
 * The per-line and per-lesson review surfaces of a language, kept explicitly
 * separate because they gate different records (`itemKind: 'line'` vs
 * `itemKind: 'lesson'`).
 *
 * Per line, both languages need the spoken line and its natural translation
 * reviewed; Tamil's scaffolding layers (transliteration, literal gloss) are
 * review surfaces in their own right. Per lesson, the accepted answer sets and
 * the just-in-time notes need native eyes too — a wrong accepted answer
 * teaches the error.
 *
 * 'audio' is defined but deliberately not required while audio is the
 * disclosed synthesized placeholder (L1) — see docs/NATIVE-REVIEW.md.
 */
export function requiredScopes(language: LanguageCode): {
	line: ReviewScope[];
	lesson: ReviewScope[];
} {
	return {
		line:
			language === 'ta'
				? ['dialogue', 'natural-english', 'transliteration', 'literal-gloss']
				: ['dialogue', 'natural-english'],
		lesson: ['accepted-answers', 'notes']
	};
}

/* -------------------------------------------------------------------------- */
/* The gate                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Approved records for this item whose `itemHash` matches the hash of the
 * item's CURRENT text. A wrong hash means the text changed since the review —
 * the record is stale lineage, not evidence, and does not count.
 */
function approvedRecordsFor(
	records: ReviewRecord[],
	itemId: string,
	itemHash: string
): ReviewRecord[] {
	return records.filter(
		(r) => r.itemId === itemId && r.itemHash === itemHash && r.disposition === 'approved'
	);
}

/** Distinct named reviewers whose current-text approvals cover `scopes`. */
function reviewersCovering(
	records: ReviewRecord[],
	itemId: string,
	itemHash: string,
	scopes: ReviewScope[]
): string[] {
	const matching = approvedRecordsFor(records, itemId, itemHash);
	const reviewers = new Set(matching.map((r) => r.reviewer));
	return [...reviewers].filter((reviewer) =>
		scopes.every((scope) =>
			matching.some((r) => r.reviewer === reviewer && r.scopes.includes(scope))
		)
	);
}

const CLAIM_REQUIRES: Record<string, number> = {
	draft: 0,
	'one-native-review': 1,
	'two-native-review': 2
};

/**
 * Every reviewStatus claim in the course — per line AND per lesson — must be
 * backed by enough distinct qualified reviewers, hash-bound to the current
 * text, across every required scope for that item kind. Throws with the full
 * list of unbacked claims.
 *
 * Called at module init by `src/lib/content/index.ts` (production
 * enforcement); exported standalone so tests can drive it with synthetic
 * courses and records.
 */
export function validateReviewGate(
	courses: Record<LanguageCode, { lessons: Lesson[] }>,
	records: ReviewRecord[] = REVIEW_RECORDS
): void {
	const unbacked: string[] = [];
	const check = (
		id: string,
		claim: string,
		hash: string,
		scopes: ReviewScope[]
	): void => {
		const needed = CLAIM_REQUIRES[claim] ?? 0;
		if (needed === 0) return;
		const have = reviewersCovering(records, id, hash, scopes).length;
		if (have < needed) {
			unbacked.push(
				`${id} claims ${claim} but ${have}/${needed} reviewer(s) ` +
					`cover [${scopes.join(', ')}] at hash ${hash}`
			);
		}
	};

	for (const language of Object.keys(courses) as LanguageCode[]) {
		const scopes = requiredScopes(language);
		for (const lesson of courses[language].lessons) {
			check(
				lesson.id,
				lesson.provenance.reviewStatus,
				reviewableHash(lessonReviewableText(lesson)),
				scopes.lesson
			);
			for (const line of lesson.lines) {
				check(
					line.id,
					line.reviewStatus,
					reviewableHash(lineReviewableText(line)),
					scopes.line
				);
			}
		}
	}
	if (unbacked.length > 0) {
		throw new Error(
			`Review claims without backing records (see docs/NATIVE-REVIEW.md):\n  ${unbacked.join('\n  ')}`
		);
	}
}

/* -------------------------------------------------------------------------- */
/* The queue                                                                   */
/* -------------------------------------------------------------------------- */

export type QueueItem = {
	itemKind: 'line' | 'lesson';
	lessonId: string;
	/** The `itemId` a review record must carry (`line.id` or `lesson.id`). */
	itemId: string;
	/** The `itemHash` a review record must carry — hash of the current text. */
	itemHash: string;
	/** What to show the reviewer: the line's target script, or the lesson title. */
	excerpt: string;
	missingScopes: ReviewScope[];
};

/**
 * Everything a native reviewer of this language still needs to look at for
 * the current text — every line, plus every lesson's accepted-answers/notes
 * surface. Each item carries the exact `itemHash` the resulting record must
 * cite, so a reviewer can be handed the hash together with the text. Empty
 * means the corpus is fully reviewed — which is a statement this function can
 * actually make, unlike a docs file.
 */
export function reviewQueue(
	language: LanguageCode,
	courses: Record<LanguageCode, { lessons: Lesson[] }>,
	records: ReviewRecord[] = REVIEW_RECORDS
): QueueItem[] {
	const scopes = requiredScopes(language);
	const queue: QueueItem[] = [];

	const enqueue = (
		itemKind: 'line' | 'lesson',
		lessonId: string,
		itemId: string,
		itemHash: string,
		excerpt: string,
		required: ReviewScope[]
	): void => {
		if (reviewersCovering(records, itemId, itemHash, required).length > 0) return;
		const approved = approvedRecordsFor(records, itemId, itemHash);
		const missingScopes = required.filter(
			(scope) => !approved.some((r) => r.scopes.includes(scope))
		);
		queue.push({
			itemKind,
			lessonId,
			itemId,
			itemHash,
			excerpt,
			missingScopes: missingScopes.length > 0 ? missingScopes : required
		});
	};

	for (const lesson of courses[language].lessons) {
		for (const line of lesson.lines) {
			enqueue(
				'line',
				lesson.id,
				line.id,
				reviewableHash(lineReviewableText(line)),
				line.targetScript,
				scopes.line
			);
		}
		enqueue(
			'lesson',
			lesson.id,
			lesson.id,
			reviewableHash(lessonReviewableText(lesson)),
			lesson.title,
			scopes.lesson
		);
	}
	return queue;
}
