---
description: Validate an issue YAML file
agent: git
subtask: true
---

# /validate-issue Command

Validate an issue YAML file - check syntax, field values, and content quality.

## Arguments

- `<file>`: Required - Path to the YAML file to validate

## Workflow

### Step 1: Parse YAML

Run:

```bash
python3 scripts/issue/parser.py <file>
```

Or use Python directly:

```bash
python3 -c "
import yaml
import sys
with open('<file>') as f:
    data = yaml.safe_load(f)
print('Valid YAML')
print('Keys:', list(data.keys()))
"
```

### Step 2: Validate Fields

Run the validator:

```bash
python3 scripts/issue/validator.py <file>
```

The validator checks:
- title: max 256 chars
- priority: must be "must have", "should have", "could have", or "won't have"
- estimate: must be Fibonacci (1,2,3,5,8,13,21,34,55,89) or empty
- blocked_by: must be number or empty
- parent_link: must be number or empty

### Step 3: Display Results

The validator outputs results. Display them to the user.

### Step 4: Content Quality Analysis (Agent Intelligence)

Read the file and check for:

1. **Placeholder detection**: Are placeholder values still present?
   - "To be determined"
   - "Describe the..."
   - "Brief description"

2. **Required fields**: Check if type-specific required fields have content
   - Bug: feature, scenario, expected_behavior, actual_behavior
   - Epic: goal, stakeholder, feature, scope
   - Story: user_story, acceptance_criteria
   - Task: technical_context
   - Item: description

3. **Content length**: Are descriptions too short?

### Step 5: Report Content Quality

Print warnings for:
- Placeholder values still present
- Missing or very short content

## Example Output

```
🔍 Validating: .temp/issues/draft-bug.yaml

✅ Valid YAML syntax

Field Validation:
✅ Title: "Button click not working" (24 chars)
✅ Priority: "must have"
✅ Estimate: 3 (Fibonacci)
⚠️  Blocked By: not set
⚠️  Parent Link: not set

Content Quality:
⚠️  Scenario appears to be a placeholder - please provide actual steps

✅ Validation passed (with 1 warning)
```

## Notes

- Errors fail validation (must fix before proceeding)
- Warnings don't fail validation - user can proceed
