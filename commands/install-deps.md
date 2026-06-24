---
description: "Prueft ob speckit.maqa und speckit.agent-assign installiert sind und installiert sie falls nicht."
---

# Install Dependencies

Dieser Command wird automatisch via `before_specify`-Hook (priority 1) ausgefuehrt.
Er stellt sicher, dass beide Abhaengigkeiten vorhanden sind, bevor der Coordinator startet.

## Steps

### Step 1: Dependency Check

Pruefe ob `speckit.maqa` und `speckit.agent-assign` bereits installiert sind:

```bash
specify extension list
```

### Step 2: Bedingte Installation

Werte die Ausgabe aus:

- Wenn `maqa` **nicht** in der Liste enthalten ist:
  ```bash
  specify extension add maqa
  ```
- Wenn `agent-assign` **nicht** in der Liste enthalten ist:
  ```bash
  specify extension add agent-assign
  ```
- Wenn beide bereits installiert sind, gib aus:
  `[maqa-agent-assign] Dependencies already satisfied ✓`
  und fahre sofort fort ohne weitere Aktionen.

### Step 3: Verify

```bash
specify extension list
```

Bestaetige dass beide Extensions aktiv sind.

## Fehlerbehandlung

Falls eine Installation fehlschlaegt (z.B. Catalog nicht erreichbar):
- Gib eine Warnung aus: `[maqa-agent-assign] WARN: Could not install {name}, falling back to /speckit.implement`
- Fahre trotzdem fort – der Coordinator greift auf `/speckit.implement` zurueck
- Blockiere den Workflow **nicht**
