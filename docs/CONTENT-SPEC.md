# Content authoring spec — issue #1 lessons (for parallel agents)

Repo: `/Users/jaybhagat/projects/ray-of-light`, branch `claude-mac/issue-1-content` (already checked out). Do NOT commit, push, or touch files outside the ones assigned to you.

**FIRST read `src/lib/schemas/content.ts`.** Every lesson you write must satisfy the zod `Lesson` schema exactly, including all `superRefine` rules. Re-read them; they are enforced.

## File format

One file per lesson: `src/lib/content/<lang>/lesson-NN.ts` (`lang` = `fr` or `ta`, NN zero-padded).

```ts
import type { Lesson } from '../../schemas/content';

export const lesson: Lesson = { ... };
```

## Conventions

- Lesson id: `fr-01`, `ta-07`, etc. `index` = NN as number.
- Line ids: `fr-01-l01` … ; `lessonId` and `language` must match the lesson.
- Construction ids are **semantic and stable**: e.g. `fr-je-voudrais-noun`, `ta-veendum-want`. `introducedIn` = the lesson id where it first appears.
- `register: 'spoken'` throughout (Tamil may use a `'formal'` line ONLY where the spoken/formal contrast is itself the teaching point). French: omit `dialect`. Tamil: `dialect: 'chennai'`.
- `speaker`: short character names (e.g. Marie / Antoine; Priya / Arun).
- Audio (placeholder paths, real bytes come later — this is the documented L1 limitation):
  `normalUrl: '/audio/<lang>/<lessonId>.mp3'`, `speakerId: '<lang>-speaker-1'`, plausible increasing `startMs`/`endMs` per line (~2–5s per line, contiguous). `chunks`: include for 2–3 longer lines (phrase-level labels).
- Every line: `source: 'original'`, `license: 'CC-BY-4.0'`, `reviewStatus: 'draft'`. Lesson `provenance`: same values.
- `level`: `'A0'` for lessons 1–7, `'A1'` for 8–14.

## Regular lessons (all except 7 and 14)

- 8–12 dialogue lines forming ONE coherent situational dialogue (natural, contemporary, original — do not copy Assimil or any textbook).
- ≥3 declared constructions; every construction id referenced by any line or exercise MUST be declared in `lesson.constructions`.
- Exercises: ≥1 `comprehension` (with `lineId`, ≥3 options, correct `answerIndex`), ≥1 `recall` (English cue → target production; `acceptedAnswers` includes reasonable variants; 1–2 `hints`), ≥1 `completion` (`template` contains `___`), ≥1 `transfer` (novel situation + `useConstruction` + `exemplar`).
- 1–3 `notes` per lesson attached to specific lines (grammar/culture/pronunciation; Tamil also morphology), `anchor` = substring of `targetScript`.

## Synthesis lessons (7 and 14)

- `kind: 'synthesis'`. No new constructions. Recombine material from the prior six lessons into a longer scene (5–8 lines is fine; exempt from the 8-line floor).
- Re-declare (verbatim id + label) each earlier construction you reference, with `introducedIn` pointing at its ORIGINAL lesson id (see the topic table for what earlier lessons cover; pick plausible ids like `fr-est-ce-que-question` and note them in your report so the validator can reconcile).
- Must include ≥1 `transfer` exercise. `comprehension`/`recall` optional but welcome.

## Tamil specifics (AC 9)

- `targetScript`: Tamil script, contemporary educated **spoken** Tamil (Chennai-oriented) — e.g. spoken forms like இருக்கு/வேணும், not literary இருக்கிறது/வேண்டும்.
- Every line REQUIRES `transliteration` (ISO-ish practical Latin) and `literalEnglish` (word-order-revealing gloss). `naturalEnglish` is the idiomatic translation.
- Add `morphology` notes where English word order obscures the construction.

## Topic map (issue #1)

1 Greetings & introductions · 2 Ordering tea/coffee · 3 Numbers & paying · 4 Asking where something is · 5 Family & relationships · 6 Daily routine · 7 REVIEW (synthesis) · 8 Likes & dislikes · 9 Making plans · 10 Time & schedules · 11 Transportation · 12 Asking for help · 13 Describing how one feels · 14 REVIEW + short performance (synthesis)

## Verification (required before you finish)

Run `cd /Users/jaybhagat/projects/ray-of-light && npx tsc --noEmit 2>&1 | grep 'content/<lang>/lesson'` — your files must produce zero TypeScript errors (ignore errors in files that are not yours).

Report back: files written, construction ids you declared (id → label), and any deviations.
