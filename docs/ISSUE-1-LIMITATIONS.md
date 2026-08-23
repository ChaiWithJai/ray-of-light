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

### L4 — UD_Tamil-TTB is non-commercial, so Tamil has no morphology layer

French morphology is sourced. Tamil is not, and this one is a **licence** problem
rather than a network problem:

| Treebank | Licence | Usable? |
| --- | --- | --- |
| UD_French-GSD | CC BY-SA 4.0 | Yes, with attribution + share-alike |
| UD_Tamil-TTB | **CC BY-NC-SA 3.0** | **No — non-commercial** |

A non-commercial corpus cannot go into a corpus that may ship commercially, and
vendoring it quietly is exactly the trap the sourcing model warns about. It is
excluded deliberately, and a test asserts Tamil has no lexicon so nobody "fixes"
it by accident.

Note also that CC BY-SA 4.0 is **share-alike**: the derived French lexicon carries
that obligation. It is isolated in `data/reference/` rather than merged into the
canonical corpus so the boundary is explicit.

**Needs a human:** either a differently-licensed Tamil treebank, a commercial
licence for TTB, or a native linguist annotating our own lines.

---

## Not blocked, deliberately deferred

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
