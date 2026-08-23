# Ray of Light

Learn French and contemporary spoken Tamil from English through an
Assimil-inspired **parallel-text interface**.

The organising idea: a bilingual spread where target and English lines stay
spatially aligned, tracked together, with support removed a layer at a time —
audio only → both columns → English covered → target covered → produced from
memory → adapted to a new situation.

POC for [issue #1](https://github.com/ChaiWithJai/ray-of-light/issues/1).

```sh
npm install
npm run dev          # http://localhost:5173
npm run check        # svelte-check
npm test             # unit + content conformance (70 tests)
npm run test:e2e     # acceptance criteria through a real browser (9 tests)
```

The end-to-end suite uses Playwright's managed Chromium by default. Install it
once after installing dependencies (CI may add `--with-deps`):

```sh
npx playwright install chromium
# Linux CI: npx playwright install --with-deps chromium
```

On a constrained runner that supplies its own Chromium-compatible executable,
set an explicit override instead of changing the checked-in configuration:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/absolute/path/to/chrome npm run test:e2e
```

Leave the variable unset on normal macOS, Linux and CI installations so
Playwright can select the browser version matching `@playwright/test`.

## The route through the product

```
/onboarding/language → /onboarding/assessment → /onboarding/plan
        ↓
      /today ──────────────► /learn/[lessonId]/[step]
        │                      preview → spread → comprehension → shadow →
        │                      translate → completion → transfer → closure
        │                      (synthesis lessons: synthesis → transfer → closure)
        │
        └──────────────────► /recall/[lessonId]/[step]
                               recall → compare → closure
```

Finishing the last step of a flow returns to Today. The four persistent
destinations are **Today · Book · Phrases · Progress**; `/settings`,
`/conversation` and `/repair` live off to the side.

Steps are routes, so back, refresh and deep links all work — but the *order*
lives in [`src/lib/flow.ts`](src/lib/flow.ts), not scattered through the route
tree. Audio always comes first and a transfer prompt always comes last, because
those are acceptance criteria rather than layout choices.

## The 22 surfaces

Every surface is a live screen driven by real data. `1f`, `1g` and `1h` are
overlays on one mounted spread rather than separate screens — the layout must not
change underneath them, which is the whole point of the spread.

| | Surface | Where it lives |
| --- | --- | --- |
| 1a | Entry assessment | `/onboarding/assessment` |
| 1b | Learning plan | `/onboarding/plan` |
| 1c | Today | `/today` |
| 1d | Audio preview | `/learn/[id]/preview` |
| 1e | Parallel spread | `/learn/[id]/spread` |
| 1f | Finger tracking | tracking layer inside `Spread` (pointer · keyboard · guide) |
| 1g | Pronunciation | overlay on the spread |
| 1h | Notes drawer | overlay on the spread, anchored to a word |
| 1i | Comprehension check | `/learn/[id]/comprehension` |
| 1j | Echo practice | `/learn/[id]/shadow` |
| 1k | Translation exercise | `/learn/[id]/translate` |
| 1l | Completion exercise | `/learn/[id]/completion` |
| 1m | Active-wave spread | `/recall/[id]/recall` |
| 1n | Answer comparison | `/recall/[id]/compare` |
| 1o | Transfer challenge | `/learn/[id]/transfer` |
| 1p | Error repair | `/repair` |
| 1q | Lesson closure | `/learn/[id]/closure`, `/recall/[id]/closure` |
| 1r | Weekly synthesis | `/learn/[id]/synthesis` (lessons 7 and 14) |
| 1s | Progress map | `/progress` |
| 1t | Phrase library | `/phrases` |
| 1u | Conversation bridge | `/conversation` |
| 1v | Settings | `/settings` |

The original design artboards stay browsable at `/surfaces/[slug]` as a visual
reference — they are fixtures, not the app.

## Layout

| Path | What it holds |
| --- | --- |
| `src/lib/schemas/` | Content, learner and scheduling schemas, runtime-validated with zod |
| `src/lib/content/` | The 28 canonical lessons (14 French, 14 Tamil) and the course index |
| `src/lib/components/app/` | `Spread` — the parallel bilingual spread, in all its states |
| `src/lib/components/ui/` | The production design system: `Shell` and semantic primitives (see `docs/DESIGN-SYSTEM.md`) |
| `src/lib/components/steps/` | One component per session step |
| `src/lib/components/wireframe/` | The sketch wireframe kit — reference-only, consumed solely by `/surfaces` |
| `src/lib/stores/profile.svelte.ts` | Local-first learner profile and evidence log |
| `data/reference/` | Sourced linguistic annotation, isolated by licence |
| `design/` | The Claude Design source the interface was built from |
| `docs/` | Architecture map, the product design system rationale, and the limitations log for issue #1 |
| `issues/` | 48 issues: 7 foundation, 22 screens, 12 data layer, 7 sourcing tickets |

## Three decisions worth knowing

**Progress is derived, never stored.** There is no completion flag anywhere.
Evidence is append-only, and each construction's state — `exposed → recognized →
recalled → stabilized → transferable` — is recomputed from that log. `stabilized`
cannot be granted by any single event; it needs retrieval on two distinct calendar
days, which is the one thing a single session can never produce. A finished lesson
whose constructions are still `exposed` shows as exactly that.

**Covering a column cannot move the layout.** Swapping text for a hatched box
changes its height, so lines would shift the moment you covered a column —
breaking the one thing the spread exists for. Text is never removed: it stays in
the DOM reserving its own space, hidden from sight and from screen readers, with
the hatch painted over it. An e2e test compares bounding boxes.

**The POC wave offsets differ from the book, deliberately.** Assimil starts the
active wave around day 50, recalling the lesson from ~49 days earlier. With 14
lessons the learner would run out of content before the active wave ever opened,
making AC 5 untestable. `POC_WAVE_CONFIG` starts it at lesson 4 with a 3-lesson
lag; `FULL_COURSE_WAVE_CONFIG` keeps the real numbers. The delay is preserved in
structure and shortened in magnitude.

## What is not built

Read [`docs/ISSUE-1-LIMITATIONS.md`](docs/ISSUE-1-LIMITATIONS.md) before assuming
anything ships. The short version:

- **No audio.** Every line is flagged `audio.pending`. The whole path exists —
  sentence offsets, chunk boundaries, time-stretched slow playback — but no native
  recordings were obtainable. See `T-01`.
- **No native review.** All content is honestly marked `reviewStatus: 'draft'`.
  This matters most for Tamil, where spoken register is exactly what a non-native
  author cannot self-check. See `T-02`, `T-03`.
- **No microphone capture.** Mic affordances are wired to UI state but do not
  record. See `T-06`.
- **Tamil morphology is thin — 27/158 forms, vs 174/184 for French.** Not a size
  problem: UD_Tamil-TTB annotates *written* news Tamil while this course teaches
  *spoken* Tamil, so the forms it lacks (`வேணும்`, `இருக்கு`, `குடுங்க`) are exactly
  the spoken ones. See `T-05`.

## Content and licensing

Canonical lessons are **original and owned**. Assimil is the interaction reference
only; no Assimil text is reproduced. Every line carries `source`, `license` and
`reviewStatus`, and the schema refuses content without them.

Sourced reference data is isolated in `data/reference/` with its own
[`LICENSE.md`](data/reference/LICENSE.md), so the share-alike boundary is explicit
rather than accidental.

### ⚠️ This project is non-commercial, and one dependency requires it to stay that way

The Tamil morphology lexicon is derived from UD_Tamil-TTB, which is
**CC BY-NC-SA 3.0**. Non-commercial use is exactly what that licence grants, so it
is used here — but it is a one-way door. **If this ever ships commercially:**

1. Delete `data/reference/ta/`.
2. Remove the Tamil branch from `src/lib/morphology.ts`.
3. Re-source Tamil morphology, or complete `T-05` (native annotation of our own
   lines, which removes the encumbrance entirely).

`hasCommercialRestriction('ta')` returns `true` so this is queryable in code, and
a test asserts the restriction stays recorded. French (CC BY-SA 4.0) has no such
limit.
