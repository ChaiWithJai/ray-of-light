---
title: "[S-13] Active-wave spread"
labels: [screen, surface]
---

# S-13 · Active-wave spread

Surface 13 of 22 · canvas id `1m` · Active wave (Day 50+)
Wireframe: `app/src/lib/components/surfaces/active-wave-spread.svelte` → `/surfaces/active-wave-spread`

## Matrix row

| | |
| --- | --- |
| **User sees** | Old English dialogue; French covered |
| **Primary action** | Reconstruct French aloud |
| **Instructional function** | Delayed generative retrieval |
| **Ability exercised** | Long-term retrieval, working memory |
| **Spread state** | `active-retrieval` |

## Components

- `Spread (new, state=active-retrieval)`
- `CoveredCell`
- `MicButton`
- `Chip`
- `ProductionCapture (new)`

## Data

- Lesson from ~49 days prior
- Hint ladder (first word → full reveal)

## Acceptance criteria

- [ ] Layout mirrors `parallel-reading` exactly, with the target column covered
- [ ] Production is spoken first; text entry is secondary
- [ ] Hint and reveal are graded, and each degrades the evidence recorded
- [ ] Successful unhinted production emits `recalled` evidence
- [ ] The lesson surfaced is the one due by the two-wave schedule, not a free choice

## Depends on

F-01, F-02, D-10
