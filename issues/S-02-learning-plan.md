---
title: "[S-02] Learning plan"
labels: [screen, surface]
---

# S-02 · Learning plan

Surface 2 of 22 · canvas id `1b` · Onboarding & scheduling
Design reference: `src/lib/components/surfaces/learning-plan.svelte` → `/surfaces/learning-plan`

## Matrix row

| | |
| --- | --- |
| **User sees** | Daily duration, target and projected lesson path |
| **Primary action** | Choose commitment |
| **Instructional function** | Goal-setting and expectation calibration |
| **Ability exercised** | Metacognition |
| **Spread state** | `—` |

## Components

- `Chip`
- `Rail`
- `SketchCard`
- `SketchButton`

## Data

- Duration → pacing model
- Projected path derived from pacing + wave schedule
- Goal tag (Travel/Family/Work/Reading)

## Acceptance criteria

- [ ] The projected path shows the passive wave and the active wave as distinct phases
- [ ] The Day-50 active-wave milestone is stated explicitly, not implied
- [ ] Review days (every 7th lesson) are shown as built in, not extra
- [ ] Commitment sets scheduler pacing — it is not cosmetic
- [ ] No streak, badge or gamified reward appears

## Depends on

D-10
