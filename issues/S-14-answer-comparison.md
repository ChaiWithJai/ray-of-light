---
title: "[S-14] Answer comparison"
labels: [screen, surface]
---

# S-14 · Answer comparison

Surface 14 of 22 · canvas id `1n` · Active wave (Day 50+)
Wireframe: `app/src/lib/components/surfaces/answer-comparison.svelte` → `/surfaces/answer-comparison`

## Matrix row

| | |
| --- | --- |
| **User sees** | Learner production beside canonical French |
| **Primary action** | Notice differences |
| **Instructional function** | Correct the mental model |
| **Ability exercised** | Error discrimination |
| **Spread state** | `comparison` |

## Components

- `DiffView (new)`
- `Diff`
- `SketchCard`
- `SketchButton`

## Data

- Learner production (text and/or transcript)
- Canonical line
- Difference explanation

## Acceptance criteria

- [ ] The learner sees both forms and is asked to notice the difference before any explanation
- [ ] The explanation distinguishes spelling-only from audible differences
- [ ] The learner re-produces the corrected line before moving on
- [ ] No red X, score or penalty is shown
- [ ] Difficult lines are queued to resurface at 1 · 3 · 7 days

## Depends on

D-10, D-09
