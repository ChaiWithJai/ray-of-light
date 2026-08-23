---
title: "[T-06] Microphone capture and transcription (never scoring)"
labels: [ticket, audio, feature]
---

# T-06 · Microphone capture and transcription (never scoring)

Every mic affordance is present and wired to UI state, but nothing records yet:
`MediaRecorder` plus a permission flow is unbuilt, and no transcription provider
is chosen.

**Hard constraint, from the spec and from issue #1's out-of-scope list:**
recognition may *transcribe* in order to diff an answer, but must never *score*
pronunciation. No percentages, no grades, no red marks. 1g compares by ear on
purpose; 1n asks the learner to notice a difference before showing the fix.

Failure to transcribe must degrade to by-ear comparison, never block progress.

## Acceptance criteria

- [ ] Recording works on mobile and desktop behind an explicit permission prompt
- [ ] Learner audio is kept only for the current comparison unless deliberately saved
- [ ] Transcription feeds difference detection only
- [ ] No numeric pronunciation output exists in any API or any surface
- [ ] Transcription failure degrades to by-ear comparison

## Depends on

T-01
