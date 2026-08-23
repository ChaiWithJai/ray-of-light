---
title: "[T-05] Annotate Tamil morphology natively (TTB is thin on spoken forms)"
labels: [ticket, data, content]
---

# T-05 · Annotate Tamil morphology natively (TTB is thin on spoken forms)

**Licence status: resolved.** This project is non-commercial, and UD_Tamil-TTB
is CC BY-NC-SA 3.0 — non-commercial use is exactly what that grants. Tamil
morphology is sourced and wired into the notes drawer.

**One-way door:** if this ever ships commercially, `data/reference/ta/` must be
deleted and Tamil morphology re-sourced. `hasCommercialRestriction('ta')` makes
that queryable and a test asserts it stays recorded.

**The remaining problem is register, not licence.** Coverage is 27/158 lesson
forms, versus 174/184 for French — because TTB annotates *written* news Tamil
while this course teaches *spoken* Tamil. The forms it lacks are precisely the
spoken verb forms: `வேணும்`, `இருக்கு`, `குடுங்க`. A larger treebank of the same
register would not help.

It does resolve the most important one: `எனக்கு → என், pronoun, dative`, which is
what lesson 1's "the wanter goes in the dative" note rests on.

**The fix:** have a native linguist annotate our own Tamil lines directly. It is a
small job (~110 lines), the result is owned outright, it is in the right register,
and it carries no licence encumbrance.

## Acceptance criteria

- [ ] A native Tamil linguist annotates lemma, POS and case/features for all ~110 lines
- [ ] Annotations are stored as owned content, not under a share-alike licence
- [ ] Spoken verb forms (வேணும், இருக்கு, குடுங்க) resolve in the notes drawer
- [ ] `data/reference/ta/` can then be dropped, taking the NC restriction with it
- [ ] The commercial-restriction test is updated deliberately when that happens

## Depends on

—
