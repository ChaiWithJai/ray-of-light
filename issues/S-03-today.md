---
title: "[S-03] Today"
labels: [screen, surface]
---

# S-03 · Today

Surface 3 of 22 · canvas id `1c` · Onboarding & scheduling
Design reference: `src/lib/components/surfaces/today.svelte` → `/surfaces/today`

## Matrix row

| | |
| --- | --- |
| **User sees** | One new lesson and, after Day 49, one recall lesson |
| **Primary action** | Begin session |
| **Instructional function** | Reduce choice and maintain spacing |
| **Ability exercised** | Executive control |
| **Spread state** | `—` |

## Components

- `SketchCard`
- `Pill`
- `SketchButton`
- `TabBar`
- `ScheduleCard (new)`

## Data

- Scheduler output: today's new lesson + due recall
- Estimated duration per item

## Acceptance criteria

- [ ] At most two items are ever offered
- [ ] The recall item only appears once the active wave has begun
- [ ] There is no lesson browser or "choose a lesson" affordance on this surface
- [ ] Copy reinforces the constraint ("Nothing else to choose. That's the point.")

## Depends on

D-10, F-05
