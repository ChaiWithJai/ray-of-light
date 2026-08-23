---
title: "[S-20] Phrase library"
labels: [screen, surface]
---

# S-20 · Phrase library

Surface 20 of 22 · canvas id `1t` · Book-wide surfaces (persistent nav)
Wireframe: `app/src/lib/components/surfaces/phrase-library.svelte` → `/surfaces/phrase-library`

## Matrix row

| | |
| --- | --- |
| **User sees** | Previously learned constructions in context |
| **Primary action** | Search, listen or rehearse |
| **Instructional function** | Support real-world reuse |
| **Ability exercised** | Crystallized knowledge |
| **Spread state** | `—` |

## Components

- `SearchField`
- `Chip`
- `SketchCard`
- `PlayButton`
- `SketchButton`
- `TabBar`

## Data

- Learned constructions with source lesson
- Intent-style search index ("how do I ask for…")
- Per-phrase audio

## Acceptance criteria

- [ ] Only constructions the learner has actually met are listed
- [ ] Each entry cites its source lesson and keeps its original context
- [ ] Search is intent-shaped, not just substring matching
- [ ] Selected phrases can be rehearsed aloud as a set
- [ ] This is not a flashcard deck — no SRS cards, no ratings here

## Depends on

F-02, F-05
