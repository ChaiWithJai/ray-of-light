---
title: "[D-03] Hydration strategy: load boundaries, prerender vs SSR vs CSR"
labels: [data, hydration, sveltekit]
---

# D-03 · Hydration strategy: load boundaries, prerender vs SSR vs CSR

Three classes of surface with different needs:

| Class | Surfaces | Strategy |
| --- | --- | --- |
| Static shell | Settings, Book browse | Prerender |
| Learner-derived | Today, Progress, Phrases | SSR with learner data, hydrate for interaction |
| Session-interactive | The whole lesson core | Shell SSR, lesson bundle prefetched, all state client-side |

The lesson core must not re-fetch mid-session (D9). Once a lesson starts, the
network is not on the critical path.

## Acceptance criteria

- [ ] Lesson bundles are fetched once at session start and cached
- [ ] No lesson-core interaction triggers a network request on the critical path
- [ ] Progress and Today SSR with real derived state, not loading skeletons
- [ ] Hydration does not reset reading-anchor position
- [ ] The spread is interactive before audio finishes buffering

## Depends on

D-02, D-06
