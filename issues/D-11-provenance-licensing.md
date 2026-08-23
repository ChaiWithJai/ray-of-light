---
title: "[D-11] Provenance and licensing enforcement at ingest"
labels: [data, legal, pipeline]
---

# D-11 · Provenance and licensing enforcement at ingest

The sourcing model is: **own the canonical content, supplement with open
corpora, never source the curriculum from Assimil.** Assimil is the interaction
reference only.

| Layer | Use | Constraint |
| --- | --- | --- |
| Canonical dialogues | Curriculum | Original, owned, two native reviewers |
| Native audio | Curriculum | Commissioned for those exact lines |
| Tatoeba | Examples, assessment candidates | Per-record licence varies — import only supported licences |
| Common Voice (fr/ta) | Accent exposure, ASR testing | CC0; not a course |
| Universal Dependencies | Morphology/syntax annotation | Infrastructure, not teaching content |
| OPUS / Samanantar | Pattern research | Per-corpus licences; do not publish raw pairs blindly |
| Wiktionary | Dictionary layer | Editorial review required |
| FSI (public domain) | Structural/pronunciation reference | Dated — modernise, don't present as-is |

AI may draft variations; it may never certify canonical French or Tamil.

## Acceptance criteria

- [ ] Every record carries `source`, `license`, `review_status`
- [ ] Content without two native reviewers cannot enter the canonical corpus
- [ ] Per-record licence checking on Tatoeba import — not blanket assumption
- [ ] Open-corpus material is structurally prevented from entering the teaching sequence
- [ ] A licence audit can be produced for any shipped lesson

## Depends on

D-01, D-02
