---
title: "[S-19] Progress map"
labels: [screen, surface]
---

# S-19 · Progress map

Surface 19 of 22 · canvas id `1s` · Book-wide surfaces (persistent nav)
Design reference: `src/lib/components/surfaces/progress-map.svelte` → `/surfaces/progress-map`

## Matrix row

| | |
| --- | --- |
| **User sees** | Lessons moving from exposed → recognized → recalled → stabilized → transferable |
| **Primary action** | Inspect development |
| **Instructional function** | Show capability rather than consumption |
| **Ability exercised** | Metacognition |
| **Spread state** | `—` |

## Components

- `StageMeter`
- `SketchCard`
- `Fr`
- `TabBar`

## Data

- Construction state derived from the evidence log

## Acceptance criteria

- [ ] Progress is shown per construction, never per lesson
- [ ] All five states are legible at a glance
- [ ] No completion percentage, lesson count or streak appears
- [ ] A finished lesson with unretrievable constructions is visibly incomplete in capability terms
- [ ] Rendered entirely from derived state — no stored progress field

## Depends on

F-02, F-05
