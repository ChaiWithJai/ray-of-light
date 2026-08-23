---
title: "[F-03] ReadingAnchor: joint attention with an accessible equivalent"
labels: [foundation, spread, accessibility]
---

# F-03 · ReadingAnchor: joint attention with an accessible equivalent

**Direction:** D5 — see `docs/architecture-map.md`

Two-finger tracking recreates joint attention across form and meaning. The
*effect* is required; the gesture is not. Multitouch must never be required to
progress.

One abstraction — `ReadingAnchor`, which reports the current pair — with three
interchangeable drivers:

1. **Two-touch** — one anchor per column, both move together, lifting one does not advance.
2. **Single cross-column guide** — the accessible default, already exposed in 1v as `Two-finger tracking → single-guide`.
3. **Keyboard** — ↑/↓ moves exactly one aligned pair.

On desktop, hovering either sentence highlights both.

## Acceptance criteria

- [ ] All three drivers produce identical current-pair state
- [ ] Dragging either anchor moves both; lifting one anchor does not advance the lesson
- [ ] Audio follows the current pair regardless of which driver is active
- [ ] The lesson is fully completable with keyboard only
- [ ] The 1v setting switches drivers at runtime without losing position

## Depends on

F-01
