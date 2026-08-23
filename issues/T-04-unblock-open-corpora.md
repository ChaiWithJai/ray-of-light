---
title: "[T-04] Ingest the blocked open corpora (Tatoeba, Common Voice, Wiktionary, FSI)"
labels: [ticket, data, blocked]
---

# T-04 · Ingest the blocked open corpora (Tatoeba, Common Voice, Wiktionary, FSI)

These hosts return **403 policy denials** at this environment's egress proxy, so
the supplementary-data layers are unbuilt:

| Host | Intended use |
| --- | --- |
| `downloads.tatoeba.org` | Supplementary sentence pairs, assessment candidates |
| `commonvoice.mozilla.org` | Accent exposure, ASR robustness testing |
| `kaikki.org` | Wiktionary extracts for the dictionary layer |
| `archive.org` | Public-domain FSI French course, as a structural reference |

UD was reachable and **is** sourced — see `scripts/source-ud.mjs`, which is the
template to follow for each of these.

Per-record licence checking is mandatory for Tatoeba: its sentences and audio
carry differing licences, and a blanket import would be wrong. FSI is public
domain but dated — modernise, do not present as-is.

## Acceptance criteria

- [ ] Hosts allowlisted, or datasets fetched elsewhere and committed
- [ ] Each import records `source`, `license` and `reviewStatus` per record
- [ ] Tatoeba import checks licences per record, not per corpus
- [ ] Open-corpus material is structurally prevented from entering the teaching sequence
- [ ] A licence audit can be produced for any shipped lesson

## Depends on

—
