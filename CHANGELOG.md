# Changelog

## 1.0.0 — 2026-06-24

### Added
- `speckit.maqa-aa.coordinator` command — drop-in for `/speckit.maqa.coordinator`
  with agent-assign automatically injected into every feature agent
- `speckit.maqa-aa.scaffold-agents` command — auto-generates `.claude/agents/`
  definitions for detected tech stack (Java/Spring, TypeScript, Next.js,
  Python, Kubernetes, test layer)
- `speckit.maqa-aa.status` command — unified dashboard showing MAQA feature
  state and agent-assign task assignments side by side
- `after_tasks` hook — auto-runs `assign` + `validate` after `/speckit.tasks`
- `after_maqa_feature` hook — replaces `/speckit.implement` with the full
  agent-assign pipeline inside each MAQA feature agent
- Graceful fallback to `default` agent at every failure point
