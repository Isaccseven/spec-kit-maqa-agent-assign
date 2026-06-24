# spec-kit-maqa-agent-assign

> spec-kit Extension — kombiniert `speckit.maqa` und `speckit.agent-assign` mit automatischer Dependency-Installation.

## Was diese Extension macht

- **Auto-Install**: Prueft beim ersten `/speckit.specify`-Aufruf ob `speckit.maqa` und `speckit.agent-assign` installiert sind – und installiert sie automatisch falls nicht (`before_specify`-Hook, priority 1)
- **Auto-Assign**: Nach jedem `/speckit.tasks` wird `/speckit.agent-assign.assign` + `.validate` automatisch ausgefuehrt (`after_tasks`-Hook)
- **Coordinator**: `/speckit.maqa-aa.coordinator` ersetzt `/speckit.maqa.coordinator` und fuehrt Agent-Assignments transparent durch
- **Scaffold**: `/speckit.maqa-aa.scaffold-agents` erkennt deinen Stack (Java, TS, K8s, Tests) und generiert Agent-Files
- **Status**: `/speckit.maqa-aa.status` zeigt ein unified Dashboard beider Extensions

## Installation

```bash
# Als lokale Dev-Extension
specify extension add --dev ./spec-kit-maqa-agent-assign

# Oder direkt von GitHub
specify extension add https://github.com/Isaccseven/spec-kit-maqa-agent-assign
```

Die Abhaengigkeiten (`speckit.maqa`, `speckit.agent-assign`) werden beim naechsten `/speckit.specify`-Aufruf **automatisch installiert**.

## Commands

| Command | Beschreibung |
|---|---|
| `/speckit.maqa-aa.coordinator` | Haupteinstiegspunkt – ersetzt `/speckit.maqa.coordinator` |
| `/speckit.maqa-aa.scaffold-agents` | Stack erkennen + Agent-Files generieren (einmalig) |
| `/speckit.maqa-aa.status` | Status-Dashboard |
| `/speckit.maqa-aa.install-deps` | Manueller Dependency-Check/Install |

## Hooks

| Event | Command | Verhalten |
|---|---|---|
| `before_specify` (priority 1) | `install-deps` | Installiert fehlende Dependencies automatisch |
| `after_tasks` | `coordinator` | Fuehrt Agent-Assign nach Task-Generierung aus |

## Fallback

Falls eine Dependency nicht installiert werden kann, faellt die Extension lautlos auf `/speckit.implement` zurueck und loggt `[maqa-agent-assign] WARN`.
