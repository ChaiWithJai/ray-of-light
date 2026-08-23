---
title: "[D-02] Content build pipeline: authoring → shipped artifacts"
labels: [data, pipeline, content]
---

# D-02 · Content build pipeline: authoring → shipped artifacts

Authored content (dialogues, translations, notes, prompts) compiles into
immutable per-lesson bundles that the app prefetches whole.

Stages: **validate** (schema + provenance) → **align** (pair numbering, chunk
boundaries, note spans) → **index** (construction graph, phrase-library index) →
**bundle** (per-lesson JSON + audio manifest) → **sign** (content version).

The construction graph is what lets the scheduler know which constructions a
lesson exercises, and what the progress map renders against.

## Acceptance criteria

- [ ] A lesson compiles to a single immutable, versioned bundle
- [ ] Build fails on schema violation or missing provenance
- [ ] The construction graph is derived at build time, not at runtime
- [ ] Content versions are addressable so evidence can cite what it was recorded against
- [ ] Rebuilding identical input produces identical output

## Depends on

D-01, D-11
