---
title: "[S-09] Comprehension check"
labels: [screen, surface]
---

# S-09 · Comprehension check

Surface 9 of 22 · canvas id `1i` · Checks & exercises (passive wave)
Design reference: `src/lib/components/surfaces/comprehension-check.svelte` → `/surfaces/comprehension-check`

## Matrix row

| | |
| --- | --- |
| **User sees** | French visible; English covered |
| **Primary action** | Explain or select meaning |
| **Instructional function** | Remove translation dependency |
| **Ability exercised** | Comprehension, retrieval |
| **Spread state** | `comprehension` |

## Components

- `Spread (new, state=comprehension)`
- `CoveredCell`
- `SketchButton`
- `EvidenceRecorder (new)`

## Data

- Distractor set per line
- Peek/hint events

## Acceptance criteria

- [ ] Layout is identical to `parallel-reading` with the source column covered
- [ ] Tap-and-hold peeks a covered line and records a hint event
- [ ] A correct response emits `recognized` evidence for the line's constructions
- [ ] A peeked line cannot produce `recognized` evidence on that attempt

## Depends on

F-01, F-02
