---
title: "[S-18] Weekly synthesis"
labels: [screen, surface]
---

# S-18 · Weekly synthesis

Surface 18 of 22 · canvas id `1r` · Closure & consolidation
Wireframe: `app/src/lib/components/surfaces/weekly-synthesis.svelte` → `/surfaces/weekly-synthesis`

## Matrix row

| | |
| --- | --- |
| **User sees** | Six lessons condensed into patterns and dialogue |
| **Primary action** | Review and perform |
| **Instructional function** | Interleaving and consolidation |
| **Ability exercised** | Crystallized knowledge |
| **Spread state** | `—` |

## Components

- `SketchCard`
- `Chip`
- `Fr`
- `SketchButton`
- `SynthesisPerformer (new)`

## Data

- Constructions met in the last six lessons
- One new dialogue built only from old pieces

## Acceptance criteria

- [ ] Fires on every 7th lesson automatically
- [ ] The dialogue introduces no new material — only recombination
- [ ] Patterns met are listed as constructions, not vocabulary
- [ ] The learner performs the dialogue aloud
- [ ] Copy makes the "nothing new today" contract explicit

## Depends on

D-10
