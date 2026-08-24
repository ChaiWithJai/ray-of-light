# Bonsai aside harness — the learner's notebook

**Status:** spec (Design R1 · Phase 0). Refs #48, #38 (aside strip), #19 (local-only precedent), #1.

---

## 1. Intent, in the owner's words

> "this is superfluous is there a better more consistent use for this sidebar
> area that would benefit desktop and give mobile users a reason to come to
> desktop, maybe a section for their own notes"

> "much more effective sidebar here compared to earlier onboarding sidebars…
> the AI harness idea… Bonsai27B via WebGPU and skills/context baked in similar
> to how NotebookLM is an effective harness for learning"

> "'remove this text' drawn over the ENTIRE aside column… strip the filler now,
> land the real job (notes/Bonsai harness) as the replacement"

The aside gets **one job, app-wide**: the learner's own notebook, with a local
AI harness inside it. Two layers, strictly ordered — notes are the product;
the model is an amplifier over the notes, the current lesson, and the method
wiki. The desktop-only nature is deliberate: it is the thing that "gives mobile
users a reason to come to desktop."

## 2. Product behavior

The aside (the `aside` snippet slot in `src/lib/components/ui/shell.svelte`,
rendered ≥lg) becomes a persistent two-tab column:

**Notes (always present, always first).**
- Free-form notes, autosaved locally, scoped three ways: to the current line
  (successor of the `1h` notes-drawer word-anchored notes), to the current
  lesson, and unscoped (the learner's own notebook).
- On any lesson step, the notes tab surfaces this lesson's and this line's
  notes first; on Today/Progress it shows the notebook with recent-first.
- Notes are the learner's voice — no templates, no prompts to "reflect", no
  AI-generated text ever written *into* a note uninvited.

**Harness (present when hardware allows; see §5 degradation).**
- NotebookLM-style: a conversational surface whose grounding is *sources*, and
  the sources are visible: the current lesson, the current construction(s), the
  method wiki, and the learner's own notes. Answers cite which source they
  drew on; wiki citations link to the page (`docs/design/method-wiki.md`).
- Context-aware without being asked: opened on the compare step after a miss,
  it already knows the line, the construction, and the canonical answer.
- Skills/context baked in: a fixed system prompt encoding the method (see §4),
  not a blank chat. It answers as the method's tutor — it explains, it points
  into the wiki, it *never* completes an exercise for the learner (asking for
  the recall answer gets the technique's unstuck guidance, not the answer;
  same boundary as `hint-used` — the harness must not become an ungated hint
  that bypasses evidence capping).

**Method-fit constraints.**
- The aside never interrupts: no proactive messages, no badges, no animation
  during audio playback. Calm column, learner-initiated.
- D6 holds: the harness is not a nav destination and not a mobile surface.
- D10 holds: the harness never praises or scores; it calibrates and explains.

## 3. Privacy posture — local-only inference

The precedent is #19 (personal-voice pipeline): personal material is
deny-by-default for network, logs, and git. The same rules, restated for this
feature:

- **Inference is local-only**: Bonsai-27B (or fallback model) runs in-browser
  via WebGPU. No prompt, note, evidence, or completion ever leaves the device.
  No hosted-API fallback exists — absence of the model degrades the feature
  (§5), it does not re-route to a cloud.
- **Notes are personal data**: stored in IndexedDB alongside the evidence log
  (D9 local-first), included in nothing telemetric, exportable by the learner.
- **Model weights are local artifacts**: the owner's Bonsai checkpoints live on
  local disk; weights are never committed to this repo and never bundled into
  the build. The app *loads* weights the user provides or fetches from a
  well-known local path/origin the user configures (§6).
- Provenance discipline: the harness UI discloses model identity and
  quantization ("running Bonsai-27B q4, locally") in settings-altitude UI, not
  as persistent chrome (per the dev-leak finding — honesty at the right
  altitude).

## 4. Context injection design

Assembled per turn, in fixed priority order, within the model's context budget:

1. **Method system prompt** (static, versioned in-repo): the tutor role, the
   no-answers boundary, the calm register, the capability-state vocabulary.
2. **Session context** (from the running app, not re-derived): current
   `SessionMode`/`StepId` (`src/lib/flow.ts`), lesson id + title + situation,
   current line (target/english/chunks/notes fields from the content model),
   active construction ids with their glosses.
3. **Learner state**: `deriveConstructionState` for the constructions in
   context, plus due items from `deriveResurfaceQueue` — so "why am I seeing
   this again?" is answerable truthfully from the same derivations the UI uses.
4. **Retrieval over the wiki**: the typed `WikiEntry[]` module (wiki spec §6)
   is the corpus; retrieval is local — embedding-free lexical scoring (BM25
   over entries + term/step metadata) first, an on-device embedding index only
   if quality demands it. Top-k entries are injected with ids so answers cite.
5. **Retrieval over the learner's notes**: same scorer over the notes store,
   scoped-first (this line, this lesson, then notebook).

The injection layer is a plain function
(`buildHarnessContext(session, learner, query) → prompt parts`) — testable
without any model, and reusable by the degraded mode (§5) to pick wiki
passages.

## 5. Degradation ladder (WebGPU / model absent)

| Tier | Condition | Experience |
| --- | --- | --- |
| T0 | Always | Notes tab, fully functional. The aside's job is done at T0 — everything below is amplification. |
| T1 | No WebGPU / no weights / user declined | Harness tab becomes "Ask the method": the same input box, answered by retrieval only — `buildHarnessContext`'s wiki scorer returns the top passages as linked excerpts. No generation, still useful, still local. |
| T2 | WebGPU present, small weights available | Same UX with a smaller local model (a distilled/small sibling); disclosure states which model. |
| T3 | WebGPU + Bonsai-27B loaded | Full harness. |

Feature-detect silently; never nag mobile/unsupported browsers — the aside
simply is notes (+T1) there. Detection result surfaces only inside the harness
tab's settings row.

## 6. Model loading UX — 27B is heavy

Reality check that shapes the UX: 27B at q4 is roughly 14–16 GB of weights and
needs a GPU with ~16 GB+ addressable memory; prompt processing on integrated
GPUs will be slow. So:

- **Explicit opt-in, never automatic.** The harness tab offers "Enable the
  local tutor" with the real numbers (download size, memory need) before any
  bytes move. Quantized q4 is the default artifact; no fp16 path in-product.
- **Weights come from the user's machine**: a directory/file picker (weights
  cached into OPFS after first load) or a user-configured local URL (e.g. a
  localhost static server over the owner's existing local model directory).
  The repo ships no weights and hardcodes no download host.
- **Streamed, resumable, cached**: shard-wise load into OPFS with progress;
  subsequent sessions load from cache; an eviction control in settings shows
  the footprint honestly.
- **Session behavior**: model loads on first harness use per session (with a
  visible warm-up state), never during audio playback (D9's prefetch priority
  belongs to the lesson; the model yields).
- **T2 first in practice**: expect the small-model tier to be most users'
  reality; design copy and quality bars for T2, treat T3 as the owner's
  workstation experience initially.
- Runtime: a WebGPU LLM runtime (WebLLM-class) wrapped behind a
  `HarnessEngine` interface so runtime and model choice stay swappable; the
  engine, like the audio pipeline in #19, is pinned by exact version + weight
  hash in a local manifest.

## 7. Phased build plan

- **Phase H0 — strip the filler (lands with #38, Phase 1):** remove the
  removable aside copy; the aside renders notes-tab-only (T0). Notes store
  (IndexedDB, zod-validated entries: `id`, `scope {lessonId?, lineId?}`,
  `body`, timestamps) + line/lesson scoping on lesson steps. This alone
  satisfies "one consistent job."
- **Phase H1 — context + retrieval (needs wiki Phase W0):**
  `buildHarnessContext`, wiki/notes scorer, T1 "Ask the method" surface with
  cited excerpts. No model code yet; fully testable.
- **Phase H2 — engine:** `HarnessEngine` over a WebGPU runtime, T2 with a
  small model, opt-in and loading UX, disclosure row. Answer-refusal boundary
  tests (exercise answers → unstuck guidance).
- **Phase H3 — Bonsai-27B (T3):** owner's checkpoints, OPFS caching at 27B
  scale, performance pass; evaluate whether q4 quality justifies default-
  recommending it over the T2 model.

E2E note: the browser suite must never depend on WebGPU or weights — tests pin
T0/T1 via feature-flag, mirroring how #19 keeps CI independent of personal
audio.

## 8. Data / architecture touchpoints

- `src/lib/components/ui/shell.svelte` — the `aside` slot every screen already
  passes through; H0 replaces its per-screen fillers with one component.
- `src/lib/stores/` — new notes store beside `profile.svelte.ts`, same
  local-first pattern as the evidence log.
- `src/lib/flow.ts`, `src/lib/session.ts` — session context source.
- `src/lib/schemas/learner.ts`, `schedule.ts` — learner-state derivations
  injected into context.
- Wiki content module (`method-wiki.md` §6) — the retrieval corpus.
- New: `src/lib/harness/` (`context.ts`, `retrieval.ts`, `engine.ts`),
  settings entries for model management.

## 9. Open questions

- Should harness conversations persist (they are learner data too) or be
  ephemeral with "save to notes" as the explicit keep gesture? Leaning
  ephemeral + explicit save — keeps the notebook the learner's voice.
- The hint boundary: does *asking the harness about the current recall item*
  before answering constitute `hint-used`? The refusal design avoids leaking
  the answer, but the owner should rule on whether method explanation
  mid-attempt caps evidence.
- Which small model is T2's default recommendation, and what is the minimum
  quality bar (measured on method-question evals built from the wiki corpus)?
- Is a localhost weight server a supported first-class path (owner's setup) or
  is file-picker + OPFS the only documented route?
- Does the notes tab appear on onboarding screens (where the filler verdict
  originated) or only post-onboarding? Leaning: yes, empty-but-present — the
  consistent job includes being consistently *there*.

## 10. Cross-references

- **Method wiki** (`docs/design/method-wiki.md`): retrieval substrate (typed
  entries, §6 there), degradation target (T1 answers *are* wiki passages), and
  the destination harness citations link to.
- **First-run intros (#36):** the harness's first-use explainer is an intro
  instance; "what can I ask?" resolves to a wiki page about the harness itself.
- **Sprite world** (`docs/design/sprite-world.md`): when the harness discusses
  a construction, its sprite may badge the citation — chrome-level only.
- **Mobile spike** (`docs/design/mobile-method-spike.md`): confirms the aside
  is desktop-only; mobile's surface budget goes entirely to the stacked method.
