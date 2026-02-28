---
description: Create a draft issue from template with optional pre-filled values
agent: git
subtask: true
---

# /draft-issue Command

Create a new issue draft from a template, with optional pre-filled values.

## Arguments

- `<type>`: Required - Issue type (bug, epic, story, task, item)
- `--title "text"`: Optional - Pre-fill title
- `--priority "value"`: Optional - Pre-fill priority (must have, should have, could have, won't have)
- `--estimate N`: Optional - Pre-fill estimate (Fibonacci: 1,2,3,5,8,13,21,34,55,89)
- `--theme "name"`: Optional - Pre-fill theme/component

## Workflow

### Step 1: Validate Issue Type

Valid types: bug, epic, story, task, item

If invalid, show error and available types.

### Step 2: Load Template

Run:

```bash
python3 -c "from scripts.templates.loader import load_template, template_exists; import json; print(json.dumps(template_exists('${issue_type}')))"
```

If template doesn't exist, show error.

### Step 3: Load Template Data

Run:

```bash
python3 -c "from scripts.templates.loader import load_template; import yaml; print(yaml.dump(load_template('${issue_type}')))"
```

### Step 4: Merge Pre-fill Values

If user provided --title, --priority, --estimate, or --theme:

Use the read tool to see the template, then modify the YAML to replace placeholder values with user-provided ones.

### Step 5: Save Draft

Write to `.temp/issues/draft-{type}.yaml`:

```bash
mkdir -p .temp/issues
# Write the modified YAML to the output file
```

### Step 6: Open in Editor

Open the file in $EDITOR:

```bash
${EDITOR:-vim} .temp/issues/draft-${issue_type}.yaml
```

### Step 7: Show Next Steps

Tell the user:

```text
✅ Draft saved to: .temp/issues/draft-{type}.yaml

Next steps:
  /validate-issue .temp/issues/draft-{type}.yaml
  /enhance-issue .temp/issues/draft-{type}.yaml
```

## Example Usage

```text
/draft-issue bug --title "Button not working" --priority "must have" --estimate 3
```

```text
/draft-issue epic --title "Add dark mode support"
```

## Notes

- Always opens editor for manual entry (even with pre-filled values)
- User must edit the file to fill in remaining fields
