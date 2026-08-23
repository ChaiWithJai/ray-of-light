---
title: "[T-07] Connect the Claude GitHub App so agents can file issues"
labels: [ticket, infra]
---

# T-07 · Connect the Claude GitHub App so agents can file issues

Agents working in this repo cannot comment on or open issues.
`api.github.com` returns:

```
403 GitHub access is not enabled for this session.
An org admin must connect the Claude GitHub App for this organization.
```

That response comes from the Anthropic egress proxy, not GitHub — it is returned
even with `GITHUB_TOKEN` and `GH_TOKEN` present in the environment, and `gh` is
not installed. Cloning and pushing work because git traffic takes a different path,
which is why code lands but issue comments do not.

Until this is connected, `docs/ISSUE-1-LIMITATIONS.md` is the handoff surface and
has to be pasted into issue #1 by hand.

## Acceptance criteria

- [ ] An org admin connects the Claude GitHub App for `ChaiWithJai`
- [ ] `scripts/file-issues.sh` can push `issues/` to GitHub
- [ ] `docs/ISSUE-1-LIMITATIONS.md` is posted to issue #1 and kept current there

## Depends on

—
