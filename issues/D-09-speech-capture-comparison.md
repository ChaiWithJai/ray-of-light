---
title: "[D-09] Speech capture and by-ear comparison (no scoring)"
labels: [data, audio, speech]
---

# D-09 · Speech capture and by-ear comparison (no scoring)

Capture the learner's production for comparison (1g), reconstruction (1m) and
diagnosis (1n). Recognition may be used to *transcribe* for comparison — never to
*score* pronunciation.

D10 is a hard constraint here: no percentages, no grades, no red marks. The
learner compares by ear.

## Acceptance criteria

- [ ] Recording works on mobile and desktop with an explicit permission flow
- [ ] Learner audio is retained only for the current comparison unless kept deliberately
- [ ] Transcription is used for difference detection, never for a pronunciation score
- [ ] No numeric pronunciation output exists in any API or UI
- [ ] Failure to transcribe degrades to by-ear comparison rather than blocking

## Depends on

D-08
