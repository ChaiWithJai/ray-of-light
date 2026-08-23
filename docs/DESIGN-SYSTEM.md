# The product system (issue #20)

**Chosen direction: "a quiet study desk."** The Assimil method is a book you
sit with daily; the UI should feel like the desk it sits on, not like the
wireframe that specified it.

## Emotional intent and physical analogue

Calm focus with a felt journey. The physical analogues are: warm paper (the
desk), a bound bilingual reader (the spread), a dimmed room while a recording
plays (the preview stage), and dusk when the session closes. Calm is not
inert: each learning state has its own atmosphere, and transitions have a
small, consistent vocabulary.

## Typography

- **Fraunces** — display and target-language lines. The language is the hero,
  so it gets the serif at reading size (`--font-serif`, `text-lg`).
- **Noto Serif Tamil** — Tamil script. It sits in the same `--font-serif`
  fallback chain, so both languages keep one typographic voice while each
  script gets a face designed for it.
- **Atkinson Hyperlegible** — UI and body copy. Body copy no longer inherits
  a novelty handwriting face.
- **Caveat** — retained only as the margin voice (`font-script` annotations),
  which is where the handwritten thesis of the original design survives.
- Patrick Hand remains solely for the `/surfaces` wireframe gallery.

## Color roles

Tokens in `src/app.css` under `@theme`:

- Ground/surface/line/text: warm paper elevations and ink.
- `--color-brand`: one deep lake blue, reserved for the single next action.
- Language identities: `--color-lang-fr` (lake blue), `--color-lang-ta`
  (madder red) — typographic and tonal cues, no flags, no pastiche.
- Learning-state atmospheres: `stage` (immersion, the only dark surface),
  `effort` (warm parchment prompts), `insight` (green reveals), `caution`
  (amber hints/friction), `miss` (errors, always paired with strikethrough,
  never color alone), `dusk-a/b` (the closure gradient).
- The legacy wireframe tokens remain at the bottom of the theme, consumed
  only by `components/wireframe/*` for the `/surfaces` gallery.

## Density and layout

Mobile (390px) is a focused, linear, touch-safe column with a bottom nav.
From `lg` up, the `Shell` composes a content column plus a supporting-context
aside — method context, the session step map, the plan summary — never an
enlarged empty margin and never a floating phone artboard. Reading spreads
take a wider measure (`wide`).

## Motion (the interaction contract)

Three verbs, defined once in `app.css`, used everywhere and nowhere else:

- **rise** — a step or panel enters (fade + 6px lift, staggered `anim-d1..4`).
- **uncover** — withheld text is revealed (answers, comparisons).
- **settle** — the quiet completion moment (closure's dusk panel).

Reduced-motion contract: with `prefers-reduced-motion`, all three collapse to
a one-frame opacity change (content appears complete and in place), the
preview's breathing halo becomes a static ring, and every state distinction
that motion carried is still carried by a static color/border cue. Task
completion never depends on an animation finishing.

## Non-goals

No streaks, points, confetti, mascots, gradients-as-decoration, or lesson
pickers. Closure is calibration, not celebration — but not affectless.

## Boundary rule

Production routes consume `$lib/components/ui` (semantic components:
`Shell`, `Card` tones mapped to learning states, `Button` hierarchy).
`$lib/components/wireframe` is reference-only for `/surfaces`; the guard test
`src/lib/no-wireframe-imports.test.ts` fails any new production import.
