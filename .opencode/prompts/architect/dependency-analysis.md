# Dependency Analysis - Subtask Relationships

**Context:** Loaded during Phase 6 (Subtask Planning) for first subtask only, then referenced.

---

## Detection Methods

### Method 1: Acceptance Criteria Cross-References

**Pattern:** Look for issue numbers or task names mentioned in acceptance criteria

**Example:**

```
Issue #131: Create Toggle component
Issue #132: Create ThemeProvider (uses Toggle from #131)
Issue #133: Add persistence (uses ThemeProvider from #132)

Dependency chain: 131 → 132 → 133
```

### Method 2: Import Analysis

**Pattern:** Analyze which files import from others

**Commands:**

```bash
# Check if subtask-132 imports from subtask-131
grep -r "import.*Toggle" packages/core/src/components/theme-provider/
```

**If found:** 132 depends on 131

### Method 3: Shared State/APIs

**Pattern:** Check if subtasks modify/consume same data

**Example:**

- Subtask #125: Create user API endpoint
- Subtask #126: Build user profile UI (fetches from API)

**Dependency:** 126 depends on 125

### Method 4: Ask User

**When unclear:**

```
I'm analyzing dependencies between subtasks.

Subtask #131: Toggle component
Subtask #132: Theme provider
Subtask #133: Persistence

Are there dependencies between these?
(e.g., Does #132 need #131 to be complete first?)
```

---

## Dependency Types

### Sequential (Blocking)

```
#131 MUST complete before #132 starts
→ Phase 1: #131
→ Phase 2: #132
```

### Parallel (Independent)

```
#131 and #132 can run simultaneously
→ Phase 1: #131, #132 (both)
```

### Partial (Soft Dependency)

```
#132 can start but needs #131 for integration
→ Phase 1: #131, #132 (parallel development)
→ Phase 2: Integration (connect them)
```

---

## Output Format: DEPENDENCIES.md

**Structure:**

```markdown
# Task Dependencies - Issue #130

## Dependency Analysis

**Subtask #131: Toggle Component**

- Dependencies: None
- Estimated: 3 points
- Can start: Immediately

**Subtask #132: Theme Provider**

- Dependencies: #131 (requires Toggle component)
- Estimated: 5 points
- Can start: After #131 complete

**Subtask #133: Persistence**

- Dependencies: #132 (requires ThemeProvider API)
- Estimated: 2 points
- Can start: After #132 complete

## Execution Order

**Phase 1: Foundation** (estimated 3 days)

- #131: Toggle Component (3 points)
  - Solo task, no blockers
  - Outputs: Toggle component, Storybook story, tests

**Phase 2: Integration** (estimated 5 days)

- #132: Theme Provider (5 points)
  - Blocked by: #131
  - Imports: Toggle component from #131
  - Outputs: ThemeProvider, useTheme hook, tests

**Phase 3: Persistence** (estimated 2 days)

- #133: Persistence (2 points)
  - Blocked by: #132
  - Uses: ThemeProvider API from #132
  - Outputs: localStorage integration, tests

## Critical Path

**Longest sequence:** #131 → #132 → #133 (10 points, ~10 days)

**Parallel opportunities:** None (sequential dependencies)

## Notes

- #131 must be fully tested before #132 begins (API stability)
- #133 can use mocks during #132 development (parallel work possible)
- Consider creating #131 PR first, merge before #132 development
```

---

## User Confirmation

**Before finalizing:**

```
I've analyzed dependencies between subtasks:

Execution order:
Phase 1: #131 (no dependencies)
Phase 2: #132 (depends on #131)
Phase 3: #133 (depends on #132)

Does this match your understanding?
```

**If user corrects:** Update DEPENDENCIES.md and subtask plans
