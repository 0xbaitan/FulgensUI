---
description: Prepare a commit with tests, linting, and AI-generated commit message saved to a temp file
agent: git
subtask: true
---

# /prepare-commit Command

Prepares a commit by running tests, linting, and generating an AI commit message. Saves the message to a temp file for manual review.

**Implementation:** This command is implemented as `scripts/prepare-commit.ts` and can be invoked via `bun run prepare-commit`.

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
- **Branch name**: Extract for commit type detection

### Step 2: Extract Issue Number

Extract issue number from branch name:

- Pattern: `feature/123-add-button` → `#123`
- Pattern: `fix/456-hover-issue` → `#456`
- Pattern: `tasks/789-update-docs` → `#789`

If no issue number found, use empty string.

### Step 3: Determine Commit Type

**Priority order:**

1. **Branch prefix detection:**
   - `feature/*` → `feat`
   - `fix/*` → `fix`
   - `bugfix/*` → `fix`
   - `docs/*` → `docs`
   - `refactor/*` → `refactor`
   - `perf/*` → `perf`
   - `test/*` → `test`
   - `build/*` → `build`
   - `ci/*` → `ci`
   - `chore/*` → `chore`

2. **GitHub labels** (if available):
   Use `gh` API to get labels from the current branch or PR:

   ```bash
   gh pr view --json labels
   ```

   Map labels to commit types (e.g., `enhancement` → `feat`, `bug` → `fix`)

3. **File change analysis** (fallback):
   - Only `*.test.ts` or `*.test.tsx` files → `test`
   - Only `*.stories.tsx` or `*.mdx` files → `feat`
   - Only documentation files (`*.md`, `*.mdx`) → `docs`
   - Config files (`package.json`, `tsconfig.json`, etc.) → `chore`
   - Mixed changes → `chore`

### Step 4: Run Tests with Coverage

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

**If tests fail:** Log warning to `logs/prepare-commit_tests-failed_<timestamp>.log` and proceed with a warning message.

### Step 5: Run Linting

Run linting for the affected package:

```bash
# For core
cd packages/core && bun run lint

# For docsite
cd packages/docsite && bun run lint

# For all
bun run lint
```

**If lint fails:** Log warning to `logs/prepare-commit_lint-failed_<timestamp>.log` and proceed with a warning message.

### Step 6: Generate Commit Name (short descriptive)

Create a short descriptive name from:

1. Use branch name after the issue number or prefix
2. Example: `feature/add-button` → `add-button`
3. Example: `fix/hover-state-issue` → `hover-state-issue`

Clean up:

- Remove issue number prefix
- Replace `/` with `-`
- Remove special characters

### Step 7: Generate AI Commit Message

Call the AI commit agent to generate the message:

```bash
bun run scripts/ai-commit-agent.ts --output-only
```

Or use Ollama directly:

```bash
curl -s http://localhost:11434/api/generate -d '{
  "model": "opencode/big-pickle",
  "prompt": "Generate a conventional commit message for the following staged changes. Consider the commit type should be: <type>. Respond ONLY with the commit message, no explanation.\n\nStaged files:\n<file-list>\n\nGit diff:\n<git-diff>",
  "stream": false
}'
```

### Step 8: Save to Temp File

Generate filename:

```
.temp/commit-messages/<issue#>_<type>_<name>_<iso-timestamp>.txt
```

Examples:

- `123_feat_add-button_2026-03-02T143000Z.txt`
- `feat_docs-update_2026-03-02T143000Z.txt` (no issue)

File content:

```
# Conventional Commit Message
# Edit this message before running /make-commit

<type>(<scope>): <description>

[optional body]

[optional footer]
```

Write the generated message to the file.

### Step 9: Log Action

Create log file:

```
logs/prepare-commit_tests-passed_2026-03-02T143000Z.log
```

Or if tests failed:

```
logs/prepare-commit_tests-failed_2026-03-02T143000Z.log
```

Log content:

```
Timestamp: 2026-03-02T14:30:00Z
Issue: #123
Commit Type: feat
Branch: feature/123-add-button
Staged Files: file1.ts, file2.tsx
Unstaged Files: file3.ts
Tests: PASSED/FAILED
Linting: PASSED/FAILED
Coverage: Lines 85% | Branches 70% | Functions 90%
Output File: .temp/commit-messages/123_feat_add-button_2026-03-02T143000Z.txt
```

### Step 10: Display Summary

Show to user:

```
✅ Prepare Commit Complete

📁 Staged Files:
  - file1.ts
  - file2.tsx

📁 Unstaged Files:
  - file3.ts

🏷️  Commit Type: feat (from branch prefix)
📋 Issue: #123
🌿 Branch: feature/123-add-button

📊 Coverage: Lines 85% | Branches 70% | Functions 90%
✅ Tests: PASSED
✅ Linting: PASSED

💾 Message saved to: .temp/commit-messages/123_feat_add-button_2026-03-02T143000Z.txt

Next: Edit the message file manually, then run /make-commit
```

## Error Handling

- **No staged files**: Ask user to stage files first with `git add`
- **Ollama unavailable**: Use fallback basic commit message generation (describe files changed)
- **No internet/gh CLI**: Use file-based commit type detection only

## Examples

### Basic Usage

```
/prepare-commit
```

→ Runs tests, linting, generates message, saves to temp file

### Dry Run

```
/prepare-commit --dry-run
```

→ Runs checks but doesn't save the message file
