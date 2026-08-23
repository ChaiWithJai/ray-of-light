---
title: "[S-22] Settings / accessibility"
labels: [screen, surface]
---

# S-22 · Settings / accessibility

Surface 22 of 22 · canvas id `1v` · Book-wide surfaces (persistent nav)
Design reference: `src/lib/components/surfaces/settings.svelte` → `/surfaces/settings`

## Matrix row

| | |
| --- | --- |
| **User sees** | Playback speed, text size, transliteration and reminder settings |
| **Primary action** | Adjust environment |
| **Instructional function** | Reduce irrelevant cognitive load |
| **Ability exercised** | Access support |
| **Spread state** | `—` |

## Components

- `SketchCard`
- `Chip`
- `SketchSlider`
- `Pill`

## Data

- Preferences store
- Transliteration progression state

## Acceptance criteria

- [ ] Every control reduces load — none teaches
- [ ] Two-finger tracking can be swapped for a single linked guide
- [ ] Transliteration is framed as a temporary scaffold with a nudge around L30
- [ ] Audio speed includes a slow-first-listen option
- [ ] Text size scales the spread without breaking pair alignment

## Depends on

F-03, F-04
