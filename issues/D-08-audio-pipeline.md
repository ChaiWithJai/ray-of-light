---
title: "[D-08] Audio pipeline: segmentation, speeds, alignment"
labels: [data, audio, pipeline]
---

# D-08 · Audio pipeline: segmentation, speeds, alignment

Every canonical line needs native audio at normal and repetition speed, plus
chunk boundaries for shadowing (1j) and rough phoneme alignment for the
pronunciation waveform (1g).

Slow audio is recorded, not time-stretched — pedagogically the two are not
equivalent.

## Acceptance criteria

- [ ] Every canonical line has recorded normal and slow audio from the same speaker
- [ ] Chunk boundaries are phrase-level, never word-level
- [ ] Line-level offsets let the spread play a single line from a lesson-length file
- [ ] Alignment data is sufficient to draw a comparison waveform
- [ ] Audio is addressable per line, per chunk, and per lesson

## Depends on

D-01, D-02
