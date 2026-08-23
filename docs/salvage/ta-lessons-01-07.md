# Salvage manifest — PR #2 Tamil lessons 01–07 (part of issue #7)

Audit of draft PR #2's Tamil lessons 1–7 (`origin/claude-mac/issue-1-content`, commit `b5c7f45`,
`src/lib/content/ta/lesson-0N.ts`) against main's shipped Tamil content
(`src/lib/content/ta.ts`, `defineLesson` DSL, lessons `l1`–`l7`, ids `ta.<local-id>`).

Ground rules applied:

- **Disposition** is exactly one of **PORT** (execute via issue #10) or **REJECT**. Nothing here
  edits main directly.
- **Targets** are mapped by *communicative function*, not lesson number. PR lesson numbers and
  main lesson numbers do not line up (PR 1 = introductions, main 1 = coffee shop). A target may
  live in main l8–l14 when that is where the function lives. **No main lesson is ever replaced
  wholesale.**
- **Register rule:** main's canon is spoken Chennai register (இருக்கு not இருக்கிறது, வேணும் not
  வேண்டும், வேணாம் not வேண்டாம்). Any PR line *more literary* than main's equivalent is REJECT.
  PR content that is *more colloquial* than main (எவ்ளோ, ரூபா, அம்பது) is a legitimate PORT
  candidate but flagged for native review.
- **Architecture rule:** anything that only exists because of PR #2's registry/schema
  (`schemas/content` `Lesson` type, per-line ids/audio/provenance, `introducedIn` registry) is
  REJECT — main's `defineLesson` DSL is canonical. See the cross-cutting table.
- Construction-metadata conflicts and declared-but-unreferenced constructions are flagged for
  **issue #12** in a dedicated section.

---

## Cross-cutting architecture rejections

These apply to all seven lessons and are not repeated per lesson.

| # | Candidate | What it adds over main | Disposition | Target in main | Risk notes |
|---|---|---|---|---|---|
| X1 | `schemas/content` `Lesson` shape: per-line `id`/`lessonId`/`register`/`dialect`/`source`/`license`/`reviewStatus` | Explicit per-line metadata | REJECT | — | Architecture. Main's `LanguageProfile` + `defineLesson` supplies all of this once per language. |
| X2 | Per-line `audio` blocks with `startMs`/`endMs` and ms-timed `chunks` | Audio offset scaffolding | REJECT | — | Architecture. Main tracks offsets in `audio-offsets.json` / `audio-provenance.json`; PR offsets are placeholders anyway. |
| X3 | `license: 'CC-BY-4.0'` provenance | Alternate licensing | REJECT | — | Conflicts with main `TA_PROFILE` `license: 'owned'`. Ported *text* inherits main's provenance; do not carry the CC-BY declaration over. |
| X4 | `level: 'A0'` + in-lesson construction registry entries (`introducedIn`) | Finer level tag; per-lesson registry | REJECT | — | Metadata conflict with main's `A1` and with main's declare-where-introduced + `carryConstructions` model. Flag for issue #12. |

---

## PR lesson 01 — "Greetings & introductions"

Nearest main function: main l1 காபி கடையில் (`ta.vanakkam`, `ta.enakku-venum`, `ta.romba-nalla`).
Main has **no** introductions lesson, so several candidates target notes/constructions, not scenes.

| # | Candidate | What it adds over main | Disposition | Target in main | Risk notes |
|---|---|---|---|---|---|
| 1.1 | Wellbeing exchange, lines l01–l03: நல்லா இருக்கீங்களா? / நல்லா இருக்கேன் / நீங்க எப்படி இருக்கீங்க? | Main greets with bare வணக்கம்; the how-are-you exchange is absent from all of main | PORT | main l1, new construction `ta.eppadi-irukkeenga` beside `ta.vanakkam` | Keep to 2–3 lines so l1 stays an ordering scene. Register is correctly spoken (இருக்கீங்க). |
| 1.2 | Morphology note: person lives in the verb ending (-ஏன் "I", -ஈங்க "you (polite)"), subject droppable | Main never states the pro-drop/agreement fact explicitly | PORT | main l1, grammar note anchored on the ported இருக்கீங்க line (`ta.eppadi-irukkeenga`) | None — high-value generalization, matches main's note style. |
| 1.3 | என் பேரு + name construction, zero-copula note, recall variants (பேரு/பேர், script + translit) | Self-introduction is absent from main entirely | PORT | main l1, new construction `ta.en-peru` (one line + recall exercise) | பேரு (spoken) vs பேர் — keep பேரு canonical, accept both. Scope: one line only. |
| 1.4 | உங்க ஊரு எது? + "native place" culture note | Getting-to-know-you question absent from main | REJECT | — | No communicative slot in main l1–l14 (introductions beyond name are out of scope); re-author when an introductions lesson exists. |
| 1.5 | Morphology note: locative -ல (spoken) vs written -இல் (சென்னைல) | Main *uses* -ல (மீட்டிங்ல, வீட்ல, கடைக்கு…) but also literary-leaning மாடியில் (l2) and never explains -ல | PORT | main l4, morphology note near `ta.enge-irukku` (location kit); cross-check main l2 மாடியில் register while there | Flags a latent register wobble in main l2 (மாடியில்); note only, no respelling without native review. |
| 1.6 | -தான் emphasis in சென்னைதான் | Emphatic clitic | REJECT | — | Duplicate of the fuller -உம்/-தான் note salvaged from PR lesson 04 (row 4.5). |
| 1.7 | Occupation exchange l07–l08 (என்ன பண்றீங்க? / வேலை பண்றேன்) + OV word-order note + பண்ணு-vs-செய் register note | Main's பண்ணு appears only in l11 என்ன பண்ணலாம்; occupation use is absent | PORT | main l11, note/variant on `ta.enna-pannalam` (பண்ணு light-verb family) | Do not add a new construction; fold as extension note so l11's construction set is untouched. |
| 1.8 | உங்கள பார்த்ததுல ரொம்ப சந்தோஷம் ("nice meeting you") | Closing pleasantry | REJECT | — | Phrasing unverified/awkward (பார்த்ததுல); precisely the axis a non-native author cannot self-check. No main anchor. |
| 1.9 | அப்புறம் பார்க்கலாம் farewell + pronunciation note (paakkalaam, -லாம் = "let's/can") | Everyday "see you later" absent from main; note previews -லாம் | PORT | main l11, accepted-variant/note on `ta.pona` (-லாம் form); pairs with main l13 சனிக்கிழமை பார்க்கலாம் | Keep as note + accepted variant, not a new line. |

---

## PR lesson 02 — "Ordering tea & coffee"

Direct functional overlap with main l1 காபி கடையில் and main l2's -ஆ question teaching.

| # | Candidate | What it adds over main | Disposition | Target in main | Risk notes |
|---|---|---|---|---|---|
| 2.1 | அண்ணா / அக்கா address culture note (merging PR l02 + l03 versions: friendly, not familial; polite -ங்க replaces "please") | Main's shopkeeper is unaddressed; kinship-address is a core street-Tamil skill | PORT | main l1, culture note on the ordering line (`ta.kudunga` context also fits main l3) | Single merged note; the PR lesson 07 duplicate is rejected (row 7.3). |
| 2.2 | Either/or question = two -ஆ questions (ஸ்ட்ராங்கா வேணுமா, லைட்டா வேணுமா?) line + grammar note | Main teaches single -ஆ questions only | PORT | main l2, beside the -ஆ teaching on `ta.irukka-q` | One line max; strong/light loanwords are authentic spoken register. |
| 2.3 | -ஆ yes/no question as a *declared construction* (main teaches it only in notes) | Main lines use வேணுமா/இருக்கா/தூரமா but no `ta.<id>` exists for -ஆ | PORT | main l2, new construction `ta.aa-question`; retro-reference from main l2's completion exercise (rule already states it) | Touches several main lessons' construction lists if retro-tagged — port the declaration in l2 only, tag other lessons opportunistically. Flag for issue #12 bookkeeping. |
| 2.4 | சர்க்கரை கம்மியா போடுங்க (customizing an order) | Main l1's sugar exchange is binary (வேணுமா / கொஞ்சம்); கம்மியா + போடுங்க adds real ordering power | PORT | main l1, extra customer line in the sugar exchange (`ta.kudunga` sibling போடுங்க) | Note சர்க்கரை spelling (main matches); PR lesson 07 respells it சக்கரை — rejected below (7.5). |
| 2.5 | Refusal construction NOUN + வேணாம் (PR: வேண்டாம்) + street-vendor transfer exercise | Main has ஒண்ணும் வேணாம்! (l13) but never declares/teaches refusal | PORT | main l13, new construction `ta.venaam` anchored on the existing ஒண்ணும் வேணாம் line | **Must respell வேண்டாம் → வேணாம்** to match main's register before porting. |
| 2.6 | Line as written: பிஸ்கட் வேண்டாம், டீ மட்டும் போதும் | — | REJECT | — | Register rule: வேண்டாம் is more literary than main's வேணாம் (l13). Concept survives via row 2.5. |
| 2.7 | Morphology note: "the wanter is usually left unsaid" for வேணும் | Alternative analysis of wanting | REJECT | — | Contradicts main `ta.enakku-venum`, whose entire teaching point is the dative wanter (எனக்கு). Pedagogical conflict — flag for issue #12. |
| 2.8 | Literary↔spoken mapping notes: இருக்கு < இருக்கிறது, வேணும் < வேண்டும் | Main asserts spoken register but rarely shows the literary counterpart | PORT | main l2, note on `ta.irukka-q` (இருக்கு/இருக்கா pair) | Keep tiny; the course teaches spoken, literary forms are recognition-only. |
| 2.9 | இந்தாங்க hand-over line + note | — | REJECT | — | Main l3 already has இந்தாங்க. நன்றி! — duplicate. |
| 2.10 | செம்மையா / "semma" slang culture note | Current Chennai color absent from main | PORT | main l1, culture note on `ta.romba-nalla` (ரொம்ப நல்லா இருக்கு line) | Slang dates quickly and is register-risky — note only, never canonical line text; native review gate. |
| 2.11 | Closing நன்றிங்க! இன்னொரு தடவ வாங்க | — | REJECT | — | Main l3 already closes with வாங்க, மறுபடியும் வாங்க — same function. |

---

## PR lesson 03 — "Numbers & paying"

Direct functional overlap with main l3 மார்க்கெட்டில் and main l5's price question.

| # | Candidate | What it adds over main | Disposition | Target in main | Risk notes |
|---|---|---|---|---|---|
| 3.1 | எவ்ளோ as spoken contraction of எவ்வளவு (note + accepted variants) | Main's canonical எவ்வளவு is the *more literary* member of the pair | PORT | main l3, note + accepted-answer variants on `ta.evvalavu` recall/completion (எவ்ளோ, evlo) | Keep எவ்வளவு canonical (main's எவ்வளவு-vs-எத்தனை completion rule depends on it); எவ்ளோ as accepted variant only. Native review on how contracted to go at A1. |
| 3.2 | Spoken numeral notes: அஞ்சு (<ஐந்து), அம்பது (<ஐம்பது), ஐ→அ flattening; spoken counting list | Main uses அஞ்சு நிமிஷம் (l4) and நூத்தி ஐம்பது (l5) with no explanation | PORT | main l3 pronunciation note near `ta.oru-kilo`; cross-reference main l5 நூத்தி ஐம்பது | Main l5 mixes registers (நூத்தி + ஐம்பது) — note flags it; do not respell canonical text without native review. |
| 3.3 | ரூபா as spoken form of ரூபாய் (accepted variants) | Main consistently writes ரூபாய் | PORT | main l3, translit note + accepted variants on the `ta.evvalavu` price answers (the ரூபாய் lines); main l5's ரூபாய் lines follow the same pattern once l3 sets it | Variant-level only; canonical stays ரூபாய் pending native review. |
| 3.4 | ஆகுது (spoken present of ஆகும்/ஆகிறது) + "how much *becomes*" literal-gloss note | Main has எவ்வளவு ஆகும் (l5, l12) future only | PORT | main l12, note/variant on `ta.evvalavu-aagum` (மொத்தம் எவ்ளோ ஆகுது? as accepted variant) | Good literal-gloss quality in PR here — carries the "becomes" insight main lacks. |
| 3.5 | Change exchange l09–l10: சில்லறை இருக்கா? / இருக்கு … அம்பது ரூபா | Paying with a big note + asking for change is absent from main | PORT | main l3, one-line extension of the payment beat (function: `ta.irukka-q` applied to money) | Respell அம்பது→ஐம்பது or keep spoken form per row 3.2 decision — decide once, consistently, in issue #10. |
| 3.6 | Counted noun stays singular after numeral (note) | — | REJECT | — | Duplicate: main l2 already teaches it on ரெண்டு நாள், not நாள்கள். |
| 3.7 | Per-item pricing frame ஒரு பழம் அஞ்சு ரூபா (unit price, vs main's kilo price) | Main l3 only prices by kilo | PORT | main l3, answer-pattern variant under `ta.evvalavu` (note or one seller line) | Small; don't grow the dialogue beyond +1 line. |
| 3.8 | மேடம் address term | — | REJECT | — | Low value; அண்ணா/அக்கா note (2.1) covers address strategy; மேடம் register unverified. |
| 3.9 | Transfer exercise: price mango then order four (two-construction transfer) | — | REJECT | — | Main l3's transfer already exercises `ta.evvalavu`; main's transfer shape is single-`use`. Duplicate function + shape mismatch. |

---

## PR lesson 04 — "Asking where something is"

Direct functional overlap with main l4 வழி கேட்பது.

| # | Candidate | What it adds over main | Disposition | Target in main | Risk notes |
|---|---|---|---|---|---|
| 4.1 | மெடிக்கல் ஷாப் culture note ("pharmacy" gets blank looks; English loans normal) | Practical survival knowledge absent from main | PORT | main l4, culture note (`ta.enge-irukku` context) | None significant. |
| 4.2 | Position postpositions பக்கத்துல / எதிர்ல + landmark-first morphology note (கோவில் எதிர்ல) | Main l4 gives only வலது/இடது/நேரா and ரொம்ப கிட்ட — no "next to / opposite" | PORT | main l4, new construction `ta.pakkathula` alongside `ta.valathu-idathu` | Best single salvage in the PR: fills a real gap in the directions kit; excellent literal glosses. |
| 4.3 | சிக்னல் as Chennai direction landmark (culture note) | Local color | PORT | main l4, one-line culture note (can merge with 4.1) | Trivial. |
| 4.4 | English left/right lines (லெப்ட்ல திரும்புங்க) + claim இடது/வலது "sounds bookish on the street" | More colloquial direction vocabulary | REJECT | — | Directly contradicts main's `ta.valathu-idathu` construction. Whether the pure-Tamil forms are street-viable is exactly a native-review call; do not port a note that undermines a shipped construction. Log for issue #12 as a content conflict. |
| 4.5 | Grammar note: -உம் "also" + தான் emphasis (ஸ்டாப்பும் அங்க தான்) | Neither clitic is explained anywhere in main | PORT | main l4, grammar note (anchor a தான்-bearing answer line); supersedes PR 1.6 | Note only — don't declare a construction for clitics at A1. |
| 4.6 | இங்க இருந்து தூரமா? ("far *from here*") | Main l4 has bare தூரமா?; adds the இருந்து source phrase | PORT | main l4, accepted variant/note on `ta.dooram`; cross-links forward to `ta.irundhu` (main l8) | Nice forward-seeding of இருந்து; keep தூரமா canonical. |
| 4.7 | ரொம்ப தேங்க்ஸ் + claim நன்றி "sounds formal in speech" | More colloquial thanks | REJECT | — | Contradicts main's canonical நன்றி in l1–l7 wholesale; needs native adjudication before any change. Log with 4.4 for issue #12. |
| 4.8 | ரெண்டு நிமிஷம் தான் distance answer | — | REJECT | — | Duplicate: main l4 already answers with அஞ்சு நிமிஷம் / ரொம்ப கிட்ட. |
| 4.9 | Transfer exercise: ask where the ATM is, then confirm it's next to the bank | Adds a confirm-guess second move to main's single-move transfer | PORT | main l4, enrich the existing `ta.enge-irukku` transfer situation (exemplar gains a பக்கத்துல இருக்கா? tail once 4.2 lands) | Depends on 4.2; keep main's single-`use` exercise shape (use = `ta.enge-irukku`). |

---

## PR lesson 05 — "Family & relationships"

**No main lesson covers family.** Most of this lesson has no communicative-function target and
cannot be ported without inventing a new lesson (barred: never replace/expand main's lesson map
under salvage). Only cross-cutting grammar survives.

| # | Candidate | What it adds over main | Disposition | Target in main | Risk notes |
|---|---|---|---|---|---|
| 5.1 | யாரு யாரு doubling = "who all" (grammar note) | Question-word reduplication | REJECT | — | No anchor: யாரு appears in main only as an exercise distractor (l6). Re-author with a future family lesson. |
| 5.2 | Family-roster dialogue (அம்மா, அப்பா, தம்பி… இருக்காங்க) | Whole new topic | REJECT | — | No function target in main l1–l14; porting = new lesson, out of salvage scope. |
| 5.3 | Dative age idiom: அவனுக்கு பதினெட்டு வயசு ("to him eighteen age") morphology note | Extends main's dative -க்கு family (எனக்கு, மதுரைக்கு, மணிக்கு) with the age use | PORT | main l5, morphology note on `ta.ticket-kku` (the note there already generalizes -க்கு) | Note only; no dialogue line. Strong literal-gloss quality. |
| 5.4 | -ஓட possessive construction (என்னோட அக்கா) | Spoken possessive suffix | REJECT | — | No construction slot; main gets by on bare என்/உங்க at A1. Rides on rejected family content. |
| 5.5 | Honorific note: respected singular takes plural-shaped இருக்காங்க / -ஆரு forms | Main l9 *uses* honorific அவரு … இருக்காரு with no explanation | PORT | main l9, grammar note anchored on அவரு மீட்டிங்ல இருக்காரு (`ta.pesalama` lesson) | Port the *insight*, reworded for the -ஆரு form main actually uses. |
| 5.6 | அக்காவுக்கு கல்யாணம் ஆச்சா? exchange | Experiencer-dative for life events | REJECT | — | No target; personal-status questioning needs native/cultural review before teaching. |
| 5.7 | Age recall variants (என்ன வயசு / எத்தனை வயசு both accepted) | Variant tolerance | REJECT | — | Rides entirely on rejected family content (5.2). |

---

## PR lesson 06 — "Daily routine"

No routine lesson in main, but three of PR 06's constructions name patterns main **already uses
without declaring** — the highest-leverage salvage in the batch.

| # | Candidate | What it adds over main | Disposition | Target in main | Risk notes |
|---|---|---|---|---|---|
| 6.1 | number + மணிக்கு "at X o'clock" as a declared construction + dative-link note | Main uses ரெண்டு மணிக்கு (l5), மூணு மணிக்கு (l9), எட்டு மணிக்கு (l13) **undeclared** | PORT | main l5, new construction `ta.manikku` beside `ta.enna-neram`; retro-tag l9/l13 lines opportunistically | Fixes a latent gap in main; flag the retro-tagging for issue #12 bookkeeping. |
| 6.2 | -ட்டு/-ச்சிட்டு sequential ("having done X, …") construction + only-last-verb-carries-tense note | Main uses காபி குடிச்சிட்டு போகலாம் (l10) **undeclared and unexplained** | PORT | main l10, new construction `ta.chittu-sequence` anchored on the existing குடிச்சிட்டு line | Declaration + note only; don't import PR's routine dialogue. Completion exercise (குடிச்சிட்டு vs குடிக்க vs குடிச்சேன்) is portable with it. |
| 6.3 | Habitual/spoken present morphology note: -றேன் / -றீங்க (vs literary -கிறேன்) | Main uses தூங்கறீங்களா, வைக்கறேன், எடுத்துக்கறேன் with no morphology note | PORT | main l8, morphology note anchored on நல்லா தூங்கறீங்களா? (near `ta.nalla-thoongala`) | Note only. |
| 6.4 | எத்தனை மணிக்கு? "at what time" variant | Main asks time only via என்ன நேரம்? | PORT | main l5, accepted variant/note on `ta.enna-neram` (with `ta.manikku` from 6.1) | Depends on 6.1. |
| 6.5 | `ta-appuram-then` construction ("then/after that") | — | REJECT | — | Duplicate of main's declared `ta.appuram` (l9). Id-shape conflict — log for issue #12. |
| 6.6 | Routine dialogue scene (beach walk, canteen, TV, sleep at eleven) | Whole new topic | REJECT | — | No routine lesson in main; scene port = new lesson, out of salvage scope. |
| 6.7 | -லதான் emphasis (கேண்டீன்லதான்) | — | REJECT | — | Covered by the -உம்/-தான் note ported in 4.5. |
| 6.8 | Evening-routine transfer exercise (வேலை முடிச்சிட்டு … போயி … பாக்கறேன்) | Sequential-chain production practice | REJECT | — | Exemplar uses verbs main never teaches (முடி, போயி, பாக்க-); would need full re-authoring even after 6.2 lands. |

---

## PR lesson 07 — Synthesis "ஒரு டீ, ஒரு அரட்டை"

Main l7 already ships a synthesis lesson with `carryConstructions`. Wholesale replacement is barred.

| # | Candidate | What it adds over main | Disposition | Target in main | Risk notes |
|---|---|---|---|---|---|
| 7.1 | Synthesis scene shape (chance meeting → find shop → order → pay → family/routine chat) | Alternative review dialogue | REJECT | — | Would replace main l7 wholesale; also reviews PR-only topics (family, routine) that main l1–l6 never taught. |
| 7.2 | எவ்ளோ ஆச்சு? — past-tense "what did it come to?" when paying | Main has only future ஆகும் / (via 3.4) present ஆகுது | PORT | main l12, note/accepted variant on `ta.evvalavu-aagum` (ஆச்சு alongside ஆகும்/ஆகுது) | Bundle with 3.4 in issue #10 so the ஆகு-family note is written once. |
| 7.3 | Fuller அண்ணா/தம்பி kinship-address culture note | — | REJECT | — | Duplicate of 2.1 (merged note already covers it). |
| 7.4 | Re-declared constructions with drifted glosses: `ta-evlo-price-question` re-glossed as "எவ்ளோ ஆச்சு?", `ta-oda-possessive` re-glossed as "possessive *pronoun* before kin term", re-declared `aa`/`nga` entries | — | REJECT | — | Construction-metadata conflicts — same id, different meaning at re-declaration site. Log for issue #12; canonical definitions live at first introduction (main's model makes this impossible by design). |
| 7.5 | சக்கரை spelling (vs சர்க்கரை in PR l02 and in main l1) | — | REJECT | — | Internal inconsistency within PR #2; main's சர்க்கரை stands. |
| 7.6 | Extra synthesis transfer: "find the ticket counter at a station" (டிக்கெட் கவுண்ட்டர் எங்க இருக்கு?) | Main l7 has only ONE exercise (a single transfer); this adds a second, and its station setting matches main l7's existing scene | PORT | main l7, second transfer exercise, `use: 'ta.enge-irukku'` (already in l7's `carryConstructions` list) | Keep main's synthesis exercise shape (`constructions: []`, single `use`); rewrite prompt to reference main l7's dialogue. |

---

## Issue #12 flags — construction metadata conflicts & unreferenced declarations

Found while auditing; file/append these to issue #12 regardless of PORT/REJECT outcomes above.

**Declared but unreferenced (in the introducing lesson):**

- `ta-vanakkam-greeting` — declared in PR ta-01's construction list, but **no ta-01 line references
  it** (line 1's வணக்கம்! is tagged only `ta-nalla-irukkeenga-wellbeing` + `ta-aa-yesno-question`).
  First actual reference is ta-07-l01. Main's `ta.vanakkam` does not have this problem.

**Metadata conflicts inside PR #2 (lessons 1–7):**

- `ta-aa-yesno-question`: `introducedIn: 'ta-01'` everywhere, but ta-04's re-declaration note says
  "Introduced in lesson 3" — provenance contradiction.
- `ta-la-locative-irukken` (ta-01) vs `ta-la-locative` (ta-04): two near-duplicate locative
  constructions with different ids; ta-04 also splits off `ta-position-postposition-la`. Main
  needs at most one -ல note (row 1.5) plus `ta.pakkathula` (row 4.2).
- `ta-evlo-price-question`: gloss drift between ta-03 ("NOUN + எவ்ளோ?") and ta-07 ("எவ்ளோ ஆச்சு?").
- `ta-oda-possessive`: gloss drift between ta-05 (-ஓட suffix) and ta-07 (bare pronoun + kin term).
- Register drift: வேண்டாம் (ta-02) vs main's வேணாம்; சர்க்கரை (ta-02) vs சக்கரை (ta-07).
- `level: 'A0'` (PR) vs `A1` (main); `license: 'CC-BY-4.0'` (PR) vs `owned` (main profile).

**PR↔main construction id collisions (same function, different id — mapping table for issue #10):**

| PR #2 id | Main id | Note |
|---|---|---|
| `ta-vanakkam-greeting` | `ta.vanakkam` | identical function |
| `ta-veenum-want` | `ta.enakku-venum` | **pedagogical conflict**: PR drops the dative wanter that main teaches (row 2.7) |
| `ta-kudunga-request` / `ta-nga-polite-imperative` | `ta.kudunga` | PR declares the same fact twice under two ids |
| `ta-irukkaa-availability` | `ta.irukka-q` + `ta.illa-neg` | PR bundles what main splits across l2/l10 |
| `ta-evlo-price-question` / `ta-aagum-cost` | `ta.evvalavu` / `ta.evvalavu-aagum` | register variant + tense variants (rows 3.1, 3.4, 7.2) |
| `ta-enga-irukku-where` | `ta.enge-irukku` | identical function |
| `ta-numeral-noun-counting` | `ta.oru-kilo` / `ta.kku-for` | overlapping counting patterns |
| `ta-appuram-then` | `ta.appuram` | duplicate (row 6.5) |
| `ta-manikku-time`, `ta-ttu-sequential`, `ta-aa-yesno-question` | *(none)* | main uses these patterns undeclared — PORT rows 6.1, 6.2, 2.3 close the gap |

**Latent main-side items surfaced by this audit** (for issue #12, not salvage): மாடியில் (l2) and
நூத்தி ஐம்பது (l5) are more literary/mixed than main's own register bar; மணிக்கு and குடிச்சிட்டு
appear in main lines with no declared construction.

---

## Summary counts

| Lesson | Candidates | PORT (via issue #10) | REJECT |
|---|---|---|---|
| Cross-cutting (architecture) | 4 | 0 | 4 |
| PR 01 — Introductions | 9 | 6 | 3 |
| PR 02 — Tea & coffee | 11 | 7 | 4 |
| PR 03 — Numbers & paying | 9 | 6 | 3 |
| PR 04 — Asking where | 9 | 6 | 3 |
| PR 05 — Family | 7 | 2 | 5 |
| PR 06 — Daily routine | 8 | 4 | 4 |
| PR 07 — Synthesis | 6 | 2 | 4 |
| **Total** | **63** | **33** | **30** |

Reject reasons breakdown (30): architecture/schema 4 · duplicate of main or of another candidate 10 ·
no communicative-function target in main 7 · register (more literary than main) 1 · contradicts
shipped main teaching (needs native adjudication) 3 · metadata/id conflict 3 · unverified phrasing
or untaught-vocabulary dependency 2.

Every PORT row is an additive note, variant, line, construction declaration, or exercise targeted
at an existing main lesson; none replaces a main lesson or requires PR #2's schema.
