# PR #2 salvage manifest (issue #7)

Complete disposition of draft PR #2 (`b5c7f45`) against current `main`. Every
candidate is either PORTed through a child lane or explicitly REJECTed with a
reason — nothing is merged or rebased wholesale, per the lead ruling on #1.

Two artifacts per decision class: the four **prose lane manifests** below carry
the rationale for every candidate, and **[`ledger.json`](ledger.json)** is the
authoritative machine-readable index of every PORT decision (see
[Machine-readable ledger](#machine-readable-ledger)).

## Totals

| Lane | File | Candidates | PORT | REJECT | Child issue |
|---|---|---|---|---|---|
| French 1–7 | [fr-lessons-01-07.md](fr-lessons-01-07.md) | 51 | 24 | 27 | #8 |
| French 8–14 | [fr-lessons-08-14.md](fr-lessons-08-14.md) | 59 | 40 | 19 | #9 |
| Tamil 1–7 | [ta-lessons-01-07.md](ta-lessons-01-07.md) | 63 | 33 | 30 | #10 |
| Tamil 8–14 | [ta-lessons-08-14.md](ta-lessons-08-14.md) | 60 | 31 | 29 | #11 |
| **Total** | | **233** | **128** | **105** | |

(French 8–14's candidate/REJECT counts were corrected by one against that
manifest's own per-lesson tables when `ledger.json` was built; its PORT count
of 40 — and the grand PORT total of 128 — are unchanged.)

## Blanket rejections (all lanes)

PR #2's registry, per-lesson `Lesson` literals, hand-written ids, per-line
audio/provenance blocks, `CC-BY-4.0` stamps, `A0` levels, and glob loading are
rejected as architecture — the safe unit is a reviewed content fragment, not a
file (issue #7 occurrence A). Every PORT is additive into main's
`defineLesson` DSL and `fr.<id>`/`ta.<id>` namespaces. No main lesson is
replaced wholesale.

## Cross-lane rules discovered during audit

- **Map by communicative function, never lesson number** — both courses cover
  the topic map in different orders (main fr-l1 = café; PR fr-01 = greetings).
- **Register rule (Tamil)**: PR text more literary than main's equivalent is
  rejected; PR text more colloquial ports as accepted variants/notes. One
  literary reject (வேண்டாம் → main uses வேணாம்); most PR Tamil is at or above
  main's colloquialism.
- **Construction conflicts route to main-owned ids**: where PR duplicates a
  construction main already introduces (e.g. `fr-a-quelle-heure`,
  `ta-romba-intensifier`), the declaration is rejected and only its
  notes/exercises port to the canonical id. Issue #12's invariants (PR #14)
  must be in place before any port lands.
- **License lineage**: PR lines say `CC-BY-4.0`; main's profiles say `owned`.
  See [Provenance and license lineage](#provenance-and-license-lineage) — the
  lineage of every ported fragment is recorded in `ledger.json` and is never
  silently relabeled.
- **Coordination points**: FR lanes both target main l10/l12/l13 — port in
  lane order (#8 then #9). TA lane files end with a dependency-safe port
  order.

## Provenance and license lineage

Every ported fragment was authored on PR #2 (branch `claude-mac/issue-1-content`,
commit `b5c7f45`) and stamped `CC-BY-4.0` there. That lineage is **never
silently relabeled** as `owned`:

- Every ported fragment keeps explicit recorded lineage — source commit, source
  file, source lesson, and license-at-source — as an entry in
  [`ledger.json`](ledger.json). The prose lane manifests pin each fragment's
  approximate location within its source lesson (line/exercise ids).
- The in-code profile stamp (`license: 'owned'` on `FR_PROFILE`/`TA_PROFILE`)
  may remain the **mechanical default** for ported text ONLY because the ledger
  preserves the true per-fragment lineage. The stamp is a schema convenience,
  not a provenance claim.
- Any future licensing decision consults the ledger, never the profile stamp.
- Same-author-same-project is context for why the port is low-risk; it is not
  permission to erase the trail.

## Machine-readable ledger

[`ledger.json`](ledger.json), validated by
[`ledger.schema.json`](ledger.schema.json), is the **authoritative
machine-readable index** of every PORT decision — one entry per PORT row across
the four lane manifests (24 + 40 + 33 + 31 = 128). The prose tables remain the
rationale; when prose and ledger disagree on a mechanical fact (counts, targets,
lineage), the ledger wins and the prose gets fixed.

Each entry records: stable `id`, execution `lane` (#8–#11), `language`, `kind`
(note / exercise / accepted-variant / line-pair / construction / tag),
`sourceCommit` (`b5c7f45`), `sourceFile`, `sourceLesson`, `targetLesson`,
`targetConstruction` (canonical main-side id, or null), `licenseAtSource`
(`CC-BY-4.0`), and `status`. All entries start as `"planned"`; **port commits
in lanes #8–#11 flip each landed entry's `status` to `"ported"` as they land.**

Validate with:

```
node docs/salvage/validate-ledger.mjs
```

(no dependencies; checks schema conformance, id uniqueness, lane/language
consistency, and the per-lane entry counts above).

## Notable single decisions

- PORT: three Tamil patterns main already *uses undeclared* (`ta.manikku`,
  `ta.chittu-sequence`, -ஆ question) — naming what is already taught.
- PORT: `ta-naa-conditional` explains main l11's shipped but unexplained
  «மழை பெய்யலைன்னா!» line.
- REJECT: `fr-jai-perdu-noun` (smuggles passé composé into an A1
  present/near-future course).
- REJECT: PR fr lessons 5–6 domains (family, reflexive routine) — no main
  lesson anchors them; porting would be new-lesson authoring, out of scope.
- REJECT: two PR Tamil culture claims that contradict shipped main
  constructions, pending native review (#13's queue is the venue).

## Disposition of PR #2 itself

With all 233 candidates accounted for, PR #2 is fully inventoried and can be
closed once the lead confirms this manifest (the branch remains as archival
source; lanes cite it by commit hash).
