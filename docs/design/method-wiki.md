# Method wiki — learner-facing reference for the taxonomy and methodology

**Status:** spec (Design R1 · Phase 0). Refs #47, #36 (first-run intros), #37 (orientation), #1.

---

## 1. Intent, in the owner's words

> "a dedicated wiki for our taxonomy and learning methodology to link back to
> for learners who 1. get stuck 2. need to go deeper 3. need quick reference
> on-the-fly"

Three jobs, verbatim, and they are distinct reading modes:

1. **Stuck** — mid-exercise, confused, needs the *shortest* unblocking answer
   and a way straight back to the exercise.
2. **Go deeper** — deliberately curious, wants the why behind a technique; the
   one sanctioned place where the owner's "rare deliberate deep-dive via
   scrolling" rule applies.
3. **Quick on-the-fly reference** — a term ("construction", "wave",
   "stabilized") needs resolving in two seconds without leaving the surface.

The wiki is also the **destination layer** under two other lanes: first-run
concept intros (#36) end with "learn more →" into it, and the Bonsai aside
harness (#48) uses it as retrieval substrate. Method terms across the app stop
being jargon by *resolving somewhere* — this is the parent fix that, with #36,
makes the jargon findings moot.

## 2. Product behavior

**Not a fifth destination.** D6 closes the nav at Today · Book · Phrases ·
Progress. The wiki is reached contextually (term links, hint callouts, intro
links, sprite taps) and from Settings/help — never from the tab bar. Reopening
D6 is explicitly out of scope.

Three access forms, one per job:

- **Glossary popover (job 3).** Any marked method term anywhere in the app
  (`<Term id>` inline component) opens a small in-place popover: one-sentence
  definition + "more" link into the full page. No navigation, dismiss returns
  focus. This uses the distinct "guidance, not content" visual grammar from the
  unmarked-hint-text finding.
- **Stuck panel (job 1).** Exercise surfaces carry a quiet "stuck?" affordance
  (in the step chrome, and as the empty-state of a wrong attempt). It opens the
  *relevant technique page's* unblocking section — the first ~5 lines, which
  every page must front-load — as an overlay with one action: back to the
  exercise, state intact. Never a route change mid-exercise.
- **Wiki pages (job 2).** Full pages at `/wiki/...`, the one surface where long
  scroll is legitimate. Entered deliberately; leaving returns to where the
  learner came from.

## 3. Information architecture

```
/wiki
  /method            — the run of the program: two waves, why sound-first,
                       what you'll be able to do (the #37 orientation content's
                       canonical home)
  /techniques/…      — one page per technique, keyed to StepIds and mechanics:
      parallel-reading   (spread, finger/thumb tracking — links the mobile form)
      cover-ladder       (the guided support-removal progression)
      shadowing          (echo practice)
      recall-wave        (active wave: produce from English, then compare)
      transfer           (what "make it yours" asks and why)
      synthesis          (weekly reassembly)
      resurfacing        (the 1·3·7 ladder; why honesty tunes it)
  /capability        — THE LADDER: exposed → recognized → recalled →
                       stabilized → transferable; what each state means,
                       what evidence earns it (the D3 table, learner-voiced)
  /glossary/…        — one short entry per term: construction, wave, spread,
                       support, evidence, resurface, synthesis, placement, …
  /constructions/[id] (later) — per-construction page: gloss, lesson of first
                       appearance, its sprite, current capability state
```

Every technique page has a fixed shape mirroring the three jobs: **Unstuck**
(what to do right now, ≤5 lines) → **What this is** → **Why it works** →
**Related terms**. The stuck panel renders section 1; deep-dive reads on.

Copy register: instructional-designer voice per the copy findings — guiding,
never design-narrating, no "this app doesn't do X" negations, no em-dash asides.

## 4. Contextual linking (where the wiki is entered from)

| Origin | Link |
| --- | --- |
| First-run intros (#36) | Each once-per-technique intro ends "learn more → /wiki/techniques/…"; the intro is the trailer, the wiki page the film. |
| Step chrome (`src/lib/components/steps/*.svelte`) | "stuck?" affordance mapped `StepId → technique page` (a static map next to `flow.ts`'s `STEP_DEFS`). |
| Method terms in copy | `<Term>` popovers wherever taxonomy words appear (closure, progress map, Today cards). |
| Hint callouts | The hint-text visual grammar gets an optional term link. |
| Progress map / `StageMeter` | Capability-state labels link to `/wiki/capability`. |
| Sprites (#46) | Tapping a construction's sprite opens its construction entry (`docs/design/sprite-world.md` §4). |
| Compare / error repair | Miss states offer the relevant technique's unstuck section — the highest-value "stuck" moment in the app. |

Rule: links out of a *lesson step* always open overlay/popover forms; only
non-ritual surfaces (Today, Progress, Settings) navigate to full pages. The
listening ritual is never interrupted by a route change.

## 5. Content sourcing — from existing docs and the flow model

The methodology is already written down; the wiki is a learner-voiced
projection of it, not new doctrine:

- `docs/architecture-map.md` — D1–D10 supply /method and the technique pages'
  "why it works" sections (D3's evidence table *is* /capability; D10 is the
  honesty framing throughout).
- `src/lib/flow.ts` — step definitions and the wave flows give /method its
  program-run diagram and the `StepId → page` map.
- `src/lib/schemas/learner.ts` — `CONSTRUCTION_STATES`, `EVIDENCE_GRANTS` and
  their doc comments are the source of truth for /capability (the page must be
  regenerated-or-reviewed when these change; a test asserts the state list in
  the wiki matches `CONSTRUCTION_STATES`).
- `src/lib/schemas/schedule.ts` — wave config and the resurface ladder source
  /techniques/recall-wave and /techniques/resurfacing (the 1·3·7 numbers render
  from `resurfaceLadderDays`, not hand-copied).
- Lesson content (`fr.ts`/`ta.ts`) — construction glosses feed
  /constructions/[id]; the sprite manifest (#46 §5) already enumerates them.

## 6. Offline / local — fits the static architecture

D9: local-first, no live connection assumed. The wiki is therefore **content
compiled into the app**, not a hosted CMS:

- Authored as markdown with frontmatter in `src/lib/content/wiki/{section}/…md`.
- A Vite glob import (or small build step) compiles entries into a typed
  `WikiEntry[]` module — same pattern as lesson content, validated by zod
  schema (`id`, `section`, `title`, `terms`, `relatedSteps`, `unstuck` body,
  full body).
- `/wiki` routes prerender; popover/stuck content ships in the main bundle
  (it is small text), so job 1 and job 3 work with zero fetches, mid-lesson,
  offline.
- Numbers and enums (ladder days, state names, step counts) are interpolated
  from the schemas at build time — the wiki cannot state something the code
  contradicts.

## 7. Authoring workflow

1. Write/edit markdown in `src/lib/content/wiki/`; frontmatter declares which
   `StepId`s and terms the page serves.
2. Conformance tests (extend `content.test.ts` pattern):
   - every `StepId` in `flow.ts` resolves to a technique page;
   - every state in `CONSTRUCTION_STATES` has a /capability section;
   - every `<Term id>` used in components exists in the glossary;
   - every glossary entry's one-liner fits the popover budget (length cap);
   - no dead intra-wiki links.
3. Copy passes the #35 voice sweep rules (no design-narration, ID register).
4. PR review is the editorial gate; provenance is trivially `owned/original`.

Adding a technique later (new StepId) fails tests until its page exists —
authoring is enforced, not remembered.

## 8. Phased build plan

- **Phase W0 (Phase 1–2 window):** content module + schema + tests; author
  /capability, /method, and the four highest-stuck-risk technique pages
  (shadowing, recall-wave, cover-ladder, transfer — the ones #36 identified as
  landing unintroduced). Glossary popover component with ~8 core terms.
- **Phase W1 (with #36):** first-run intros link in; stuck panel on recall,
  compare, shadow, transfer steps; `StepId → page` map.
- **Phase W2:** full /wiki routes (prerendered), remaining technique pages,
  resurfacing + synthesis pages, term links swept across all surfaces.
- **Phase W3 (with #46/#48):** /constructions entries wired to sprites; wiki
  entries exposed as the Bonsai harness's retrieval corpus (see
  `docs/design/bonsai-aside-harness.md` §4 — the harness consumes the same
  typed `WikiEntry[]`, which is why the module, not the routes, is the
  substrate).

## 9. Open questions

- Does /wiki live under Settings ("About the method") or as a plain route only
  reachable by link? (D6 pressure says: plain route, no nav entry either way.)
- Per-construction pages in round 1, or defer until sprites land? (Defer —
  glossary's "construction" entry carries the concept meanwhile.)
- Should the stuck panel record an evidence-adjacent event (e.g. for the
  harness's context) or stay unlogged? Method says hints cap attempts
  (`hint-used`); reading *about* the technique is not a hint on the item —
  leaning unlogged, but confirm the boundary with the owner.
- Localization posture: wiki is English (the learner's L1) for both curricula —
  assumed yes.

## 10. Cross-references

- **First-run intros (#36):** intro = first exposure, wiki = the permanent
  home; the intro component and glossary popover share the callout grammar.
- **Bonsai aside harness** (`docs/design/bonsai-aside-harness.md`): the wiki is
  the harness's retrieval substrate and its no-model degradation target — when
  the model is absent, harness answers degrade to linked wiki passages.
- **Sprite world** (`docs/design/sprite-world.md`): sprites are visual entries
  into /constructions; the capability page uses the sprite stage grammar as its
  illustration.
- **Orientation (#37):** the "run of the program" content authored once, in
  /method, and excerpted by entry surfaces.
