---
title: "[S-07] Pronunciation layer"
labels: [screen, surface]
---

# S-07 · Pronunciation layer

Surface 7 of 22 · canvas id `1g` · The lesson core
Wireframe: `app/src/lib/components/surfaces/pronunciation.svelte` → `/surfaces/pronunciation`

## Matrix row

| | |
| --- | --- |
| **User sees** | Active line, replay and waveform — not scoring-heavy |
| **Primary action** | Listen and imitate |
| **Instructional function** | Phonological encoding |
| **Ability exercised** | Auditory processing, speech motor control |
| **Spread state** | `target-reading (overlay)` |

## Components

- `Waveform`
- `MicButton`
- `Chip`
- `ProductionCapture (new)`
- `LineAudio (new)`

## Data

- Native audio, normal + slow
- Learner recording
- Phoneme/rough alignment for waveform display

## Acceptance criteria

- [ ] Native and learner waveforms are shown for by-ear comparison
- [ ] No score, percentage, grade or red mark appears anywhere
- [ ] Normal and slow playback are both available
- [ ] Learner recordings are retained only as long as the comparison is on screen unless explicitly kept

## Depends on

D-08, D-09, F-07
