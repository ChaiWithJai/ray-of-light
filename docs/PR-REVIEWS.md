# PR reviews

Reviewed against `main @ 22fd8d4`. Each section is written to be pasted as a
review comment on its PR.

> These cannot be posted directly: `api.github.com` returns 403 from the
> Anthropic egress proxy ("an org admin must connect the Claude GitHub App"),
> even with `GITHUB_TOKEN` present. That is ticket `T-07`.

## Open now

| PR | Verdict | Verified |
| --- | --- | --- |
| **#14** Construction invariants | ✅ **Approve — merge first** | check clean, 85 unit |
| **#15** Native-review gate | ✅ Approve, one gap | check clean, 87 unit |
| **#6** Persisted sessions | 🔶 **Request changes — one real regression** | 87 unit, 20 e2e, but Book is broken |
| **#2** 28 POC lessons (draft) | ⛔ Still needs a decision | conflicts, 16 behind |

Merge order: **#14 → #15 → #6 (after the Book fix)**. #14 and #15 are
independent and touch nothing #6 touches.

*(Previously reviewed and since merged: #3 draft TTS, #4 Playwright portability,
#5 truthful recall evidence. Notes at the bottom.)*

---

## PR #14 — Reject construction metadata conflicts and phantom declarations ✅

**Approve, and I'd merge this first.** Small, self-contained, and it closes two
holes in the thing the whole progress model rests on.

Both invariants are the right ones:

**One id, one meaning.** Re-declaring a construction is legitimate — a synthesis
lesson carries earlier ones forward — but only verbatim. Letting a later lesson
disagree about `label`/`gloss`/`introducedIn` and silently win would let a review
lesson redefine what the progress map claims the learner knows. Failing loudly is
correct.

**Phantom detection is the better half.** A declared construction that no line or
exercise ever references can never generate evidence, so it would sit on the
progress map forever as permanently unearnable state — visible, plausible, and
impossible. That is exactly the class of bug that survives review by looking fine.
"Declared means teachable and observable, not merely counted" is the right rule.

**Verified:** merged onto `main`, `npm run check` clean, **85 unit tests pass** —
so the existing corpus satisfies both invariants. Worth stating explicitly because
these throw at import time: had either invariant been violated, the app would fail
to boot rather than fail a test.

No blocking notes. Exporting `validateCourse` for the tests is fine.

---

## PR #15 — Native-review queue and promotion gate ✅

**Approve.** This is the piece that turns `T-02`/`T-03` from a promise into a
mechanism, and the design is better than I expected in two specific ways:

**Version-strict is the right call.** Bumping `CONTENT_VERSION` after editing
reviewed text demotes the claim automatically, because the records no longer
match. Review is re-done rather than inherited — which is exactly right, since the
thing reviewed was the old text.

**Tamil's scaffolding layers are separate review scopes.** `transliteration` and
`literal-gloss` need their own sign-off, not a blanket "dialogue looks fine". That
matches where the actual risk is: a non-native author's transliteration can be
wrong in ways the dialogue isn't.

`reviews.json` being `[]` is correct and honest — the gate is a no-op until real
reviewers exist, and nothing currently claims a status it can't back.

**Verified:** check clean, 87 unit tests pass.

### One gap: the queue is computed but never surfaced

To be precise about what is and isn't enforced today, because it isn't obvious:

- **`validateReviewGate` *is* enforced** — `review-gate.test.ts` calls it against
  the real corpus and asserts it doesn't throw, so promoting a line without
  matching records fails `npm test`. Good.
- **`reviewQueue()` is never called anywhere** outside its own test — not in a
  route, a component, a script, or `docs/`. So nothing can actually *tell* anyone
  what is pending review. The queue is the half of this PR a human would use, and
  right now there is no way to read it.

Suggest one of: a `npm run review:queue` script that prints it, or a small section
in `docs/NATIVE-REVIEW.md` generated from it. Cheap, and it is the difference
between a gate and a gate with a waiting room.

**One thing to avoid when wiring further:** `review-gate.ts` imports `COURSES`
from `content/index.ts`, so calling `validateReviewGate` *from* `index.ts` would
be a circular import. The gate already takes courses as a parameter — keep
invoking it from the test or a standalone script rather than from the module it
depends on.

---

## PR #6 — Persist and guard in-progress lesson sessions 🔶

**Request changes.** The implementation is strong and the guard model is right —
but it breaks Book, one of the four permanent navigation destinations, and no test
catches it.

### What's good

- `ActiveSession` with an explicit `flow` snapshot, and `currentSessionIsValid`
  rejecting a session whose flow no longer matches the code — that is the right
  way to handle a persisted session surviving a deploy that changed the flow.
- Refusing `compare`/`closure` in a recall session with no recorded attempt
  directly protects AC 6. Forging that state in localStorage is rejected, and
  there's a test for it.
- Locking language switching while a session is open, rather than orphaning it.
- The resume card on Today.
- Draft persistence for the recall attempt, deduped before write.

**Verified:** check clean, **87 unit tests**, **20 e2e** including five new
session-guard specs. The suite is genuinely thorough about the paths it covers.

### ⛔ Blocking: Book's Start/Review buttons all bounce to Today

`src/routes/book/+page.svelte` is not in this PR's diff, and it still links
directly to `/learn/{lesson.id}/{firstStep}`. That entry point creates no session,
so `sessionAccess` returns `forbidden` and the `$effect` redirects to
`/today`.

Verified empirically against this branch — onboard, open `/book`, click the first
**Start**:

```
LANDED ON: /today        (expected /learn/…)
```

Every lesson in Book is affected, both "Start" and "Review". Book is one of the
four permanent destinations, so this removes a quarter of the app's navigation.

It passes CI because no test exercises Book — worth adding one alongside the fix,
since this is precisely the kind of regression a guard introduces.

**Fix, either:**
- have Book call `profile.startSession('learn', lesson.id, flowFor(lesson.kind))`
  the way Today does, or
- let entering a lesson's *first* step create the session on demand, and keep the
  guard strict only for later steps.

The second is probably better: it makes any deep link to a lesson's start work,
which is what a "Review" button on a finished lesson should do anyway.

### Non-blocking: `startSession` silently redirects when a session exists

```js
startSession(mode, lessonId, flow) {
  if (this.activeSession) return this.activeSessionHref ?? '/today';
  …
}
```

Today hides the other cards when a session is active, so this is unreachable
there. But it becomes reachable the moment Book calls `startSession` (per the fix
above): clicking **Start** on lesson 9 would silently navigate into your
half-finished lesson 3. The button would lie.

Suggest returning `null` (or a discriminated result) when a session already
exists, and letting the caller decide what to say — "finish your current lesson
first" is a fine answer, but it should be said, not implied by a surprise
redirect.

---

## PR #2 — Content: all 28 POC lessons (14 FR + 14 TA) ⛔

**Unchanged since my last review, and the situation has worsened.** Still at
`b5c7f45`, now **16 commits behind `main`** and still conflicting on
`content.test.ts` and `index.ts`.

The content itself remains good — the interlinear glosses
(`"well are-you(polite)-QUESTION?"`) genuinely beat the prose glosses on `main`,
and per-lesson files scale better than two large ones. The blockers are unchanged:

1. **It is a parallel corpus for lessons that already landed.** A choice between
   two corpora, not a merge of one.
2. **It is now incompatible with merged audio.** #3 has since merged: `main` has
   real per-line offsets and `.mp3`s generated by speaking **main's** lines.
   `ta-01` on main is a coffee shop (8 lines); here it is a housewarming (10).
   Adopting this corpus invalidates every recording and every offset.
3. **It silently claims audio exists.** Written against a schema with no
   `pending` field, so merged it defaults `false` — every "audio pending" notice
   disappears for files that were never generated, with hand-written offsets.
4. **Metadata drift** — `license: 'CC-BY-4.0'` vs `owned`, `dialect: 'chennai'`
   vs `chennai_general`, `speakerId: 'ta-speaker-1'`.

**Recommendation unchanged:** decide the corpus question. If this content wins,
land it as an explicit replacement — delete `fr.ts`/`ta.ts`, port the conformance
tests, set `pending: true` throughout, reconcile the licence field, and regenerate
audio. If `main`'s wins, close this and cherry-pick the interlinear glosses first.

Both corpora are `reviewStatus: 'draft'` and neither has been read by a native
Tamil speaker, so choosing on quality is guesswork until `T-03` — which #15 now
gives a mechanism for.

---

## Previously reviewed, since merged

- **#5 Truthful recall evidence** — fixed `recall-correct` being recorded for any
  non-empty input. Landed larger than the branch reviewed, also fixing
  `compare.svelte` to diff against the matched accepted answer.
- **#4 Playwright portability** — removed a hardcoded `/opt/pw-browsers/…` path.
  The `--autoplay-policy` flag I asked for turned out to be unnecessary; the full
  suite passes without it.
- **#3 Draft TTS audio** — merged with its follow-up. Three items are still live
  on `main`: `speakerId` still claims a human voice for macOS `say` output,
  synthetic audio is not gated out of pronounce/shadow, and
  `audio-provenance.json` records the engine but no licence.
