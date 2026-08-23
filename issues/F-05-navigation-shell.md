---
title: "[F-05] Navigation shell: exactly four destinations"
labels: [foundation, navigation]
---

# F-05 · Navigation shell: exactly four destinations

**Direction:** D6 — see `docs/architecture-map.md`

Today · Book · Phrases · Progress. Everything else lives inside a lesson or
under settings.

Vocabulary, grammar, pronunciation, exercises and AI chat explicitly do **not**
get top-level destinations — that fragments one coherent learning process into
product features.

The nav is a closed set. Adding a fifth destination re-opens this decision.

## Acceptance criteria

- [ ] Exactly four destinations exist in the nav
- [ ] Lesson surfaces render without the tab bar (they are inside a session)
- [ ] Settings is reachable from Today, not from the tab bar
- [ ] A route that would need a fifth destination fails review instead of adding one

## Depends on

—
