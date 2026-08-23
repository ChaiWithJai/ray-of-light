---
title: "[T-02] Native review pass on the French corpus"
labels: [ticket, content, blocked]
---

# T-02 · Native review pass on the French corpus

All 14 French lessons are `reviewStatus: 'draft'` — honest, because no native
reviewer has seen them. AC 11 requires the status to be recorded (it is), but the
corpus should not be treated as publishable until it is reviewed.

Check naturalness and register, not just grammaticality: the lessons aim at
everyday spoken French, and a technically correct sentence nobody says is a bug.

## Acceptance criteria

- [ ] One native French curriculum reviewer passes all 14 lessons
- [ ] A second bilingual editor confirms the English translations
- [ ] `reviewStatus` moves to `two-native-review` in `FR_PROFILE`
- [ ] The content test asserting `draft` is updated in the same commit

## Depends on

—
