---
description: Validate, enhance content, and generate markdown from issue YAML
agent: git
subtask: true
---

# /enhance-issue Command

Validate, enhance content quality, generate context-aware subtasks, and output markdown.

## Arguments

- `<file>`: Required - Path to the YAML file to enhance
- `--skip-context`: Optional - Skip web search for related context (default: skip)

## Workflow

### Step 1: Parse YAML

```bash
python3 -c "
import yaml
with open('<file>') as f:
    data = yaml.safe_load(f)
# Get issue type from template name
name = data.get('name', '')
if 'Bug' in name:
    issue_type = 'bug'
elif 'Epic' in name:
    issue_type = 'epic'
elif 'Story' in name:
    issue_type = 'story'
elif 'Task' in name:
    issue_type = 'task'
else:
    issue_type = 'item'
print(f'Issue type: {issue_type}')
# Print body fields
for item in data.get('body', []):
    fid = item.get('id')
    if fid:
        val = item.get('attributes', {}).get('placeholder', '')
        print(f'{fid}: {val}')
"
```

### Step 2: Validate (Continue on Warnings)

Run:

```bash
python3 scripts/issue/validator.py <file>
```

Continue even if there are warnings.

### Step 3: Extract Content

Parse the YAML to get all body fields. The agent should read the file and extract fields.

### Step 4: Enhance Content (Agent Intelligence)

Improve:
1. Grammar and clarity
2. Expand placeholders where appropriate
3. Format consistently

### Step 5: Generate Subtasks

Based on issue type and keywords:

| Issue Type | Base Subtasks | + Keywords |
|------------|---------------|-----------|
| Bug | Write failing test, Fix bug, Verify fix, Update docs | "button"→component tests, "api"→API tests |
| Story | Implement, Unit tests, Update docs, Code review | "api"→integration tests, "form"→validation tests |
| Task | Research/Plan, Implement, Tests, Docs | "config"→verify config |
| Epic | Create child stories, Define milestones, Review scope | |
| Item | Complete item, Tests, Docs | |

Max 15 subtasks.

### Step 6: Format Markdown

Run the formatter:

```bash
python3 scripts/issue/formatter.py <file>
```

This outputs markdown to stdout. Save it to `.temp/issues/{sanitized-title}-{timestamp}.md`

### Step 7: Append Subtasks

Add the subtasks section to the markdown file.

### Step 8: Show Next Steps

```
✅ Enhanced markdown saved to: .temp/issues/{filename}

Next steps:
  /create-issue .temp/issues/{filename}
  /create-issue .temp/issues/{filename} --dry-run
```

## Notes

- Default is --skip-context (no web search)
- User can edit subtasks in output markdown before creating
- Max 15 subtasks
