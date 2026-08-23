# Limitations log — for issue #1

**This file is written to be pasted as a comment on
[issue #1](https://github.com/ChaiWithJai/ray-of-light/issues/1).**

The agent that wrote it could not post it directly: `api.github.com` returns
`403 GitHub access is not enabled for this session. An org admin must connect the
Claude GitHub App for this organization.` That response comes from the Anthropic
egress proxy, not from GitHub — it is returned even though `GITHUB_TOKEN` and
`GH_TOKEN` are both present in the environment, and `gh` is not installed. Cloning
and pushing work because git traffic takes a different path.

**To unblock automated issue comments:** an org admin connects the Claude GitHub
App for `ChaiWithJai`. Until then this file is the handoff surface — keep appending
to it, and paste it into the issue.

---

## Blocked: cannot be done in this environment

### L1 — Sentence-level audio cannot be produced (blocks AC 8)

AC 8 requires "14 coherent, original lessons with sentence-level audio" per
language. The lesson **text** is authored and shipped; the **audio is not**.

- No native speakers available, and the content requirement is explicitly for
  native recordings.
- Text-to-speech is not available offline here, and synthesised speech would be
  the wrong pedagogy for a pronunciation-imitation product anyway.
- Audio hosting/corpus sources are blocked (see L3).

**What is built instead:** the entire audio path except the bytes — `AudioClip`
schema with `startMs`/`endMs` sentence slicing, phrase-level `chunks` for
shadowing, an audio manifest, and a player that derives slow playback via
`playbackRate` (issue #1 permits time-stretch, so no second recording is needed).
Dropping real recordings in and filling `normalUrl` completes AC 8 with no code
change.

**Needs a human:** commission one native speaker per language, one clean recording
per lesson, then fill in the manifest offsets.

### L2 — Native review cannot be obtained (partially blocks AC 11)

AC 11 requires provenance, licensing and native-review status on all canonical
content. Provenance and licensing are complete and machine-enforced. Review status
is recorded **honestly as `draft`** for all authored content, because no native
reviewer has seen it.

This matters most for **Tamil**: the product deliberately teaches contemporary
educated spoken Tamil rather than literary Tamil, and that is exactly the axis a
non-native author is least able to self-check. Treat the Tamil corpus as a
structural placeholder that is schema-valid and pedagogically shaped, not as
publishable content.

**Needs a human:** one native curriculum writer and one bilingual editor per
language; two reviewers moves `reviewStatus` to `two-native-review`.

### L3 — Most open corpora are blocked by egress policy

Verified reachability from this session:

| Host | Result | Intended use | Outcome |
| --- | --- | --- | --- |
| `raw.githubusercontent.com` | **200 — reachable** | Universal Dependencies | ✅ **sourced** |
| `downloads.tatoeba.org` | 403 policy denial | Supplementary sentence pairs | blocked |
| `commonvoice.mozilla.org` | 403 policy denial | Accent exposure, ASR testing | blocked |
| `kaikki.org` | 403 policy denial | Wiktionary → dictionary layer | blocked |
| `archive.org` | 403 policy denial | Public-domain FSI French course | blocked |
| `shadcn-svelte.com` | 403 policy denial | Component registry | worked around |

All 403s are policy denials at the egress proxy, confirmed against its status
endpoint. Per the proxy's own guidance these are reported rather than retried or
routed around.

**What was sourced:** `scripts/source-ud.mjs` pulls UD_French-GSD and derives a
morphology lexicon for the word forms our own lessons use — 174 of 184 covered,
including the conditional `voudrais → vouloir` that lesson 1 turns on. It is wired
into the notes drawer and lives in `data/reference/` with its licence.

**Consequence of the rest:** the supplementary layers (example sentences, accent
diversity, dictionary definitions) are unbuilt.

**Needs a human, or a session with wider egress:** allowlist those hosts, or fetch
the datasets and commit them.

### L4 — Tamil morphology: resolved, conditionally

**Previously listed as blocked. It is not, because this project is
non-commercial.**

UD_Tamil-TTB is CC BY-NC-SA 3.0. Non-commercial use is exactly what that licence
grants, so Tamil morphology is now sourced and wired into the notes drawer
alongside French.

| Treebank | Licence | Commercial use |
| --- | --- | --- |
| UD_French-GSD | CC BY-SA 4.0 | permitted |
| UD_Tamil-TTB | CC BY-NC-SA 3.0 | **prohibited** |

**This is a one-way door.** If the project ever ships commercially,
`data/reference/ta/` must be deleted and Tamil morphology re-sourced. The
constraint is queryable via `hasCommercialRestriction('ta')` and asserted by a
test, so it travels with the code rather than living in someone's memory.

Both licences are also **share-alike**, which is why the derived lexicons sit in
`data/reference/` rather than being merged into the canonical corpus.

#### The interesting part: coverage is thin for a reason

| Language | Lesson forms covered |
| --- | --- |
| French | 174 / 184 |
| Tamil | **27 / 158** |

Tamil coverage is low, and it is not mainly a size problem. **TTB annotates
written news Tamil; this course teaches spoken Tamil.** The forms it lacks —
`வேணும்`, `இருக்கு`, `குடுங்க` — are exactly the spoken verb forms. That is the same
written/spoken split the product exists to bridge, so a bigger treebank of the
same register would not fix it.

What it *does* resolve is the single most load-bearing annotation in the Tamil
course: `எனக்கு → என், pronoun, dative`. Lesson 1's grammar note claims "the wanter
goes in the dative"; this makes that checkable rather than asserted.

**The real fix (see T-05):** have a native linguist annotate our own ~110 Tamil
lines. Small, owned outright, correct register, and no licence encumbrance.

---

## Not blocked, deliberately deferred

- **Automated proof of transferable production.** The transfer exercise can
  detect only an explicitly authored sequence of whole-token patterns (including
  authored Tamil script/transliteration alternatives). A match records
  `transfer-pattern-matched`, which grants at most `recognized`; it does not count
  as retrieval-day evidence and cannot grant `transferable`. Full grammatical,
  semantic, pragmatic and native-quality validity still requires human or safely
  constrained expert evaluation. `transfer-correct` remains reserved for that
  stronger future evidence source and is accepted only with explicit
  `expert-review` provenance. Legacy heuristic events are retained for audit as
  `transfer-legacy-unverified` and grant no capability state.
- **Speech recognition for answer comparison (1n).** Capture and by-ear comparison
  are built; transcription needs a provider decision. The hard constraint from the
  spec is that recognition may transcribe but must never *score* pronunciation.
  Today 1n diffs typed input, which exercises the same discrimination.
- **Microphone capture.** Every mic button is present and wired to UI state, but
  none of them record yet — `MediaRecorder` plus a permission flow is unbuilt.
- **Constrained conversation partner (1u).** The lexical allowlist *is* enforced
  today by drawing partner turns from the met corpus rather than generating them,
  so the constraint holds by construction. A model-backed partner would need a
  provider plus a verification pass, because prompting alone is not enforcement.

---

## Worked around, no action needed

- **`shadcn-svelte.com` blocked.** The design system was rebuilt directly on
  `bits-ui` (the same primitives shadcn-svelte wraps) plus `tailwind-variants`.
  This removed `components.json`, the vendored `ui/` layer and 1361 lines of
  `style-vega.css`. No registry dependency remains.
