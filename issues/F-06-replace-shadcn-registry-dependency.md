---
title: "[F-06] Replace the shadcn-svelte registry dependency with Bits UI"
labels: [foundation, design-system, decision]
---

# F-06 · Replace the shadcn-svelte registry dependency with Bits UI

**Direction:** — — see `docs/architecture-map.md`

`shadcn-svelte.com` is blocked by this environment's egress policy, so
`shadcn-svelte init`/`add` cannot run here. The components currently in
`app/src/lib/components/ui/` were vendored from the `huntabyte/shadcn-svelte`
GitHub repo at v1.5.0 — the same source the CLI copies from — so the app builds
and works. But the design system depends on a host we cannot reach.

**Alternatives evaluated (all verified installable from npm in this environment):**

| Package | Version | Kind | Fit |
| --- | --- | --- | --- |
| `bits-ui` | 2.19.0 | Headless primitives | **Recommended** |
| `melt` | 0.44.0 | Headless builders (Svelte 5 rewrite) | Strong, different idiom |
| `@ark-ui/svelte` | 5.24.0 | Headless, Zag-based state machines | Strong, heavier |
| `@skeletonlabs/skeleton` | 5.0.1 | Styled Tailwind system | Fights the sketch skin |
| `flowbite-svelte` | 1.33.1 | Styled components | Fights the sketch skin |
| `daisyui` | 5.7.21 | Pure-CSS Tailwind plugin | Good for skin, no behaviour |

**Recommendation: Bits UI directly, dropping the vendored shadcn layer.**

shadcn-svelte *is* bits-ui plus `tailwind-variants` plus copied source, by the
same maintainer. We already depend on bits-ui. Removing the middle layer removes
the registry dependency with zero visual change.

The migration is small because most vendored components are not bits-ui-backed:

| Vendored component | Uses bits-ui? | Migration |
| --- | --- | --- |
| `slider` | yes | Wrap `bits-ui` Slider directly in `SketchSlider` |
| `tabs` | yes | Wrap `bits-ui` Tabs directly in `TabBar` |
| `progress` | yes | Wrap `bits-ui` Progress directly in `Rail` |
| `button` | no | Plain `<button>` — fold into `SketchButton` |
| `card` | no | Plain `<div>` — fold into `SketchCard` |
| `badge` | no | Plain `<span>` — fold into `Chip`/`Pill` |
| `input`, `textarea` | no | Plain elements — fold into `AnswerField`/`SearchField` |

Deleting `ui/` also lets `style-vega.css` (1361 lines, of which we use a handful
of rules) go, and removes the base-layer/utilities-layer override dance in
`app.css` entirely — the sketch skin becomes the only skin.

## Acceptance criteria

- [ ] `src/lib/components/ui/` and `src/lib/styles/style-vega.css` are removed
- [ ] `shadcn-svelte` and `components.json` are removed from the project
- [ ] `SketchSlider`, `TabBar` and `Rail` wrap bits-ui primitives directly
- [ ] The remaining wireframe components use plain elements plus tailwind-variants
- [ ] All 22 routes render byte-identically to before the migration (visual diff)
- [ ] `npm run check` and `npm run build` stay clean

## Depends on

—
