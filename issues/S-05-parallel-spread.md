---
title: "[S-05] Parallel spread"
labels: [screen, surface]
---

# S-05 · Parallel spread

Surface 5 of 22 · canvas id `1e` · The lesson core
Design reference: `src/lib/components/surfaces/parallel-spread.svelte` → `/surfaces/parallel-spread`

## Matrix row

| | |
| --- | --- |
| **User sees** | French and English in aligned columns |
| **Primary action** | Track corresponding lines |
| **Instructional function** | Bind sound, form and meaning |
| **Ability exercised** | Verbal knowledge, working memory |
| **Spread state** | `parallel-reading` |

## Components

- `Spread (new)`
- `PairRow`
- `RepresentationStack (new)`
- `LineAudio (new)`
- `ReadingAnchor (new)`
- `NotesAnchor (new)`

## Data

- Aligned line pairs with shared numbers
- Per-line audio offsets
- Word-anchored notes

## Acceptance criteria

- [ ] Pairs stay horizontally aligned and share a sentence number
- [ ] Both columns scroll together — never independently
- [ ] Exactly one restrained highlight marks the current pair
- [ ] Tapping the target line replays its audio
- [ ] Either column can be covered without any layout change
- [ ] This state is the default entry point to the lesson core

## Depends on

F-01, F-03, F-04, F-07
