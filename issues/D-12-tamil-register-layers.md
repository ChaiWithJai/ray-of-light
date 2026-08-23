---
title: "[D-12] Tamil register, script and transliteration handling"
labels: [data, i18n, content]
---

# D-12 · Tamil register, script and transliteration handling

Tamil requires modelling the gap between formal written Tamil and standard
spoken Tamil. Teaching only literary Tamil produces learners who can decode
writing but sound unnatural in conversation.

Default profile: **contemporary educated spoken Tamil, Chennai-oriented but
broadly intelligible, Tamil script plus temporary transliteration.**

Each line stores spoken form, script, transliteration, literal English, natural
English, and formal Tamil *only when meaningfully different*.

## Acceptance criteria

- [ ] Register (`spoken`/`formal`) and dialect are explicit fields, never implied
- [ ] Formal Tamil renders only when it differs meaningfully from the spoken form
- [ ] Transliteration is a scaffold with a progression-driven removal path (~L30)
- [ ] Literal and natural English are separate layers, both available
- [ ] A second native reviewer checks naturalness, not just correctness

## Depends on

D-01, F-04
