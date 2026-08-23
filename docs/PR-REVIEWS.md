# PR reviews

Reviewed against `main @ a1f9d50`. Each section is written to be pasted as a
review comment on its PR.

> These cannot be posted directly: `api.github.com` returns 403 from the
> Anthropic egress proxy ("an org admin must connect the Claude GitHub App"),
> even with `GITHUB_TOKEN` present. That is ticket `T-07`.

## Seven open

| PR | Verdict | Verified |
| --- | --- | --- |
| **#16** Salvage manifest for #2 | ✅ **Approve — merge now** | docs only |
| **#14** Construction invariants | ✅ Approve | check clean, 85 unit |
| **#15** Native-review gate | ✅ Approve, one gap | check clean, 87 unit |
| **#18** Attempt before reveal | ✅ Approve | check clean, 83 unit |
| **#17** Truthful transfer evidence | ✅ Approve | check clean, 89 unit |
| **#6** Persisted sessions | 🔶 Request changes — Book is broken | 87 unit, 20 e2e |
| **#2** 28 POC lessons (draft) | ⛔ **Close in favour of #16** | conflicts, 17 behind |

### Merge order — it matters here

```
#16  →  #14  →  #15  →  #18 + #6  →  #17
```

**#17 conflicts with two siblings.** Verified by test-merging every pair:

| Pair | Result |
| --- | --- |
| #18 + #6 | clean |
| #14 + #17 | clean |
| **#17 + #18** | conflict — `src/lib/answers.test.ts` |
| **#17 + #6** | conflict — `e2e/flow.spec.ts` |

Both are mechanical. `answers.test.ts` is an add/add of adjacent `describe`
blocks — keep both. `flow.spec.ts` is #6 replacing direct `page.goto('/learn/…')`
with a session-aware helper while #17 edits the same tests — #6's helper should
win and #17's assertions move onto it. Landing #17 **last** means resolving both
once, in one place.

#14 and #15 are independent of everything else. #16 is docs-only.

---

## PR #16 — Salvage manifest for PR #2 (issue #7) ✅

**Approve, merge now.** Docs only, zero risk, and it is the right answer to the
question #2 has been blocked on. I recommended cherry-picking rather than merging;
this is that, done properly.

**232 candidates, 128 PORT / 104 REJECT**, each with a disposition, a target, and
a reason, split across four child lanes (#8–#11). What makes it credible is that
it gets the non-obvious parts right:

- **Map by communicative function, never lesson number.** Exactly the trap: main
  `fr-01` is a café, PR `fr-01` is greetings. A number-aligned merge would have
  silently mismatched every lesson.
- **Architecture rejected wholesale, content kept.** Per-lesson `Lesson` literals,
  hand-written ids, `CC-BY-4.0` stamps, `A0` levels and glob loading are refused
  as architecture; ports land additively into main's `defineLesson` DSL. That
  matches the "safe unit is a reviewed fragment, not a file" rule.
- **Licence lineage is called out** — PR lines say `CC-BY-4.0`, main says `owned`,
  and ported text must carry main's provenance. That was one of my #2 findings.
- **Register rule for Tamil** — reject PR text more literary than main's, port
  text more colloquial. That is the right asymmetry for a course whose whole
  thesis is spoken register, and it is a subtler rule than I would have written.
- **It sequences its own dependency:** "Issue #12's invariants (PR #14) must be in
  place before any port lands." Correct — porting notes onto canonical ids is
  exactly where same-meaning-two-ids drift would appear.

**And it handles the audio trap.** My headline objection to #2 was that adopting
its corpus invalidates every recording, because the merged `.mp3`s speak *main's*
lines. The manifest addresses this per-candidate — `New dialogue line ⇒ audio
re-addressing, never PR offsets` — rather than treating text and audio as
separable. That is the detail I most expected to be missed.

No blocking notes. The only thing I'd add: when the lanes execute, the first port
that adds a dialogue line should regenerate offsets in the same commit, so the
corpus and `audio-offsets.json` never disagree even briefly.

---

## PR #17 — Record truthful transfer-pattern evidence ✅

**Approve.** This fixes a bug I wrote, and the replacement is better than a
patched version of mine would have been.

My check was a substring match on the construction label's stem:

```js
const stem = construction.label.split(/[+/]/)[0].trim().split(/\s+/).filter((w) => w.length > 2);
return stem.length === 0 || stem.some((w) => attempt.includes(normalise(w)));
```

Two failures. It credited any sentence merely *containing* the word — "je ne
voudrais pas" would pass as transfer. And `stem.length === 0 ||` is an
unconditional pass: any construction label whose first segment is all short words
would credit every non-empty answer, including nonsense.

**The replacement is authored, not inferred.** `criteria.orderedGroups` requires
each group in order, with interchangeable alternatives inside a group, matched on
**whole normalized tokens** rather than substrings. Making it a required schema
field means every transfer prompt has to declare what it actually wants — the
evaluation stops guessing from a label that was written for humans to read.

The Tamil criteria correctly accept script *or* transliteration
(`[['எனக்கு', 'enakku'], …]`), which matters because a learner may type either and
`normalise` already folds the diacritics.

**Verified:** merged onto `main`, check clean, **89 unit tests pass**.

### Two notes, neither blocking

**1. `['டீ', 'tea']` accepts an English token in a Tamil answer.** This is
defensible — `enakku oru tea venum` is genuinely what people say, and code-switching
is normal in spoken Tamil — but it should be a recorded decision rather than a
convenience. If it is deliberate, say so in a comment, because the next person to
read it will assume it's a leak.

**2. The criteria also require the situation's noun** (`[['je voudrais'], ['croissant']]`).
That slightly widens what "transfer" means: the exercise now tests *used the
construction* **and** *followed the scenario*. Fair, since the prompt says "you
want a croissant" — but a learner answering `Je voudrais un pain au chocolat` is
demonstrating exactly the transfer being taught and is marked wrong. Consider
whether the noun group should carry alternatives, or be dropped where the
construction alone is the thing under test.

---

## PR #18 — Require an active-recall attempt before reveal ✅

**Approve.** Small and correct. AC 6 says the learner must attempt before the
canonical response is revealed, and the recall step let you click **reveal** with
an empty box — so the strongest surface in the product could be skipped entirely.

Gating on `hasRecallAttempt` in a pure helper (rather than inline) keeps it
testable, and `showReveal = revealed && hasAttempt` is a good defensive touch:
clearing the box re-hides the answer instead of leaving it stranded on screen.

**Verified:** check clean, **83 unit tests pass**. Merges cleanly with #6.

### Two notes

**1. The "hint: first word" chip is still available with no attempt** — only
`reveal` is gated. I think that is right and worth stating so it doesn't look like
an oversight: a first-word hint is not the canonical response, and it already
caps the attempt's evidence via `hinted`. Scaffolding before attempting is
legitimate; revealing the answer is not. Consider a one-line comment saying so.

**2. Minor:** the `{#if hasAttempt} … {:else}<W.Chip disabled>` branch duplicates
the chip and remounts the node. Since `disabled` is now a real Chip prop, a single
`<W.Chip disabled={!hasAttempt} …>` does the same thing with half the markup.

---

## PR #14 — Reject construction metadata conflicts and phantom declarations ✅

*Unchanged since my last review (`d17e25e`); the review stands.*

**Approve.** Two invariants protecting the progress model. One id, one meaning —
re-declaration is fine, but only verbatim, so a later lesson cannot silently
redefine what the progress map claims the learner knows. And phantom detection is
the better half: a declared construction nothing references can never earn
evidence, so it would sit on the map forever as permanently unearnable state.

Both throw at import time, so I checked the real corpus satisfies them rather than
assuming: check clean, **85 unit tests**. Had either been violated, the app would
fail to boot rather than fail a test.

**#16 depends on this landing first.**

---

## PR #15 — Native-review queue and promotion gate ✅

*Unchanged since my last review (`a761d3b`); the review stands.*

**Approve.** Version-strict promotion is the right call — editing reviewed text
demotes the claim automatically, so review is re-done rather than inherited. And
treating Tamil's `transliteration` and `literal-gloss` as separate review scopes
puts the gate where the actual risk is.

**One gap:** `validateReviewGate` *is* enforced (its own test runs it against the
real corpus, so a false promotion fails `npm test`), but **`reviewQueue()` is
never called anywhere** — nothing can tell a human what is pending. That is the
half a reviewer would actually use. A `npm run review:queue` script would close it.

Avoid wiring the gate into `content/index.ts`: `review-gate.ts` imports `COURSES`
from there, so that would be circular. It already takes courses as a parameter —
keep calling it from a test or a standalone script.

---

## PR #6 — Persist and guard in-progress lesson sessions 🔶

*Unchanged since my last review (`f19d343`); the review stands.*

**Request changes.** Strong implementation — 87 unit, 20 e2e, and refusing
`compare`/`closure` in a recall session with no recorded attempt directly protects
AC 6 even against forged localStorage.

**⛔ Blocking: Book's Start/Review buttons all bounce to Today.**
`src/routes/book/+page.svelte` is not in this PR's diff and still links directly
to `/learn/{id}/{firstStep}`, which creates no session — so the guard redirects.
Verified empirically on the branch:

```
LANDED ON: /today        (expected /learn/…)
```

All 14 lessons, both actions. Book is one of four permanent destinations. CI is
green because nothing tests Book — worth adding a test with the fix.

Best fix: let a lesson's **first** step create the session on demand. That also
makes any deep link to a lesson start work, which is what "Review" should do.

**Non-blocking:** `startSession` silently returns the existing session's href when
one is active. Unreachable from Today, which hides the other cards — but it
becomes a lying button the moment Book calls it. Return `null` and let the caller
say "finish your current lesson first".

---

## PR #2 — Content: all 28 POC lessons ⛔

**Close this in favour of #16.**

Still at `b5c7f45`, now **17 commits behind** and conflicting on
`content.test.ts` and `index.ts`. Beyond that it is incompatible with merged
audio: `main`'s `.mp3`s and offsets were generated from main's lines, and this
corpus replaces `ta-01` (coffee shop, 8 lines) with a housewarming at 10.

#16 supersedes it properly — 232 candidates dispositioned, the good content routed
into main's DSL through lanes #8–#11, and the architecture, licence stamps and
audio implications each handled explicitly. Keeping #2 open now only risks someone
merging it.

Its best ideas are already captured for porting: the interlinear glosses, the
register contrasts, and the constructions main lacks.
