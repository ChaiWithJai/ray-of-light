---
title: "[S-21] Conversation bridge"
labels: [screen, surface]
---

# S-21 · Conversation bridge

Surface 21 of 22 · canvas id `1u` · Book-wide surfaces (persistent nav)
Design reference: `src/lib/components/surfaces/conversation-bridge.svelte` → `/surfaces/conversation-bridge`

## Matrix row

| | |
| --- | --- |
| **User sees** | Scenario constructed from learned material |
| **Primary action** | Speak with AI or person |
| **Instructional function** | Convert lessons into communication |
| **Ability exercised** | Retrieval, transfer |
| **Spread state** | `—` |

## Components

- `SketchCard`
- `Chip`
- `MicButton`
- `Fr`
- `ProductionCapture (new)`

## Data

- Vocabulary/construction allowlist from lessons met
- Scenario definitions
- Constrained generation with a hard lexical bound

## Acceptance criteria

- [ ] The partner only uses material from lessons the learner has met
- [ ] The constraint is stated to the learner and is verifiably enforced, not just prompted
- [ ] A stuck affordance offers a phrase the learner already owns
- [ ] Successful exchanges emit transfer evidence
- [ ] Out-of-bound generation is caught and regenerated, never shown

## Depends on

F-02, D-12
