# Salvage manifest — PR #2 French lessons 08–14 vs main `fr.ts` l8–l14

Part of issue #7 (salvage audit of draft PR #2, branch `claude-mac/issue-1-content`, commit `b5c7f45`).
Source read via `git show origin/claude-mac/issue-1-content:src/lib/content/fr/lesson-0N.ts`; main reference is `src/lib/content/fr.ts` (defineLesson DSL, ids namespaced `fr.<local-id>`).

## Ground rules applied

- **Topic maps diverge.** PR #2's lessons 8–14 (likes/dislikes, plans, time, transport, asking for help, feelings, synthesis) do not line up with main's l8–l14 (doctor, phone, groceries, weekend, post office, invitation, synthesis). Candidates are therefore mapped by **communicative function**, never by lesson number, and no main lesson is replaced wholesale.
- **Architecture = REJECT.** Anything that only exists because of PR #2's schema (raw `Lesson` objects, per-line `id`/`lessonId`/`audio` offsets, chunk ms timings, per-line `source`/`license`/`reviewStatus`, `lineId` exercise back-references, 4-option comprehension shape as a schema requirement) requires PR #2's registry/schema and is rejected. Ported text content must be re-expressed in main's `defineLesson` DSL.
- **PORT means "port via issue #9"**: re-authored into `fr.ts` under main's id conventions (`fr.<local-id>` minted for new constructions), with `carryConstructions` in l14 updated if a ported construction should be reviewed in synthesis.
- Every candidate has exactly one disposition.

**Global architectural rejects (apply to all seven lessons, counted once in the summary):** audio offset maps and chunk timings; per-line provenance blocks; per-line ids and `lineId` exercise references; the standalone-file/registry loading model (`import.meta.glob` manifest). Also flagged as a **risk, not a candidate**: PR #2 stamps every line `license: 'CC-BY-4.0'` while main's `FR_PROFILE` says `license: 'owned'` — resolved by the salvage ledger (`docs/salvage/ledger.json`), which records each ported fragment's true lineage (source commit, file, lesson, license-at-source); see the README's "Provenance and license lineage" section.

---

## PR lesson fr-08 — « J'adore, je déteste » (likes & dislikes)

No main lesson serves the "expressing tastes" function; candidates are placed where the function already surfaces in main (restaurant preference talk in l6, "what do we do" leisure talk in l11, informal rapport in l13).

| Candidate | What it adds over main | Disposition | Target in main | Risk notes |
|---|---|---|---|---|
| Construction `fr-jaime-noun` ("j'aime + le/la/les + noun") + definite-article grammar note | Core likes pattern; main never teaches aimer at all | PORT via issue #9 | l6 (Au restaurant) — mint `fr.jaime-noun`, seated next to `fr.je-prends` (stating a preference before choosing) | l6 already has 3 constructions + 9 lines; adding requires 1–2 new dialogue lines authored to fit the café scene |
| Construction `fr-aimer-infinitive` ("j'aime + infinitive") + "no to/-ing" note + recall exercise "J'aime danser." (+ "Moi, j'aime danser." variant) | Liking activities; pairs naturally with weekend talk | PORT via issue #9 | l11 (Le week-end) — mint `fr.aimer-inf`, alongside `fr.quest-ce-quon-fait` | Keep the ported recall's "Moi, …" fronting variants; they are good spoken-French acceptances |
| Construction `fr-je-naime-pas-dislike` + ne…pas elision note + recall "Je n'aime pas le café." | First explicit negation-of-aimer teaching; main only shows negation inside `fr.il-y-a` | PORT via issue #9 | l6 — mint `fr.je-naime-pas`, cross-referenced with l10's `fr.il-y-a` "pas de" note | Two negation notes (l6, l10) must not contradict; align wording during port |
| Construction `fr-adorer-detester` + comprehension "Je déteste le jazz…" | Strong ends of the liking scale | PORT via issue #9 | l6 — mint `fr.adorer-detester` as satellite of `fr.jaime-noun` | Low risk; purely additive vocabulary-level pattern |
| Construction `fr-moi-aussi-non-plus` + comprehension "Moi non plus !" | Agreement/disagreement rejoinders — a genuine conversational gap in main | PORT via issue #9 | l13 (Une invitation) — mint `fr.moi-aussi-non-plus`, fits the informal register of `fr.avec-plaisir` | Needs one authored line in l13's dialogue to introduce it in context |
| Elision pronunciation note ("j'adore, never je adore") | Main has no pronunciation-type notes at all in l1–l14 | PORT via issue #9 | Attach to `fr.jaime-noun` line in l6 | Verify main's note schema accepts `type: 'pronunciation'` (main currently uses only grammar/culture) — if the DSL enum lacks it, that becomes a schema change and flips this to REJECT |
| Full 10-line Marie/Antoine party dialogue | A complete alternate lesson | REJECT | — | Porting the whole dialogue would be a wholesale new lesson, out of scope for a salvage port; individual lines above travel with their constructions |
| Completion "J'aime ___ musique." (la/une/du) | Article drill | PORT via issue #9 | l6 — exercise on minted `fr.jaime-noun` | None |
| Transfer "colleague asks what films you like" (uses jaime + adorer-detester) | Transfer exercise for the ported cluster | PORT via issue #9 | l6 — transfer on `fr.jaime-noun` | Rewrite `useConstruction` to main's minted id |

## PR lesson fr-09 — "Making plans" (invitations, meeting up)

Function overlaps main l11 (Le week-end: `fr.on-va`, `fr.aller-inf`) and l13 (Une invitation: `fr.vouloir-venir`).

| Candidate | What it adds over main | Disposition | Target in main | Risk notes |
|---|---|---|---|---|
| Construction `fr-tu-es-libre` ("tu es libre + time ?") + week-end culture note + recall with variants ("T'es libre…", "Est-ce que tu es…") | Availability check before inviting — missing in main | PORT via issue #9 | l13 — mint `fr.tu-es-libre` as the natural opener before `fr.vouloir-venir` | "T'es libre" variant is very informal; keep as accepted, not canonical |
| Construction `fr-ca-te-dit-de-inf` + grammar note + recall "Ça te dit de manger une pizza ?" (incl. elliptical "Ça te dit une pizza ?") | Second high-frequency informal invitation pattern | PORT via issue #9 | l13 — mint `fr.ca-te-dit`, contrast with `fr.vouloir-venir` | Functional overlap with `fr.vouloir-venir` is deliberate (register pair); document the contrast in the note to avoid seeming duplicative |
| Construction `fr-on-va-inf-plan` | Duplicate of main's `fr.on-va` (introduced l11) | REJECT | — (function already owned by `fr.on-va`, main l11) | **Metadata conflict (issue #12):** PR declares introduction at fr-09 with label "on va + infinitive"; main introduces `fr.on-va` at l11. Do not port a second declaration |
| Construction `fr-on-pourrait-inf` ("we could…") + softening-gradation note | Tentative suggestion — a politeness step main lacks between statement and question | PORT via issue #9 | l11 — mint `fr.on-pourrait`, contrast with `fr.on-va` | Conditional form at A1 is fine as a fixed chunk; teach as chunk, not paradigm |
| Construction `fr-on-se-retrouve` ("on se retrouve + place/time") + completion (on-conjugation rule) + transfer (metro-station meetup) | Arranging a meeting point; main l11 has the *content* ("À dix heures, devant la gare") but never names the pattern | PORT via issue #9 | l11 — mint `fr.on-se-retrouve`, anchored on main's existing "devant la gare" line | Best-fit port in the whole PR: main's dialogue already supports it, only the declaration + exercises are new |
| Liaison pronunciation note "sept heures → sè-teur" | Obligatory-liaison teaching absent from main | PORT via issue #9 | l5 (À la gare) — attach to `fr.a-quelle-heure` ("À quatorze heures dix" line) | Same pronunciation-note-type caveat as fr-08 |
| Completion "Demain, on ___ visiter le musée." (va/vas/allez/vont) | Conjugation-contrast drill for on va | PORT via issue #9 | l11 — extra exercise on existing `fr.on-va` | Trim to 3 options to match main's house style (3-option completions) |
| Full 10-line cinema-plan dialogue + comprehension pair (fr-09-e01/e02) | Alternate plan-making scene | REJECT | — | Wholesale dialogue; its constructions travel individually above. Comprehensions depend on `lineId` refs into the rejected dialogue |
| Transfer "On pourrait faire une promenade dans le parc." | Transfer for on-pourrait | PORT via issue #9 | l11 — transfer on minted `fr.on-pourrait` | None |

## PR lesson fr-10 — "Time & schedules"

Function overlaps main l5 (À la gare: `fr.a-quelle-heure`) and l11 (weekend routine).

| Candidate | What it adds over main | Disposition | Target in main | Risk notes |
|---|---|---|---|---|
| Construction `fr-a-quelle-heure` | Duplicate of main's `fr.a-quelle-heure` (introduced l5) | REJECT | — (owned by `fr.a-quelle-heure`, main l5) | **Metadata conflict (issue #12):** same local id, but PR claims introduction at fr-10; main introduces at l5. Porting the declaration would corrupt introduction lineage |
| Spoken word-order note + recall "Tu commences à quelle heure ?" with fronted/est-ce que variants | Question-word-in-situ spoken register; main only shows fronted "À quelle heure part…" | PORT via issue #9 | l5 — note + extra recall on existing `fr.a-quelle-heure` | Good complement: main teaches the formal order, this adds the colloquial one |
| Construction `fr-il-est-heure` ("il est + heure") + "moins le quart" comprehension + completion (impersonal il rule) | Telling the time — main asks times but never teaches answering "Quelle heure est-il ?" | PORT via issue #9 | l5 — mint `fr.il-est-heure` | l5 dialogue needs 1–2 authored lines ("Quelle heure est-il ? — Il est…") to introduce it |
| Construction `fr-verbe-a-heure` ("verb + à + time") | Thin: main l5 already models this ("À quatorze heures dix") inside `fr.a-quelle-heure`, and l11 "À dix heures" likewise | REJECT | — (covered by `fr.a-quelle-heure` usage lines) | Declaring it separately fragments one function across two ids; not worth a new construction |
| Construction `fr-de-a-duree` ("de + time + à + time") + comprehension + recall + bakery-hours transfer | Time spans — genuinely missing (main's `fr.pour-duree` covers durations, not spans) | PORT via issue #9 | l5 — mint `fr.de-a-duree`, cross-noted against l2's `fr.pour-duree` | Recall accepts digit form "de 10 heures à 17 heures" — decide whether digits are acceptable answers before porting |
| Construction `fr-tous-les-habitual` ("tous les + plural day") + plural-s note + completion (tous/tout/toutes) + swimming-pool transfer | Habitual frequency — missing in main | PORT via issue #9 | l11 — mint `fr.tous-les`, fits weekend-routine talk | Trim completion to 3 options for house style |
| Pronunciation notes: "neuf heures → neu-veur"; grammar note "midi et demi / deux heures et demie" | Fine-grained time phonology/orthography | PORT via issue #9 | l5 — attach to minted `fr.il-est-heure` | demi/demie distinction is written-form knowledge; keep as note, not exercise |
| Full 10-line new-job schedule dialogue + its comprehension pair | Alternate scene | REJECT | — | Wholesale dialogue; constructions travel individually |

## PR lesson fr-11 — "Transportation"

Function overlaps main l4 (Dans la rue: directions) and l5 (À la gare: tickets/travel).

| Candidate | What it adds over main | Disposition | Target in main | Risk notes |
|---|---|---|---|---|
| Construction `fr-pour-aller-a` ("pour aller à + place ?") + grammar note + recall with 4 politeness variants | Second canonical way to ask directions; main only has `fr.ou-est` | PORT via issue #9 | l4 — mint `fr.pour-aller-a` beside `fr.ou-est` | Construction-level `notes` field ("works with any pour + infinitive") has no slot in main's tuple form `[id, label, gloss]` — fold it into a line note or drop; do not extend the DSL for it |
| Construction `fr-prendre-transport` ("prendre + le/la + transport") + bus-91 exemplar line | Taking transport; distinct from main's `fr.je-prends` (choosing food) | PORT via issue #9 | l5 — mint `fr.prendre-transport`, cross-noted with l6's `fr.je-prends` (same verb, different function) | Name carefully so learners see prendre's two uses as related, not conflicting |
| Construction `fr-il-faut-inf` | Duplicate of main's `fr.il-faut` (introduced l8) | REJECT | — (owned by `fr.il-faut`, main l8) | **Metadata conflict (issue #12):** PR declares introduction at fr-11; main introduces at l8. Also duplicate declaration carries a construction-level `notes` field main can't hold |
| Completion "___ prendre un ticket à la machine." (Il faut …) | Extra drill for il-faut in a transactional context | PORT via issue #9 | l8 — extra exercise on existing `fr.il-faut` | Options mix construction-phrases rather than single words — restyle to main's option format |
| Construction `fr-descendre-a` ("descendre à + stop") + comprehension ("c'est direct, vous descendez à…") | Getting off at a stop — missing in main | PORT via issue #9 | l5 — mint `fr.descendre-a` beside the ported `fr.prendre-transport` (station/transport context) | Target resolved to l5 (single target): l4's dialogue is on foot, while l5 already hosts this lane's transport ports. Introduction line must be authored (e.g. bus/métro aside) |
| Pronunciation note "quatre-vingt-onze = four-twenty-eleven; bus numbers read as one number" | Number-reading culture/phonology | PORT via issue #9 | l5 — attach near `fr.un-billet-pour` / platform-number line | None |
| Transfer "Tu prends le métro, ligne un, et tu descends à Palais-Royal." | Combined-construction transfer (prendre + descendre) | PORT via issue #9 | l5 — transfer on minted `fr.prendre-transport` | Main transfers use one `use` construction; keep `fr.prendre-transport` as the `use`, mention descendre in the exemplar only |
| Full 10-line métro-directions dialogue | Alternate scene | REJECT | — | Wholesale; overlaps main l4's function |

## PR lesson fr-12 — "Asking for help" (lost bag)

Function overlaps main l9 (Au téléphone: requests/permission) and l8 (Chez le médecin: "what's wrong" talk).

| Candidate | What it adds over main | Disposition | Target in main | Risk notes |
|---|---|---|---|---|
| Construction `fr-vous-pouvez-inf` ("vous pouvez + infinitive ?") + intonation-question note + recall with 4 variants (incl. inverted "pouvez-vous") | Asking others to act; main l9's `fr.est-ce-que-je-peux` covers only asking permission for oneself — this is the missing converse | PORT via issue #9 | l9 — mint `fr.vous-pouvez`, contrasted with `fr.est-ce-que-je-peux` | Commit message says PR unified this id across its files ("fr-vous-pouvez-inf" canonical); when porting, take fr-12's declaration, not fr-14's mutated one (see fr-14 row) |
| Construction `fr-jai-perdu-noun` ("j'ai perdu + noun", passé composé) + grammar note + completion | First past-tense teaching | REJECT | — | No main l1–l14 lesson serves "reporting past events"; porting would smuggle the passé composé system into an A1 course that deliberately stays in present/near-future. Content-scope reject, not schema |
| Construction `fr-je-cherche-noun` ("je cherche + noun") + "no pour" usage note | Looking-for pattern; genuinely useful and absent in main | PORT via issue #9 | l4 — mint `fr.je-cherche`, beside `fr.ou-est` (searching → asking where) | **Issue #12 flag:** declared in fr-12 but `introducedIn: 'fr-04'` — a re-declaration pointing at PR's lesson 4, i.e. declared where it is not introduced. Port must re-baseline introduction to the main lesson it lands in |
| Construction `fr-quest-ce-quil-y-a` ("Qu'est-ce qu'il y a ?") + compression pronunciation note ("kess-kya") | What's-the-matter opener | PORT via issue #9 | l8 — accepted variant + note on the existing "Qu'est-ce qui ne va pas ?" line; **no new id** | Near-synonym of main's existing opener; resolved to note/variant rather than a fourth l8 construction |
| Culture note "Oh là là = dismay, not excitement" | Corrects a common learner misreading | PORT via issue #9 | l8 — attach to a sympathy beat in the doctor dialogue (line to be chosen at port time) | Needs a host line; note is standalone-portable |
| Transfer "je cherche le quai numéro sept. Vous pouvez m'aider ?" | Combines both ported constructions in a station scene | PORT via issue #9 | l4 — transfer on minted `fr.je-cherche` | Rewrite ids; station setting also echoes l5 vocabulary — fine |
| Full 10-line lost-bag dialogue + comprehension fr-12-e01 | Alternate scene, built on the rejected passé composé | REJECT | — | Dialogue's dramatic spine is "j'ai perdu / je l'ai laissé" (passé composé + object pronoun) — unusable without the rejected grammar |

## PR lesson fr-13 — "Describing how one feels"

Function overlaps main l8 (Chez le médecin: `fr.jai-mal-a`, `fr.depuis`).

| Candidate | What it adds over main | Disposition | Target in main | Risk notes |
|---|---|---|---|---|
| Construction `fr-avoir-mal-a` + à-contraction grammar note | Duplicate of main's `fr.jai-mal-a` (introduced l8) | REJECT | — (owned by `fr.jai-mal-a`, main l8) | **Metadata conflict (issue #12):** different id for the same construction (`fr-avoir-mal-a` vs `fr.jai-mal-a`) and PR claims introduction at fr-13 vs main l8. Two ids for one function must not coexist |
| Completion "J'ai mal ___ ventre." (au / à la / aux / à) + contraction rule text | Drills au/aux contraction; main l8's completion only drills bare "à" | PORT via issue #9 | l8 — extra exercise on existing `fr.jai-mal-a` | Trim to 3 options; the rule text is a strict superset of main's — replace, don't duplicate |
| Construction `fr-se-sentir-adj` ("je me sens + adjective") + recall with masculine/feminine accepted variants (fatigué/fatiguée) | First reflexive verb + gender-agreement acceptance — missing in main | PORT via issue #9 | l8 — mint `fr.je-me-sens` | Keep the gendered accepted-answer pairs; they are the most valuable answer-variant salvage in the PR. Reflexive at A1 is fine as fixed chunk |
| Recall accepted variant "Jai mal a la tete." (diacritic-free) | Attempts input leniency via data | REJECT | — | Diacritic tolerance is an answer-normalization concern for the grading layer, not per-exercise data; encoding it in accepted lists is unmaintainable and inconsistent (only this one exercise does it) |
| Construction `fr-etre-adj-etat` ("être + state adjective") + ne-dropping pronunciation note ("je suis pas malade") | States (malade/stressé) + real spoken-register negation fact | PORT via issue #9 | l8 — mint `fr.je-suis-adj-etat` | The ne-dropping note must say "recognize it, write the full form" — as PR's wording already does |
| Construction `fr-avoir-l-air-adj` ("tu as l'air + adjective") + agreement note | Describing how someone else looks | PORT via issue #9 | l8 — mint `fr.avoir-lair` | Adjective agreement is introduced here for the first time; keep note-level, no drill |
| Construction `fr-ca-va-mieux` ("ça va (déjà) mieux") | Improvement formula — natural close for a health dialogue | PORT via issue #9 | l8 — mint `fr.ca-va-mieux` as the dialogue-closing beat | Low risk; one line + declaration |
| Culture note "une tisane — classic French home remedy" | Care-gesture culture point | PORT via issue #9 | l8 — attach to the doctor's advice line ("Il faut boire beaucoup d'eau…") | Slight host mismatch (doctor vs friend); adjust wording at port |
| Full 10-line office-kitchen dialogue + comprehension pair (ex01/ex02) + exam-nerves transfer | Alternate feelings scene | REJECT | — | Wholesale dialogue. Note: this would push l8 toward 6 constructions — port owner should confirm l8 can absorb the four minted ones above or split some into l14's carry list only |

## PR lesson fr-14 — "Review: a Saturday plan" (synthesis of PR 8–13)

Main l14 is also a synthesis, but of main's l8–l13 topic map. PR fr-14 reviews PR's own topic map and re-declares eight constructions.

| Candidate | What it adds over main | Disposition | Target in main | Risk notes |
|---|---|---|---|---|
| Re-declared construction set (fr-jaime-noun, fr-je-naime-pas-dislike, fr-on-va-inf-plan, fr-a-quelle-heure, fr-prendre-transport, fr-vous-pouvez-inf, fr-se-sentir-adj, fr-avoir-mal-a) | Nothing — synthesis-side duplicates | REJECT | — (main l14 handles this via `carryConstructions`; ported constructions should be added to l14's carry list instead) | **Metadata conflicts (issue #12):** fr-14's copies have drifted from their origin declarations — `fr-vous-pouvez-inf` label mutates to "tu peux + infinitive ? (asking for help)" (fr-12 declared "vous pouvez + infinitive ?"), and `fr-jaime-noun` gloss absorbs the infinitive use that fr-08 assigns to the separate `fr-aimer-infinitive`. Re-declaration with divergent metadata is exactly the failure mode `carryConstructions` exists to prevent |
| 7-line phone-call review dialogue | Alternate synthesis scene | REJECT | — | Depends on the PR topic map (likes + transport + feelings); main l14 reviews main's l8–l13. Porting would replace main l14 wholesale |
| Grammar note on pronoun "y" ("y aller = to go there") | New grammar point | REJECT | — | Introduces the adverbial pronoun inside a *synthesis* lesson (new material where only review belongs) and depends on the rejected dialogue line; also outside every main construction's scope |
| Recall "À quelle heure on part ?" with 4 word-order variants | Colloquial variant set for a-quelle-heure | PORT via issue #9 | l5 — extra recall/accepted variants on existing `fr.a-quelle-heure` (merge with the fr-10 word-order port; one combined exercise, counted separately here because it originates in fr-14) | Deduplicate against the fr-10 recall during the port so l5 doesn't gain two near-identical recalls |
| Recall "On prend le bus." (accepts "Nous prenons le bus.") | on/nous equivalence in accepted answers | PORT via issue #9 | l5 — recall on minted `fr.prendre-transport` | Only valid if the fr-11 `fr.prendre-transport` port lands; sequence in issue #9 accordingly |
| Comprehension fr-14-ex01 (tu peux m'aider / mal au dos) | Review comprehension | REJECT | — | References the rejected dialogue's lines and PR's tu-peux register shift; main l14's synthesis format has a single transfer, by design |
| Transfer fr-14-ex04 "Tu peux m'aider à porter les cartons dimanche ?" | Informal-register (tu) variant of the help request | PORT via issue #9 | l9 — transfer on minted `fr.vous-pouvez`, exemplar teaching the tu/vous switch | Port only with the fr-12 `fr.vous-pouvez` port; adjust the note to make tu-vs-vous explicit |
| Multi-construction performance transfer fr-14-ex05 (play one side of the call, 4–5 sentences) | A richer synthesis-exercise *format* (guided multi-construction performance) than main l14's single adapt-the-dialogue transfer | REJECT | — | The exercise text depends on five PR constructions and its multi-`constructions` performance framing; main's transfer shape carries one `use` id. Worth noting as format inspiration for a future issue, but as content it cannot port without the PR exercise schema |

---

## Construction metadata conflicts and issue #12 flags (consolidated)

1. `fr-a-quelle-heure` (PR fr-10) vs main `fr.a-quelle-heure` (l5) — same local id, conflicting `introducedIn` and label. REJECTED declaration; notes/variants ported.
2. `fr-il-faut-inf` (PR fr-11) vs main `fr.il-faut` (l8) — same function, different id, conflicting introduction lesson. REJECTED declaration; one exercise ported.
3. `fr-on-va-inf-plan` (PR fr-09) vs main `fr.on-va` (l11) — same function, different id, conflicting introduction lesson. REJECTED declaration; one drill ported.
4. `fr-avoir-mal-a` (PR fr-13) vs main `fr.jai-mal-a` (l8) — same function, different id, conflicting introduction lesson. REJECTED declaration; contraction exercise ported.
5. `fr-je-cherche-noun` declared in fr-12 with `introducedIn: 'fr-04'` — declared outside its claimed introduction lesson (re-declaration in a regular lesson, the pattern PR #2's own reconciliation pass was meant to eliminate). Ported with introduction re-baselined.
6. fr-14 re-declarations drift from origin metadata (`fr-vous-pouvez-inf` label vous→tu; `fr-jaime-noun` gloss absorbs `fr-aimer-infinitive`'s territory). REJECTED.
7. No declared-but-line-unreferenced constructions were found in PR lessons 08–14 (every declared id appears in at least one line); the issue #12 exposure in this range is entirely the re-declaration/metadata-drift class above.
8. Construction-level `notes` fields (fr-11's `fr-pour-aller-a`, `fr-il-faut-inf`; fr-12's `fr-vous-pouvez-inf`, `fr-jai-perdu-noun`, `fr-je-cherche-noun`) have no equivalent in main's `[id, label, gloss]` tuples — where ported, fold into line notes; extending the DSL for them is an architecture change and out of scope.
9. License lineage: PR lines carry `CC-BY-4.0`; main profile says `owned`. Must be resolved in issue #9 before any ported text ships.

## Summary counts

| Lesson | PORT via issue #9 | REJECT | Total candidates |
|---|---|---|---|
| fr-08 | 8 | 1 | 9 |
| fr-09 | 7 | 2 | 9 |
| fr-10 | 5 | 3 | 8 |
| fr-11 | 6 | 2 | 8 |
| fr-12 | 5 | 2 | 7 |
| fr-13 | 6 | 3 | 9 |
| fr-14 | 3 | 5 | 8 |
| Global architectural rejects (schema/registry/audio/ids) | 0 | 1 | 1 |
| **Total** | **40** | **19** | **59** |

(Counts corrected against the per-lesson tables and `ledger.json`: fr-08 has 9
candidate rows of which 8 PORT; fr-13 has 6 PORT / 3 REJECT. The lane's PORT
total of 40 is unchanged.)

New constructions to mint in main if all PORTs land: `fr.jaime-noun`, `fr.aimer-inf`, `fr.je-naime-pas`, `fr.adorer-detester`, `fr.moi-aussi-non-plus`, `fr.tu-es-libre`, `fr.ca-te-dit`, `fr.on-pourrait`, `fr.on-se-retrouve`, `fr.il-est-heure`, `fr.de-a-duree`, `fr.tous-les`, `fr.pour-aller-a`, `fr.prendre-transport`, `fr.descendre-a`, `fr.vous-pouvez`, `fr.je-cherche`, `fr.je-me-sens`, `fr.je-suis-adj-etat`, `fr.avoir-lair`, `fr.ca-va-mieux` (21; `fr.quest-ce-quil-y-a` is **not** minted — that candidate ports as a variant/note). Main lessons touched: l4, l5, l6, l8, l9, l11, l13, plus l14 `carryConstructions` updates. No main lesson is replaced.
