---
description: "Zeigt ein unified Status-Dashboard fuer MAQA + Agent-Assign."
---

# Status Dashboard

Zeigt den aktuellen Status beider Extensions in einer Uebersicht.

## Steps

### Step 1: Extension Status

```bash
specify extension list
```

Markiere `maqa` und `agent-assign` als ✓ (installiert) oder ✗ (fehlt).

### Step 2: Agent Assignments

```bash
ls .specify/agents/ 2>/dev/null || echo "Keine Agent-Files gefunden – fuehre /speckit.maqa-aa.scaffold-agents aus"
```

### Step 3: Hook Status

Zeige aktive Hooks:

```bash
specify extension list --verbose 2>/dev/null || specify extension list
```

Bestaetige dass `before_specify` (install-deps) und `after_tasks` (coordinator) registriert sind.

### Step 4: Summary

Gib eine kompakte Zusammenfassung aus:

```
[maqa-agent-assign] Status
  speckit.maqa:          ✓ / ✗
  speckit.agent-assign:  ✓ / ✗
  Agent-Files:           N gefunden
  Hooks aktiv:           before_specify, after_tasks
```
