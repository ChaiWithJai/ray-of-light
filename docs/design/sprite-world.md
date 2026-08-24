# Sprite world — time, days, and constructions as characters

**Status:** spec (Design R1 · Phase 0). Refs #46, #42 (engagement scaffolding), #1.

---

## 1. Intent, in the owner's words

> "time is a concept that I personally play with a lot. could we create sprites"

> "time and days should have sprites and maybe a character world"

> "if this is an entity then we should also have sprites for constructions and
> the specific constructions in our curriculums"

And the binding constraint, from D10 and the copy-review verdicts: the owner
removed even the *copy* that mentioned streaks and confetti ("No streaks, no
confetti" — struck as unhelpful). This is **a world inside the calm method,
never gamification chrome**. No streaks, no confetti, no scores, no XP, no
collection pressure. The sprite world is the *expressive counterpart* of
engagement scaffolding (#42): it gives the app's real entities a face, and its
only currency is the same evidence-derived truth the rest of the product runs
on.

## 2. What the world is over — the app's real entities

The world personifies entities that **already exist in the data model**. Nothing
is invented for the sprites to represent.

| Entity | Where it lives | Sprite role |
| --- | --- | --- |
| A construction | lesson-level `constructions` tuples in `src/lib/content/fr.ts` / `ta.ts`; stable kebab-case ids (`je-voudrais`, `vanakkam`) | A **character** the learner builds capability with |
| Capability state | `deriveConstructionState` over the evidence log (`src/lib/schemas/learner.ts`): `exposed → recognized → recalled → stabilized → transferable` | The character's **growth stage** |
| The day | `planToday().dayNumber` (`src/lib/schemas/schedule.ts`) | A **time sprite** carrying Today's day counter |
| Plan duration | onboarding plan (`1b`), wave config | Time sprites at plan scale (the journey's length made visible) |
| The two waves | passive/active wave in the scheduler | The world's **weather/day-night rhythm**: the same characters return in a different light in the active wave |
| Resurface queue | `deriveResurfaceQueue` | **Who is due**: the characters knocking |

Constructions are the cast. There are on the order of **~63 unique construction
ids across the two curricula** (French: `fr-*`, e.g. `bonjour-politesse`,
`je-voudrais`, `quantite-de`; Tamil: `ta-*`, e.g. `vanakkam`, `enakku-venum`).
The exact roster is mechanically derivable — a build step must emit it (see §5)
rather than anyone hand-maintaining a list.

## 3. Art direction principles

1. **Calm first.** Sprites are small, still by default, and quiet. Motion only
   on state *transition* (a single, slow settle — no loops, no bouncing idle
   animations competing with reading).
2. **Match the sketch skin.** The app is sketch-skinned (`SketchCard`,
   hand-drawn affordances). Sprites are hand-inked line characters with at most
   one muted accent color, as if drawn in the margin of the book — marginalia,
   not mascots.
3. **Growth is honest and legible.** A sprite's form encodes its capability
   state and nothing else. Five stages + a "not yet met" outline state. Growth
   language: posture, completeness of the ink, a detail added per stage (an
   outline → filled → standing → rooted → in motion). **No celebration frames.**
   Reaching `transferable` looks like *maturity*, not fireworks.
4. **Character follows meaning.** Each construction's sprite derives its
   personality from what the construction *does*: `je-voudrais` (polite
   request) bows slightly; `combien` (asking how much) carries scales;
   `ca-fait` (totals) tallies. Time sprites play with the owner's stated
   fascination: the day sprite ages through the plan; synthesis days (every
   7th) are the time sprite gathering the week's cast.
5. **Never over the text.** Sprites live in chrome: card corners, headers,
   asides, the progress map. The reading zone (spread, stacked pair on mobile —
   see `docs/design/mobile-method-spike.md`) is sprite-free.
6. **The world is optional depth.** A learner who never notices the world loses
   nothing; every sprite surface degrades to the plain text it decorates.

## 4. Where sprites appear, per screen

| Surface | Appearance |
| --- | --- |
| Progress map (`1s`, `/progress`) | Becomes **the cast**: a grid of construction sprites at their current growth stage, replacing/augmenting `StageMeter` rows. Unmet constructions are faint outlines — the future visible without being a checklist. Tapping a sprite shows its evidence honestly (state + what earned it + what would advance it). |
| Today (`1c`, `/today`) | The **day sprite** carries `dayNumber` (fixes live with the state-truth bug — the sprite renders the *derived* day, one source of truth). Resurface card shows **who's due**: the due constructions' sprites, small, waiting — the queue from `deriveResurfaceQueue` given faces. |
| Transfer step (`1o`) | The prompt is **fronted by the construction's sprite**: "you own this one" — activating prior knowledge (the owner's transfer note: "help them recall prior knowledge, and understand what the schema of construction means"). The sprite links to its wiki page (`docs/design/method-wiki.md`). |
| Plan (`1b`) | Duration options carry time sprites at plan scale — the journey's length as a character, replacing the removed self-referential copy with something that *shows* pacing instead of narrating it. |
| Lesson closure (`1q`) | The constructions worked today appear at their (possibly newly grown) stages — a quiet roll call, not a reward screen. Self-rating stays the focus (D10: calibration, not celebration). |
| Session shell / "game mode" | Pairs with the mode-identity finding: entering a lesson enters the world's space (the preview's dark stage); sprites of the lesson's constructions appear in the step header at small scale. |
| Weekly synthesis (`1r`) | The week's cast assembled — synthesis *is* reassembly, and the sprites make that literal. |

## 5. Sprite asset pipeline (~63 sprites × 6 states, generated and managed)

Constructions have stable ids, so sprites key off `language:constructionId`.

**Manifest, not convention.** A build script (`scripts/generate-sprite-manifest.mts`)
walks `fr.ts`/`ta.ts` lesson declarations and emits
`src/lib/content/sprites.json`: every construction id, its gloss, its lesson of
first appearance, and the asset paths per state. A conformance test (alongside
`content.test.ts`) fails when a construction has no sprite entry or a sprite
has no construction — the cast can never drift from the curriculum.

**Generation options (pick per D8's provenance rule — every asset carries
`source`, `license`, `review_status`):**

1. **Local generation pipeline (preferred for round 1).** A local image model
   (the owner runs local model tooling already; any local diffusion/image
   checkpoint works — no hosted API, matching the #19 privacy posture) driven
   by a prompt template: base character sheet prompt + per-construction
   personality line (from the gloss in the tuple) + per-state modifier, fixed
   seed derived from the construction id so regeneration is deterministic.
   Output → SVG-traced or PNG → owner reviews → committed as owned assets with
   provenance `source: 'generated-local'`, `review_status: 'owner-approved'`.
   ~63 × 6 ≈ 380 images; batchable overnight.
2. **Parametric SVG (cheapest honest option).** One hand-drawn base character
   as SVG with layered parts; growth stages toggle layers; per-construction
   identity from a small set of accessories + accent hue hashed from the id.
   Fully deterministic, tiny payload, no model in the loop — but less
   character. Viable as the **fallback/placeholder tier** while option 1 assets
   are reviewed.
3. **Commissioned art.** The long-term D8-consistent answer for a shipped
   course (owned, reviewed); out of scope for round 1.

Recommended: **2 as the substrate, 1 as the skin** — parametric SVG defines the
stage grammar (so state expression is uniform and honest by construction), the
local pipeline generates per-character ink that slots into it. New curricula
(new construction ids) get placeholder-tier sprites automatically; generated
ink follows.

**Asset management:** sprites ship in `static/sprites/{language}/{id}/{state}.svg`,
prefetched with the lesson (D9 — a lesson session must not fetch mid-ritual),
listed in the manifest, provenance in the manifest entry.

## 6. Capability-state expression — honesty rules

- A sprite's stage is **always** `deriveConstructionState(events)` — rendered
  from the same derivation the progress map uses. No component ever advances a
  sprite; there is nothing to desync (mirrors D3: derived, never stored).
- `stabilized` requires distinct days; the sprite therefore *cannot* grow twice
  in one session past `recalled` — the world inherits the method's pacing
  automatically, which is precisely the anti-gamification guarantee.
- Misses are not shame states. A construction in the resurface queue shows as
  the sprite *present and waiting* on Today — proximity, not damage. There is
  no "withered" art: the state machine has no regression, so neither does the
  world.
- Transitions animate once, at the moment the qualifying evidence lands
  (e.g. after compare confirms an unhinted `recall-correct`), slow and small.
  No sound. No modal.

## 7. Phased build plan

- **Phase S0 (with Phase 1 code lanes):** manifest generator + conformance
  test + parametric SVG substrate with the 6-state grammar. Sprites appear in
  exactly two places: progress map cast and Today's resurface card. Proves the
  derivation wiring with zero art risk.
- **Phase S1:** time sprites (Today day counter, plan durations) — lands with
  #42 engagement scaffolding since they replace removed copy on the same
  screens.
- **Phase S2:** transfer-prompt sprite + closure roll call + wiki links from
  sprites; local-generation ink pass over the substrate, owner review gate.
- **Phase S3 (post round 2):** session-shell "game mode" integration, synthesis
  assembly scene. Mobile placements gated on #40's stack layout (chrome-only).

## 8. Data / architecture touchpoints

- `src/lib/content/fr.ts`, `ta.ts`, `define.ts` — source of the cast roster.
- `src/lib/schemas/learner.ts` — `deriveConstructionState`, the only stage
  authority.
- `src/lib/schemas/schedule.ts` — `planToday` (day sprite), `deriveResurfaceQueue`
  (who's due).
- `src/lib/components/ui/stage-meter.svelte` — the component the cast augments.
- New: `scripts/generate-sprite-manifest.mts`, `src/lib/content/sprites.json`,
  `static/sprites/**`, a `<Sprite construction state size />` component.

## 9. Open questions

- One shared character *species* across languages, or a French cast and a Tamil
  cast with distinct visual dialects? (Leaning distinct accent, shared grammar.)
- Do wave phases (passive vs. active) recolor the world (day/night), or is that
  round-2 mode-shell territory? Deferred to #43.
- Should the entry assessment's placement constructions (met for scheduling,
  no evidence — see `planToday`'s `entryLessonIndex` note) render as outlines
  or as a distinct "known from before" mark? Honesty says outline; test copy.
- Naming: do sprites get names, or does the construction's own form
  (*je voudrais* as the name) stay the label? Leaning the latter — the language
  is the character.

## 10. Cross-references

- **Method wiki** (`docs/design/method-wiki.md`): each sprite links to its
  construction's wiki entry; the capability-ladder page uses the stage grammar
  as its illustration.
- **Mobile spike** (`docs/design/mobile-method-spike.md`): sprites confined to
  card chrome on the stacked mobile layout.
- **Engagement scaffolding (#42)** and **first-run intros (#36)**: the world is
  the expressive layer those lanes hang feedback on; the cast is introduced
  once, progressively, not explained per screen.
