---
description: Create a GitHub issue from enhanced markdown file
agent: git
subtask: true
---

# /create-issue Command

Create a GitHub issue from an enhanced markdown file.

## Arguments

- `<file>`: Required - Path to the markdown file
- `--dry-run`: Optional - Preview what would be created without calling GitHub API

## Project Configuration

- **Project**: FulgensUI (<https://github.com/users/0xbaitan/projects/9>)
- **Project ID**: `PVT_kwHOAeQxRM4BQVim`

### Project Field IDs

| Field | ID |
|-------|-----|
| Status | `PVTSSF_lAHOAeQxRM4BQVimzg-fIIo` |
| Priority | `PVTSSF_lAHOAeQxRM4BQVimzg-fsa4` |
| Story points | `PVTF_lAHOAeQxRM4BQVimzg-fxsg` |
| Issue type | `PVTSSF_lAHOAeQxRM4BQVimzg-gKWI` |

### Status Options

| Status | ID |
|--------|-----|
| Todo | `f75ad846` |
| In Progress | `47fc9ee4` |
| Done | `98236657` |

### Priority Options

| Priority | ID |
|----------|-----|
| Must have | `a76e54fc` |
| Should have | `0aafcd8f` |
| Could have | `c6de7461` |
| Won't have | `808b8ca6` |

### Issue Type Options

| Issue Type | ID |
|------------|-----|
| story | `d2a6d334` |
| bug | `251c6465` |
| epic | `d895a262` |
| task | `1bc4fa51` |
| item | `6f19c456` |

## Workflow

### Step 1: Parse Markdown

Extract frontmatter and body:

```bash
# Extract frontmatter
python3 -c "
content = open('<file>').read()
lines = content.split('\n')
in_fm = False
fm_lines = []
body_lines = []
for i, line in enumerate(lines):
    if line.strip() == '---':
        if not in_fm:
            in_fm = True
            continue
        else:
            # End of frontmatter
            body_lines = lines[i+1:]
            break
    if in_fm:
        fm_lines.append(line)

# Parse frontmatter
fm = {}
for line in fm_lines:
    if ':' in line:
        k, v = line.split(':', 1)
        fm[k.strip()] = v.strip()

print('title:', fm.get('title', ''))
print('issue_type:', fm.get('issue_type', ''))
print('priority:', fm.get('priority', ''))
print('estimate:', fm.get('estimate', ''))
print('blocked_by:', fm.get('blocked_by', ''))
print('parent_link:', fm.get('parent_link', ''))
print('theme:', fm.get('theme', ''))
"
```

### Step 2: Extract Body and Subtasks

Get body content and parse subtasks from "## Actionable items" section.

### Step 3: Validate Required Fields

Check:

- title must exist
- issue_type must be valid

### Step 4: Dry Run Mode

If `--dry-run`:

```
🔍 Dry Run: .temp/issues/{filename}

Issue Details:
  Title: {title}
  Type: {issue_type}
  Priority: {priority}
  Estimate: {estimate}
  Labels: backlog, {issue_type}{, {theme}}
  Blocked By: #{blocked_by}
  Parent: #{parent_link}

Body Preview:
---
{body}
---

Would create issue on GitHub (dry-run)
```

Exit.

### Step 5: Check GitHub Auth

Run:

```bash
gh auth status
```

If not authenticated, show error and exit.

### Step 6: Create Issue

Run:

```bash
gh issue create \
  --title "{title}" \
  --body "{body}" \
  --label "backlog" \
  --label "{issue_type}" \
  {--label "{theme}"} \
  --repo "0xbaitan/FulgensUI"
```

### Step 7: Handle Links

If blocked_by:

```bash
gh issue comment {issue_num} --body "⚠️ This issue is blocked by #{blocked_by}"
```

If parent_link:

```bash
gh issue comment {issue_num} --body "📌 Parent issue: #{parent_link}"
```

### Step 8: Handle Subtasks (Epic only)

If issue_type=epic and there are subtasks:

- Ask user if they want to create child issues
- If yes, create each with `gh issue create`

### Step 9: Show Result

```
✅ Issue created: https://github.com/0xbaitan/FulgensUI/issues/{num}
🎉 Done!
```

## Notes

- Supports --dry-run for preview
- Handles blocked_by and parent_link as comments
- For Epics with subtasks, asks user if they want to create child issues
*