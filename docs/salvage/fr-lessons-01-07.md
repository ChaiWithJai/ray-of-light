# Salvage manifest — French lessons 1–7 (PR #2 → main)

Parent: issue #7 (salvage PR #2 via manifest, not merge). Execution lane: issue #8. Invariants: issue #12.

Source: branch `claude-mac/issue-1-content` at `b5c7f45`, files `src/lib/content/fr/lesson-01.ts` … `lesson-07.ts` (full `Lesson` literals).
Target: `main` `src/lib/content/fr.ts` (authored via `defineLesson`, construction ids namespaced `fr.<local-id>` by `define.ts`).

## Ground rules applied

1. **Map by communicative function, not lesson number.** The two courses teach in different orders (main l1 = café; PR #2 l1 = greetings). See the function map below.
2. **Safe unit = reviewed content fragment** (a note, a line pair, an exercise, an accepted-answer list, or one construction with its teaching anchor). Never a file, never a whole lesson.
3. **Blanket REJECT — architecture and metadata carriers** (per issue #7, not repeated per row):
   - The full-`Lesson`-literal authoring shape, hand-written line/exercise ids (`fr-0N-lNN`, `fr-0N-eNN`), and PR #2's glob loader/`CourseManifest` builder.
   - All placeholder audio offsets, `speakerId: 'fr-speaker-1'` (main: `fr_f_01`), and audio URLs — main derives audio addressing in `define.ts` from `audio-offsets.json`.
   - PR #2 provenance fields (`license: 'CC-BY-4.0'` conflicts with main `license: 'owned'`; ported prose adopts `FR_PROFILE` provenance and stays `reviewStatus: 'draft'`).
   - `level: 'A0'` (main's FR course is uniformly `A1`).
   - The flat `fr-…` construction namespace. Every ported construction is re-keyed into main's `fr.<local-id>` space; PORTed new ids below name their proposed main-side local id.
4. **Issue #12 flags** are called out inline: metadata conflicts (same id, different label/gloss) and phantom declarations (declared, never referenced by a line or exercise in the introducing lesson).

## Function map (PR #2 lesson → where its function lives on main)

| PR #2 lesson | Function | Main coverage |
|---|---|---|
| fr-01 Greetings & introductions | greet, give name, origin | Partial: `fr.bonjour-politesse` (main l1). Self-introduction: **gap** |
| fr-02 Ordering tea & coffee | café ordering | main l1 (Au café) — near-total overlap |
| fr-03 Numbers & paying | prices, totals, paying | main l3 (`fr.combien`) + main l12 (`fr.combien-ca-coute`). Totals ("ça fait") and card payment: **gaps** |
| fr-04 Asking where something is | directions | main l4 (`fr.ou-est`, `fr.a-gauche-droite`, `fr.cest-loin`); existential questions: main l10 (`fr.il-y-a`) |
| fr-05 Family & relationships | family, ages, 3rd-person names | **No main lesson teaches this domain** |
| fr-06 Daily routine | reflexives, clock time, frequency | Reflexives/frequency: **no main coverage**. Stating clock time: latent in main l5/l11 |
| fr-07 Synthesis (of PR lessons 1–6) | review | main l7 is a different synthesis (of main l1–l6) via `carryConstructions` |

---

## PR #2 lesson 1 — Greetings & introductions (`fr-01`)

| Candidate | What it adds over main | Disposition | Target in main | Risk notes |
|---|---|---|---|---|
| `fr-je-mappelle-name` construction + "je m'appelle = I call myself" grammar note + recall e02 (incl. curly/straight-apostrophe accepted variants) | Self-introduction — absent from all 14 main FR lessons | **PORT** (issue #8) | main l2 `fr-02` (hotel check-in: add a "C'est à quel nom ?" line pair) as **new id `fr.je-mappelle`** | New-ID gate per #8 (gap is demonstrated). **#12 conflict**: PR l7 re-declares this id with different label (`+ nom` vs `+ name`) and gloss — port lesson-1 metadata only, once. New dialogue line ⇒ audio re-addressing, never PR offsets |
| Salut-vs-Bonjour register culture note (line 1) | Register contrast (casual vs default greeting) missing from main's bonjour note | **PORT** (issue #8) | main l1 `fr-01`, merge into the existing `fr.bonjour-politesse` culture note on line 1 | Merge, don't stack a second note on the same anchor; keep main's "greet before you ask" claim intact |
| `fr-ca-va-greeting` + `fr-et-toi-turn` (informal exchange, lines 2–3) | Informal tu-register greeting/turn-taking; main is vous-register until l13 | **PORT** (issue #8) | main l13 `fr-13` (informal invitation) as **new id `fr.ca-va`**, opener line pair; "et toi ?" folded into gloss + accepted variants, not a second id | Touches main's 8–14 range — coordinate with issue #9's lane so l13 isn't edited twice. New lines ⇒ audio re-addressing |
| `fr-bonjour-greeting` construction | Nothing — duplicates `fr.bonjour-politesse` | **REJECT** | maps to existing `fr.bonjour-politesse` (main l1) | **#12 phantom**: declared in PR l1, referenced by no l1 line/exercise (only PR l7's copy). Named regression fixture in #12 |
| `fr-je-suis-de-place` construction + lines 7–8 + completion e03 + transfer e04 | Stating origin ("je suis de + ville") | **REJECT** | none — no main lesson carries an origins/small-talk function | Porting it needs a new dialogue scene, i.e. new-lesson authoring, not a fragment port. Out of scope per #7's safe-unit rule; revisit only via a future authored lesson |
| "Enchantée" pronunciation note (line 5) | Silent feminine -e in greetings | **REJECT** | none — "enchanté(e)" appears in no main line; notes need anchors | Anchor-less note would dangle; nothing to attach it to |
| Comprehension e01 ("je suis de Lyon") | — | **REJECT** | none | Tests the rejected `fr-je-suis-de-place`; falls with it |

## PR #2 lesson 2 — Ordering tea & coffee (`fr-02`)

| Candidate | What it adds over main | Disposition | Target in main | Risk notes |
|---|---|---|---|---|
| Dialogue lines 1–3, 9–10 (greet, order coffee, bring it over) | Nothing substantive — same scene as main l1 | **REJECT** | main l1 already ships this function | Swapping dialogue = wholesale replacement, forbidden by #7 |
| `fr-je-voudrais-noun` construction + its grammar note | Duplicates `fr.je-voudrais` (main l1) incl. the je veux contrast note | **REJECT** | maps to existing `fr.je-voudrais` (main l1) | Pure duplicate; importing would create the #12 same-meaning-two-ids drift |
| `fr-est-ce-que-question` grammar note + completion e03 + "Est-ce que vous avez…" phrasing | Non-inversion yes/no question form, earlier than main teaches it | **PORT** (issue #8) | main l2 `fr-02`: add "Est-ce que vous avez une chambre calme ?" as accepted variant on the `fr.avez-vous` recall + attach the est-ce que grammar note; cross-reference `fr.est-ce-que-je-peux` (main l9) | Do **not** declare a generic est-ce-que construction id — attach to existing ids or main l9's canonical one; otherwise it overlaps `fr.est-ce-que-je-peux` (#12 conflict risk) |
| `fr-un-une-noun` gender-article gloss (as note) | un/une gender awareness, never made explicit in main | **PORT** (issue #8) | main l1 `fr-01` line 3, grammar note anchored on "un" (under the `fr.je-voudrais` line) | Note-only port; no new construction id (its PR anchor lines don't exist in main) |
| `fr-sil-vous-plait-politeness` construction | s'il vous plaît / merci as a declared construction | **REJECT** | politeness framing already carried by `fr.bonjour-politesse` + ubiquitous s'il vous plaît in main lines | Declaring it adds a countable construction with no distinct teachable behavior — the #12 "counted, not observable" smell |
| "Sur place ou à emporter ?" line pair + culture note + comprehension e01 | The standard counter question + surcharge culture point — genuinely absent | **PORT** (issue #8) | main l1 `fr-01`: insert a two-line exchange after line 5 ("C'est tout, merci."), no new construction id; re-derive comprehension lineIndex against the grown dialogue | Dialogue grows 9→11 lines: all later lineIndex-based exercises must be re-checked; audio re-recording/re-offsetting for l1 |
| Recall e02 accepted-answer variants (straight vs curly apostrophe, comma-less "…café s'il vous plaît") | Robustness of answer matching main's 2-variant list lacks | **PORT** (issue #8) | main l1 `fr-01` recall x2 `accepted` list for `fr.je-voudrais` | Low risk; verify main's answer normalizer doesn't already fold apostrophes before adding noise |

## PR #2 lesson 3 — Numbers & paying (`fr-03`)

| Candidate | What it adds over main | Disposition | Target in main | Risk notes |
|---|---|---|---|---|
| "Je vais prendre" ordering register + its grammar note | Softer shop/café ordering variant of je prends | **PORT** (issue #8) | main l6 `fr-06`: extend the line-4 grammar note on `fr.je-prends` ("in shops you'll also hear je vais prendre"); **no new id** — PR's `fr-je-vais-prendre-noun` folds into `fr.je-prends`/`fr.aller-inf` territory | PR note claims je vais prendre is "more common than a bare je prends", which contradicts main's l6 note praising je prends — reconcile wording, don't ship both claims (#12-adjacent metadata conflict in prose) |
| `fr-cest-combien-question` dislocation pattern ("C'est combien, les fraises ?") + note | Spoken right-dislocation of the price question | **PORT** (issue #8) | main l3 `fr-03`: grammar note + accepted variant ("C'est combien, les tomates ?") on `fr.combien` | Maps to existing `fr.combien`; do not import the PR id |
| `fr-ca-fait-amount` construction + total-stating line + completion e05 | Stating totals ("ça fait + amount") — main only asks prices (`fr.combien`, `fr.combien-ca-coute`) | **PORT** (issue #8) | main l3 `fr-03` as **new id `fr.ca-fait`**: adapt line 8 to "Ça fait sept euros cinquante." and attach; port completion e05 re-keyed | New-ID gate per #8 (gap demonstrated). Canonical line text changes ⇒ audio re-record + offset invalidation; keep `fr.combien-ca-coute` (main l12) distinct — ask vs state |
| `fr-numbers-1-20` construction | "Numbers 1–20" as a declared construction | **REJECT** | none | A vocabulary set, not a construction; exists mainly to satisfy the ≥3-constructions count — the exact #12 reachable-count smell |
| `fr-payer-par-carte` construction + lines 8–9 + recall e03 | Paying by card / entering PIN — absent from main | **PORT** (issue #8) | main l12 `fr-12` (la poste payment scene) as **new id `fr.payer-par-carte`**: adapted line pair before "Signez ici", recall re-keyed | Touches main's 8–14 range — coordinate with issue #9's lane. New lines ⇒ audio re-addressing |
| "neuf euros" [v]-liaison pronunciation note | Price liaison phenomenon, no equivalent note in main | **PORT** (issue #8) | main l3 `fr-03`, attached to the ported `fr.ca-fait` line, generalized ("neuf euros → neu-veuros") | Depends on the `fr.ca-fait` row landing; if that row is dropped, this note has no anchor and falls with it |
| "Vous désirez ?" culture note | Shopkeeper-opener explanation; the phrase appears in main l1 and l3 unexplained | **PORT** (issue #8) | main l3 `fr-03` line 2, culture note anchored "Vous désirez" | Low risk |
| Comprehension e01 (compute the spoken total, 9,20 €) | Number-listening check — a genuinely different skill from main's meaning-choice comprehensions | **PORT** (issue #8) | main l3 `fr-03`: adapted to main's own prices ("Sept euros cinquante"), under `fr.ca-fait` | Re-author distractors against main's price; keep 3 options to match main's house format |
| Comprehension e02, recall e04, completion (Ça fait/…), transfers e06–e07 | — | **REJECT** | main l3's existing `fr.combien` / `fr.quantite-de` exercises already cover these functions | Duplicates; e04/e07 also depend on the rejected `fr-je-vais-prendre-noun` id |

## PR #2 lesson 4 — Asking where something is (`fr-04`)

| Candidate | What it adds over main | Disposition | Target in main | Risk notes |
|---|---|---|---|---|
| `fr-je-cherche-noun` construction + line 1 + "Excusez-moi" culture note + recall e04 | Indirect where-question ("je cherche + noun") — absent from main l4 | **PORT** (issue #8) | main l4 `fr-04` as **new id `fr.je-cherche`**: adapt an opening line ("Pardon, madame ! Je cherche la gare.") + culture note re-anchored on "Pardon" | New-ID gate per #8. Changes/extends main l4's opening ⇒ audio re-addressing; keep main's existing "Pardon, madame !" beat |
| Plural "Où sont …" grammar note + transfer e06 ("Où sont les toilettes ?") | Singular/plural agreement on the where-question; high-value toilets transfer | **PORT** (issue #8) | main l4 `fr-04`, note + extra transfer on existing `fr.ou-est` | Low risk; exercise re-keyed to `fr.ou-est` |
| `fr-a-cote-de-location` construction + de-contraction note | à côté de / en face de + contraction rule — main l4 only has "après la banque" | **PORT** (issue #8) | main l4 `fr-04` as **new id `fr.a-cote-de`**: add a locating line ("En face de la banque.") + note | New-ID gate per #8. New line ⇒ audio re-addressing; keep it one line, not a PR-style scene graft |
| `fr-directions-chunk` construction | Duplicates `fr.a-gauche-droite` (main l4) | **REJECT** | maps to existing `fr.a-gauche-droite` | Importing would create two ids for one meaning (#12) |
| "gauche" [goʃ] pronunciation note | Pronunciation scaffold for the direction chunk | **PORT** (issue #8) | main l4 `fr-04` line 4, anchored "à gauche" under `fr.a-gauche-droite` | Low risk |
| `fr-il-y-a-existence` construction | Duplicates `fr.il-y-a` | **REJECT** | maps to existing `fr.il-y-a` (main l10) | **#12 conflict**: `introducedIn: fr-04` vs main's canonical introduction in l10 — importing the id would corrupt introduction provenance |
| Existential-question exercises: completion e05 ("Il y a une banque près d'ici ?") + transfer e07 (un distributeur) | il y a as a rising-intonation question — main l10 only teaches declarative/negative | **PORT** (issue #8) | main l10 `fr-10`, exercises re-keyed to `fr.il-y-a` | Lands in l10, not l4 — respects main's sequencing (il y a is introduced at l10); coordinate with issue #9's lane |
| "Il y en a une" (pronoun *en*) grammar note + line 2 phrasing | The pronoun *en* as a fixed chunk | **REJECT** | none | Beyond main's A1 construction inventory; "treat it as a fixed chunk" conflicts with main's model where every taught form routes to a construction |
| `fr-cest-a-location` construction | "c'est à + location" | **REJECT** | overlaps `fr.a-gauche-droite` + `fr.cest-loin` coverage | **#12 phantom** (named in the issue): declared in PR l4, referenced by no l4 line/exercise — only PR l7's copy uses it. Regression fixture for #12 |
| Comprehension e01–e02 (turn left at bakery; metro opposite supermarket) | — | **REJECT** | main l4's comprehension already tests direction understanding | Duplicative; 4-option format also breaks main's 3-option house style |

## PR #2 lesson 5 — Family & relationships (`fr-05`)

No main lesson (1–14) teaches the family/relationships domain. Every candidate below would need a new dialogue scene to anchor it — that is new-lesson authoring, not a fragment port, and #7 forbids resolving that by grafting or replacement. If the domain is wanted, it is a future authored-lesson issue, not part of the #8 port.

| Candidate | What it adds over main | Disposition | Target in main | Risk notes |
|---|---|---|---|---|
| `fr-cest-mon-ma-noun` + possessive-agreement note | Pointing people out with mon/ma | **REJECT** | none — no anchoring scene in main | **#12 conflict**: PR l7 re-declares it with drifted label ("c'est mon / ma + noun" vs "mon / ma / mes + family member") and gloss |
| `fr-avoir-family` + lines 3–4 | avoir for family membership | **REJECT** | none | Domain absent; "elles habitent" liaison note also has no main anchor |
| `fr-il-elle-sappelle` + recall e02 | Third-person names | **REJECT** | none — main l2's check-in port (`fr.je-mappelle`) has no third-person turn | Revisit only if a family/people lesson is ever authored |
| `fr-avoir-age` + "il a quel âge" note + completion e03 | Age with avoir | **REJECT** | none | Domain absent |
| Comprehension e01, transfer e04 | — | **REJECT** | none | All exercises depend on the rejected constructions |

## PR #2 lesson 6 — Daily routine (`fr-06`)

| Candidate | What it adds over main | Disposition | Target in main | Risk notes |
|---|---|---|---|---|
| `fr-a-plus-heure` (stating clock time: "à + heure") + note (et demie / et quart) | Main teaches *asking* the time (`fr.a-quelle-heure`, l5) but never labels *stating* it, though "À quatorze heures dix." (l5) and "À dix heures…" (l11) both do it | **PORT** (issue #8) | main l5 `fr-05` as **new id `fr.a-heure`**: tag existing line 5 "À quatorze heures dix." + attach adapted note | Cheapest port in the batch — no line text change, no audio impact; just tagging + note. New-ID gate per #8 |
| dîner/déjeuner meal-name culture note | Mealtime naming + regional shift (Belgium/Suisse/Québec) | **PORT** (issue #8) | main l13 `fr-13` line 1, anchored "dîner" | Coordinate with issue #9's lane (l13 also receives `fr.ca-va`) |
| `fr-reflexive-daily` construction + reflexive grammar note + routine lines | Reflexive verbs (se lever, se coucher, se doucher) | **REJECT** | none — daily-routine domain absent from main's 14 lessons | Lesson-scale addition; same reasoning as PR l5. Future authored-lesson material only |
| `fr-tous-les-frequency` construction | tous les jours / tous les soirs | **REJECT** | none — no anchor line in main | Falls with the routine domain |
| Comprehension e01, recall e02, completion e03 | — | **REJECT** | none | All exercise the rejected reflexive construction |
| Transfer e04 ("Je mange à une heure.") | A stating-time transfer | **REJECT** | — | Exemplar leans on *manger*, which main never introduces; author a native transfer for `fr.a-heure` instead of porting this one |

## PR #2 lesson 7 — Synthesis "Un café avec Camille" (`fr-07`)

| Candidate | What it adds over main | Disposition | Target in main | Risk notes |
|---|---|---|---|---|
| 11 re-declared construction objects | Nothing — copies of PR l1–l6 declarations | **REJECT** | main synthesis reuses canonical ids via `carryConstructions` (`define.ts`) | The exact "copy-based synthesis metadata" anti-pattern of #8/#12. **#12 conflicts**: `fr-je-mappelle-name` (label/gloss drift vs PR l1 — the issue's named regression case), `fr-ca-va-greeting` and `fr-cest-mon-ma-noun` (label drift vs their introducing lessons) |
| Synthesis dialogue (8 lines) | An alternative review scene | **REJECT** | main l7 already has its own synthesis of main l1–l6 | Wholesale replacement, forbidden; also recombines family/routine constructions main doesn't teach |
| Price-format culture note ("quatre euros cinquante", no *et*) | How spoken prices omit "and" | **PORT** (issue #8) | main l3 `fr-03`, attached to the price/total line (pairs with the `fr.ca-fait` port) | Merge with the neuf-euros liaison note from PR l3 into one price-pronunciation note rather than stacking two |
| Recall e02 accepted variants ("Un café, s'il vous plaît." and comma-less forms) | Accepts the natural ellipsis order when ordering | **PORT** (issue #8) | main l1 `fr-01` recall x2 `accepted` list (`fr.je-voudrais`) | Confirm the ellipsis form should count as recall success for `fr.je-voudrais` — it drops the construction itself; if reviewers object, accept only the comma variants |
| Completion e03 (où vs qui vs quand) | Question-word discrimination — a different check from main l4's à-gauche completion | **PORT** (issue #8) | main l4 `fr-04`, extra completion re-keyed to `fr.ou-est` | Low risk |
| "sept heures" liaison pronunciation note | t-liaison in times | **REJECT** | no main line says "sept heures"; main l5 has "quatorze heures" where the note's claim doesn't transfer | Anchor mismatch; the ported price-liaison note (l3) covers the liaison teaching point |
| Comprehension e01 (ça fait total), transfers e04 (baguette + croissants) / e05 (station de métro) | — | **REJECT** | main l1's bakery transfer and l4's pharmacy transfer already cover e04/e05; the ported l3 total-comprehension covers e01 | Duplicates of shipped or already-ported checks |

---

## Summary

| Disposition | Count |
|---|---|
| **PORT** (all via issue #8; targets touching main l10/l12/l13 to be coordinated with issue #9's lane) | **24** |
| **REJECT** | **27** |
| Total candidates | 51 |

Ported new construction ids proposed (each passed #8's demonstrated-gap gate): `fr.je-mappelle` (main l2), `fr.ca-va` (main l13), `fr.ca-fait` (main l3), `fr.payer-par-carte` (main l12), `fr.je-cherche` (main l4), `fr.a-cote-de` (main l4), `fr.a-heure` (main l5). Everything else ports as notes, lines, exercises, or accepted-answer variants attached to existing `fr.<id>` constructions.

Issue #12 regression fixtures confirmed in this range: phantom declarations `fr-bonjour-greeting` (PR l1) and `fr-cest-a-location` (PR l4); metadata conflicts on `fr-je-mappelle-name`, `fr-ca-va-greeting`, `fr-cest-mon-ma-noun` (PR l7 re-declarations) and `fr-il-y-a-existence`'s `introducedIn` clash with main's l10.

No PR #2 registry, loader, test-harness, audio-offset, or provenance metadata is selected for porting (issue #7 checklist).
