---
description: "MAQA Coordinator mit automatischem Agent-Assign. Ersetzt /speckit.maqa.coordinator."
---

# MAQA + Agent Assign Coordinator

Dieser Command kombiniert `/speckit.maqa.coordinator` und `/speckit.agent-assign.assign`.
Agent-Assignments werden automatisch ausgefuehrt, ohne manuellen Aufruf.

## User Input

$ARGUMENTS

## Steps

### Step 1: Agent Assignment

Fuehre automatisch aus:
```
/speckit.agent-assign.assign
```
Danach:
```
/speckit.agent-assign.validate
```

Falls `speckit.agent-assign` nicht verfuegbar ist, ueberspringe diesen Schritt und logge:
`[maqa-agent-assign] agent-assign unavailable, skipping assignment`

### Step 2: MAQA Coordinator

Fuehre aus:
```
/speckit.maqa.coordinator
```

Mit den validierten Assignments aus Step 1 als Kontext.

### Step 3: Feature Execution

Fuer jeden Feature-Agent:
1. `/speckit.agent-assign.assign` fuer diesen spezifischen Feature-Scope
2. `/speckit.agent-assign.validate`
3. `/speckit.implement` (oder den vom MAQA Coordinator vorgegebenen Command)
4. MAQA QA-Check

## Fallback

Wenn `speckit.maqa` nicht verfuegbar ist:
- Logge: `[maqa-agent-assign] WARN: speckit.maqa unavailable, falling back to /speckit.implement`
- Fuehre direkt `/speckit.implement` aus
