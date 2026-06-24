---
id: maqa-agent-assign.after_tasks
trigger: after_tasks
description: >
  Automatically runs /speckit.agent-assign.assign after /speckit.tasks
  completes, so agent assignments are ready before the coordinator starts.
  Only activates when maqa-agent-assign is the active coordinator mode.
---

# Hook: after_tasks

This hook fires automatically after `/speckit.tasks` finishes generating
`tasks.md` for a feature.

## Behavior

1. Check if `.specify/extensions/agent-assign/` exists (extension active)
2. If yes: immediately run `/speckit.agent-assign.assign` for the current feature
3. Then run `/speckit.agent-assign.validate` to catch any issues early
4. Report assignment summary inline (agent → task count)
5. Remind user to run `/speckit.maqa-aa.coordinator` to start execution

## Skip conditions

- Skip silently if `agent-assign` extension is not installed
- Skip silently if no agent definition files exist in `.claude/agents/`
  or `~/.claude/agents/` (fall back to standard MAQA behavior)
