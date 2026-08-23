# Salvage manifest — PR #2 Tamil lessons 08–14 vs main `ta.ts` l8–l14

Part of issue #7 (salvage PR #2 through a content-port manifest, not a merge).

- **Source**: `origin/claude-mac/issue-1-content` @ `b5c7f45`, files `src/lib/content/ta/lesson-08.ts` … `lesson-14.ts` (read via `git show` only).
- **Baseline**: `src/lib/content/ta.ts` on `main` (defineLesson DSL, ids namespaced `ta.<local-id>`, spoken Chennai register, lessons `l8`–`l14`, synthesis at l14).
- **Rules applied**: PORT happens via issue #11 only. Anything requiring PR #2's registry/schema (per-line ids, per-line audio offset blocks, per-line license/provenance, `lineId`/`useConstruction` exercise fields, inline construction re-declaration blocks) is REJECT (architecture). Construction metadata conflicts and phantom/duplicate declarations are flagged for issue #12. Targets are mapped by **communicative function**, never by lesson number, and no main lesson is replaced wholesale.

## Register verdict (spoken-register fidelity)

The PR #2 lessons are consistently contemporary spoken Chennai Tamil (இருக்கு, போலாம், -ணும், -னா, loanwords with -ஆ). **No PR line is more literary than main's equivalent**, so no candidate is rejected on literary-register grounds alone. Two lines are rejected for *naturalness* risk instead (English calque; unreviewed idiom) — see L12/L13 tables. Both corpora share `reviewStatus: draft`; nothing here has native review.

## Topic map (function, not number)

| PR #2 lesson | Function | Nearest main home(s) |
|---|---|---|
| ta-08 Likes & dislikes | preferences over food/drink | main l6 restaurant (`ta.enna-irukku`, `ta.naan-edukkuren`); dative frame from l1 (`ta.enakku-venum`) |
| ta-09 Making plans (movie) | proposing joint activity | main l11 weekend (`ta.enna-pannalam`, `ta.pona`); main l9 (`ta.appuram`) |
| ta-10 Time & schedules | clock time, obligation | main l5 station (`ta.enna-neram`); main l12 (`ta.anuppanum`) |
| ta-11 Transportation | getting somewhere, fares | main l4 way-asking (`ta.enge-irukku`, `ta.dooram`); main l12 (`ta.evvalavu-aagum`) |
| ta-12 Asking for help | polite requests to strangers | main l4 (stranger opener, `பரவால்ல`); main l3 (`ta.kudunga`) |
| ta-13 Feelings | describing state/pain | main l8 doctor (`ta.vali`, `ta.nalla-thoongala`); main l4 (பரவால்ல note) |
| ta-14 Synthesis | review recombination | main l14 synthesis |

## 0. Cross-cutting (architecture) — applies to all seven lessons

| Candidate | What it adds over main | Disposition | Target in main | Risk notes |
|---|---|---|---|---|
| Per-line audio blocks (`normalUrl`, `speakerId`, `startMs`/`endMs`) and chunk timing maps | Placeholder timings only; main carries audio in `audio-offsets.json`/`audio-provenance.json` | **REJECT** | — | Architecture: requires PR #2 schema; timings are fabricated placeholders anyway |
| Per-line/exercise ids, `lessonId`, per-line `license`/`reviewStatus`/`source` | Nothing functional; main derives ids and holds provenance once per profile | **REJECT** | — | Architecture: incompatible with defineLesson DSL |
| Exercise schema extensions: `lineId`, `useConstruction`, 5–6 exercises/lesson, 4-option MCQs | Denser drilling per lesson | **REJECT** | — | Architecture: main DSL uses `lineIndex`/`use`, 3-option completion, 4-exercise convention. Content of individual extra exercises is assessed per-lesson below; the *schema shape* is not portable |

## Lesson 08 — «உங்களுக்கு என்ன பிடிக்கும்?» (likes & dislikes) vs main l8 (doctor)

Main has **no liking construction anywhere**; this is PR #2's single biggest content gap-fill. Function maps to main l6 (food/drink preferences), not main l8.

| Candidate | What it adds over main | Disposition | Target in main | Risk notes |
|---|---|---|---|---|
| `ta-pidikkum-dative-like` construction + dialogue lines l01–l02 (உங்களுக்கு என்ன சாப்பாடு பிடிக்கும்? / எனக்கு தோசை ரொம்ப பிடிக்கும்) + morphology note on invariant பிடிக்கும் | "X likes Y" — absent from all 14 main lessons | **PORT** (issue #11) | main l6 + mint `ta.pidikkum`; cross-note the dative frame back to `ta.enakku-venum` (l1) | Must be presented as sibling of the எனக்கு…வேணும் frame, not a new grammar topic; keep main l6's 8-line budget by adding at most 2 lines |
| `ta-pidikkaadhu-neg-like` + line l03 (…ஆனா பொங்கல் பிடிக்காது) + grammar note (one fixed negative form) | The negative pair; main has negatives only as `ta.illa-neg` (existence) and `ta.nalla-thoongala` (verb) | **PORT** (issue #11) | main l6, folded into `ta.pidikkum` as its negative half (single id, gloss covers both) | Minting two ids for one frame would fragment the registry; fold, don't duplicate |
| `ta-vida-comparative` + line l07 (டீயை விட காபி தான் எனக்கு பிடிக்கும்) + word-order-flip morphology note + transfer e04 | Comparison ("more than") — absent from main; the coffee-vs-tea content lands directly in main l6's coffee world | **PORT** (issue #11) | main l6 + mint `ta.vida` construction | First accusative exposure at A1; keep the தான் emphatic as color, not as a taught piece. Declared-and-referenced in PR (line l07 + e04), so not a phantom |
| `ta-romba-intensifier` declaration (`introducedIn: 'ta-08'`) | Nothing — main declares this as `ta.romba-nalla` in l1 | **REJECT** | — | **Issue #12 metadata conflict**: duplicate of `ta.romba-nalla` with wrong origin lesson (ta-08 vs main l1) |
| Culture note l05: English loans take adverbial -ஆ (heavy-aa, light-aa) | Explicit statement of the loanword mechanic main *uses* (ரூம், பில், ரெஸ்ட்) but never explains | **PORT** (issue #11) | main l6, culture note anchored on an existing loanword line | Note-only port; no construction id needed |
| Accepted-answer breadth in recall e02 (word-order variant + 2 transliteration spellings thosai/dosai) | Main recall `accepted` arrays are thin (canonical + 1 translit) | **PORT** (issue #11) | main l6 | Verify variants against main's answer-normalization before copying; spoken word order is genuinely free here |
| Completion e03 distractor set contrasting பிடிக்கும் / பிடிக்காது / **வேணும்** / இருக்கு + rule text | Directly drills the like-vs-want confusion a learner of main l1 will have | **PORT** (issue #11) | main l6 completion slot | Depends on `ta.pidikkum` landing first |

**L08: 6 PORT / 1 REJECT**

## Lesson 09 — Making plans (movie) vs main l9 (phone call)

Function overlaps main l11 (weekend plans), which already owns `ta.enna-pannalam` and `ta.pona` (-லாம்).

| Candidate | What it adds over main | Disposition | Target in main | Risk notes |
|---|---|---|---|---|
| `ta-pannu-light-verb` (புக் பண்றேன், loan + பண்ணு makes verbs) + lines l01/l06 + morphology note (பண்றே not literary செய்கிறாய்) | Main uses பண்ணலாம் inside `ta.enna-pannalam` but never teaches பண்ணு as a productive light verb — high-value spoken-register mechanic | **PORT** (issue #11) | main l11, extend `ta.enna-pannalam` (note + one dialogue line "டிக்கெட் நான் புக் பண்றேன்"); **no new id** | Resolved to extend, not mint — a standalone `ta.pannu` would create the exact metadata overlap issue #12 polices |
| `ta-ren-first-person` (-றேன் "I'll…" commitment) | Main uses -றேன் (எடுத்துக்கறேன் l6, வரேன் l13) without ever naming it | **PORT** (issue #11) | main l6, as a morphology note on `ta.naan-edukkuren` (no new id) | Note-only; declaring it as a construction would be syllabus-grammar creep at A1 |
| `ta-laam-hortative` declaration (`introducedIn: 'ta-09'`) | Nothing — main declares 'verb + லாம்' as `ta.pona` (l11) and `ta.pogalam` (l10) | **REJECT** | — | **Issue #12 metadata conflict**: duplicates main's pair AND is itself duplicated inside PR #2 by `ta-laam-potential` (`introducedIn: 'ta-11'`) — two ids, two origin lessons, one construction, despite the commit's claimed dedupe pass |
| `ta-aa-yesno-question` re-declaration (`introducedIn: 'ta-01'`) | Nothing — main teaches -ஆ via the l1 grammar note on வேணுமா | **REJECT** | — | **Issue #12**: re-declared in a lesson that doesn't introduce it, pointing at `ta-01`, an id that exists only in PR #2's namespace — dangling provenance if ported |
| Line l05 with quotative note (நல்லா இருக்குன்னு சொல்றாங்க, spoken -ன்னு vs literary என்று) | Reported speech — absent from main | **REJECT** | — | Quotative at lesson 9 of an A1 course is premature and depends on `ta-nu-quotative` (ta-12), itself rejected below; revisit post-A1 |
| Line l08 (நைட் ஷோவே பெட்டர். அப்புறம் சாப்பிடலாம்) | Pairs main's `ta.appuram` (l9) with a -லாம் follow-up suggestion; adds emphatic -ஏ on a loanword | **PORT** (issue #11) | main l9, as an `ta.appuram` exercise exemplar or accepted variant | Small win; drop the "பெட்டர்" clause if it reads as too calqued during native review |
| Recall e05 flexible word order (டிக்கெட் நான் புக் பண்றேன் / நான் டிக்கெட் புக் பண்றேன் both accepted) | Models Tamil's free constituent order in accepted answers | **PORT** (issue #11) | main l11 recall accepted arrays | Rides with the பண்ணு port |

**L09: 4 PORT / 3 REJECT**

## Lesson 10 — Time & schedules vs main l10 (household shopping)

Function maps to main l5 (station/time) and main l12 (obligation).

| Candidate | What it adds over main | Disposition | Target in main | Risk notes |
|---|---|---|---|---|
| `ta-ethana-manikku-question` (எத்தனை மணிக்கு…?) + line l01 | Main only asks time as என்ன நேரம் (`ta.enna-neram`); "at what time does X happen" is a distinct, very common ask | **PORT** (issue #11) | main l5, as a variant taught under `ta.enna-neram` (note + completion distractor), reusing main l2's எத்தனை (`ta.ettana-naal`) | Prefer variant-of over new id; two time-question ids would need a disambiguation rule |
| `ta-num-obligation` (general verb + -ணும் "must") + note that spoken -ணும் = worn-down வேண்டும் | Main teaches -ணும் only lexicalized inside `ta.anuppanum` (அனுப்பணும், l12); the generalization is the actual construction | **PORT** (issue #11) | main l12, as a morphology note generalizing `ta.anuppanum` (+ 1 transfer exemplar with a different verb, e.g. போகணும்) | **Issue #12 flag**: do NOT declare a second obligation id next to `ta.anuppanum`; generalize the existing one |
| `ta-manikku-time` re-declaration (`introducedIn: 'ta-06'`) | Nothing — main drills மணிக்கு in l5 lines (ரெண்டு மணிக்கு) without a dedicated id | **REJECT** | — | **Issue #12**: re-declaration pointing at PR-namespace `ta-06`; if #11 ever mints a மணிக்கு id it must originate in main l5, not be imported with foreign provenance |
| `ta-la-time-locative` (காலையில "in the morning") | Main uses -ல locatives (வீட்ல, மீட்டிங்ல, மாடியில்) without naming the time-of-day use | **PORT** (issue #11) | main l10, morphology note anchored on வீட்ல (no new id) | Note-only; a full locative construction is a bigger #11 decision |
| Grammar note l08: half-hour fusion ஆறரை (+ மூணரை, நாலரை) and -டு- "definitely" flavour | Genuinely useful time morphology main lacks | **PORT** (issue #11) | main l5, note on the time lines | Split the note: half-hours to l5; the -டு- completive flavour should be dropped (see rejected `ta-ttu-completive`, L12) |
| Grammar note l06: spoken conditional போனா ("if late, trouble") | Conditional — absent from main | **REJECT** | — | Duplicate of the L11 `ta-naa-conditional` candidate (PORTed there); one disposition per candidate, and l11's மழை பெய்யலைன்னா is the better anchor |
| Line l03 transliteration mismatch: script அவ்வளவு, translit `avlo` (same again in ta-11: எவ்வளவு / `evlavu`) | — | **REJECT** | — | Transliteration/literal-gloss quality defect: scaffold contradicts the script (AC 9 requires the layers to correspond). Any line ported from these lessons must have its translit re-derived |
| Recall e02 morphological accepted variants (எழுந்திரிப்பே / எழுந்திருப்பே / எழுந்திருக்கறே + 2 translits) | Accepts real spoken variation in verb endings | **PORT** (issue #11) | main l5 recall accepted arrays | Informal -ப்பே addressee form differs from main's polite-register dialogues; keep polite canonical, accept informal variants |

**L10: 5 PORT / 3 REJECT**

## Lesson 11 — Transportation vs main l11 (weekend plans)

Main has no transport lesson; function scatters to main l4 (getting around), l11 (the conditional anchor), l12 (fares).

| Candidate | What it adds over main | Disposition | Target in main | Risk notes |
|---|---|---|---|---|
| `ta-la-instrumental-transport` (பஸ்ல/ஆட்டோல "by bus/auto") + lines l02/l07 + note (-ல does location AND means) | "By vehicle" — absent from main and needed for any travel talk | **PORT** (issue #11) | main l4 + mint `ta.busla` (or #11's preferred id); extends நடந்து போகலாமா line | New id justified: distinct communicative function. Coordinate with the l10 time-locative note so -ல isn't explained twice, differently |
| `ta-naa-conditional` (இருந்தா/போனா spoken "if") + line l04 (ட்ராஃபிக் இருந்தா ஒரு மணி நேரம் ஆகும்) + note (written -ல் drops) | Conditional — absent from main, yet main l11 already *uses* one unexplained (மழை பெய்யலைன்னா!) | **PORT** (issue #11) | main l11 + mint `ta.naa-conditional`, anchored on the existing மழை பெய்யலைன்னா line | Best kind of port: explains something main already ships. Keep to positive conditional first; பெய்யலைன்னா adds a negative — note the gap honestly |
| Duration sense of ஆகும் (எவ்வளவு **நேரம்** ஆகும்? line l03) | Main's `ta.evvalavu-aagum` (l12) covers price only; duration is a new use of the same frame | **PORT** (issue #11) | main l12, widen the `ta.evvalavu-aagum` gloss + one accepted variant/exercise | Note-level change to an existing construction; no new id |
| `ta-laam-potential` declaration (`introducedIn: 'ta-11'`) | Nothing — same construction as PR's own `ta-laam-hortative` (ta-09) and main's `ta.pona`/`ta.pogalam` | **REJECT** | — | **Issue #12 headline case**: intra-PR duplicate id with conflicting `introducedIn` (ta-09 vs ta-11), contradicting the commit's "unified every duplicate" claim |
| Culture note l08: Chennai autos and the meter ("மீட்டர்ல போனா" as negotiation move; Ola/Uber/Rapido fixed fares) | Best culture note in the PR; current, local, actionable | **PORT** (issue #11) | main l4, culture note (street/transport context) | Time-sensitive brand references (Rapido) — date-stamp or genericize to "ride apps" |
| Line l09 (ஓகே, நான் ஓலா புக் பண்றேன்) | Another loan + பண்ணு token | **REJECT** | — | Redundant once the L09 பண்ணு port lands; brand-heavy line |
| Conditional exercise pair: comprehension e01 + completion e03 (rule text contrasting போனா / போறேன் / போலாம்) | Excellent minimal-pair rule prose main has nothing like | **PORT** (issue #11) | main l11, alongside the `ta.naa-conditional` port | Rides with the conditional; rewrite lineIndex refs to the மழை/traffic anchor chosen |
| The T. Nagar dialogue as a unit | A whole transport scenario | **REJECT** | — | No main home; injecting it would replace/renumber a main lesson wholesale, which issue #7 forbids |

**L11: 5 PORT / 3 REJECT**

## Lesson 12 — Asking for help (lost phone) vs main l12 (post office)

Function maps to main l4 (strangers on the street) and main l3 (`ta.kudunga` request family).

| Candidate | What it adds over main | Disposition | Target in main | Risk notes |
|---|---|---|---|---|
| `ta-mudiyumaa-request` (infinitive + முடியுமா? "could you…") + line l01 + culture note (loan + பண்ணு friendlier than literary) + உதவி/ஹெல்ப் exemplars | Polite indirect request — main only has direct imperatives (`ta.kudunga`); this is the single most useful politeness upgrade in the PR | **PORT** (issue #11) | main l4 + mint `ta.mudiyumaa`, pairing with the எக்ஸ்கியூஸ் மி stranger-opener line; cross-note to `ta.kudunga` (l3) as the direct counterpart | Needs the infinitive (பண்ண, தூக்க) which main hasn't isolated — teach as chunk, not morphology |
| `ta-aadheenga-negative-request` (கவலைப்படாதீங்க "please don't…") + line l06 + note (informal -ாத for friends) | Negative polite imperative — absent from main; completes the `ta.kudunga` family | **PORT** (issue #11) | main l3, mint `ta.aadheenga` as the negative counterpart beside `ta.kudunga` | Resolved to mint (a negative imperative is a distinct declarable pattern, not a gloss widening of `ta.kudunga`). The polite/informal register split in the note is good; keep it |
| `ta-nga-polite-imperative` re-declaration (`introducedIn: 'ta-03'`) | Nothing — main's `ta.kudunga` (l3) + its -ங்க grammar note already cover this, and PR generalizes it under a different id | **REJECT** | — | **Issue #12 metadata conflict**: same construction as `ta.kudunga` under a different id with PR-namespace provenance (`ta-03`) |
| `ta-nu-quotative` (விட்டுட்டேன்னு நினைக்கிறேன்) | Reported speech/thought | **REJECT** | — | Beyond A1 scope for this course's 14-lesson arc; would need multi-lesson support to stick. Revisit when the course extends |
| `ta-ttu-completive` (-ட்டு "done and irreversible") | Aspectual nuance | **REJECT** | — | Morphology-heavy for A1; the -டு flavour also leaks into the l10 ஆறரை note (trim there) |
| Line l03 (என் ஃபோன காணோம்…) with spoken accusative -அ note | காணோம் "is missing" is a great spoken word | **REJECT** | — | The line is load-bearing on two rejected constructions (quotative + completive); can't port the word without the sentence |
| Line l07 (எனக்கு இந்த ஏரியா தெரியாது "I don't know this area") | தெரியாது (dative "don't know") — absent from main, perfectly at home when asking the way | **PORT** (issue #11) | main l4, one added line or transfer exemplar + note tying எனக்கு back to `ta.enakku-venum`'s dative frame | Port as fixed chunk (எனக்கு … தெரியாது), not as a conjugation lesson |
| Recall e02 accepting native உதவி alongside loan ஹெல்ப் | Models the real loan/native alternation in accepted answers | **PORT** (issue #11) | main l4, accepted array of the `ta.mudiyumaa` recall | Rides with the முடியுமா port |
| Line l09 (நீங்க பெரிய ஹெல்ப் பண்ணீங்க) | — | **REJECT** | — | English calque ("you've been a big help") — naturalness risk; precisely what native review would strike |
| Line l10 (பரவாயில்ல. ஃபோன் கண்டிப்பா கிடைக்கும்) | Full-form பரவாயில்ல + கண்டிப்பா reassurance | **REJECT** | — | Redundant: main already has பரவால்ல (l4) and `ta.kandippa` (l13); கிடைக்கும் alone doesn't justify a port |

**L12: 4 PORT / 6 REJECT**

## Lesson 13 — Describing how one feels vs main l8 (doctor) / l13 (invitation)

Direct functional overlap with main l8 (`ta.vali`, `ta.nalla-thoongala`). This is the strongest enrichment lesson in the PR.

| Candidate | What it adds over main | Disposition | Target in main | Risk notes |
|---|---|---|---|---|
| `ta-aa-irukku-feeling` (STATE + -ஆ இருக்கு: சோர்வா இருக்கு, லேசா இருக்கு) + lines l01/l04 + morphology note | THE everyday feeling frame — main only has the fossilized நல்லா இருக்கு inside `ta.romba-nalla` | **PORT** (issue #11) | main l8 + mint `ta.aa-irukku`; cross-note that நல்லா இருக்கு (l1) was this construction all along | Highest-value single port in this manifest. Coordinate the note with the L08 loanword -ஆ note (same suffix, two jobs) |
| `ta-valikkudhu-pain` (தலை வலிக்குது — body part as verb subject) + line l02 + note (spoken வலிக்குது vs literary வலிக்கிறது) | Verbal pain frame; main's `ta.vali` teaches only the noun compound (தலைவலி) | **PORT** (issue #11) | main l8, folded into `ta.vali` as its verbal variant (note + accepted answers), **not** a second pain id | **Issue #12 flag**: two competing pain constructions would conflict; fold. Also note PR's own gloss drift for this id (ta-13 "is-hurting" vs ta-14 "pained") |
| `ta-enakku-dative-experiencer` declaration | Names the dative-experiencer frame explicitly | **REJECT** | — | **Issue #12 metadata conflict**: main already instantiates this frame three times (`ta.enakku-venum`, `ta.vali`, and the PORTed `ta.pidikkum`); a fourth generic id fragments the registry. The insight belongs in cross-notes, which the ported candidates above already carry |
| `ta-enna-aachu` (என்ன ஆச்சு? "what happened?") + line l01 | The everyday what's-wrong opener; main l8's doctor asks the stiffer என்ன பிரச்சனை? | **PORT** (issue #11) | main l8, as an accepted variant/extra line beside என்ன பிரச்சனை (note: ஆச்சு = spoken past of ஆகு) | Keep both forms; பிரச்சனை is fine for a doctor, ஆச்சு for a friend — register pair worth teaching |
| `ta-konjam-softener` declaration | Names கொஞ்சம்'s softening role | **REJECT** | — | **Issue #12 conflict-adjacent**: main has used கொஞ்சம் since l1 and declares `ta.konjam-iru` (l9) in the same lexical family; a standalone softener id overlaps both. The softening observation can ride inside ported notes without an id |
| பரவால்ல culture note (l08: downplays both pain *and* praise; ask about a film, பரவால்ல = "decent"; squeeze of பரவாயில்லை) | Strictly richer than main l4's பரவால்ல note ("shrugs off thanks") | **PORT** (issue #11) | main l4, upgrade the existing culture note in place (no id) | Pure note upgrade; zero structural risk |
| Line l05 (நேத்து ராத்திரி சரியா தூங்கலையா? "didn't you sleep properly?") | The question form of main l8's `ta.nalla-thoongala` (main has only the answer தூங்கல) | **PORT** (issue #11) | main l8, one line/exercise pairing question -லையா with answer -ல under `ta.nalla-thoongala` | Neat completion of an existing construction; small |
| Line l10 (உன்கிட்ட பேசினதுலயே மனசு லேசா இருக்கு) | Warm idiomatic closer | **REJECT** | — | Naturalness unverified (nominalized -அதுல-யே stack is well beyond A1); exactly the register axis a non-native author can't self-check — leave for native review |
| Completion e05 (சோர்வா / சோர்வு / சோர்வான / சோர்ந்த distractors + rule "bare noun cannot sit in this slot") | Best completion-exercise rule text in either corpus | **PORT** (issue #11) | main l8, completion slot with the `ta.aa-irukku` port (trim to main's 3-option shape) | Rides with `ta.aa-irukku`; 4→3 options loses சோர்ந்த — keep சோர்வு and சோர்வான as the live traps |
| Pronunciation note l04 (இருக்கு vs literary இருக்கிறது) | Register meta-comment | **REJECT** | — | Redundant: main's file header states the spoken-register policy course-wide; repeating per-line adds noise |

**L13: 6 PORT / 4 REJECT**

## Lesson 14 — Synthesis (beach evening) vs main l14 (complicated Sunday)

PR ta-14 recombines PR-only constructions and re-declares 10 of them inline — the exact mechanism main replaces with `carryConstructions`. Main l14 stays; only detachable exercise content is portable.

| Candidate | What it adds over main | Disposition | Target in main | Risk notes |
|---|---|---|---|---|
| The synthesis dialogue as a unit (7 lines, beach plan) | An alternative review scenario | **REJECT** | — | Architecture + wholesale-replacement ban: depends on PR's construction set, per-line schema, and would displace main l14 |
| Transfer e04 (sundal at the beach: combine liking + feeling — எனக்கு சுண்டல் ரொம்ப புடிக்கும், ரொம்ப சந்தோஷமா இருக்கு) | Multi-construction transfer; main l14 has only one transfer | **PORT** (issue #11) | main l14, second transfer exercise, contingent on `ta.pidikkum` (L08) and `ta.aa-irukku` (L13) landing first | Ordering dependency — port last. Normalize புடிக்கும்→பிடிக்கும் to match the L08 port |
| Transfer e03 (porter + suitcase + முடியுமா) | — | **REJECT** | — | Near-verbatim duplicate of ta-12 e04 (same porter, same suitcase, same construction) — the ta-12 version rides with the `ta.mudiyumaa` port; keep one |
| Line l05 note (எனக்கு ரூட் தெரியாது — knowledge on the dative frame) | — | **REJECT** | — | Duplicate of the ta-12 l07 தெரியாது candidate (PORTed in L12); one disposition per candidate |
| Inline re-declaration block: 10 constructions with drifted labels/glosses (e.g. `ta-laam-hortative` label differs from ta-09; `ta-valikkudhu-pain` gloss changes tense; `ta-manikku-time` → phantom origin `ta-06`) | — | **REJECT** | — | **Issue #12 core exhibit**: synthesis re-declarations were "written blind" (commit's own words) and still drift from their origin lessons after the claimed reconciliation; main's `carryConstructions` makes the entire block unnecessary |
| Spelling inconsistency: புடிக்கும் (ta-14) vs பிடிக்கும் (ta-08) for the same construction | — | **REJECT** | — | Both spellings are attested colloquially, but a course must pick one; the L08 port standardizes on பிடிக்கும் with புடிக்கும் as an accepted answer only |
| Opener line l01 (ஃப்ரீயா இருக்கியா? பீச்சுக்கு போலாமா?) | Loanword + feeling-frame + hortative in one breath | **REJECT** | — | Redundant once the L08 loanword note and L13 `ta.aa-irukku` ports land; the "two review patterns in one breath" note re-explains ported material |

**L14: 1 PORT / 6 REJECT**

## Issue #12 flag summary (construction metadata)

1. **Intra-PR duplicate id**: `ta-laam-hortative` (introducedIn ta-09) vs `ta-laam-potential` (introducedIn ta-11) — same construction, two ids, two origins; contradicts the b5c7f45 commit message's claim that all duplicates were unified.
2. **Foreign-namespace provenance**: `ta-aa-yesno-question` → `ta-01`, `ta-nga-polite-imperative` → `ta-03`, `ta-manikku-time` → `ta-06` are declared inside lessons 09–12 with `introducedIn` pointing at PR-only lessons whose main counterparts declare no such ids — dangling provenance if ported as-is.
3. **Collisions with main's registry**: `ta-romba-intensifier` ≈ `ta.romba-nalla` (l1); `ta-nga-polite-imperative` ≈ `ta.kudunga` (l3); `ta-laam-*` ≈ `ta.pona`/`ta.pogalam` (l10/l11); `ta-num-obligation` generalizes `ta.anuppanum` (l12); `ta-valikkudhu-pain` competes with `ta.vali` (l8); `ta-enakku-dative-experiencer` and `ta-konjam-softener` overlap `ta.enakku-venum`/`ta.vali` and `ta.konjam-iru` families.
4. **Gloss/label drift across re-declarations**: `ta-valikkudhu-pain`, `ta-laam-hortative`, `ta-pannu-light-verb`, `ta-num-obligation`, `ta-konjam-softener` all carry different label or gloss text in ta-14 (or ta-11) than at their origin lesson.
5. **Phantoms**: within lessons 08–14, every declared construction is referenced by at least one line or exercise — **no strictly unreferenced declarations found in this range** (phantom hunting in lessons 01–07 is out of scope here).

## Summary counts

| Section | PORT (via issue #11) | REJECT |
|---|---|---|
| Cross-cutting (architecture) | 0 | 3 |
| Lesson 08 | 6 | 1 |
| Lesson 09 | 4 | 3 |
| Lesson 10 | 5 | 3 |
| Lesson 11 | 5 | 3 |
| Lesson 12 | 4 | 6 |
| Lesson 13 | 6 | 4 |
| Lesson 14 | 1 | 6 |
| **Total** | **31** | **29** |

60 candidates audited; every candidate carries exactly one disposition. Suggested port order for issue #11 (dependency-safe): L13 `ta.aa-irukku` + `ta.vali` variant → L08 `ta.pidikkum`(+neg) + `ta.vida` → L12 `ta.mudiyumaa` + `ta.aadheenga` + தெரியாது → L11 `ta.busla` + `ta.naa-conditional` → L09/L10 notes and variants → L14 combined transfer last.
