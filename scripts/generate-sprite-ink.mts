/**
 * Generate per-character ink assets over the parametric substrate
 * (issue #46, phase S2; spec §5 — "2 as the substrate, 1 as the skin").
 *
 * Writes `static/sprites/ink/{constructionId}.png` — an UNTRACKED directory
 * (gitignored on purpose): generated ink never ships by being generated. It
 * ships only after the owner reviews it and records an approval in the
 * tracked `src/lib/content/sprite-ink-reviews.json` (the D8 gate,
 * `src/lib/sprite-ink.ts`); until then every surface renders the substrate.
 *
 * Engines are pluggable behind one interface:
 *  - `stylize` (default): deterministic local fallback — rasterises the
 *    exact substrate SVG the app draws (`src/lib/sprite-render.ts`) via
 *    sharp. No model, no network; proves the pipeline end to end.
 *  - `gemini`: image generation via the Gemini API. Reads GEMINI_API_KEY
 *    from the environment and says so plainly when it is absent.
 *
 * Usage:
 *   npx tsx scripts/generate-sprite-ink.mts [--engine stylize|gemini]
 *       [--out <dir>] <constructionId> [...more ids]
 *
 * After generating, the owner-approval workflow is documented in
 * docs/design/sprite-world.md §Status.
 */
import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import manifest from '../src/lib/content/sprites.json' with { type: 'json' };
import { spriteMarkup } from '../src/lib/sprite-render.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DEFAULT_OUT = join(ROOT, 'static', 'sprites', 'ink');

/** One PNG per construction id, rendered at the standing `recalled` stage. */
const INK_STAGE = 'recalled' as const;
const INK_SIZE = 512;

type CastEntry = { label: string; gloss: string };

/* -------------------------------------------------------------------------- */
/* Engine interface                                                            */
/* -------------------------------------------------------------------------- */

export type InkEngine = {
	name: string;
	/** `true` when usable, otherwise a plain-language reason it is not. */
	available(): true | string;
	/** PNG bytes for one character. */
	render(constructionId: string, entry: CastEntry): Promise<Buffer>;
};

/** Deterministic local fallback: rasterise the substrate the app draws. */
const stylizeEngine: InkEngine = {
	name: 'stylize',
	available: () => true,
	async render(constructionId) {
		const { default: sharp } = await import('sharp');
		// Concrete paper-and-ink colors: a rasteriser has no theme stylesheet.
		const svg = spriteMarkup(constructionId, INK_STAGE, {
			size: INK_SIZE,
			inkColor: '#4a4437',
			faintColor: '#a39a86'
		});
		return sharp(Buffer.from(svg), { density: 300 }).png().toBuffer();
	}
};

/** Gemini image generation (structure per the Gemini API; key from env). */
const geminiEngine: InkEngine = {
	name: 'gemini',
	available: () =>
		process.env.GEMINI_API_KEY
			? true
			: 'GEMINI_API_KEY is not set in this environment. Export it and re-run, or use --engine stylize for the deterministic local fallback.',
	async render(constructionId, entry) {
		const model = process.env.GEMINI_IMAGE_MODEL ?? 'gemini-2.5-flash-image';
		const prompt =
			'A small hand-inked margin character on plain paper, in the style of quiet ' +
			'sketchbook marginalia: thin ink lines, one muted accent color, no background, ' +
			'no text, calm and still. The character embodies the phrase pattern ' +
			`"${entry.label}" (${entry.gloss}). Standing posture, gentle expression, ` +
			'roughly square composition.';
		const response = await fetch(
			`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-goog-api-key': process.env.GEMINI_API_KEY!
				},
				body: JSON.stringify({
					contents: [{ parts: [{ text: prompt }] }],
					generationConfig: { responseModalities: ['IMAGE'] }
				})
			}
		);
		if (!response.ok) {
			throw new Error(`Gemini API error ${response.status}: ${await response.text()}`);
		}
		const payload = (await response.json()) as {
			candidates?: { content?: { parts?: { inlineData?: { data?: string } }[] } }[];
		};
		const data = payload.candidates
			?.flatMap((candidate) => candidate.content?.parts ?? [])
			.find((part) => part.inlineData?.data)?.inlineData?.data;
		if (!data) throw new Error(`Gemini returned no image for ${constructionId}`);
		return Buffer.from(data, 'base64');
	}
};

export const ENGINES: Record<string, InkEngine> = {
	stylize: stylizeEngine,
	gemini: geminiEngine
};

/* -------------------------------------------------------------------------- */
/* CLI                                                                         */
/* -------------------------------------------------------------------------- */

function castEntry(constructionId: string): CastEntry | undefined {
	for (const cast of Object.values(manifest.cast) as Record<string, CastEntry>[]) {
		if (cast[constructionId]) return cast[constructionId];
	}
	return undefined;
}

async function main() {
	const args = process.argv.slice(2);
	let engineName = 'stylize';
	let outDir = DEFAULT_OUT;
	const ids: string[] = [];
	for (let i = 0; i < args.length; i += 1) {
		if (args[i] === '--engine') engineName = args[++i] ?? '';
		else if (args[i] === '--out') outDir = args[++i] ?? DEFAULT_OUT;
		else ids.push(args[i]);
	}

	const engine = ENGINES[engineName];
	if (!engine) {
		console.error(`Unknown engine "${engineName}". Available: ${Object.keys(ENGINES).join(', ')}`);
		process.exit(1);
	}
	const availability = engine.available();
	if (availability !== true) {
		console.error(`Engine "${engine.name}" is not available: ${availability}`);
		process.exit(1);
	}
	if (ids.length === 0) {
		console.error(
			'No construction ids given.\nUsage: npx tsx scripts/generate-sprite-ink.mts [--engine stylize|gemini] [--out <dir>] <constructionId> [...]'
		);
		process.exit(1);
	}

	mkdirSync(outDir, { recursive: true });
	for (const id of ids) {
		const entry = castEntry(id);
		if (!entry) {
			console.error(`"${id}" is not in the sprite manifest (src/lib/content/sprites.json); skipping.`);
			process.exitCode = 1;
			continue;
		}
		const png = await engine.render(id, entry);
		const path = join(outDir, `${id}.png`);
		writeFileSync(path, png);
		const sha256 = createHash('sha256').update(png).digest('hex');
		console.log(`${id}: ${path} (${png.length} bytes, engine ${engine.name})`);
		console.log(`  assetSha256: ${sha256}`);
	}
	console.log(
		'\nGenerated ink does NOT render in the app yet. To ship an asset, review it and add an\napproved record (with the assetSha256 above) to src/lib/content/sprite-ink-reviews.json —\nsee docs/design/sprite-world.md §Status for the workflow.'
	);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
