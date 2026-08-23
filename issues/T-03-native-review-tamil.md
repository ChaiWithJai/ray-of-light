---
title: "[T-03] Native review pass on the Tamil corpus (highest risk)"
labels: [ticket, content, blocked]
---

# T-03 · Native review pass on the Tamil corpus (highest risk)

Higher risk than T-02 and should be scheduled first.

The course deliberately teaches **contemporary educated spoken Tamil**, not
literary Tamil — and spoken register is precisely the axis a non-native author
cannot self-check. Script, transliteration, literal gloss and natural English are
all structurally present and schema-valid, but treat the Tamil corpus as a
**placeholder with the right shape**, not as content.

Specific things to check: whether each line is what someone would actually say;
whether the transliteration matches Chennai-general pronunciation; whether the
literal glosses genuinely expose Tamil structure; and whether any line should
carry a formal variant that is currently missing.

## Acceptance criteria

- [ ] Native spoken-Tamil reviewer passes all 14 lessons for naturalness
- [ ] Transliteration scheme reviewed for consistency by a Tamil linguist
- [ ] Literal glosses confirmed to reveal structure rather than restate meaning
- [ ] Lines needing a formal variant are identified and authored
- [ ] `reviewStatus` moves to `two-native-review` in `TA_PROFILE`

## Depends on

—
