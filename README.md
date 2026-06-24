# spec-kit-maqa-agent-assign

> spec-kit extension — bridges `speckit.maqa` and `speckit.agent-assign` with automatic dependency installation.

## What this extension does

- **Auto-Install**: On the first `/speckit.specify` call, checks whether `speckit.maqa` and `speckit.agent-assign` are installed — and installs them automatically if not (`before_specify` hook, priority 1)
- **Auto-Assign**: After every `/speckit.tasks`, `/speckit.agent-assign.assign` + `.validate` runs automatically (`after_tasks` hook)
- **Coordinator**: `/speckit.maqa-aa.coordinator` replaces `/speckit.maqa.coordinator` and handles agent assignments transparently
- **Scaffold**: `/speckit.maqa-aa.scaffold-agents` detects your stack (Java, TS, K8s, Tests) and generates agent files
- **Status**: `/speckit.maqa-aa.status` shows a unified dashboard for both extensions

## Installation

```bash
# As a local dev extension
specify extension add --dev ./spec-kit-maqa-agent-assign

# Or directly from GitHub
specify extension add https://github.com/Isaccseven/spec-kit-maqa-agent-assign
```

Dependencies (`speckit.maqa`, `speckit.agent-assign`) are **installed automatically** on the next `/speckit.specify` call.

## Commands

| Command | Description |
|---|---|
| `/speckit.maqa-aa.coordinator` | Main entry point — replaces `/speckit.maqa.coordinator` |
| `/speckit.maqa-aa.scaffold-agents` | Detect stack + generate agent files (run once) |
| `/speckit.maqa-aa.status` | Status dashboard |
| `/speckit.maqa-aa.install-deps` | Manual dependency check / install |

## Hooks

| Event | Command | Behaviour |
|---|---|---|
| `before_specify` (priority 1) | `install-deps` | Automatically installs missing dependencies |
| `after_tasks` | `coordinator` | Runs Agent-Assign after task generation |

## Fallback

If a dependency cannot be installed, the extension silently falls back to `/speckit.implement` and logs `[maqa-agent-assign] WARN`.

## Commit Convention

This repo uses [Conventional Commits](https://www.conventionalcommits.org/) + [Semantic Release](https://semantic-release.gitbook.io/).
See [`.github/COMMIT_CONVENTION.md`](.github/COMMIT_CONVENTION.md) for details.
