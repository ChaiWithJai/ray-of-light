# Mobile method spike — the mobile-native form of parallel reading

**Status:** decision doc (Design R1 · Phase 0). **Blocks:** all mobile lanes (#34 #39 #42 #43 mobile portions). Refs #40, #1.

---

## 1. The question, in the owner's words

> "the parallel spread is designed for the user using their fingers to read both
> at the same time and process the visual information while hearing it or trying
> to say it themselves"

> "what mobile application development would do to handle porting our
> instructional design theory about parallel reading… by pointing your finger to
> read. but is that really tenable for mobile."

> "the user wants no scrolling when in this part — we should focus on
> sequentially moving via swiping and then occasionally and sparingly… a deeper
> dive via scrolling… only when it's important to leave a lasting impression"

The desktop spread is a two-column grid of aligned pairs (`PairRow`, `Spread` in
`src/lib/components/app/spread.svelte`) tracked by a current-pair cursor with
pointer/keyboard/two-finger drivers. On a narrow portrait viewport, two columns
side-by-side collapse below legibility, and two-finger horizontal tracking
fights the OS (edge gestures, one-handed use). The question is not "how do we
shrink the spread" but "what is the mobile-native derivation of the *effect* —
joint attention across sound, target form, and meaning."

## 2. What must survive the derivation (method-fit constraints)

From `docs/architecture-map.md` and the pattern taxonomy:

- **C1 — Simultaneity, not alternation.** The method's core is a three-way
  mapping (sound ↔ form ↔ meaning) held *at the same time*, while audio plays or
  the learner shadows. Any model that forces strict ping-pong between languages
  breaks the method, it doesn't port it.
- **C2 — Swipe-sequential, no scroll** in lesson steps. Full-viewport cards;
  scroll reserved for rare deliberate deep-dives.
- **C3 — Layout-preserving support removal (D2).** The cover ladder must work on
  the mobile form without reflow: cover a representation, keep its box.
- **C4 — Anchor as effect, not gesture (D5).** `ReadingAnchor` reports "current
  pair"; multitouch may never be required. The mobile model is a new *driver* of
  the same abstraction, not a new abstraction.
- **C5 — One-handed reality.** Phone held in one hand, thumb as the only
  reliably free digit, bottom third of the screen as the comfortable zone;
  content must not sit under the thumb.
- **C6 — Audio belongs to the target line (D4).** Tapping/anchoring a pair must
  keep line-level replay reachable.

## 3. Candidate interaction models

### Model A — Thumb-anchored pair stepping ("the stacked spread")

One pair at a time fills the card as a **vertical stack**: target line above,
English below, both visible in a single fixation zone (the two lines sit within
~6–8° of visual angle, so both are processed in one glance — the vertical
equivalent of two fingers on facing columns). A **thumb rail** along the bottom
edge (or right edge, side configurable) is the anchor: press-and-hold engages
tracking, slide steps pair → pair, release stays put. The dialogue's other pairs
are not on screen; a pair-position indicator ("4 / 11") and swipe-left/right
between pairs satisfy swipe-sequential. Audio-driven mode moves the anchor
automatically (karaoke of pairs, not words), thumb press takes manual control.

- C1 ✓ strong — both representations in one gaze while audio plays; the thumb
  does what two fingers did: hold the *place*, freeing the eyes for the mapping.
- C2 ✓ native — pair stepping *is* the sequence; no scroll exists.
- C3 ✓ — cover ladder covers one line of the stack; box preserved.
- C4 ✓ — new `ReadingAnchor` driver ("thumb-rail"); keyboard/auto drivers remain.
- C5 ✓ — rail lives in the thumb zone; text lives above it, never occluded.
- C6 ✓ — tap the target line replays it; the anchored pair is "current line".
- Risk: loses the *page gestalt* — the learner never sees the whole dialogue at
  once during the spread step. Mitigation: the preview and book surfaces keep
  the full-page view; a pinch-out deep-dive (deliberate, rare — per the owner's
  scroll rule) shows the whole spread read-only.

### Model B — Alternating cover-reveal swipe

Full-viewport card shows the target line; swipe up (or tap-hold) reveals the
English beneath it; swipe left advances to the next pair. Essentially the cover
ladder as the *primary* interaction.

- C1 ✗ fatal — the two representations are never co-present by default; this is
  flashcard alternation, exactly the "sequence of steps" D4 warns against. It is
  the right shape for the **active-wave recall step**, not for parallel reading.
- C2 ✓, C5 ✓, C3 partial (reveal is a state change, not a covered box).
- Verdict: rejected as the spread's form; **adopt its grammar for mobile
  recall/compare** (state the attempt, reveal the canonical), where alternation
  is the method.

### Model C — Split-hold gesture (literal two-finger port)

Landscape or split portrait: target column top/left, English bottom/right; the
learner holds a finger (or two) on each region to link highlights, mirroring
desktop two-finger tracking.

- C1 ✓ in principle, but only while both digits are committed.
- C5 ✗ fatal — demands two hands or contorted grip; C4 ✗ — requires multitouch
  to get the core effect, which D5 explicitly forbids as a requirement.
- Verdict: rejected as the primary model. Keep as an *optional* landscape
  easter-path later, never load-bearing.

### Model D — Audio-led karaoke pair (zero-gesture baseline)

No anchor gesture at all: playback highlights the current stacked pair; the
learner just watches and listens; tap pauses/replays.

- C1 ✓ visually, but the learner's *hand* does nothing — the method's
  proprioceptive "I am holding my place" component disappears, and attention
  drifts (the same passivity the finger technique exists to prevent).
- C5 ✓✓, C2 ✓, accessibility ✓✓.
- Verdict: not the model, but **the accessible/fallback driver** inside Model A
  (it is also exactly what `single-guide` mode in settings promises).

## 4. Recommendation

**Adopt Model A — thumb-anchored pair stepping — as the mobile-native form of
parallel reading, with Model D as its no-gesture driver and Model B's grammar
reserved for the mobile recall/compare steps.**

Rationale: A is the only candidate that keeps simultaneity (C1) inside the
one-handed constraint (C5) while staying a pure driver of the existing
`ReadingAnchor` abstraction (C4) and giving the swipe-sequential rule (C2) a
natural unit — the pair. It re-derives the *effect* of finger reading (a held
place + free eyes + ears engaged) rather than the gesture. The desktop spread
and mobile stack become two renderings of the same `Spread` state machine: same
nine states, same cover ladder, same evidence events (`parallel-read` fires on
pair completion in both).

Concrete build direction:

- `Spread` gains a `layout: 'columns' | 'stack'` rendering decided by viewport,
  not a fork of the component (D1 holds: one component, states, now one state
  machine with two projections).
- New `ReadingAnchor` driver `thumb-rail` beside the existing pointer/keyboard/
  guide drivers; auto (audio-led) driver is the default until the rail is first
  touched.
- Cover states render on the stacked pair exactly as on the grid cell
  (`CoveredCell` semantics unchanged; C3).
- The cover ladder presents as the **guided stepper** from the free-toggles
  finding, one legible progression — this is doubly important on mobile where
  there is no room for two independent toggles.

## 5. What the prototype must prove (exit criteria for the spike)

Build a throwaway prototype (one lesson, French L1, real audio offsets from
`src/lib/content/audio-offsets.json`) and answer:

1. **Simultaneity holds.** With the pair stacked, does a learner actually map
   sound↔form↔meaning in one fixation, or do they read top-then-bottom serially?
   Test: cover-EN comprehension accuracy after a stacked pass vs. a desktop
   two-column pass on matched lines.
2. **The thumb rail is findable and non-occluding.** No text ever under the
   thumb; rail discoverable without copy explaining it (first-run intro from
   #36 may introduce it, but the gesture must survive forgetting the intro).
3. **Anchor↔audio coupling feels causal.** Sliding the rail re-anchors playback
   to the pair (D4); latency under ~150 ms or it reads as broken.
4. **Swipe-sequential survives an 11-line dialogue** (L1 has 11 pairs) without
   the learner feeling lost: the position indicator plus pair stepping must
   replace the page gestalt well enough that "where am I" never arises.
5. **Cover ladder legibility.** All ladder states distinguishable at a glance on
   the stack; the guided stepper prevents "what state am I in."
6. **One-handed completion.** The full spread step is completable with one
   thumb, phone in hand, including line replay and advancing to the next step.

Fail criteria: if (1) shows serial reading dominates, escalate — the fallback
direction is a *interleaved* stack (target line with English rendered as a
subordinate interlinear layer via `RepresentationStack`, D7), which trades
typographic purity for tighter coupling; that variant should be prototyped in
the same spike if time allows, since D7 already models lines as representation
layers.

## 6. Data / architecture touchpoints

- `src/lib/components/app/spread.svelte` — current-pair cursor, pointer
  drivers; the thumb-rail driver and `stack` projection land here.
- `src/lib/flow.ts` — step order unchanged; mobile affects rendering only.
- `src/lib/schemas/learner.ts` — no schema change: `parallel-read` evidence is
  emitted per completed pair in both projections.
- `src/lib/content/audio-offsets.json` — pair-level timing for the auto driver.
- Settings (`1v`): `two-finger → single-guide` becomes
  `two-finger / thumb-rail / single-guide` per form factor.

## 7. Open questions

- Rail edge: bottom vs. side, and handedness setting — decide in prototype.
- Does the pinch-out whole-spread deep-dive make round 1, or is the position
  indicator enough? (Owner's scroll rule says deep-dives must be *rare and
  deliberate*; default to deferring it.)
- Shadow step on mobile: same stack with mic affordance, or Model B alternation
  (hear → speak → reveal)? Leaning same-stack; verify in prototype.
- Tamil's extra layers (script + transliteration + literal EN, D7) deepen the
  stack; test at least one Tamil line to confirm the stack holds 4 layers.

## 8. Relationship to the other Phase 0 specs

- First-run intros (#36) introduce the thumb rail once; the **method wiki**
  (`docs/design/method-wiki.md`) hosts the "why parallel reading works" page the
  intro links to.
- The **sprite world** (`docs/design/sprite-world.md`) must respect the stack's
  full-viewport cards: sprites live in the card's chrome (step header, position
  indicator), never over the text zone.
- The mobile aside does not exist; the **Bonsai aside harness**
  (`docs/design/bonsai-aside-harness.md`) is desktop-only by design — "gives
  mobile users a reason to come to desktop."
