---
id: speckit.maqa-aa.coordinator
description: >
  Drop-in replacement for /speckit.maqa.coordinator.
  Runs the MAQA coordinator and injects agent-assign into every spawned
  feature agent instead of /speckit.implement.
---

# MAQA × Agent Assign — Coordinator

You are running the combined MAQA + Agent Assign coordinator.

## Step 1 — Pre-flight check

Confirm both extensions are active:
- `maqa` installed → `.specify/extensions/maqa/` exists
- `agent-assign` installed → `.specify/extensions/agent-assign/` exists
- At least one agent definition exists in `.claude/agents/` or `~/.claude/agents/`

If agent definitions are missing, warn the user and suggest running
`/speckit.maqa-aa.scaffold-agents` first. Do not abort — fall back to
`default` agent for all tasks if no agents exist.

## Step 2 — Read feature state (identical to /speckit.maqa.coordinator)

Read `.maqa/state.json` (or the configured board companion) to identify
all features and their current state:
  `todo` → `in_progress` → `in_review` → `done`

Respect declared dependencies: a feature only starts when all deps are `done`.

## Step 3 — Select the next unblocked batch

Pick up to `max_parallel` (default: 3) features that are `todo` and have
all deps resolved. Mark them `in_progress`.

## Step 4 — SPAWN feature agents with agent-assign baked in

For each selected feature, create an isolated git worktree and spawn a
feature agent using the following injected instruction template:

---
**INJECTED FEATURE AGENT INSTRUCTIONS**

You are a MAQA feature agent for: `{{ feature.id }}` — {{ feature.title }}

Your spec artifacts are in: `specs/{{ feature.id }}/`

Do NOT run `/speckit.implement`. Instead, run the full agent-assign pipeline:

```
/speckit.agent-assign.assign
/speckit.agent-assign.validate
/speckit.agent-assign.execute
```

After execution is complete, run the MAQA QA gate:
```
/speckit.maqa.qa
```

Then report back to the coordinator with status: `done` or `blocked:<reason>`.

If any agent definition is missing during execute, fall back to `default`
for that task and log a warning — do not abort the feature.
---

## Step 5 — After each feature completes

The MAQA QA agent runs automatically (qa_cadence from maqa-config.yml).
Update feature state to `in_review` once QA passes.

## Step 6 — Re-assess

After all features in the batch reach `in_review` or `done`:
- Merge reviewed features
- Re-read state
- Pick next unblocked batch
- Repeat from Step 3 until all features are `done`

## State file update

After each batch completes, update `.maqa/state.json`:
```json
{
  "feature_id": {
    "state": "in_review",
    "agent_assignments": ".specify/features/feature_id/agent-assignments.yml",
    "worktree": "../feature_id"
  }
}
```
