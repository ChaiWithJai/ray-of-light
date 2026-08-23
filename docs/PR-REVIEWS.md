# PR reviews — #2, #3, #4, #5

Reviewed against `main @ eed909a`; re-checked against `caff267`, by which point
**#4 and #5 had already been merged**. Each section is written to be pasted as a
review comment on its PR.

> These could not be posted directly: `api.github.com` returns 403 from the
> Anthropic egress proxy ("an org admin must connect the Claude GitHub App"),
> even with `GITHUB_TOKEN` present. That is ticket `T-07`.

## Recommended merge order

| PR | Verdict | State |
| --- | --- | --- |
| **#5** Truthful recall evidence | ✅ Approve | **merged** (`5467d55`) |
| **#4** Playwright portability | ✅ Approve | **merged** (`c066822`) |
| **#3** Draft TTS audio | 🔶 Request changes — 4 items, all small | open |
| **#2** 28 POC lessons | ⛔ Needs a decision from you, not a merge | open (draft) |

**#2 and #3 cannot both land as they stand.** See #2 for why.

`main @ caff267` is green: `check` clean, 81 unit tests, e2e passing.

---

## PR #5 — Record truthful active-recall evidence ✅ (merged)

**Approve.** It fixes real data corruption, and the corrupted thing is the
evidence log — the single source of truth behind AC 10.

> Merged as `5467d55` while this review was being written. That commit is
> **larger and better than the branch tip I first reviewed** (`561c7d7`): it
> routes evaluation through `evaluateRecallAttempt`, and it also fixes
> `compare.svelte` to diff against the *matched accepted answer* rather than
> always the canonical line — another latent bug of mine, where a learner who
> gave an authored accepted variant was shown spurious differences against a
> canonical they were never asked for. Good call. My original note about
> `promptAppliesToLine` is obsolete; the note below is rewritten against the
> merged code.

The bug is mine. `recall-step.svelte` recorded `recall-correct` for *any*
non-empty input:

```js
if (attempt.trim() === '') return;
profile.record('recall-correct', lesson.id, line.constructions, { hinted, … });
```

Typing `asdf` granted `recalled`. Doing it on two different days granted
`stabilized` — the state deliberately designed to be unreachable within one
session. Progress would have read "retrievable" for constructions the learner had
never once produced, which is precisely the failure AC 10 exists to prevent.

**The design is right.** Pulling the decision into a pure `recallEvidenceKind()`
makes it impossible for the UI to grant recall as a side effect of navigating, and
it is unit-testable without a DOM. Seeding the spread to the prompted line is a
good catch too — previously it always opened on line 1 regardless of what the
prompt asked for.

**Verified locally:** merges clean into `main`, `npm run check` clean,
79 unit tests and 11 e2e pass (including the two new ones).

### One follow-up worth filing (not a blocker)

The merged code evaluates against:

```js
const acceptedAnswers = prompt?.acceptedAnswers ?? [contextLine.targetScript];
```

When an authored recall prompt exists this is exactly right. The fallback is the
narrow case — **synthesis lessons**, which the schema exempts from having a recall
exercise, so lessons 7 and 14 carry none.

Those lessons *can* reach the recall flow: `planToday` computes
`recallLessonIndex = nextIndex - lag`, which lands on 7 or 14 in the ordinary
course of things. When it does, evaluation falls back to exact match, after
normalisation, against a single string — the first line's `targetScript`. Free
spoken production judged that way will record `attempt-incorrect` almost every
time, even when the learner was right.

That matters beyond under-crediting, because `attempt-incorrect` feeds the
error-repair clustering in `/repair`: a learner who produced the line correctly
gets drilled on a construction they already own.

Suggested fix, either:
- give synthesis lessons an authored recall prompt, or
- record **nothing** when there is no reviewed answer set to judge against —
  silence is more honest than a false negative.

---

## PR #4 — Make Playwright browser resolution portable ✅ (merged)

**Approve.** Merged as `c066822`. This fixes a portability problem I introduced — I hardcoded
`/opt/pw-browsers/chromium-1194/chrome-linux/chrome` into the committed config,
which is a path that exists on exactly one machine.

Env-var opt-in with managed resolution as the default is the right shape, and the
README section is complete and accurate.

**Verified locally:**
- With `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` set → 11/11 e2e pass.
- Unset in this sandbox → fails with `Executable doesn't exist … chromium_headless_shell-1234`,
  which is *correct* behaviour: the managed build genuinely isn't installed here.
  Any constrained runner needs the variable, which is exactly what the README says.

### One addition before merge

The follow-up branch for #3 (`claude-local/issue-1-pr3-followup`) reports that
headless audio playback also needs:

```
--autoplay-policy=no-user-gesture-required
```

in `launchOptions.args`, and explicitly says that flag "belongs in whatever shape
the portability fix lands as". Without it, #3's audio e2e fails on a silent
`play()` rejection.

Since this PR owns `launchOptions`, it should have been added here. As merged it
is **not** present — so it now needs to ride along with #3 instead, or #3's audio
e2e will fail for a reason that has nothing to do with #3.

---

## PR #3 — Audio: draft TTS for all 28 lessons + measured offsets 🔶

**Request changes** — four items, none large. The engineering here is good and I
want it in.

### What's clearly better than main

- **Measured offsets replace my fake 4-second grid.** Mine were invented; these
  come from `ffprobe` at generation time. Strictly better.
- **Chunks now split the line's actual duration** instead of assuming 900ms each.
- **`pending: measured === undefined`** is exactly the right derivation — the flag
  now means "no recording exists" rather than being hardcoded.
- **`SYNTHESIS_FLOW` gains `preview`.** This is a real bug fix of mine: AC 2 says
  *a session* begins with audio before orthography, and my synthesis flow skipped
  audio entirely. Good catch.
- The generator's header comment is honest about what it is.

### Blocking

**1. `speakerId` still claims a human.** Lines carry `fr_f_01` / `ta_f_01`, but the
audio is macOS `say` — Thomas (a *male* fr_FR voice) and Vani. The data now asserts
a speaker identity that does not exist, and the `_f_` is wrong on top of that. In a
corpus where every record carries `source` / `license` / `reviewStatus` precisely so
nothing is implied, this is the one field that lies. Rename to something like
`fr_tts_say_thomas`.

**2. The 3.6MB of audio has no licence record.** This repo refuses a non-commercial
morphology corpus and documents its share-alike boundaries in `data/reference/LICENSE.md`.
Committing macOS TTS output to a public repo with no provenance field is
inconsistent with that standard — and Apple's terms for redistributing `say` output
are not obviously permissive. Either add a licence/provenance record (the follow-up's
`audio-provenance.json` is the right vehicle — promote it into this PR) and confirm
redistribution is allowed, or keep the `.mp3`s out of git and generate them locally.

**3. Don't present synthesized audio as a model to imitate.** Using it in `preview`
and the spread is fine — there it is comprehension scaffolding. But `1g pronunciation`
and `1j shadowing` ask the learner to *copy* what they hear. TTS prosody, unreviewed,
in a course whose entire method is imitation, risks teaching wrong rhythm in the two
surfaces that matter most for it — and for Tamil that compounds with the spoken-register
risk already tracked in `T-03`. Suggest gating: allow synthetic audio in preview/spread,
and suppress or visibly mark it in pronounce/shadow until native recordings land.

**4. Merge the follow-up with this, not after.** On its own this PR has a P1: once the
first playthrough fires `ended`, the main Play button calls `resume()` at EOF, nothing
plays, and the required second listen is unreachable except through the separate replay
control. `claude-local/issue-1-pr3-followup` fixes it (`started` treats an ended
recording as not-started), adds the disclosure UI, and ships a regression test. Fold it
in before merging.

---

## PR #2 — Content: all 28 POC lessons (14 FR + 14 TA) ⛔

**This needs a decision from you before it needs a review.** Holding as Draft is
right.

**The problem is not quality.** In several respects this content is better than
what is on `main`:

- **Interlinear glosses** — `"well are-you(polite)-QUESTION?"` — reveal Tamil
  structure far better than my prose glosses (`"To-me one coffee is-wanted."`).
  This is the single best idea in the PR.
- Named speakers (Priya, Arun) read as real dialogue.
- `level: 'A0'` for lesson 1 is more accurate than my `A1`.
- One file per lesson scales; my two large files will not at 100+ lessons.

### Why it can't merge as-is

**1. It is a parallel corpus for lessons that already landed.** `main` has had 28
lessons since `a8dbb02`; this branch forked from `50d5c5f`, one commit earlier.
It conflicts on `content.test.ts` and `index.ts`, and the corpora are *entirely
different content* — `ta-01` on main is a coffee shop (8 lines); here it is a
housewarming introduction (10 lines). This is a choice between two corpora, not a
merge of one.

**2. It is mutually incompatible with PR #3.** #3's `.mp3`s and
`audio-offsets.json` were generated by speaking **main's** lines. If this corpus
replaces main's, every recording narrates the wrong text and every offset points
at a line that no longer exists. Whichever corpus wins, audio must be regenerated
after — and only one of these two PRs can land in its current form.

**3. It silently claims audio exists.** This was written against `50d5c5f`, where
`AudioClip` had no `pending` field at all. Merged into main, `pending` defaults to
`false`, so:

- `audioPending()` returns false,
- the "audio pending native recording" notices disappear across the whole app,
- the player renders for `.mp3` files that were never generated,
- and the offsets (`0–2800`, `2800–6400`, …) are hand-written, never measured.

That is exactly the honesty property `AC 11` and limitation `L1` exist to protect,
and it would break silently rather than loudly. If this corpus lands, every line
needs `pending: true` until real audio exists.

**4. Metadata drift.** `license: 'CC-BY-4.0'` vs main's `owned` — that is a real
licensing decision and it should be deliberate and uniform across the corpus, not
divergent per branch. Also `dialect: 'chennai'` vs `chennai_general` (main's test
asserts the latter) and `speakerId: 'ta-speaker-1'` vs `ta_f_01`.

### Recommendation

Decide the corpus question first, then land accordingly:

- **If this content wins:** land it as an explicit *replacement* — delete
  `fr.ts` / `ta.ts`, port main's conformance tests onto it, set `pending: true`
  throughout, reconcile the licence field, and regenerate audio afterwards.
- **If main's wins:** close this and cherry-pick the good ideas — interlinear
  glosses first, then the A0 start, per-lesson files, and named speakers.

Either way it is worth saying out loud: both corpora are `reviewStatus: 'draft'`
and neither has been read by a native Tamil speaker. Picking between them on
quality is guesswork until `T-03` happens.
