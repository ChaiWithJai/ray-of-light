# Reference data licensing

Everything in this directory is **reference annotation**, never teaching content.
Canonical lessons are original and owned; see `src/lib/content/`.

## Sources

| Source | Licence | Commercial use |
| --- | --- | --- |
| UD_French-GSD | CC BY-SA 4.0 | Permitted, with attribution + share-alike |
| UD_Tamil-TTB | CC BY-NC-SA 3.0 | **PROHIBITED** |

Attribution:
- Universal Dependencies French-GSD — https://github.com/UniversalDependencies/UD_French-GSD
- Universal Dependencies Tamil-TTB — https://github.com/UniversalDependencies/UD_Tamil-TTB

## ⚠️ The Tamil lexicon is non-commercial-only

`ta/morphology.json` is derived from a **CC BY-NC-SA 3.0** corpus. This project is
personal and non-commercial, which is exactly the use that licence grants.

**It is a one-way door.** If this ever ships commercially:

1. Delete `data/reference/ta/`.
2. Remove the Tamil branch from `src/lib/morphology.ts`.
3. Re-source Tamil morphology from something else, or annotate our own lines.

`hasCommercialRestriction('ta')` returns true so the constraint is queryable in
code, and `morphology.test.ts` asserts it stays recorded.

## Share-alike

Both licences are share-alike, so these derived lexicons carry that obligation.
They are kept in this directory and out of the canonical corpus so the boundary is
explicit rather than accidental.

## Coverage, and why Tamil's is thin

| Language | Lesson forms covered |
| --- | --- |
| French | 174 / 184 |
| Tamil | 27 / 158 |

Tamil coverage is low for a reason worth knowing: **TTB annotates written news
Tamil, and this course teaches spoken Tamil.** The forms it lacks — `வேணும்`,
`இருக்கு`, `குடுங்க` — are precisely the spoken verb forms. That is the same
written/spoken split the product exists to bridge, so a larger treebank of the
same register would not help. Annotating our own lines is the real fix.
