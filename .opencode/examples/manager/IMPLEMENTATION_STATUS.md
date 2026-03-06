# @manager Agent - Implementation Complete

## Overview

The @manager agent is a SCRUM specialist that helps create atomic, well-refined GitHub issue tickets through conversational refinement. This document summarizes what was built and what remains to be done.

## ✅ Completed (Phases 1-4)

### Core Agent Files

- ✅ `.opencode/agents/manager.md` (228 lines) - Core agent definition with dynamic loading
- ✅ `.opencode/config/manager/core-rules.yaml` (62 lines) - Base behavior config
- ✅ `.opencode/config/manager/github-metadata.yaml` (97 lines) - Label/field mappings
- ✅ `.opencode/config/manager/conciseness-rules.yaml` (88 lines) - Length enforcement

### Type-Specific Rules

- ✅ `.opencode/prompts/manager/bug-rules.md` (123 lines)
- ✅ `.opencode/prompts/manager/story-rules.md` (124 lines)
- ✅ `.opencode/prompts/manager/epic-rules.md` (118 lines)
- ✅ `.opencode/prompts/manager/task-rules.md` (114 lines)
- ✅ `.opencode/prompts/manager/item-rules.md` (99 lines)

### Atomicity Check

- ✅ `.opencode/prompts/manager/atomicity-check.md` (138 lines)

### Spec Templates

- ✅ `.opencode/templates/manager/spec-bug.md` (75 lines)
- ✅ `.opencode/templates/manager/spec-story.md` (70 lines)
- ✅ `.opencode/templates/manager/spec-epic.md` (77 lines)
- ✅ `.opencode/templates/manager/spec-task.md` (69 lines)
- ✅ `.opencode/templates/manager/spec-item.md` (41 lines)

### Scripts & Integration (Phase 5)

- ✅ `scripts/issue/parse_spec.py` (258 lines) - Parse markdown specs → GitHub JSON
- ✅ Updated `.opencode/commands/create-issue.md` - Handle markdown specs
- ✅ Created `.opencode/commands/restore-session.md` - Session restoration

### Documentation & Examples (Phase 6)

- ✅ Updated `AGENTS.md` with @manager section (full usage guide)
- ✅ `.opencode/examples/manager/README.md` - Usage patterns
- ✅ `.opencode/examples/manager/bug-button-hover.md` - Bug example
- ✅ `.opencode/examples/manager/story-dark-mode.md` - Story example
- ✅ `.opencode/examples/manager/epic-design-system.md` - Epic example

### Infrastructure

- ✅ Created `.temp/issues/specs/` directory
- ✅ Created `.temp/issues/sessions/` directory
- ✅ Created `.temp/issues/attachments/` directory

## ⏳ Remaining Work (Phase 7: Testing)

### End-to-End Testing

**Test 1: Basic Bug Workflow**

```bash
# 1. Invoke @manager
@manager I found a bug where the button hover doesn't work

# 2. Refine through conversation (manager asks questions)
# 3. Manager generates spec to .temp/issues/specs/...
# 4. Run /create-issue
/create-issue .temp/issues/specs/<generated-file>.md --dry-run

# 5. Verify output structure
# 6. Create actual issue (remove --dry-run)
```

**Test 2: Story with Breakdown**

```bash
@manager Create a story for adding dark mode to all components

# Manager should detect atomicity issue and suggest epic + items
# Test that it properly handles the breakdown conversation
```

**Test 3: Session Restoration**

```bash
# 1. Start a conversation, don't complete it
@manager bug: Something is broken

# 2. Exit conversation mid-way
# 3. List sessions
/restore-session --list

# 4. Restore the session
/restore-session <session-id>

# 5. Continue conversation
```

**Test 4: GitHub Integration**

```bash
# Create a complete issue and verify:
# - Labels are correct
# - Project fields are set
# - Blocked_by/parent_link comments appear
# - Issue body renders correctly
```

### Validation Checklist

- [ ] Context loading stays under 300 lines at each phase
- [ ] All ticket types work (bug, story, epic, task, item)
- [ ] Atomicity detection triggers correctly (>8 subtasks, "all components")
- [ ] Conciseness rules enforced (120 char titles, 500 char sections)
- [ ] Session save/restore works
- [ ] GitHub metadata correctly generated
- [ ] `/create-issue` parses manager specs
- [ ] Labels and project fields applied correctly
- [ ] Dry-run mode shows accurate preview

### Known Limitations

1. **Project field updates**: The `/create-issue` command has placeholder code for updating GitHub project fields via GraphQL. This needs proper implementation with `gh api graphql`.

2. **Session restoration**: The `/restore-session` command describes the workflow but the @manager agent needs to implement the actual context restoration logic.

3. **Attachment handling**: The infrastructure is in place (`.temp/issues/attachments/`) but the agent needs to implement file upload/save logic.

## Architecture Summary

### Context Loading Strategy (Minimal Budget)

```
Phase 1: Initialize (~140 lines)
  - manager.md (compact agent definition)
  - core-rules.yaml (62 lines)
  - github-metadata.yaml (97 lines)
  - conciseness-rules.yaml (88 lines)

Phase 2: Load Type Context (~120 lines)
  - {type}-rules.md (one of: bug, story, epic, task, item)

Phase 3: Atomicity Check (swap if needed, ~138 lines)
  - atomicity-check.md

Phase 4: Generate Spec (swap, ~70-80 lines)
  - spec-{type}.md template
```

**Key principle**: Never exceed 300 lines of context at any moment. Swap contexts instead of stacking.

### File Naming Conventions

**Specs**: `.temp/issues/specs/{timestamp}_{type}_{sanitized-title}.md`

- Example: `20260306_123456_button-hover-bug.md`

**Sessions**: `.temp/issues/sessions/{session_id}.json`

- Example: `20260306_123456.json`

**Attachments**: `.temp/issues/attachments/{session_id}/{filename}`

- Example: `20260306_123456/screenshot.png`

### GitHub Metadata Structure

**Labels** (from `.github/labels.yml`):

- `status:*` - backlog, ready, development, review, done, blocked
- `issue:*` - bug, story, epic, task, item
- `priority:*` - must-have, should-have, could-have, won't-have
- `estimate:*` - 1, 2, 3, 5, 8, 13, 21, 34, 55, 89
- `scope:*` - core, docsite, none
- `has-parent`, `blocked`

**Project Field IDs** (for FulgensUI Project #9):

- Status: `PVTSSF_lAHOAeQxRM4BQVimzg-fIIo`
- Priority: `PVTSSF_lAHOAeQxRM4BQVimzg-fsa4`
- Story points: `PVTF_lAHOAeQxRM4BQVimzg-fxsg`
- Issue type: `PVTSSF_lAHOAeQxRM4BQVimzg-gKWI`

## Design Decisions Reference

All major design decisions are documented in the initial plan (see "Design Decisions Made" section). Key highlights:

- **Mixed acceptance criteria**: Gherkin for stories, checklists for bugs/tasks
- **Combined atomicity rules**: Estimate + subtasks + complexity heuristics
- **No auto-estimation**: Leave blank for team planning
- **Manager creates specs → user runs /create-issue**: Explicit control over GitHub operations
- **Save all sessions**: Enable restoration at any time
- **Proactivity Level 3**: Always ask about edge cases, testing, a11y, performance
- **Epic handling**: Create epic only, user creates children separately
- **Template-based with deviations**: Use templates as base but allow flexibility
- **Markdown-only output**: No YAML generation

## Next Steps

1. **Test the @manager agent** with real scenarios
2. **Implement project field updates** in `/create-issue` (GraphQL mutations)
3. **Implement session restoration** in @manager agent
4. **Add attachment handling** for screenshots/logs
5. **Iterate based on usage feedback**

## Usage Quick Reference

```bash
# Create an issue
@manager bug: Description of bug
@manager story: User-facing feature request
@manager epic: Large initiative
@manager task: Technical work
@manager item: Small atomic work

# Restore a session
/restore-session --list
/restore-session <session-id>

# Create GitHub issue
/create-issue .temp/issues/specs/<file>.md
/create-issue <file> --dry-run
```

## Files Created/Modified Summary

**Created (20 files)**:

- 1 agent definition
- 3 config files
- 5 type-specific rules
- 1 atomicity check
- 5 spec templates
- 1 parser script
- 2 command definitions
- 3 example specs
- 1 example README

**Modified (2 files)**:

- `AGENTS.md` - Added @manager section
- `.opencode/commands/create-issue.md` - Updated for markdown specs

**Total lines written**: ~3,500 lines
