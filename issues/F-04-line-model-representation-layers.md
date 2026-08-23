---
title: "[F-04] One line model with layered representations"
labels: [foundation, data-model, i18n]
---

# F-04 · One line model with layered representations

**Direction:** D7 — see `docs/architecture-map.md`

French needs target text and natural English. Tamil additionally needs script,
transliteration, literal English, and occasionally formal register. The renderer
must not branch on language.

A line carries an ordered list of representation layers; the active language
profile decides which render and in which order:

| Layer | French | Tamil |
| --- | --- | --- |
| `target` | ✓ | ✓ (spoken) |
| `script` | — | ✓ |
| `transliteration` | — | ✓ (temporary) |
| `literal_source` | optional | ✓ |
| `natural_source` | ✓ | ✓ |
| `formal` | — | only when meaningfully different |

Transliteration is a scaffold with a planned removal point (~L30), so its
visibility is part of the learner's progression, not a permanent preference.

## Acceptance criteria

- [ ] `Fr`/`En` generalise into a `RepresentationStack` driven by the language profile
- [ ] No component branches on language code to decide what to render
- [ ] A Tamil line renders script + transliteration + literal + natural without bespoke components
- [ ] Transliteration visibility is progression-derived and can be nudged off around L30
- [ ] Adding a third language requires no renderer changes

## Depends on

—
