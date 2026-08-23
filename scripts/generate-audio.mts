/**
 * Generate draft sentence-level TTS audio for every canonical line.
 *
 * ⚠️ SYNTHESIZED PLACEHOLDER — macOS `say` voices (Thomas fr_FR, Vani ta_IN).
 * This exists so the audio-first preview, sentence slicing, and shadowing
 * surfaces are testable end-to-end (issue #1 L1). It is NOT the native
 * recording AC 8 ultimately requires; swap files in place when recorded.
 *
 * Output:
 *   static/audio/<lang>/<lessonId>.mp3          one file per lesson
 *   src/lib/content/audio-offsets.json          real per-line startMs/endMs
 *
 * Run: npx tsx scripts/generate-audio.mts
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { FR_LESSONS } from '../src/lib/content/fr.js';
import { TA_LESSONS } from '../src/lib/content/ta.js';

const VOICES: Record<string, string> = { fr: 'Thomas', ta: 'Vani' };
const GAP_MS = 400; // silence between sentences inside a lesson file
const RATE: Record<string, number> = { fr: 160, ta: 150 }; // slightly slower than default for learners

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
			const aiff = join(work, `${lid}-l${i + 1}.aiff`);
			execFileSync('say', ['-v', VOICES[lang], '-r', String(RATE[lang]), '-o', aiff, line.targetScript]);
			const wav = join(work, `${lid}-l${i + 1}.wav`);
			// normalize to a common format for clean concat
			execFileSync('ffmpeg', ['-y', '-v', 'error', '-i', aiff, '-ar', '44100', '-ac', '1', wav]);
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
