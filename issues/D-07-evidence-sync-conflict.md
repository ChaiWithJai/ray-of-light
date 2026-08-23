---
title: "[D-07] Evidence sync and conflict resolution"
labels: [data, sync, networking]
---

# D-07 · Evidence sync and conflict resolution

Because the evidence log is append-only (F-02), sync is a merge of two event
sets rather than a conflict over mutable fields. Ordering is by event timestamp
with a client id tiebreak; derived state is recomputed after merge.

The one real hazard is clock skew affecting `stabilized`, which depends on
"distinct calendar days".

## Acceptance criteria

- [ ] Sync merges event sets without any last-write-wins field overwrite
- [ ] Duplicate events are idempotent by event id
- [ ] Derived state is recomputed after every merge
- [ ] Distinct-day determination is resilient to client clock skew and timezone travel
- [ ] Two devices used offline on the same day converge correctly

## Depends on

F-02, D-05
