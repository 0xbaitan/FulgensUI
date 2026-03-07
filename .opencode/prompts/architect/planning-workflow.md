# Planning Workflow - Step-by-Step Process

**Context:** Loaded during Phase 5 (Planning) after validation and atomicity checks complete.

---

## Step 1: Issue Ingestion

**Goal:** Fetch complete issue data from GitHub

**Commands:**

```bash
# Fetch parent issue
gh issue view <issue-number> \
  --repo 0xbaitan/FulgensUI \
  --json number,title,labels,body,state,assignees

# Fetch subtasks (if has-parent label absent, look for children)
gh issue list \
  --repo 0xbaitan/FulgensUI \
  --label "has-parent" \
  --json number,title,labels,body \
  --jq '.[] | select(.body | contains("#<issue-number>"))'
```

**Extract:**

- Issue number, title, type (from labels)
- Priority (from labels)
- Estimate (from labels)
- Acceptance criteria (from body)
- Subtask numbers (from body or child issues)

---

## Step 2: Validation

**Goal:** Determine technical feasibility status

**Process:**

1. Check file existence for referenced components
2. Run type-check to verify no existing errors
3. Extract test coverage from recent CI run or run locally
4. Scan git diff for breaking changes (if on feature branch)

**Report Status:**

```
🔍 Technical Feasibility: {GREEN|YELLOW|RED}

File Existence:
✅ src/components/ui/button/button.tsx exists
✅ src/components/ui/button/config/button-recipe.ts exists

Type Safety:
✅ bun run type-check passed (0 errors)

Test Coverage:
⚠️ Current coverage: 75% (threshold: 90%)

Breaking Changes:
✅ No breaking changes detected
```

**If RED:** Ask user how to proceed (see architect.md)

---

## Step 3: Atomicity Check

**Goal:** Detect if issue is too large for single implementation

**Process:**

1. Count implementation steps from acceptance criteria (>8 = signal)
2. Check for cross-cutting keywords in title/body
3. Estimate story points from issue (>13 = signal)
4. Count affected packages/components (>2 packages = signal)
5. If 2+ signals → Recommend breakdown

**Output:** See breakdown-rules.yaml template

---

## Step 4: Codebase Analysis

**Goal:** Understand current state and identify affected areas

**Commands:**

```bash
# Find related files
find packages/core/src/components -name "*button*"

# Check imports
grep -r "import.*Button" packages/core/src

# Check test coverage for component
grep -A 10 "button.test" packages/core/coverage/lcov.info
```

**Document:**

- Files that exist (current state)
- Files to create (proposed changes)
- Files to modify (updates needed)
- Files to delete (cleanup)
- Breaking changes (yes/no, describe impact)

---

## Step 5: Delegation Decision

**Goal:** Determine if @designer or @explore needed

**Designer Check:**

- Does issue involve UI component? (keywords, labels)
- Does acceptance criteria mention design/Penpot?
- If yes → Ask user (see delegation-patterns.yaml)

**Explorer Check:**

- Does analysis require >10 file searches?
- If yes → Auto-delegate to @explore

---

## Step 6: Plan Generation

**Goal:** Create IMPLEMENTATION-PLAN.md

**Process:**

1. Load template: `.opencode/templates/architect/IMPLEMENTATION-PLAN.md`
2. Populate frontmatter (issue metadata)
3. Generate sections incrementally:
   - Section 1: Issue Overview (from GitHub)
   - Section 2: Technical Scope (from codebase analysis)
   - Section 3: Codebase Analysis (from Step 4)
   - Section 4: Technical Feasibility (from Step 2)
   - Section 5: Delegation Plan (from Step 5)
   - Section 6: Implementation Checklist (from acceptance criteria)
   - Section 7: Subtask Breakdown (table with dependencies)
   - Section 8: Risk Assessment (analyze complexity)
   - Section 9: Testing Strategy (from acceptance criteria)
   - Section 10: Assets (note if diagrams needed)
   - Section 11: Notes & Decisions
4. Save to: `specs/architecture/<issue-number>/IMPLEMENTATION-PLAN.md`

**Status:** Mark as DRAFT until user reviews

---

## Step 7: Subtask Planning

**Goal:** Generate plan for each subtask with dependencies

**For each subtask:**

1. Load subtask issue from GitHub
2. Analyze dependencies (see dependency-analysis.md)
3. Populate subtask template
4. Save to: `specs/architecture/<parent-issue>/subtask-<number>.md`

**Dependency Description:**

- Create DEPENDENCIES.md with text description
- List phases (Phase 1: no deps, Phase 2: depends on Phase 1, etc.)
- Describe execution order
- Identify critical path

**No Graphviz:** Use text description only

---

## Output Confirmation

**Present to user:**

```
✅ Planning complete!

Generated:
- specs/architecture/130/IMPLEMENTATION-PLAN.md (DRAFT)
- specs/architecture/130/subtask-131.md
- specs/architecture/130/subtask-132.md
- specs/architecture/130/subtask-133.md
- specs/architecture/130/DEPENDENCIES.md

Execution order:
Phase 1: #131 (no dependencies)
Phase 2: #132, #133 (depend on #131)

Should I mark IMPLEMENTATION-PLAN.md as APPROVED?
```

---

## Iteration Support

If user requests changes:

1. Ask what needs adjustment
2. Regenerate affected sections
3. Re-save files
4. Confirm with user

---

## Handoff to Coder

**When user is ready to implement:**

```
User: Now implement the plan
Assistant: Delegating to @general...
[Spawns: @general Implement from specs/architecture/130/IMPLEMENTATION-PLAN.md]
```
