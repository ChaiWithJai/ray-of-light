---
title: "[S-11] Translation exercise (target → source)"
labels: [screen, surface]
---

# S-11 · Translation exercise (target → source)

Surface 11 of 22 · canvas id `1k` · Checks & exercises (passive wave)
Design reference: `src/lib/components/surfaces/translation-exercise.svelte` → `/surfaces/translation-exercise`

## Matrix row

| | |
| --- | --- |
| **User sees** | French prompt with English response |
| **Primary action** | Translate into English |
| **Instructional function** | Confirm precise comprehension |
| **Ability exercised** | Verbal comprehension |
| **Spread state** | `—` |

## Components

- `SketchCard`
- `AnswerField`
- `SketchButton`
- `MicButton`
- `EvidenceRecorder (new)`

## Data

- Accepted answer variants (2–5, human-reviewed)
- Literal gloss per line

## Acceptance criteria

- [ ] Typed and dictated responses are both accepted
- [ ] Feedback shows the literal gloss alongside the natural translation
- [ ] Accepted variants come from the reviewed variant set, not fuzzy matching alone
- [ ] A correct response emits `recognized` evidence

## Depends on

F-02, D-01
