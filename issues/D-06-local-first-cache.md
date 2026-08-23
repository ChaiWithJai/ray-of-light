---
title: "[D-06] Local-first cache and offline lesson prefetch"
labels: [data, offline, networking]
---

# D-06 · Local-first cache and offline lesson prefetch

A lesson is a bounded, prefetchable unit: text plus normal and slow audio. Both
today's new lesson and today's recall lesson should be resident before the session
starts.

Evidence is written locally first and synced opportunistically. Losing
connectivity mid-lesson must be invisible.

## Acceptance criteria

- [ ] Today's scheduled lessons prefetch on app open
- [ ] A full lesson including audio completes with the network disabled
- [ ] Evidence written offline survives a reload and syncs later
- [ ] Cache eviction never removes a lesson scheduled within the next 7 days
- [ ] Storage pressure degrades slow audio first, never text

## Depends on

D-02, D-05
