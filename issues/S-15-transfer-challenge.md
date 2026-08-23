---
title: "[S-15] Transfer challenge"
labels: [screen, surface]
---

# S-15 · Transfer challenge

Surface 15 of 22 · canvas id `1o` · Active wave (Day 50+)
Design reference: `src/lib/components/surfaces/transfer-challenge.svelte` → `/surfaces/transfer-challenge`

## Matrix row

| | |
| --- | --- |
| **User sees** | New situation using an old construction |
| **Primary action** | Create a new sentence |
| **Instructional function** | Generalize beyond memorization |
| **Ability exercised** | Fluid reasoning |
| **Spread state** | `transfer` |

## Components

- `SketchCard`
- `Chip`
- `AnswerField`
- `MicButton`
- `EvidenceRecorder (new)`

## Data

- Situation prompts (3 per lesson)
- Named construction to reuse
- Validity checking + reviewed exemplars

## Acceptance criteria

- [ ] The situation is new; the construction is one the learner already owns
- [ ] The construction being exercised is named explicitly to the learner
- [ ] A novel valid production emits `transferable` evidence
- [ ] Validity is judged on construction use, not exact string match
- [ ] Prompts can be personalised to the learner's own situations

## Depends on

F-02, D-12
