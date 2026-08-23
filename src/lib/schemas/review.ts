/**
 * Native-review records (issue #13).
 *
 * `reviewStatus` on content says *what* has been claimed; these records are the
 * *evidence* for the claim. Schema conformance is not linguistic approval — a
 * line may parse perfectly and still be the wrong register for a Chennai tea
 * stall. Promotion out of `draft` is therefore gated on records, not prose:
 * see `review-gate.ts`.
 *
 * A record binds a named reviewer, an explicit scope, and the content version
 * the review was performed against. A review of v1 dialogue says nothing about
 * v2 dialogue, and a dialogue review says nothing about the transliteration —
 * both dimensions are part of the record's identity.
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
	/** The CONTENT_VERSION the reviewed text belonged to. */
	contentVersion: z.string().min(1),
	notes: z.string().min(1).optional()
});
export type ReviewRecord = z.infer<typeof ReviewRecord>;
