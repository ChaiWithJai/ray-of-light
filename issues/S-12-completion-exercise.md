---
title: "[S-12] Completion exercise"
labels: [screen, surface]
---

# S-12 · Completion exercise

Surface 12 of 22 · canvas id `1l` · Checks & exercises (passive wave)
Wireframe: `app/src/lib/components/surfaces/completion-exercise.svelte` → `/surfaces/completion-exercise`

## Matrix row

| | |
| --- | --- |
| **User sees** | Sentence with one missing French element |
| **Primary action** | Supply missing language |
| **Instructional function** | Cue-supported retrieval |
| **Ability exercised** | Associative retrieval |
| **Spread state** | `—` |

## Components

- `SketchCard`
- `Blank`
- `Chip`
- `SketchButton`
- `EvidenceRecorder (new)`

## Data

- Target construction per lesson
- Distractor forms

## Acceptance criteria

- [ ] The missing element is always the lesson's target construction — never an arbitrary word
- [ ] Feedback states the rule, not just correct/incorrect
- [ ] A correct response emits cue-supported retrieval evidence, weaker than free recall
- [ ] Distractors are the plausible confusions for that construction

## Depends on

F-02, D-01
