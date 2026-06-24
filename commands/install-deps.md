---
description: "Checks whether speckit.maqa and speckit.agent-assign are installed and installs them if missing."
---

# Install Dependencies

This command is executed automatically via the `before_specify` hook (priority 1).
It ensures both dependencies are present before the coordinator starts.

## Steps

### Step 1: Dependency Check

Check whether `speckit.maqa` and `speckit.agent-assign` are already installed:

```bash
specify extension list
```

### Step 2: Conditional Installation

Evaluate the output:

- If `maqa` is **not** in the list:
  ```bash
  specify extension add maqa
  ```
- If `agent-assign` is **not** in the list:
  ```bash
  specify extension add agent-assign
  ```
- If both are already installed, print:
  `[maqa-agent-assign] Dependencies already satisfied ✓`
  and continue immediately without further action.

### Step 3: Verify

```bash
specify extension list
```

Confirm that both extensions are now active.

## Error Handling

If an installation fails (e.g. catalog unreachable):
- Print a warning: `[maqa-agent-assign] WARN: Could not install {name}, falling back to /speckit.implement`
- Continue anyway — the coordinator falls back to `/speckit.implement`
- **Do not block** the workflow
