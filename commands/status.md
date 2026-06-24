---
description: "Shows a unified status dashboard for MAQA + Agent-Assign."
---

# Status Dashboard

Displays the current status of both extensions in a single overview.

## Steps

### Step 1: Extension Status

```bash
specify extension list
```

Mark `maqa` and `agent-assign` as ✓ (installed) or ✗ (missing).

### Step 2: Agent Assignments

```bash
ls .specify/agents/ 2>/dev/null || echo "No agent files found — run /speckit.maqa-aa.scaffold-agents"
```

### Step 3: Hook Status

Show active hooks:

```bash
specify extension list --verbose 2>/dev/null || specify extension list
```

Confirm that `before_specify` (install-deps) and `after_tasks` (coordinator) are registered.

### Step 4: Summary

Print a compact summary:

```
[maqa-agent-assign] Status
  speckit.maqa:          ✓ / ✗
  speckit.agent-assign:  ✓ / ✗
  Agent files:           N found
  Active hooks:          before_specify, after_tasks
```
