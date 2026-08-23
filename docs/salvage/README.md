# PR #2 salvage manifest (issue #7)

Complete disposition of draft PR #2 (`b5c7f45`) against current `main`. Every
candidate is either PORTed through a child lane or explicitly REJECTed with a
reason — nothing is merged or rebased wholesale, per the lead ruling on #1.

## Totals

| Lane | File | Candidates | PORT | REJECT | Child issue |
|---|---|---|---|---|---|
| French 1–7 | [fr-lessons-01-07.md](fr-lessons-01-07.md) | 51 | 24 | 27 | #8 |
| French 8–14 | [fr-lessons-08-14.md](fr-lessons-08-14.md) | 58 | 40 | 18 | #9 |
| Tamil 1–7 | [ta-lessons-01-07.md](ta-lessons-01-07.md) | 63 | 33 | 30 | #10 |
| Tamil 8–14 | [ta-lessons-08-14.md](ta-lessons-08-14.md) | 60 | 31 | 29 | #11 |
| **Total** | | **232** | **128** | **104** | |

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
  Same author (this project), but ported text must carry main's provenance —
  called out in each lane for #8–#11.
- **Coordination points**: FR lanes both target main l10/l12/l13 — port in
  lane order (#8 then #9). TA lane files end with a dependency-safe port
  order.

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

With all 232 candidates accounted for, PR #2 is fully inventoried and can be
closed once the lead confirms this manifest (the branch remains as archival
source; lanes cite it by commit hash).
