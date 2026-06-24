---
description: "Erkennt den Projekt-Stack automatisch und generiert passende Agent-Files fuer speckit.agent-assign."
---

# Scaffold Agents

Dieser Command analysiert das Projekt und erstellt Agent-Definitionen die zu deinem Stack passen.

## Steps

### Step 1: Stack Detection

Analysiere das Projekt-Root:

```bash
ls -la
cat package.json 2>/dev/null || true
cat pom.xml 2>/dev/null || true
cat build.gradle 2>/dev/null || true
ls k8s/ 2>/dev/null || ls kubernetes/ 2>/dev/null || true
```

### Step 2: Agent-Files generieren

Erstelle `.specify/agents/` mit passenden Agent-Definitionen basierend auf dem erkannten Stack:

- **TypeScript/Next.js** → `frontend-agent.yml`
- **Java/Spring** → `backend-agent.yml`
- **K8s/Helm** → `infra-agent.yml`
- **Jest/JUnit** → `test-agent.yml`

Jedes Agent-File folgt dem Format von `speckit.agent-assign`.

### Step 3: Confirm

Gib eine Uebersicht der erstellten Agent-Files aus und erklaere welche Assignments sie ermoeglichen.
