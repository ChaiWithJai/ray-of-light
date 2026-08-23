---
title: "[S-10] Echo practice"
labels: [screen, surface]
---

# S-10 · Echo practice

Surface 10 of 22 · canvas id `1j` · Checks & exercises (passive wave)
Design reference: `src/lib/components/surfaces/echo-practice.svelte` → `/surfaces/echo-practice`

## Matrix row

| | |
| --- | --- |
| **User sees** | French visible with segmented audio |
| **Primary action** | Shadow the speaker |
| **Instructional function** | Develop pronunciation and phrase chunking |
| **Ability exercised** | Auditory memory |
| **Spread state** | `shadowing` |

## Components

- `Spread (new, state=shadowing)`
- `Chip`
- `Waveform`
- `MicButton`
- `LineAudio (new)`

## Data

- Chunk boundaries per line
- Chunk-level audio segments

## Acceptance criteria

- [ ] Audio is segmented into chunks, not played word by word
- [ ] The current chunk is visually marked while playing
- [ ] Replay-chunk and whole-line controls both operate on the current line
- [ ] Learner repeats immediately after each chunk, on the speaker's heels

## Depends on

D-08, F-07
