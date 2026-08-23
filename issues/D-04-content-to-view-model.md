---
title: "[D-04] Transformation: content record → spread view model"
labels: [data, transform]
---

# D-04 · Transformation: content record → spread view model

The renderer consumes a view model, not raw content records. The transform
resolves: which representation layers are active for this language profile and
progression (F-04, D7); which support is covered for the current spread state
(F-01); pair alignment and shared numbering; audio offsets per line and per chunk;
note span anchoring.

This is the single place language-specific and progression-specific decisions are
made. Components below it stay dumb.

## Acceptance criteria

- [ ] One pure function maps (content, language profile, spread state, progression) → view model
- [ ] No component branches on language code
- [ ] Support visibility is resolved here, never in a component
- [ ] Transliteration visibility follows progression rules, not a raw setting
- [ ] The transform is unit-testable without a DOM

## Depends on

D-01, F-01, F-04
