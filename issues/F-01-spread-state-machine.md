---
title: "[F-01] Build the spread as one component with nine states"
labels: [foundation, spread, architecture]
---

# F-01 · Build the spread as one component with nine states

**Direction:** D1, D2 — see `docs/architecture-map.md`

The design canvas draws 1d, 1e, 1f, 1i and 1m as separate artboards. They are
one bilingual spread in five of its states. Building them as five screens would
destroy the stable spatial model the whole method depends on.

Implement `<Spread state={...} />` covering all nine states:

| State | Target | Source | Audio | Required response |
| --- | --- | --- | --- | --- |
| `sound-exposure` | covered | covered | playing | listen |
| `meaning-orientation` | covered | visible | playing | follow meaning |
| `parallel-reading` | visible | visible | playing | track both lines |
| `target-reading` | visible | covered | optional | read aloud |
| `shadowing` | visible | covered | segmented | repeat immediately |
| `comprehension` | visible | covered | optional | recover meaning |
| `active-retrieval` | covered | visible | off initially | produce target |
| `comparison` | learner + canonical | visible | available | diagnose difference |
| `transfer` | new prompt | situational | optional | construct new sentence |

`meaning-orientation` and `target-reading` have no artboard in the design — they
fall out of the state table and must be built anyway.

## Acceptance criteria

- [ ] A single mounted `Spread` transitions between all nine states without a route change
- [ ] Line boxes do not reflow when support is added or removed in any transition
- [ ] Line numbers stay shared and horizontally aligned across both columns in every state
- [ ] The current pair carries exactly one restrained highlight
- [ ] `meaning-orientation` and `target-reading` are implemented despite having no artboard

## Depends on

—
