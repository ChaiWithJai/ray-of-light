---
title: "[S-08] Notes drawer"
labels: [screen, surface]
---

# S-08 · Notes drawer

Surface 8 of 22 · canvas id `1h` · The lesson core
Design reference: `src/lib/components/surfaces/notes-drawer.svelte` → `/surfaces/notes-drawer`

## Matrix row

| | |
| --- | --- |
| **User sees** | Grammar and cultural note attached to a phrase |
| **Primary action** | Inspect when necessary |
| **Instructional function** | Just-in-time explanation |
| **Ability exercised** | Crystallized knowledge |
| **Spread state** | `overlay on any state` |

## Components

- `NotesAnchor (new)`
- `SketchCard`
- `Muted`

## Data

- Notes anchored to exact word/construction spans
- Cultural notes distinct from grammar notes

## Acceptance criteria

- [ ] Notes are anchored to a specific span, not to the lesson
- [ ] The drawer opens only on demand — never automatically
- [ ] The spread stays visible (dimmed) behind the drawer
- [ ] There is no grammar-chapter surface anywhere in the product
- [ ] Cultural notes are visually distinguishable from grammar notes

## Depends on

F-01, D-01
