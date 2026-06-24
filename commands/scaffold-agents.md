---
description: "Automatically detects the project stack and generates matching Agent-Files for speckit.agent-assign."
---

# Scaffold Agents

This command analyses the project and creates agent definitions that match your stack.

## Steps

### Step 1: Stack Detection

Analyse the project root:

```bash
ls -la
cat package.json 2>/dev/null || true
cat pom.xml 2>/dev/null || true
cat build.gradle 2>/dev/null || true
ls k8s/ 2>/dev/null || ls kubernetes/ 2>/dev/null || true
```

### Step 2: Generate Agent Files

Create `.specify/agents/` with matching agent definitions based on the detected stack:

- **TypeScript/Next.js** → `frontend-agent.yml`
- **Java/Spring** → `backend-agent.yml`
- **K8s/Helm** → `infra-agent.yml`
- **Jest/JUnit** → `test-agent.yml`

Each agent file follows the format required by `speckit.agent-assign`.

### Step 3: Confirm

Print a summary of the created agent files and explain which assignments they enable.
