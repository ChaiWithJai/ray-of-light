---
title: "[D-05] Networking: API surface"
labels: [data, networking, api]
---

# D-05 · Networking: API surface

Deliberately small, because most work is local:

| Endpoint | Direction | Notes |
| --- | --- | --- |
| `GET /content/manifest` | down | Available lessons + content versions |
| `GET /content/lesson/:id` | down | Immutable bundle, long-cacheable |
| `GET /audio/*` | down | Immutable, CDN, range requests |
| `POST /evidence` | up | Batched append-only events |
| `GET /learner/state` | down | Derived state for a fresh device |
| `POST /production` | up | Optional speech artifacts |
| `POST /conversation` | both | Constrained partner turns (1u) |

Everything downward is immutable and cacheable. Everything upward is append-only
and idempotent by event id.

## Acceptance criteria

- [ ] Content and audio responses are immutable and long-cacheable
- [ ] Evidence POSTs are idempotent by client-generated event id
- [ ] Evidence is batched, never one request per interaction
- [ ] A fresh device can rebuild full derived state from `/learner/state`
- [ ] The lesson core functions with every upward endpoint unavailable

## Depends on

D-02, F-02
