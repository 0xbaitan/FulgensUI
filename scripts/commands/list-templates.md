---
description: List available issue templates
agent: git
subtask: true
---

# /list-templates Command

List all available issue templates.

## Arguments

- None

## Workflow

### Step 1: Run Template Loader

Execute:

```bash
python3 scripts/templates/loader.py
```

### Step 2: Display Output

The script already formats the output. Just display it to the user.

## Example Output

```
📋 Available Issue Templates
============================

  bug        🐞 Bug Report                      File a bug report
  epic       ⚡ Epic                            Large feature requiring multiple stories
  story      📖 Story                           User story with acceptance criteria
  task       📋 Task                            Technical task
  item       📌 Item                            Generic work item

Total: 5 templates
```

## Notes

- Simple command - just run the script
- Shows usage hint at the end
