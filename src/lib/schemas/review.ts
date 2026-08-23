/**
 * Native-review records (issue #13).
 *
 * `reviewStatus` on content says *what* has been claimed; these records are the
 * *evidence* for the claim. Schema conformance is not linguistic approval — a
 * line may parse perfectly and still be the wrong register for a Chennai tea
 * stall. Promotion out of `draft` is therefore gated on records, not prose:
 * see `review-gate.ts`.
 *
 * A record binds a named reviewer, an explicit scope, and a hash of the exact
 * text the review was performed against. A review of one version of a line
 * says nothing about an edited version, and a dialogue review says nothing
 * about the transliteration — both dimensions are part of the record's
 * identity. The hash (`itemHash`) is the binding; `contentVersion` is kept as
 * informational lineage only.
 */
import { z } from 'zod';
import { LanguageCode } from './content.js';

/**
 * What, precisely, the reviewer looked at. Tamil needs the finer scopes:
 * naturalness of the spoken line, fidelity of the transliteration, and
 * correctness of the literal gloss are separate competencies and separate
 * failure modes.
 */
export const ReviewScope = z.enum([
	'dialogue',
	'natural-english',
	'literal-gloss',
	'transliteration',
	'accepted-answers',
	'notes',
	'audio'
]);
export type ReviewScope = z.infer<typeof ReviewScope>;

export const ReviewDisposition = z.enum(['approved', 'changes-requested']);
export type ReviewDisposition = z.infer<typeof ReviewDisposition>;

export const ReviewRecord = z.object({
	id: z.string().min(1),
	language: LanguageCode,
	/** The lesson or line the review covers (`fr-03`, `ta-05-l2`, …). */
	itemId: z.string().min(1),
	itemKind: z.enum(['lesson', 'line']),
	scopes: z.array(ReviewScope).min(1),
	disposition: ReviewDisposition,
	/** A named human. Never a model, never a pipeline. */
	reviewer: z.string().min(1),
	/** Why this reviewer counts, e.g. "native speaker, Chennai, L1 Tamil". */
	reviewerQualification: z.string().min(1),
	/** ISO date of the review. */
	reviewedAt: z.string().min(1),
	/**
	 * FNV-1a hash of the reviewed item's exact text (see `reviewableHash` and
	 * the `lineReviewableText`/`lessonReviewableText` definitions in
	 * `src/lib/content/review-gate.ts`). This is what binds the record to the
	 * content: the gate only counts a record while the current text still
	 * hashes to this value. `reviewQueue(...)` hands reviewers the expected
	 * hash alongside the text.
	 */
	itemHash: z
		.string()
		.regex(/^[0-9a-f]{8}$/, 'itemHash must be 8 lowercase hex digits (FNV-1a)'),
	/**
	 * The CONTENT_VERSION current when the review was recorded. Informational
	 * lineage only — `itemHash` is what the gate matches, because unrelated
	 * edits bump the version and a forgotten bump must not pass stale reviews.
	 */
	contentVersion: z.string().min(1),
	notes: z.string().min(1).optional()
});
export type ReviewRecord = z.infer<typeof ReviewRecord>;
