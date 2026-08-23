---
title: "[T-05] Find a usable-licence source for Tamil morphology"
labels: [ticket, data, legal]
---

# T-05 · Find a usable-licence source for Tamil morphology

French morphology is sourced from UD_French-GSD (CC BY-SA 4.0) and wired into
the notes drawer. Tamil has no equivalent, and this is a **licence** problem, not
a network one: **UD_Tamil-TTB is CC BY-NC-SA 3.0 — non-commercial.**

It is excluded deliberately, and `morphology.test.ts` asserts Tamil has no lexicon
so that nobody "fixes" it by vendoring an NC corpus by accident.

Also note CC BY-SA 4.0 is **share-alike**: the derived French lexicon carries that
obligation, which is why it is isolated in `data/reference/` instead of merged
into the canonical corpus.

Options: a differently-licensed Tamil treebank; a commercial licence for TTB; or a
native linguist annotating our own 14 lessons directly (small — ~110 lines).

## Acceptance criteria

- [ ] A Tamil morphology source is identified with a licence compatible with shipping
- [ ] Or our own lines are annotated directly and owned outright
- [ ] `data/reference/LICENSE.md` updated with the decision
- [ ] The test asserting no Tamil lexicon is updated deliberately, not incidentally

## Depends on

—
