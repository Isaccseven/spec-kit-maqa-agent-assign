# Commit Convention

Dieses Repo nutzt [Conventional Commits](https://www.conventionalcommits.org/) + [Semantic Release](https://semantic-release.gitbook.io/).

## Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

## Typen & Release-Auswirkung

| Typ | Beschreibung | Release |
|---|---|---|
| `feat` | Neues Feature | `minor` (1.x.0) |
| `fix` | Bugfix | `patch` (1.0.x) |
| `perf` | Performance-Verbesserung | `patch` |
| `refactor` | Refactoring ohne Feature/Fix | `patch` |
| `revert` | Revert eines Commits | `patch` |
| `docs` | Nur Dokumentation | kein Release |
| `style` | Formatierung, Leerzeichen | kein Release |
| `test` | Tests hinzufügen/ändern | kein Release |
| `chore` | Wartung, Dependencies | kein Release |
| `ci` | CI-Konfiguration | kein Release |

## Breaking Changes → Major Release

```
feat!: remove deprecated coordinator command

BREAKING CHANGE: /speckit.maqa-aa.coordinator signature changed
```

Oder mit `!` nach dem Typ — beides löst ein **major** Release aus.

## Beispiele

```bash
git commit -m "feat(coordinator): add parallel agent execution"
git commit -m "fix(install-deps): handle catalog timeout gracefully"
git commit -m "chore: update semantic-release to v25"
git commit -m "feat!: drop support for speckit <0.1.0"
```
