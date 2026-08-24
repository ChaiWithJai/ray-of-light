# Design-review tooling

The error-discovery review rig used for design round 1 (see
`docs/design-review/2026-08-23/` for that round's archived corpus and the
20-mode taxonomy it produced). One command-pair turns the live app into an
annotatable screenshot atlas of the learner's critical path.

## Round workflow

```sh
# 1. Capture every critical-path state (desktop + mobile) from the real app.
#    Walks onboarding → lesson flow → recall unlock (3 real sessions across
#    day rollovers) → miss path → resurface → destinations → placement → Tamil.
cd tools/design-review/capture && npx playwright test

# 2. Build the sample manifest and start the review app.
cd .. && python3 build_samples.py && python3 app.py
# → http://localhost:8377
```

Then annotate: drag a rectangle on anything wrong, free-text note, Enter.
Margin notes align to their rectangles; the Journey tab shows the whole path
by flow lane; the Progress tab holds the failure-mode taxonomy and the agent
suggestion queue (select-all → accept/dismiss).

The reviewing agent watches `annotations.json` (poll loop), categorizes each
free-text note into failure modes, pushes the taxonomy to `/api/patterns`,
and fan-outs depth-scan subagents whose findings arrive as dashed purple
suggestions. Humans notice; the agent organizes.

## Files

| File | Role |
|---|---|
| `capture/capture.spec.ts` | Playwright walk of the critical path; screenshots to `../shots/` |
| `build_samples.py` | shots → `samples.json` (stage metadata, flow lanes) |
| `app.py` | stdlib HTTP server: the app + `/api/{samples,annotations,patterns,suggestions}` |
| `index.html` | the review UI (rect annotation, margin notes, journey map, taxonomy, suggestion queue) |

Generated per round and gitignored: `shots/`, the four data JSONs. Archive a
finished round into `docs/design-review/<date>/` (annotations + patterns +
samples) before resetting.

## Known limits

- fullPage screenshots render `position:sticky` headers at their scroll
  offset — a capture artifact, not a product bug (taxonomy: "needs live
  verification"). Prefer viewport-clipped capture for sticky screens if this
  gets annotated again.
- Day rollovers use the e2e suite's assignment-shift idiom; `dayNumber` is
  hardened against it (#45), but any new time-derived UI should get the same
  treatment before a capture round.
- Bump the `rol-review-annotations-*` localStorage key in `index.html` when
  resetting between rounds, or stale browser backups restore onto new shots.
