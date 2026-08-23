# Reference data licensing

Everything in this directory is **reference annotation**, never teaching content.
Canonical lessons are original and owned; see `src/lib/content/`.

## Sourced

| Source | License | Use |
| --- | --- | --- |
| UD_French-GSD | CC BY-SA 4.0 | Morphological annotation for French word forms used in our lessons |

Attribution: Universal Dependencies French-GSD treebank —
https://github.com/UniversalDependencies/UD_French-GSD

CC BY-SA 4.0 is share-alike. The derived lexicon in `fr/morphology.json` carries
that obligation; it is kept in its own directory, and out of the canonical corpus,
so the share-alike boundary is explicit rather than accidental.

## Deliberately NOT sourced

| Source | License | Why not |
| --- | --- | --- |
| UD_Tamil-TTB | **CC BY-NC-SA 3.0** | Non-commercial. Cannot go into a corpus that may ship commercially. |

Tamil morphological annotation needs a differently-licensed source or a native
linguist. See `docs/ISSUE-1-LIMITATIONS.md`.
