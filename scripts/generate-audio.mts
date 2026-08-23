/**
 * Generate sentence-level lesson audio for every canonical line — locally.
 *
 * Two engines (AUDIO_ENGINE env, issue #19):
 *
 *   mlx (default)  personal-voice zero-shot cloning via mlx-audio/OmniVoice
 *                  (scripts/audio/). Reference recordings live OUTSIDE the
 *                  repo (~/.ray-of-light/voice/); generated audio lands in the
 *                  UNTRACKED static/audio/ and must never be committed or
 *                  distributed — output scope is personal-experimental.
 *                  AUDIO_NO_CLONE=1 uses the model's default voice (smoke).
 *   say            the previous macOS `say` placeholder (Thomas/Vani) — kept
 *                  as a dependency-free fallback for pipeline testing.
 *
 * Neither engine produces the native-reviewed recording AC 8 ultimately
 * requires; provenance says so explicitly and travels with the assets.
 *
 * Output:
 *   static/audio/<lang>/<lessonId>.mp3          one file per lesson (untracked)
 *   src/lib/content/audio-offsets.json          real per-line startMs/endMs
 *   src/lib/content/audio-provenance.json       engine, consent, lineage,
 *                                               per-asset hashes, review state
 *
 * Run: npx tsx scripts/generate-audio.mts
 */
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { FR_LESSONS } from '../src/lib/content/fr.js';
import { TA_LESSONS } from '../src/lib/content/ta.js';

const ENGINE = (process.env.AUDIO_ENGINE ?? 'mlx') as 'mlx' | 'say';
const NO_CLONE = process.env.AUDIO_NO_CLONE === '1';

const VOICES: Record<string, string> = { fr: 'Thomas', ta: 'Vani' };
const GAP_MS = 400; // silence between sentences inside a lesson file
const RATE: Record<string, number> = { fr: 160, ta: 150 }; // slightly slower than default for learners

const AUDIO_PY_DIR = join(import.meta.dirname, 'audio');
const MODEL_LOCK = JSON.parse(readFileSync(join(AUDIO_PY_DIR, 'model.lock.json'), 'utf8'));

/** Synthesize one line to a WAV/AIFF at `out`; returns the produced path. */
function synthesize(lang: string, text: string, out: string): string {
	if (ENGINE === 'say') {
		const aiff = out.replace(/\.wav$/, '.aiff');
		execFileSync('say', ['-v', VOICES[lang], '-r', String(RATE[lang]), '-o', aiff, text]);
		return aiff;
	}
	const args = [join(AUDIO_PY_DIR, 'synth.py'), '--lang', lang, '--text', text, '--out', out];
	if (NO_CLONE) args.push('--no-clone');
	execFileSync(join(AUDIO_PY_DIR, '.venv', 'bin', 'python'), args, { stdio: ['ignore', 'inherit', 'inherit'] });
	return out;
}

const offsets: Record<string, { startMs: number; endMs: number }[]> = {};
const work = join(tmpdir(), 'rol-audio');
rmSync(work, { recursive: true, force: true });
mkdirSync(work, { recursive: true });

function durationMs(file: string): number {
	const out = execFileSync('ffprobe', [
		'-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file
	]).toString().trim();
	return Math.round(parseFloat(out) * 1000);
}

for (const [lang, lessons] of [['fr', FR_LESSONS], ['ta', TA_LESSONS]] as const) {
	const outDir = join(import.meta.dirname, '..', 'static', 'audio', lang);
	mkdirSync(outDir, { recursive: true });

	for (const lesson of lessons) {
		const lid = lesson.id;
		const parts: string[] = [];
		const lineOffsets: { startMs: number; endMs: number }[] = [];
		let cursor = 0;

		lesson.lines.forEach((line, i) => {
			const raw = join(work, `${lid}-l${i + 1}-raw.wav`);
			const synthesized = synthesize(lang, line.targetScript, raw);
			const wav = join(work, `${lid}-l${i + 1}-normalized.wav`);
			// normalize to a common format for clean concat
			execFileSync('ffmpeg', [
				'-y',
				'-v',
				'error',
				'-i',
				synthesized,
				'-ar',
				'44100',
				'-ac',
				'1',
				wav
			]);
			const dur = durationMs(wav);
			lineOffsets.push({ startMs: cursor, endMs: cursor + dur });
			cursor += dur + GAP_MS;
			parts.push(wav);
		});

		// concat with silence gaps
		const listFile = join(work, `${lid}.txt`);
		const silence = join(work, 'gap.wav');
		execFileSync('ffmpeg', ['-y', '-v', 'error', '-f', 'lavfi', '-i', `anullsrc=r=44100:cl=mono:d=${GAP_MS / 1000}`, silence]);
		writeFileSync(listFile, parts.map((p) => `file '${p}'\nfile '${silence}'`).join('\n'));
		const mp3 = join(outDir, `${lid}.mp3`);
		execFileSync('ffmpeg', ['-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', listFile, '-codec:a', 'libmp3lame', '-q:a', '4', mp3]);

		offsets[lid] = lineOffsets;
		console.log(`${lid}: ${lesson.lines.length} lines, ${(cursor / 1000).toFixed(1)}s -> ${mp3}`);
	}
}

writeFileSync(
	join(import.meta.dirname, '..', 'src', 'lib', 'content', 'audio-offsets.json'),
	JSON.stringify(offsets, null, '\t') + '\n'
);
console.log('wrote src/lib/content/audio-offsets.json');

// Provenance travels with the assets (issue #19 occurrence B): not just the
// engine, but consent, private-input handling, model lineage, output scope,
// per-asset hashes, and review state. Rewritten by whichever pipeline runs.
const assetHashes: Record<string, string> = {};
for (const lid of Object.keys(offsets)) {
	const lang = lid.slice(0, 2);
	const file = join(import.meta.dirname, '..', 'static', 'audio', lang, `${lid}.mp3`);
	assetHashes[lid] = createHash('sha256').update(readFileSync(file)).digest('hex');
}

const provenance =
	ENGINE === 'say'
		? {
				synthesized: true,
				engine: 'macOS say',
				voices: { fr: 'Thomas (fr_FR)', ta: 'Vani (ta_IN)' },
				outputScope: 'placeholder',
				review: 'none',
				assets: assetHashes,
				note: 'Draft placeholder pending native recordings — see docs/ISSUE-1-LIMITATIONS.md L1.'
			}
		: {
				synthesized: true,
				engine: 'mlx-audio (local Apple Silicon inference)',
				voices: NO_CLONE
					? { fr: 'model default (unreviewed)', ta: 'model default (unreviewed)' }
					: {
							fr: 'personal owner zero-shot clone (unreviewed)',
							ta: 'personal owner zero-shot clone (unreviewed)'
						},
				model: {
					id: MODEL_LOCK.model,
					revision: MODEL_LOCK.revision,
					package: `${MODEL_LOCK.package}==${MODEL_LOCK.packageVersion}`,
					license: MODEL_LOCK.modelLicense
				},
				voice: NO_CLONE
					? { kind: 'model-default', note: 'smoke run — no personal reference used' }
					: {
							kind: 'personal-zero-shot-clone',
							consent:
								'Owner-provided reference recordings of their own voice; personal, noncommercial use authorized by the owner for this project (issue #19).',
							privateInputs:
								'Reference audio/transcript live outside the repo (~/.ray-of-light/voice/), are never committed, logged, or uploaded; all inference is local.'
						},
				outputScope:
					'personal-experimental — generated audio is untracked and must never be committed, distributed, or presented as native speech',
				review: 'none — voice similarity does not establish native pronunciation; see docs/NATIVE-REVIEW.md',
				assets: assetHashes,
				note: 'Locally generated; not the native-reviewed recording AC 8 requires.'
			};

writeFileSync(
	join(import.meta.dirname, '..', 'src', 'lib', 'content', 'audio-provenance.json'),
	JSON.stringify(provenance, null, '\t') + '\n'
);
console.log('wrote src/lib/content/audio-provenance.json');
