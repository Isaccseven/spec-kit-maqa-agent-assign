# Commit Convention

This repo uses [Conventional Commits](https://www.conventionalcommits.org/) + [Semantic Release](https://semantic-release.gitbook.io/).

## Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

## Types & Release Impact

| Type | Description | Release |
|---|---|---|
| `feat` | New feature | `minor` (1.x.0) |
| `fix` | Bug fix | `patch` (1.0.x) |
| `perf` | Performance improvement | `patch` |
| `refactor` | Refactoring without feature/fix | `patch` |
| `revert` | Revert a commit | `patch` |
| `docs` | Documentation only | no release |
| `style` | Formatting, whitespace | no release |
| `test` | Add or update tests | no release |
| `chore` | Maintenance, dependencies | no release |
| `ci` | CI configuration | no release |

## Breaking Changes → Major Release

```
feat!: remove deprecated coordinator command

BREAKING CHANGE: /speckit.maqa-aa.coordinator signature changed
```

Either the `!` suffix after the type or a `BREAKING CHANGE:` footer triggers a **major** release.

## Examples

```bash
git commit -m "feat(coordinator): add parallel agent execution"
git commit -m "fix(install-deps): handle catalog timeout gracefully"
git commit -m "chore: update semantic-release to v25"
git commit -m "feat!: drop support for speckit <0.1.0"
```
