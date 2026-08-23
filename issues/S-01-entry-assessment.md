---
title: "[S-01] Entry assessment"
labels: [screen, surface]
---

# S-01 · Entry assessment

Surface 1 of 22 · canvas id `1a` · Onboarding & scheduling
Wireframe: `app/src/lib/components/surfaces/entry-assessment.svelte` → `/surfaces/entry-assessment`

## Matrix row

| | |
| --- | --- |
| **User sees** | Short listening, reading and speaking samples |
| **Primary action** | Respond naturally |
| **Instructional function** | Establish starting difficulty |
| **Ability exercised** | Auditory processing, verbal knowledge, retrieval |
| **Spread state** | `—` |

## Components

- `PlayButton`
- `Waveform`
- `SketchButton`
- `Chip`
- `MicButton`
- `ProductionCapture (new)`

## Data

- Calibration item bank spanning A0–B1
- Response capture (selection + speech)
- Entry-lesson placement output

## Acceptance criteria

- [ ] All three modalities (listen, read, speak) are sampled before placement
- [ ] No item is scored visibly to the learner — "no wrong answers" is literal
- [ ] Placement writes a starting lesson, not a level badge
- [ ] Speech sample is capturable and skippable without blocking placement

## Depends on

F-02
