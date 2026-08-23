# Native review: the queue and the promotion gate

Issue #13. Schema conformance is not linguistic approval — a line can parse
perfectly and still be the wrong register for a Chennai tea stall. This is the
operational path from `draft` to a defensible review claim.

## The invariant

A `reviewStatus` above `draft` anywhere in the corpus **must** be backed by
approved records in `src/lib/content/reviews.json` — one distinct named
reviewer per level (`one-native-review` = 1, `two-native-review` = 2), each
covering **every required scope** for the language, **at the current
`CONTENT_VERSION`**. `validateReviewGate()` enforces this in `npm test`; an
unbacked claim is a build failure.

Required scopes per line:

| Language | Scopes a reviewer must cover |
|---|---|
| French | `dialogue` |
| Tamil | `dialogue`, `transliteration`, `literal-gloss` |

Tamil's scaffolding layers are separate review surfaces because they are
separate competencies: a native speaker can vouch for the spoken line while
being wrong about an ISO-ish transliteration convention.

## The workflow

1. **Get the queue.** `reviewQueue('ta')` lists every line still needing
   review with its missing scopes. This is what you hand a reviewer.
2. **Reviewer reviews.** Against the current text — note `CONTENT_VERSION`
   from `src/lib/content/index.ts`.
3. **Record it.** Append to `src/lib/content/reviews.json`, one record per
   reviewer per item (see `src/lib/schemas/review.ts` for the shape). The
   reviewer is a named human with a stated qualification. `changes-requested`
   records are kept too — they are why a line changed.
4. **Apply their changes**, if any. Content edits bump `CONTENT_VERSION`,
   which automatically invalidates the review for re-approval — reviews attach
   to a version, not to a lesson number.
5. **Promote.** Flip `reviewStatus` on the reviewed items (today that is the
   language profile in `fr.ts`/`ta.ts`, applied per-line once promotion is
   partial). If the records don't back the claim, the build says so.

## What this is not

- Not a sign-off checkbox: records carry reviewer, qualification, scope,
  date, disposition and version. "Reviewed by whom, for what, against which
  text" is always answerable.
- Not automated approval: nothing in CI can create a record. Models and
  pipelines are not reviewers (issue #1: AI-generated variants require human
  review before becoming canonical).
- Not inheritance: a review of v1 text says nothing about v2 text. The
  version-strict gate is what makes "pending native review" a closeable state
  instead of permanent prose.

## Audio

`audio` is a defined scope but not yet required by the gate: current audio is
a disclosed synthesized placeholder (L1), and requiring native review of
placeholder audio would be noise. When native recordings land, add `audio` to
`requiredScopes` so recordings pass through the same gate.
