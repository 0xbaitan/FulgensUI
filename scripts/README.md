# FulgensUI Scripts

This directory contains scripts for development, testing, and Git workflow automation.

## Commit Workflow Scripts

### `prepare-commit.ts`

Prepares a commit by running tests, linting, and generating an AI commit message. Saves the message to a temp file for manual review.

**Usage:**

```bash
bun run prepare-commit              # Full workflow
bun run prepare-commit --dry-run    # Test run without saving files
```

**What it does:**

1. Checks git status and staged files
2. Extracts issue number from branch name
3. Determines commit type (branch prefix → GitHub labels → file analysis)
4. Runs tests with coverage (scoped to affected packages)
5. Runs ESLint validation
6. Generates AI commit message using Ollama (`opencode/big-pickle` model)
7. Saves message to `.temp/commit-messages/<details>_<timestamp>.txt`
8. Creates log file in `logs/` directory

**Requirements:**

- Staged files ready to commit
- Optional: Ollama running with `opencode/big-pickle` model (fallback if unavailable)
- Optional: GitHub CLI (`gh`) for PR label detection

**Output:**

- Commit message file: `.temp/commit-messages/<issue#>_<type>_<name>_<timestamp>.txt`
- Log file: `logs/prepare-commit_<status>_<timestamp>.log`

**Example output:**

```
✅ Prepare Commit Complete

📁 Staged Files:
  - file1.ts
  - file2.tsx

🏷️  Commit Type: feat (from branch prefix)
📋 Issue: #123
🌿 Branch: feature/123-add-button

📊 Coverage: Lines 85% | Branches 70% | Functions 90%
✅ Tests: PASSED
✅ Linting: PASSED

💾 Message saved to: .temp/commit-messages/123_feat_add-button_2026-03-02T143000Z.txt

Next: Edit the message file manually, then run /make-commit
```

---

### `ai-commit-agent.ts`

AI-powered commit agent that generates commit messages and creates commits directly.

**Usage:**

```bash
bun run ai-commit                    # Interactive commit with editor
bun run ai-commit --cli              # Use CLI editor (nano/vim)
bun run ai-commit --vscode           # Force VSCode editor
bun run ai-commit --output-only      # Display message without committing
```

**What it does:**

1. Analyzes staged files and git diff
2. Extracts issue number from branch name
3. Runs tests with coverage (scoped to affected packages)
4. Generates AI commit message using Ollama
5. Opens editor for user to review/edit the message
6. Creates the commit when user saves and closes the editor

**Requirements:**

- Staged files ready to commit
- Ollama running with `qwen2.5-coder:7b` model

**Example:**

```bash
# Stage your changes
git add src/components/button.tsx

# Run the AI commit agent
bun run ai-commit

# Editor opens with generated message
# Edit if needed, save and close to commit
# Or close without saving to cancel
```

---

### `pre-commit-tests.ts`

Interactive test runner for pre-commit hook. Runs tests on affected packages and prompts user if tests fail.

**Usage:**

```bash
bun run pre-commit:test:staged
```

**What it does:**

1. Identifies staged files
2. Determines affected packages
3. Runs tests on affected packages only
4. If tests fail, prompts: `Tests failed. Continue with commit anyway? [y/N]`
5. Allows user to proceed or abort commit

**Used by:**

- `.husky/pre-commit` hook

---

## Directory Structure

```
scripts/
├── README.md                    # This file
├── prepare-commit.ts            # Prepare commit workflow
├── ai-commit-agent.ts           # AI commit with editor
├── pre-commit-tests.ts          # Pre-commit test runner
├── commands/                    # OpenCode command scripts
│   ├── create-issue.md
│   ├── draft-issue.md
│   ├── enhance-issue.md
│   ├── list-templates.md
│   └── validate-issue.md
├── github/                      # GitHub automation scripts
├── issue/                       # Issue management scripts
└── templates/                   # Issue templates

```

## OpenCode Slash Commands

These scripts are invoked by OpenCode custom slash commands:

- `/prepare-commit` → `prepare-commit.ts`
- `/make-commit` → Uses generated message files
- `/commit` → `ai-commit-agent.ts`

See `.opencode/commands/` for command definitions and `AGENTS.md` for detailed documentation.

## Related npm Scripts

```bash
# Commit workflows
bun run prepare-commit           # Prepare commit with tests and AI message
bun run ai-commit                # Interactive AI commit

# Pre-commit checks
bun run pre-commit:checks        # Fast checks (panda, lint, type-check)
bun run pre-commit:test:staged   # Interactive test runner

# CI workflows
bun run ci:all                   # Full CI pipeline
bun run ci:test:coverage         # Tests with coverage
```

## Commit Message Format

All commits must follow Conventional Commits:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

**Examples:**

```
feat(button): add primary variant with hover state
fix(input): resolve value not updating on change
docs(readme): update installation instructions
```

## Branch Naming for Issue Tracking

Create branches with issue IDs for automatic tracking:

- `feature/123-add-button`
- `fix/456-hover-issue`
- `tasks/789-update-docs`

The commit scripts will automatically extract the issue number and include it in the commit message.
