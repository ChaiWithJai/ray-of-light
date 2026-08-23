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

### L3 — Open corpora are blocked by egress policy

Verified reachability from this session:

| Host | Result | Intended use |
| --- | --- | --- |
| `raw.githubusercontent.com` | **200 — reachable** | Universal Dependencies treebanks |
| `downloads.tatoeba.org` | 403 policy denial | Supplementary sentence pairs |
| `commonvoice.mozilla.org` | 403 policy denial | Accent exposure, ASR testing |
| `kaikki.org` | 403 policy denial | Wiktionary extracts for the dictionary layer |
| `archive.org` | 403 policy denial | Public-domain FSI French course |
| `shadcn-svelte.com` | 403 policy denial | Component registry (worked around) |

All 403s are policy denials at the egress proxy, confirmed against its status
endpoint. Per the proxy's own guidance these are reported rather than retried or
routed around.

**Consequence:** the supplementary-data layers (example sentences, accent
diversity, dictionary definitions) are unbuilt. UD treebanks are reachable and can
be used for morphology/syntax annotation.

**Needs a human, or a session with wider egress:** allowlist those hosts, or fetch
the datasets and commit them.

---

## Not blocked, deliberately deferred

- **Speech recognition for answer comparison (1n).** Capture and by-ear comparison
  are built; transcription needs a provider decision. The hard constraint from the
  spec is that recognition may transcribe but must never *score* pronunciation.
- **Constrained conversation partner (1u).** The lexical allowlist is derivable
  from lessons met, but enforcing it against a model needs a provider and a
  verification pass — prompting alone is not enforcement.

---

## Worked around, no action needed

- **`shadcn-svelte.com` blocked.** The design system was rebuilt directly on
  `bits-ui` (the same primitives shadcn-svelte wraps) plus `tailwind-variants`.
  This removed `components.json`, the vendored `ui/` layer and 1361 lines of
  `style-vega.css`. No registry dependency remains.
