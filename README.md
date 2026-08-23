# 22 surface areas — digital Assimil

SvelteKit implementation of the Claude Design handoff in
[`../project/Surface Areas Wireframes.dc.html`](../project/Surface%20Areas%20Wireframes.dc.html).

All 22 surfaces are built as individually routable screens. There is deliberately
**no canvas index** — `/` redirects to the first surface.

```sh
npm install
npm run dev      # http://localhost:5173 → /surfaces/entry-assessment
npm run check    # svelte-check
npm run build
```

## Layout

| Path | What it holds |
| --- | --- |
| `src/lib/surfaces.ts` | The 22 surfaces: canvas id, number, slug, title, group. `surfaceHref('1e')` resolves a canvas id to its route. |
| `src/lib/components/surfaces/` | One component per surface, each headed by its canvas id (`<!-- 1e · 5 · … -->`). |
| `src/lib/components/wireframe/` | The sketch primitives (`Phone`, `PairRow`, `CoveredCell`, `Chip`, `SketchCard`, `Waveform`, …). Each wraps a shadcn-svelte primitive where one exists. |
| `src/lib/components/ui/` | shadcn-svelte components, unmodified. |
| `src/lib/styles/style-vega.css` | The shadcn-svelte `vega` style sheet. |
| `src/routes/surfaces/<slug>/` | One route per surface. |

## Routes

| id | Route | id | Route |
| --- | --- | --- | --- |
| 1a | `/surfaces/entry-assessment` | 1l | `/surfaces/completion-exercise` |
| 1b | `/surfaces/learning-plan` | 1m | `/surfaces/active-wave-spread` |
| 1c | `/surfaces/today` | 1n | `/surfaces/answer-comparison` |
| 1d | `/surfaces/audio-preview` | 1o | `/surfaces/transfer-challenge` |
| 1e | `/surfaces/parallel-spread` | 1p | `/surfaces/error-repair` |
| 1f | `/surfaces/finger-tracking` | 1q | `/surfaces/lesson-closure` |
| 1g | `/surfaces/pronunciation` | 1r | `/surfaces/weekly-synthesis` |
| 1h | `/surfaces/notes-drawer` | 1s | `/surfaces/progress-map` |
| 1i | `/surfaces/comprehension-check` | 1t | `/surfaces/phrase-library` |
| 1j | `/surfaces/echo-practice` | 1u | `/surfaces/conversation-bridge` |
| 1k | `/surfaces/translation-exercise` | 1v | `/surfaces/settings` |

## How the sketch look and shadcn coexist

The wireframe palette from the prototype is mapped onto shadcn's token names in
`src/app.css`, so the `ui/` components inherit the sketch look rather than fighting
it. The raw prototype values stay available as their own tokens (`bg-paper`,
`text-ink-soft`, `border-accent-blue`, `font-script`, …).

Where a wireframe component needs to depart from a shadcn default (flat heights,
2px ink borders, pill padding), it passes Tailwind utilities through `class`.
That wins reliably: the `cn-*` rules ship in the `base` layer and utilities come
after it, so no `!important` is needed anywhere.

The margin notes (`→ …`) from the design are rendered with the screens, since they
are part of the wireframe. Cross-references between surfaces are live links.

## Note on `shadcn-svelte add`

`shadcn-svelte.com` is blocked by this environment's egress policy, so the CLI
cannot reach the component registry here. The `ui/` components were taken from the
`huntabyte/shadcn-svelte` repo at the same version the CLI resolves (v1.5.0), which
is the same source the CLI copies from. `components.json` is configured normally,
so `npx shadcn-svelte@latest add <component>` will work from any network that can
reach the registry.
