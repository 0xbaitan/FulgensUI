---
type: subtask_plan
parent_issue: { PARENT_ISSUE_NUMBER }
subtask_issue: { SUBTASK_ISSUE_NUMBER }
subtask_title: "{SUBTASK_TITLE}"
dependencies: [{ DEPENDENCY_ISSUES }]
estimate: { ESTIMATE }
status: "PENDING"
created_at: { TIMESTAMP }
---

# Subtask Plan: {SUBTASK_TITLE}

> **Parent Issue:** #{PARENT_ISSUE_NUMBER}  
> **Subtask Issue:** #{SUBTASK_ISSUE_NUMBER}  
> **Dependencies:** {DEPENDENCY_LIST}  
> **Estimate:** {ESTIMATE} points  
> **Status:** {PENDING|IN_PROGRESS|COMPLETED}

---

## 1. Goal

{GOAL_DESCRIPTION}

**Context:**
{WHY_THIS_SUBTASK_EXISTS}

---

## 2. Acceptance Criteria

From GitHub issue #{SUBTASK_ISSUE_NUMBER}:

- [ ] {CRITERION_1}
- [ ] {CRITERION_2}
- [ ] {CRITERION_3}

**Definition of Done:**

- [ ] All acceptance criteria met
- [ ] Tests passing
- [ ] Code reviewed
- [ ] Documentation updated

---

## 3. Dependencies

**Blocked By:**
{IF_DEPENDENCIES}

- Issue #{DEPENDENCY_ISSUE}: {TITLE}
  - **Why:** {REASON}
  - **Can start:** After #{DEPENDENCY_ISSUE} is complete

{IF_NO_DEPENDENCIES}
None - can start immediately

**Blocks:**
{IF_BLOCKS_OTHERS}

- Issue #{BLOCKED_ISSUE}: {TITLE}
  - **Why:** {REASON}

{IF_BLOCKS_NONE}
None

---

## 4. Files to Modify

### Create

**{FILE_PATH}**

- **Purpose:** {PURPOSE}
- **Key exports:** {EXPORTS}
- **Estimated lines:** {LINES}

### Modify

**{FILE_PATH}**

- **Changes needed:**
  - {CHANGE_1}
  - {CHANGE_2}
- **Impact:** {IMPACT_DESCRIPTION}

### Delete

{IF_DELETIONS}
**{FILE_PATH}**

- **Reason:** {WHY_DELETING}
- **Migration:** {HOW_TO_MIGRATE}

{IF_NO_DELETIONS}
None

---

## 5. Implementation Steps

### Step 1: {STEP_TITLE}

**Action:** {WHAT_TO_DO}

**Commands:**

```bash
{COMMAND_IF_NEEDED}
```

**Output:** {EXPECTED_RESULT}

**Verification:**

- [ ] {VERIFICATION_CHECK}

---

### Step 2: {STEP_TITLE}

**Action:** {WHAT_TO_DO}

**Code pattern:**

```typescript
{
  CODE_EXAMPLE_IF_HELPFUL;
}
```

**Verification:**

- [ ] {VERIFICATION_CHECK}

---

### Step 3: {STEP_TITLE}

**Action:** {WHAT_TO_DO}

**Verification:**

- [ ] {VERIFICATION_CHECK}

---

{CONTINUE_FOR_ALL_STEPS}

---

## 6. Test Checklist

### Unit Tests

**File:** `{TEST_FILE_PATH}`

**Test cases:**

- [ ] {TEST_CASE_1}
  - **Given:** {PRECONDITION}
  - **When:** {ACTION}
  - **Then:** {EXPECTED_OUTCOME}

- [ ] {TEST_CASE_2}
  - **Given:** {PRECONDITION}
  - **When:** {ACTION}
  - **Then:** {EXPECTED_OUTCOME}

### Integration Tests

{IF_INTEGRATION_TESTS_NEEDED}

- [ ] {INTEGRATION_TEST_DESCRIPTION}

{IF_NOT_NEEDED}
None required

### Manual Testing

- [ ] {MANUAL_TEST_1}
- [ ] {MANUAL_TEST_2}

---

## 7. Definition of Done

**Code Complete:**

- [ ] All implementation steps complete
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Code follows project conventions

**Testing Complete:**

- [ ] All unit tests passing
- [ ] All integration tests passing (if applicable)
- [ ] Manual testing complete
- [ ] Coverage ≥90%

**Documentation Complete:**

- [ ] Code comments added (complex logic only)
- [ ] Storybook story created (if UI component)
- [ ] README updated (if public API)

**Quality Checks:**

- [ ] `bun run type-check` passes
- [ ] `bun run lint` passes
- [ ] `bun run ci:all` passes
- [ ] Self-review complete

**Ready for Review:**

- [ ] All acceptance criteria met
- [ ] All DoD items checked
- [ ] Can be demonstrated to reviewer

---

## 8. Implementation Notes

### Key Considerations

**{CONSIDERATION_1}**

- {DETAILS}

**{CONSIDERATION_2}**

- {DETAILS}

### Gotchas

**{GOTCHA_1}**

- {WHAT_TO_WATCH_OUT_FOR}

### Tips

**{TIP_1}**

- {HELPFUL_HINT}

### Related Code

**Similar patterns:**

- {FILE_PATH}:{LINE} - {DESCRIPTION}

**Referenced by:**

- {FILE_PATH} - {HOW_ITS_USED}

---

## 9. Progress Tracking

**Started:** {DATE}  
**Last Updated:** {DATE}  
**Completed:** {DATE}

**Blockers:**
{IF_BLOCKERS}

- {BLOCKER_DESCRIPTION}

{IF_NO_BLOCKERS}
None

---

## References

- Parent Plan: [IMPLEMENTATION-PLAN.md](IMPLEMENTATION-PLAN.md)
- GitHub Issue: https://github.com/0xbaitan/FulgensUI/issues/{SUBTASK_ISSUE_NUMBER}
- Dependencies: [DEPENDENCIES.md](DEPENDENCIES.md)
