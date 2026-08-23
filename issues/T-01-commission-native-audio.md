---
title: "[T-01] Commission native audio for all 28 lessons"
labels: [ticket, content, blocked]
---

# T-01 · Commission native audio for all 28 lessons

AC 8 requires sentence-level audio for every canonical line. The text ships;
the audio does not. No native speakers are available to an agent, and synthesised
speech is the wrong pedagogy for a product built on imitation.

**Everything except the bytes is already built.** `AudioClip` carries
`startMs`/`endMs` so one clean recording per lesson can be sliced per sentence,
`chunks` carries phrase-level boundaries for shadowing, and slow playback is
derived via `playbackRate` (issue #1 permits time-stretch). Every line is flagged
`audio.pending: true`, and the UI says so plainly instead of showing a dead player.

Filling in `normalUrl` and the offsets completes AC 8 with no code change.

## Acceptance criteria

- [ ] One native speaker recruited per language (fr, ta — Chennai-oriented spoken)
- [ ] One clean recording per lesson, consistent pace and room
- [ ] Sentence offsets filled into each line's `audio.startMs` / `endMs`
- [ ] Phrase-level chunk boundaries confirmed against the recording
- [ ] `audio.pending` flipped to false; the pending-audio notices disappear on their own

## Depends on

—
