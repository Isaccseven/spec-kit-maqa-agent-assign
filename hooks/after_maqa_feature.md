---
id: maqa-agent-assign.after_maqa_feature
trigger: after_maqa_feature
description: >
  Fires inside each MAQA feature agent after the worktree is created and
  before implementation starts. Ensures agent-assign.assign + validate
  run automatically so the feature agent uses specialized agents.
---

# Hook: after_maqa_feature

This hook fires inside a MAQA feature agent, after the isolated worktree
is ready and `tasks.md` is available, but before implementation begins.

## Behavior

1. Run `/speckit.agent-assign.assign` for the current feature's `tasks.md`
2. Run `/speckit.agent-assign.validate`
   - If validation fails: log warnings, but continue using `default` for
     failed assignments (never block the feature agent)
3. Run `/speckit.agent-assign.execute` instead of `/speckit.implement`
4. After execute completes, run `/speckit.maqa.qa`
5. Report state back to coordinator: `done` or `blocked:<reason>`

## Fallback behavior

If agent-assign fails at any step:
- Log the error with prefix `[maqa-agent-assign]`
- Fall back to standard `/speckit.implement`
- Do not propagate the failure to the coordinator
