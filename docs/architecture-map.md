# Architecture map — spec → components → directions

This maps the product model (digital bilingual book, Assimil two-wave method,
French + Tamil for an English speaker) onto the component architecture, and states
the directions that follow from it.

Source of the interaction design: `project/Surface Areas Wireframes.dc.html`.
Current implementation: `app/`.

---

## 0. The governing rule

> **What support is visible now, and what support should disappear next?**

Every interface decision answers that question. Support removal is the product's
core mechanic, so it must be a **first-class piece of state**, not an emergent
property of which page you happen to be on.

---

## 1. Ten directions

### D1 — The spread is one component with states, not many screens

The design canvas draws 1d, 1e, 1f, 1i and 1m as five artboards. They are not five
screens. They are **one bilingual spread in five states**, with support progressively
removed. The canvas had to draw them separately; the product must not build them
separately.

| Canvas artboard | Spread state | Target | Source | Audio |
| --- | --- | --- | --- | --- |
| 1d Audio preview | `sound-exposure` | covered | covered | playing |
| — | `meaning-orientation` | covered | visible | playing |
| 1e Parallel spread | `parallel-reading` | visible | visible | playing |
| — | `target-reading` | visible | covered | optional |
| 1j Echo practice | `shadowing` | visible | covered | segmented |
| 1i Comprehension check | `comprehension` | visible | covered | optional |
| 1m Active-wave spread | `active-retrieval` | covered | visible | off initially |
| 1n Answer comparison | `comparison` | learner + canonical | visible | available |
| 1o Transfer challenge | `transfer` | new prompt | situational | optional |

Two of the nine states (`meaning-orientation`, `target-reading`) have **no artboard
in the design**. They fall out of the state table and need building regardless —
evidence that the state model, not the artboard count, is the real spec.

**Direction:** build `<Spread state={...} />`. Support visibility is a prop.
Navigating from parallel reading to comprehension is a state transition inside one
mounted component, not a route change — which is also what preserves the "stable
spatial model" the design calls for. Lines must not reflow when support disappears.

### D2 — Support removal is symmetric and layout-preserving

Covering either column must not change the layout. `CoveredCell` already occupies
the same grid cell as the text it hides. This is why the spread uses a 2-column grid
with shared line numbers rather than two independently scrolled panes.

**Direction:** never unmount a cell to hide it. Swap its contents, keep its box.

### D3 — Evidence, not completion

There is no "completed" flag anywhere in the product. Each *construction* (not each
lesson) carries one of five states, and each transition requires specific evidence:

| State | Operational definition | Evidence required |
| --- | --- | --- |
| `exposed` | Encountered in meaningful audio/text | Completed parallel reading |
| `recognized` | Understood when heard or read | Correct comprehension response |
| `recalled` | Produced from an L1 or situational cue | Successful delayed retrieval |
| `stabilized` | Recalled across spaced sessions | Repeated retrieval on ≥2 distinct days |
| `transferable` | Adapted to a new context | Novel, valid production |

**Direction:** the write model is an append-only **evidence log**; construction state
is derived from it. A lesson can be finished and still not retrievable — `1s Progress map`
renders derived state, never a progress percentage.

### D4 — Audio belongs to the target-language line

Not to the screen, not to a global player, not to the pair. Tapping the French line
replays French. This is what makes sound↔form↔meaning a three-way mapping rather
than a sequence of steps.

**Direction:** audio handles hang off the line model. The transport controls in 1e
operate on "current line", and the current line is spread state.

### D5 — Joint attention needs an accessible equivalent, not a literal gesture

Two-finger tracking recreates joint attention across representations. It is the
*effect* that is required, not the gesture. `1v Settings` already exposes
`Two-finger tracking → single-guide`.

**Direction:** one input abstraction — a `ReadingAnchor` that reports "current pair"
— with three drivers: two-touch, single cross-column guide, and keyboard (↑/↓ moves
one aligned pair). Never require multitouch to progress. Hover links both columns on
desktop.

### D6 — Four navigation destinations, permanently

Today · Book · Phrases · Progress. Everything else lives inside a lesson or under
settings. Vocabulary, grammar, pronunciation, exercises and AI chat do **not** get
top-level destinations — that would fragment one coherent process into features.

**Direction:** the nav is a closed set. Adding a fifth destination requires
re-opening this decision explicitly.

### D7 — One line model, layered representations, language-agnostic

French needs target/natural-English. Tamil additionally needs script,
transliteration, literal English, and occasionally formal register. The renderer
must not branch on language.

**Direction:** a line carries an ordered list of *representation layers*; the
active language profile decides which layers render and in which order.
Transliteration is a **temporary scaffold with a planned removal point** (~L30),
so it is a layer whose visibility is itself part of the learner's progression —
not a permanent setting.

### D8 — Content is owned; open corpora are supplements with provenance

Canonical dialogues, translations, audio and annotations are commissioned and
owned. Tatoeba / Common Voice / UD / OPUS supply examples, robustness testing and
linguistic annotation — never the teaching sequence. Every record carries `source`,
`license` and `review_status`.

**Direction:** provenance is a required field, enforced at ingest. Content with
`review_status != two_native_reviewers` cannot enter the canonical corpus. Assimil
itself is the *interaction* reference only — never a content source.

### D9 — Local-first, because a lesson is a contiguous 15 minutes of audio

A lesson is a bounded, prefetchable unit. Retrieval evidence is small and
append-only. Neither needs a live connection.

**Direction:** prefetch the whole lesson (text + normal + slow audio) on session
start; write evidence locally; sync opportunistically. Losing connectivity
mid-lesson must be invisible.

### D10 — Calibration, not celebration

No confetti, no streaks, no scores on pronunciation. 1g compares by ear with no red
marks; 1n asks the learner to notice a difference before showing the fix; 1q asks
for honest self-rating that *tunes scheduling*.

**Direction:** self-report feeds the scheduler. That is what makes honesty
instrumentally rational for the learner, and it is why there is no reward surface
to game.

---

## 2. Component map

### Existing (built in `app/src/lib/components/wireframe/`)

| Component | Spec role |
| --- | --- |
| `Phone` | Artboard frame — wireframe only, drops out of the product build |
| `PairRow` | One aligned line pair; the atom of the spread |
| `Fr` / `En` | Target and source representation layers |
| `CoveredCell` | Support removal, layout-preserving |
| `TrackPoint` | Finger anchor (1f) |
| `Waveform` | Native/learner audio comparison (1g, 1j) |
| `MicButton` | Production capture |
| `PlayButton` | Line-level and transport audio |
| `StageMeter` | The five construction states (D3) |
| `Chip` / `Pill` | Selection and status tokens |
| `SketchCard` / `SketchButton` | Sketch-skinned shadcn Card/Button |
| `SketchSlider` | Self-rating (1q), text size (1v) |
| `TabBar` | The four destinations (D6) |
| `RationaleNote` | Design margin note — wireframe only |
| `AnswerField` / `SearchField` | Production and retrieval input |

### To build

| Component | Spec role | Direction |
| --- | --- | --- |
| `Spread` | Hosts all nine states | D1 |
| `ReadingAnchor` | Current-pair input abstraction (touch/guide/keyboard) | D5 |
| `LineAudio` | Per-line audio binding, segmented playback | D4 |
| `RepresentationStack` | Renders a line's active layers per language profile | D7 |
| `NotesAnchor` | Word-anchored just-in-time note (1h) | — |
| `ProductionCapture` | Record → compare-by-ear, no scoring | D10 |
| `DiffView` | Learner vs canonical, notice-first (1n) | D10 |
| `EvidenceRecorder` | Emits evidence events from interactions | D3 |
| `ScheduleCard` | Today's one-new + one-recall (1c) | — |
| `SynthesisPerformer` | Weekly reassembly (1r) | — |

### Wireframe-only (do not carry into the product build)

`Phone`, `RationaleNote`, `SurfaceLink`. These render the *design*, not the app.

---

## 3. Where the current implementation stands

`app/` faithfully implements the design canvas: 22 artboards, 22 routes, sketch
fidelity, no app logic. That was the correct build for a wireframe handoff.

The product build diverges in exactly one structural way, per **D1**: 1d/1e/1f/1i/1m
collapse into `Spread`, and two unbuilt states (`meaning-orientation`,
`target-reading`) join them. The other 17 surfaces stay as distinct screens.

The wireframes remain useful after that collapse — as the visual spec for each state
and as a living reference. They should not be deleted when the product build starts.
