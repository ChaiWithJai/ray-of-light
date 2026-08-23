---
title: "[D-01] Canonical content schema and authoring format"
labels: [data, schema, content]
---

# D-01 · Canonical content schema and authoring format

Every teachable line is one record. French and Tamil share the schema; Tamil
populates more representation layers.

```json
{
  "lesson": 12,
  "language": "ta",
  "register": "spoken",
  "dialect": "chennai_general",
  "target_script": "எனக்கு ஒரு காபி வேண்டும்.",
  "transliteration": "enakku oru kaapi vendum",
  "literal_english": "To me, one coffee is wanted.",
  "natural_english": "I'd like a coffee.",
  "audio": { "speaker": "ta_f_01", "normal": "...", "slow": "..." },
  "construction": "enakku + noun + vendum",
  "level": "A1",
  "source": "original",
  "review_status": "two_native_reviewers",
  "license": "owned"
}
```

`construction` is the join key to the evidence log (F-02) and to the progress map.
It is the unit of learning — not the line, and not the lesson.

## Acceptance criteria

- [ ] Schema is versioned and validated at build time
- [ ] `construction`, `source`, `license` and `review_status` are required
- [ ] French records validate without transliteration; Tamil records require it
- [ ] A line can carry chunk boundaries for shadowing and span anchors for notes
- [ ] Accepted answer variants (2–5) attach to productive prompts

## Depends on

—
