---
title: "[S-04] Audio preview"
labels: [screen, surface]
---

# S-04 · Audio preview

Surface 4 of 22 · canvas id `1d` · The lesson core
Wireframe: `app/src/lib/components/surfaces/audio-preview.svelte` → `/surfaces/audio-preview`

## Matrix row

| | |
| --- | --- |
| **User sees** | Minimal player; no text initially |
| **Primary action** | Listen without reading |
| **Instructional function** | Unbiased sound perception |
| **Ability exercised** | Auditory processing |
| **Spread state** | `sound-exposure` |

## Components

- `Spread (new, state=sound-exposure)`
- `PlayButton`
- `LineAudio (new)`

## Data

- Full-lesson audio, normal speed
- Listen-count state

## Acceptance criteria

- [ ] No target text or translation is reachable in this state
- [ ] Listen count is tracked and gates the advance affordance
- [ ] This is a state of `Spread`, not a standalone route
- [ ] Advancing moves to `meaning-orientation` or `parallel-reading`, never straight to an exercise

## Depends on

F-01, F-07
