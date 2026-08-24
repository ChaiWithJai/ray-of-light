/**
 * Emit the sprite cast manifest — mechanically, never by hand (issue #46 §5).
 *
 * Walks the authored lesson declarations in `fr.ts` / `ta.ts` and writes
 * `src/lib/content/sprites.json`: every construction id in both curricula,
 * its label/gloss, its lesson of first appearance, and its deterministic
 * identity seed. A conformance test (`src/lib/content/sprites.test.ts`) fails
 * whenever the committed manifest and the curriculum disagree, so the cast can
 * never drift from the content.
 *
 * Phase S0 ships the parametric tier only: sprites are rendered from the seed
 * by `<Sprite>` at runtime, so entries carry no asset paths yet. When the
 * local-generation ink pass lands (spec §5 option 1, owner-review gated),
 * per-state asset paths join each entry here.
 *
 * Run: npx tsx scripts/generate-sprite-manifest.mts
 */
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { FR_LESSONS } from '../src/lib/content/fr.js';
import { TA_LESSONS } from '../src/lib/content/ta.js';
import { SPRITE_STAGES, spriteIdentity } from '../src/lib/sprites.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'src', 'lib', 'content', 'sprites.json');

type CastEntry = {
	label: string;
	gloss: string;
	/** Lesson id where the construction is introduced (first appearance). */
	introducedIn: string;
	/** FNV-1a of the id — fixes the character's identity forever. */
	seed: number;
	/** Muted accent hue derived from the seed, recorded for inspection. */
	hue: number;
};

function castOf(lessons: { constructions: { id: string; label: string; gloss: string; introducedIn: string }[] }[]) {
	const cast: Record<string, CastEntry> = {};
	for (const lesson of lessons) {
		for (const construction of lesson.constructions) {
			// First declaration wins; `validateCourse` already guarantees any
			// re-declaration is verbatim, so this is a plain de-dup, not a merge.
			if (cast[construction.id]) continue;
			const identity = spriteIdentity(construction.id);
			cast[construction.id] = {
				label: construction.label,
				gloss: construction.gloss,
				introducedIn: construction.introducedIn,
				seed: identity.seed,
				hue: identity.hue
			};
		}
	}
	// Stable key order for reviewable diffs.
	return Object.fromEntries(Object.entries(cast).sort(([a], [b]) => a.localeCompare(b)));
}

const manifest = {
	$generatedBy: 'scripts/generate-sprite-manifest.mts — do not edit by hand',
	// D8 provenance: the parametric tier is project-original geometry, no
	// model in the loop, nothing awaiting owner review.
	provenance: {
		tier: 'parametric-svg',
		source: 'project-original',
		license: 'project',
		review_status: 'substrate-no-ink-layer'
	},
	stages: SPRITE_STAGES,
	cast: {
		fr: castOf(FR_LESSONS),
		ta: castOf(TA_LESSONS)
	}
};

writeFileSync(OUT, JSON.stringify(manifest, null, '\t') + '\n');

const counts = Object.entries(manifest.cast)
	.map(([language, cast]) => `${language}: ${Object.keys(cast).length}`)
	.join(', ');
console.log(`sprites.json written (${counts})`);
