---
description: Interactive commit with AI-generated message and editor review
agent: git
subtask: true
---

# /commit Command

Interactive commit workflow with AI-generated commit message, test coverage, and editor review.

## Arguments

- `--cli`: Use CLI editor (nano/vim) instead of VSCode
- `--vscode`: Force VSCode editor (default when available)
- `--dry-run`: Preview the commit without creating it

## Workflow

### Step 1: Check Git Status

Run:

```bash
git status
git diff --name-only
git diff --cached --name-only
```

Identify:

- **Staged files**: Already tracked for commit
- **Unstaged files**: Modified but not staged

### Step 2: Show Context

Display to user:

```
📁 Staged Files:
  - file1.ts
  - file2.tsx

📁 Unstaged Files:
  - file3.ts

Branch: main
Issue: #123 (if detected from branch name)
```

### Step 3: Run Tests with Coverage

Based on staged files, determine scope:

- If only `packages/core/*` → run core tests
- If only `packages/docsite/*` → run docsite tests
- Otherwise → run all tests

Run:

```bash
# For core
cd packages/core && bun vitest run --coverage

# For docsite
cd packages/docsite && bun vitest run --coverage

# For all
bun run test
```

Extract coverage metrics:

- Lines %
- Branches %
- Functions %
- Statements %

Display coverage to user.

### Step 4: Generate AI Commit Message

Use the script `bun run scripts/ai-commit-agent.ts` with appropriate flags:

- Default: `bun run scripts/ai-commit-agent.ts` (VSCode if available)
- With --cli: `bun run scripts/ai-commit-agent.ts --cli`

**OR** manually call Ollama if preferred:

```bash
curl -s http://localhost:11434/api/generate -d '{
  "model": "qwen2.5-coder:7b",
  "prompt": "Generate a conventional commit message for: [git diff]",
  "stream": false
}'
```

### Step 5: Open Editor for Review

**Default (VSCode):**

- Opens VSCode with commit message file
- Wait for user to close file (save to commit, close without saving to cancel)

**With --cli:**

- Opens nano/vim with commit message
- Same save/cancel behavior

### Step 6: Create Commit

If user saved and closed the file:

```bash
git commit -m "type(scope): description"
```

Show success:

```
✅ Commit created: abc1234
📝 Message: feat(button): add primary variant
📊 Coverage: Lines 85% | Branches 70% | Functions 90%
```

If user cancelled:

```
❌ Commit cancelled by user
```

## Editor Behavior

| Action               | Result         |
| -------------------- | -------------- |
| Save file and close  | Creates commit |
| Close without saving | Cancels commit |
| Close terminal       | Cancels commit |

## Error Handling

- **No staged files**: Ask user to stage files first with `git add`
- **Tests fail**: Show test output, ask if user wants to proceed anyway
- **Ollama unavailable**: Use fallback basic commit message generation
- **Editor fails**: Show error, offer CLI fallback

## Examples

### Basic Usage

```
/commit
```

→ Opens VSCode with AI-generated message

### CLI Editor

```
/commit --cli
```

→ Opens nano with AI-generated message

### Dry Run

```
/commit --dry-run
```

→ Shows what would be committed without creating it
