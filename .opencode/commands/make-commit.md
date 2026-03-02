---
description: Create a git commit from a prepared message file
agent: git
subtask: true
---

# /make-commit Command

Creates a git commit using a prepared message file from `/prepare-commit`. Allows selecting from available message files.

## Workflow

### Step 1: List Available Message Files

Find all message files:

```bash
ls -la .temp/commit-messages/
```

If no files found, show error:

```
❌ No prepared commit messages found.

Run /prepare-commit first to generate a commit message.
```

### Step 2: Present Options to User

Use the `question` tool in the **primary agent** (not subagent) to present options:

```
question: {
  header: "select-commit-message",
  question: "Select a commit message to use:",
  options: [
    { label: "123_feat_add-button_2026-03-02T143000Z.txt", description: "feat: add button component" },
    { label: "456_fix-hover-issue_2026-03-02T144500Z.txt", description: "fix: resolve hover state issue" },
  ]
}
```

### Step 3: Read Selected File

Read the content of the selected file:

```bash
cat .temp/commit-messages/123_feat_add-button_2026-03-02T143000Z.txt
```

Extract the commit message (remove comment lines starting with `#`).

### Step 4: Execute Commit

Run:

```bash
git commit -m "<commit-message>"
```

### Step 5: Log Action

Create log file:

```
logs/make-commit_commit-created_2026-03-02T144500Z.log
```

Log content:

```
Timestamp: 2026-03-02T14:45:00Z
Message File: 123_feat_add-button_2026-03-02T143000Z.txt
Commit SHA: abc1234
Commit Message: feat(button): add primary variant

Action: COMMIT CREATED
```

### Step 6: Delete Used File

After successful commit, delete the used message file:

```bash
rm .temp/commit-messages/123_feat_add-button_2026-03-02T143000Z.txt
```

### Step 7: Display Summary

Show to user:

```
✅ Commit Created

📝 Message: feat(button): add primary variant
🌿 Commit SHA: abc1234
📊 Coverage: Lines 85% | Branches 70% | Functions 90%

🗑️  Deleted: .temp/commit-messages/123_feat_add-button_2026-03-02T143000Z.txt

💾 Log: logs/make-commit_commit-created_2026-03-02T144500Z.log
```

## Error Handling

- **No message files**: Show error with instructions to run `/prepare-commit` first
- **Git commit fails**: Log error to `logs/make-commit_failed_<timestamp>.log`, show error message
- **File read error**: Log error, show error message

## Examples

### Basic Usage

```
/make-commit
```

→ Lists available messages, lets user select, creates commit

### With Specific File

```
/make-commit 123_feat_add-button_2026-03-02T143000Z.txt
```

→ Uses the specified message file directly (skipping selection)
