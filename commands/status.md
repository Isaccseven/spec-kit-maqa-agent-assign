---
id: speckit.maqa-aa.status
description: >
  Shows combined status of MAQA feature progress and agent-assign assignments
  in a unified dashboard view.
---

# MAQA × Agent Assign — Status

Display a unified status overview combining MAQA state and agent-assign assignments.

## Step 1 — Read MAQA state

Read `.maqa/state.json`. For each feature, collect:
- `feature_id`, `title`, `state` (todo/in_progress/in_review/done)
- `worktree` path (if active)
- `agent_assignments` file path (if exists)

## Step 2 — Read agent assignments per feature

For each feature where `agent_assignments` file exists, read
`.specify/features/<feature_id>/agent-assignments.yml` and collect:
- Total task count
- Tasks per agent (e.g. `backend-java: 4, test-writer: 2, default: 1`)
- Validation status (passed / not run / failed)

## Step 3 — Render dashboard

Output the following table:

```
╔══════════════════════════════════════════════════════════════════════╗
║           MAQA × Agent Assign — Project Status                      ║
╠══════════════════════════════════════════════════════════════════════╣
║ Feature          │ State       │ Agents Used          │ Tasks       ║
╠══════════════════╪═════════════╪══════════════════════╪═════════════╣
║ feature-id       │ in_progress │ backend-java (4)     │ 7 total     ║
║                  │             │ test-writer (2)      │             ║
║                  │             │ default (1)          │             ║
╠══════════════════╪═════════════╪══════════════════════╪═════════════╣
║ feature-id-2     │ todo        │ (not yet assigned)   │ —           ║
╠══════════════════╪═════════════╪══════════════════════╪═════════════╣
║ feature-id-3     │ done        │ frontend-nextjs (5)  │ 8 total     ║
║                  │             │ test-writer (3)      │             ║
╚══════════════════╧═════════════╧══════════════════════╧═════════════╝
```

Also show:
- Active worktrees (from `git worktree list`)
- Available agent definitions (from `.claude/agents/`)
- Next recommended action (e.g. "Run /speckit.maqa-aa.coordinator to start next batch")
