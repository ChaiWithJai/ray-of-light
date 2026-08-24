/**
 * The ink layer's owner-review gate (issue #46, phase S2; spec §5 + D8).
 *
 * Generated ink assets (`scripts/generate-sprite-ink.mts` →
 * `static/sprites/ink/{constructionId}.png`, untracked) render in the UI
 * ONLY when a matching approved review record exists in the tracked
 * `src/lib/content/sprite-ink-reviews.json`. The record shape mirrors the
 * #13 ReviewRecord discipline: who approved, when, and the exact bytes
 * (sha-256) they approved — per construction id.
 *
 * The gate is deliberately dumb and total:
 *  - no record → substrate (the parametric SVG) renders, always;
 *  - a record that is unhashed, malformed, or not `approved` is refused;
 *  - a vitest integrity suite (`sprite-ink.test.ts`) re-hashes every
 *    reviewed asset on disk, so an approved record whose file changed —
 *    or vanished — fails the build rather than shipping unreviewed ink.
 */
import { z } from 'zod';
import reviewsJson from './content/sprite-ink-reviews.json';

export const SpriteInkReview = z.object({
	constructionId: z.string().min(1),
	/** sha-256 of the exact PNG bytes the owner approved. */
	assetSha256: z.string().regex(/^[0-9a-f]{64}$/),
	reviewer: z.string().min(1),
	/** YYYY-MM-DD of the review. */
	date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
	decision: z.literal('approved'),
	/** Which engine produced the approved asset (provenance, D8). */
	engine: z.string().min(1)
});
export type SpriteInkReview = z.infer<typeof SpriteInkReview>;

/** Public URL of an ink asset — where the pipeline writes and the app reads. */
export function inkAssetUrl(constructionId: string): string {
	return `/sprites/ink/${constructionId}.png`;
}

/**
 * The gate. Returns the asset URL only for a construction whose review record
 * parses cleanly as an approval; anything else — unknown id, missing hash,
 * malformed date, a decision that is not `approved` — yields null and the
 * substrate renders instead. Never throws: a corrupt record must degrade to
 * the honest parametric tier, not take a surface down.
 */
export function approvedInkUrl(
	constructionId: string,
	reviews: unknown[] = INK_REVIEWS
): string | null {
	for (const candidate of reviews) {
		const parsed = SpriteInkReview.safeParse(candidate);
		if (parsed.success && parsed.data.constructionId === constructionId) {
			return inkAssetUrl(constructionId);
		}
	}
	return null;
}

/** The committed review records. Empty until the owner approves ink (spec §5). */
export const INK_REVIEWS: unknown[] = (reviewsJson as { reviews: unknown[] }).reviews;
