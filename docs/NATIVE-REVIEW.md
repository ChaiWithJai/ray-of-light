# Native review: the queue and the promotion gate

Issue #13. Schema conformance is not linguistic approval — a line can parse
perfectly and still be the wrong register for a Chennai tea stall. This is the
operational path from `draft` to a defensible review claim.

## The invariant

A `reviewStatus` above `draft` anywhere in the corpus — on a line, or on a
lesson's provenance — **must** be backed by approved records in
`src/lib/content/reviews.json`: one distinct named reviewer per level
(`one-native-review` = 1, `two-native-review` = 2), each covering **every
required scope** for the item, with an **`itemHash` matching the current
text**.

**Production-enforced.** `src/lib/content/index.ts` calls
`validateReviewGate(COURSES)` at module init, immediately after the courses
are built. An unbacked claim therefore fails at app import time — the same way
a dangling construction reference does — not only in `npm test`. (The gate
module is pure and never imports `index.ts`, which is what keeps that wiring
cycle-free; tests drive the same exported function with synthetic courses and
records.)

**Hash-bound, not version-bound.** Every record carries `itemHash`: an
FNV-1a (32-bit, hex) hash of the exact reviewed text, computed by
`reviewableHash(...)` in `src/lib/content/review-gate.ts`. The gate counts a
record only while the item's current text still hashes to that value, so
editing reviewed text demotes the claim automatically — no version bump
required, and no forgotten bump can let a stale review pass. `contentVersion`
on a record remains as informational lineage only.

The reviewable text is precisely defined in code:

- **Line** (`itemKind: 'line'`): `targetScript`, `transliteration`,
  `literalEnglish`, `naturalEnglish`, joined with a fixed separator
  (`lineReviewableText`).
- **Lesson** (`itemKind: 'lesson'`): every recall exercise's
  `acceptedAnswers` and `canonicalAnswer` in order, then every line note's
  text in line order (`lessonReviewableText`).

Required scopes, split by item kind (`requiredScopes(language)` returns
`{ line, lesson }`):

| Language | Per line (`itemKind: 'line'`) | Per lesson (`itemKind: 'lesson'`) |
|---|---|---|
| French | `dialogue`, `natural-english` | `accepted-answers`, `notes` |
| Tamil | `dialogue`, `natural-english`, `transliteration`, `literal-gloss` | `accepted-answers`, `notes` |

Tamil's scaffolding layers are separate review surfaces because they are
separate competencies: a native speaker can vouch for the spoken line while
being wrong about an ISO-ish transliteration convention. `natural-english` is
required for both languages — a fluent line under a wrong translation still
teaches the error. The lesson surface exists because accepted answer sets and
just-in-time notes are teaching content too, and they live outside any single
line.

## The workflow

1. **Get the queue.** `reviewQueue('ta', COURSES)` lists every line and every
   lesson surface still needing review, with its missing scopes and the exact
   `itemHash` the resulting record must cite. Hand the reviewer the text and
   its hash together.
2. **Reviewer reviews.** Against the current text — the hash pins exactly
   which text that was.
3. **Record it.** Append to `src/lib/content/reviews.json`, one record per
   reviewer per item (see `src/lib/schemas/review.ts` for the shape,
   including the required `itemHash`). The reviewer is a named human with a
   stated qualification. `changes-requested` records are kept too — they are
   why a line changed.
4. **Apply their changes**, if any. Edits to reviewed text change its hash,
   which automatically invalidates the review for re-approval — reviews
   attach to the text itself, not to a lesson number or a version string.
5. **Promote.** Flip `reviewStatus` on the reviewed items (today that is the
   language profile in `fr.ts`/`ta.ts`, applied per-line once promotion is
   partial). If the records don't back the claim, the app fails to build and
   says so.

## What this is not

- Not a sign-off checkbox: records carry reviewer, qualification, scope,
  date, disposition, content hash and version lineage. "Reviewed by whom, for
  what, against which text" is always answerable — the hash makes "which
  text" exact.
- Not automated approval: nothing in CI can create a record. Models and
  pipelines are not reviewers (issue #1: AI-generated variants require human
  review before becoming canonical).
- Not inheritance: a review of one version of the text says nothing about an
  edited version. The hash-strict gate is what makes "pending native review"
  a closeable state instead of permanent prose.

## Audio

`audio` is a defined scope but not yet required by the gate: current audio is
a disclosed synthesized placeholder (L1), and requiring native review of
placeholder audio would be noise. When native recordings land, add `audio` to
the `line` scopes in `requiredScopes` so recordings pass through the same
gate.
