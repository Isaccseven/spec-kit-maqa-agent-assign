# maqa-agent-assign

> A [spec-kit](https://github.com/github/spec-kit) extension that bridges
> **[maqa](https://github.com/GenieRobot/spec-kit-maqa-ext)** and
> **[agent-assign](https://github.com/xymelon/spec-kit-agent-assign)** so that
> both work together automatically — no manual glue code required.

## What it does

Without this extension, `maqa` spawns feature agents that call `/speckit.implement`
(one flat context, no specialization). With this extension installed, every
MAQA feature agent automatically runs:

```
/speckit.agent-assign.assign    ← assign specialists per task
/speckit.agent-assign.validate  ← catch assignment issues early
/speckit.agent-assign.execute   ← implement with specialized agents
/speckit.maqa.qa                ← MAQA quality gate as usual
```

All parallelism, worktree isolation, dependency tracking, and board sync from
`maqa` are preserved. All task-level specialization and context isolation from
`agent-assign` are preserved. They compose cleanly.

## Requirements

- spec-kit `>=0.8.0`
- [maqa](https://github.com/GenieRobot/spec-kit-maqa-ext) `>=0.3.0`
- [agent-assign](https://github.com/xymelon/spec-kit-agent-assign) `>=1.0.0`

## Installation

```bash
# 1. Install dependencies first (if not already installed)
specify ext add maqa
specify ext add agent-assign --from https://github.com/xymelon/spec-kit-agent-assign/archive/refs/tags/v1.1.0.zip

# 2. Install this bridge extension
specify ext add https://github.com/Isaccseven/spec-kit-maqa-agent-assign/archive/refs/heads/main.zip
```

## Quick Start

```bash
# Step 1: Scaffold specialized agents for your tech stack (run once)
/speckit.maqa-aa.scaffold-agents

# Step 2: Run MAQA setup (if not done yet)
/speckit.maqa.setup

# Step 3: Run the combined coordinator (replaces /speckit.maqa.coordinator)
/speckit.maqa-aa.coordinator

# Check status at any time
/speckit.maqa-aa.status
```

That's it. The coordinator handles everything else automatically.

## Commands

| Command | Description |
|---|---|
| `/speckit.maqa-aa.coordinator` | Drop-in for `/speckit.maqa.coordinator` — runs MAQA with agent-assign baked in |
| `/speckit.maqa-aa.scaffold-agents` | Auto-generates `.claude/agents/` for your detected tech stack |
| `/speckit.maqa-aa.status` | Unified status: MAQA feature state + agent assignments per feature |

## Hooks

| Hook | Trigger | What it does |
|---|---|---|
| `after_tasks` | After `/speckit.tasks` | Auto-runs `assign` + `validate` so assignments are ready before the coordinator starts |
| `after_maqa_feature` | Inside each MAQA feature agent | Replaces `/speckit.implement` with the full agent-assign pipeline |

## Full Workflow

```
/speckit.constitution                →  constitution.md
/speckit.specify                     →  spec.md
/speckit.plan                        →  plan.md
/speckit.tasks                       →  tasks.md
                                        ↓ (after_tasks hook fires automatically)
                                        agent-assignments.yml  ← NEW
                                        validation report      ← NEW

/speckit.maqa-aa.coordinator         →  SPAWN[N] feature agents (parallel worktrees)
                                        ↓ (after_maqa_feature hook fires in each agent)
                                        /speckit.agent-assign.execute   ← REPLACES /speckit.implement
                                        /speckit.maqa.qa                ← unchanged
                                        ↓
                                        coordinator merges, re-assesses, next batch
```

## Configuration

No additional configuration required beyond `maqa-config.yml` (from maqa)
and agent definition files in `.claude/agents/` (from agent-assign).

**Recommended `maqa-config.yml` settings when using this bridge:**

```yaml
# maqa-config.yml
auto_push: true          # Recommended: prevents worktree data loss
max_parallel: 3          # Tune to your machine / API rate limits
qa_cadence: per_feature  # Catches regressions early
```

## How fallbacks work

This extension never blocks progress:

- No agent files found → all tasks use `default` (same as standard `/speckit.implement`)
- `agent-assign.validate` fails → log warning, continue with `default` for failed tasks
- `agent-assign.execute` errors → fall back to `/speckit.implement`, log `[maqa-agent-assign]`
- `maqa` board companion not installed → state lives in `.maqa/state.json` as usual

## Why an extension, not a preset?

A preset only sets configuration values. This bridge needs to:
1. Define new commands (`maqa-aa.coordinator`, `maqa-aa.scaffold-agents`, `maqa-aa.status`)
2. Register hooks that fire at specific points in both extensions' lifecycles
3. Declare explicit dependencies on both `maqa` and `agent-assign`

Extensions can do all three. Presets cannot.

## License

MIT
