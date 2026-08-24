/**
 * Ink pipeline, node side (issue #46, phase S2; D8).
 *
 *  - integrity: every committed review record in
 *    `src/lib/content/sprite-ink-reviews.json` must parse and point at an
 *    on-disk asset whose bytes hash to exactly what was approved — reviewed
 *    ink cannot drift, and an approved record without its asset fails the
 *    suite instead of shipping a broken image;
 *  - smoke: the deterministic `stylize` fallback engine produces a valid PNG
 *    for one construction id, end to end through the CLI.
 *
 * Lives in `scripts/` (with the pipeline) because it needs node builtins the
 * app's DOM tsconfig does not know; the pure gate tests are
 * `src/lib/sprite-ink.test.ts`.
 */
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, describe, expect, it } from 'vitest';

import { INK_REVIEWS, SpriteInkReview } from '../src/lib/sprite-ink.js';
import { spriteCastEntry } from '../src/lib/content/sprite-cast.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const FIXTURE_ID = 'fr.je-voudrais';

describe('committed ink review records', () => {
	it('all parse, and each approved asset exists on disk with the approved bytes', () => {
		for (const raw of INK_REVIEWS) {
			const record = SpriteInkReview.parse(raw);
			const path = join(ROOT, 'static', 'sprites', 'ink', `${record.constructionId}.png`);
			expect(existsSync(path), `${record.constructionId}: approved ink asset missing`).toBe(true);
			const sha256 = createHash('sha256').update(readFileSync(path)).digest('hex');
			expect(sha256, `${record.constructionId}: asset bytes differ from the approved hash`).toBe(
				record.assetSha256
			);
			expect(spriteCastEntry(record.constructionId), 'approved ink for a non-cast id').toBeDefined();
		}
	});
});

describe('ink pipeline smoke (fallback engine, end to end)', () => {
	const outDir = mkdtempSync(join(tmpdir(), 'sprite-ink-'));
	afterAll(() => rmSync(outDir, { recursive: true, force: true }));

	it('produces a valid PNG for one construction id', () => {
		execFileSync(
			'npx',
			['tsx', 'scripts/generate-sprite-ink.mts', '--engine', 'stylize', '--out', outDir, FIXTURE_ID],
			{ cwd: ROOT, stdio: 'pipe', timeout: 120_000 }
		);
		const png = readFileSync(join(outDir, `${FIXTURE_ID}.png`));
		// PNG magic bytes.
		expect([...png.subarray(0, 8)]).toEqual([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
		expect(png.length).toBeGreaterThan(1000);
	});
});
