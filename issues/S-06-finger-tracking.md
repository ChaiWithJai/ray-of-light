---
title: "[S-06] Finger-tracking layer"
labels: [screen, surface]
---

# S-06 · Finger-tracking layer

Surface 6 of 22 · canvas id `1f` · The lesson core
Design reference: `src/lib/components/surfaces/finger-tracking.svelte` → `/surfaces/finger-tracking`

## Matrix row

| | |
| --- | --- |
| **User sees** | Two linked touchpoints or cursors |
| **Primary action** | Move down both texts |
| **Instructional function** | Joint attention across representations |
| **Ability exercised** | Attention, processing speed |
| **Spread state** | `parallel-reading (input layer)` |

## Components

- `ReadingAnchor (new)`
- `TrackPoint`
- `PairRow`

## Data

- Current-pair index
- Anchor positions

## Acceptance criteria

- [ ] Dragging either anchor moves both
- [ ] Lifting one anchor does not advance the lesson
- [ ] Audio follows the pair as the anchors move
- [ ] Desktop hover on either column highlights both
- [ ] ↑/↓ moves exactly one aligned pair
- [ ] Single-guide mode is functionally equivalent and is the accessible default

## Depends on

F-03
