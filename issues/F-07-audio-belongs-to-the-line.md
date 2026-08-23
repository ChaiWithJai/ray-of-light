---
title: "[F-07] Audio binds to the target line, not to the screen"
labels: [foundation, audio, spread]
---

# F-07 · Audio binds to the target line, not to the screen

**Direction:** D4 — see `docs/architecture-map.md`

Audio is attached to the target-language line. Tapping the French line replays
French. This is what makes sound ↔ form ↔ meaning a three-way mapping rather than
a sequence of steps, and it is why there is no global player chrome.

The transport in 1e (⏮ ▶ ⏭) operates on "current line", and the current line is
spread state — so transport and reading anchor are the same cursor.

## Acceptance criteria

- [ ] Audio handles hang off the line model, not off screen-level state
- [ ] Tapping a target line replays that line
- [ ] Transport prev/next moves the reading anchor, and vice versa
- [ ] Segmented (chunk) playback for shadowing addresses the same line model
- [ ] No global/persistent player chrome exists anywhere

## Depends on

F-01, F-03
