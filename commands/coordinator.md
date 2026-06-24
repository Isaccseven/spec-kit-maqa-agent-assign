---
description: "MAQA Coordinator with automatic Agent-Assign. Replaces /speckit.maqa.coordinator."
---

# MAQA + Agent Assign Coordinator

This command combines `/speckit.maqa.coordinator` and `/speckit.agent-assign.assign`.
Agent assignments are executed automatically without any manual invocation.

## User Input

$ARGUMENTS

## Steps

### Step 1: Agent Assignment

Automatically execute:
```
/speckit.agent-assign.assign
```
Then:
```
/speckit.agent-assign.validate
```

If `speckit.agent-assign` is not available, skip this step and log:
`[maqa-agent-assign] agent-assign unavailable, skipping assignment`

### Step 2: MAQA Coordinator

Execute:
```
/speckit.maqa.coordinator
```

Using the validated assignments from Step 1 as context.

### Step 3: Feature Execution

For each feature agent:
1. `/speckit.agent-assign.assign` for this specific feature scope
2. `/speckit.agent-assign.validate`
3. `/speckit.implement` (or the command specified by the MAQA Coordinator)
4. MAQA QA check

## Fallback

If `speckit.maqa` is not available:
- Log: `[maqa-agent-assign] WARN: speckit.maqa unavailable, falling back to /speckit.implement`
- Execute `/speckit.implement` directly
