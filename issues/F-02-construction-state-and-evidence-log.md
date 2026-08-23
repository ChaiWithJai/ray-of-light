---
title: "[F-02] Model construction state as derived evidence, not completion flags"
labels: [foundation, data-model, architecture]
---

# F-02 · Model construction state as derived evidence, not completion flags

**Direction:** D3 — see `docs/architecture-map.md`

There is no "completed" flag anywhere in this product. Each *construction*
(`je voudrais + noun`, `quantité + de`) carries one of five states, and each
transition requires specific evidence.

| State | Definition | Evidence required |
| --- | --- | --- |
| `exposed` | Encountered in meaningful audio/text | Completed parallel reading |
| `recognized` | Understood when heard or read | Correct comprehension response |
| `recalled` | Produced from an L1 or situational cue | Successful delayed retrieval |
| `stabilized` | Recalled across spaced sessions | Repeated retrieval on ≥2 distinct days |
| `transferable` | Adapted to a new context | Novel, valid production |

The write model is an append-only evidence log. Construction state is *derived*,
never stored as a mutable field. This is what lets a lesson be finished while its
constructions remain unretrievable.

## Acceptance criteria

- [ ] Evidence events are append-only and carry construction id, kind, outcome, and timestamp
- [ ] Construction state is a pure derivation over the evidence log
- [ ] `stabilized` requires retrievals on at least two distinct calendar days
- [ ] No API, store or schema anywhere exposes a lesson-level completion boolean
- [ ] Replaying the evidence log reproduces identical state

## Depends on

—
