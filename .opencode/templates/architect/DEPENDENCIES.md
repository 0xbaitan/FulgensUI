# Task Dependencies - Issue #{PARENT_ISSUE_NUMBER}

> **Parent Issue:** #{PARENT_ISSUE_NUMBER} - {PARENT_TITLE}  
> **Subtasks:** {SUBTASK_COUNT}  
> **Total Estimate:** {TOTAL_POINTS} points

---

## Dependency Analysis

### Subtask #{SUBTASK_1}: {TITLE}

**Dependencies:** None

**Estimated:** {POINTS} points

**Can start:** Immediately

**Outputs:**

- {OUTPUT_1}
- {OUTPUT_2}

**Blocks:** {BLOCKS_WHICH_TASKS}

---

### Subtask #{SUBTASK_2}: {TITLE}

**Dependencies:** #{SUBTASK_1}

**Reason:** {WHY_DEPENDS}

**Estimated:** {POINTS} points

**Can start:** After #{SUBTASK_1} complete

**Outputs:**

- {OUTPUT_1}
- {OUTPUT_2}

**Blocks:** {BLOCKS_WHICH_TASKS}

---

{CONTINUE_FOR_ALL_SUBTASKS}

---

## Execution Order

### Phase 1: Foundation

**Duration:** Estimated {DAYS} days

**Tasks:**

- **#{TASK_NUMBER}: {TITLE}** ({POINTS} points)
  - Solo task, no blockers
  - Outputs: {OUTPUTS}
  - Must complete before Phase 2

---

### Phase 2: Integration

**Duration:** Estimated {DAYS} days

**Dependencies:** Phase 1 must complete

**Tasks:**

- **#{TASK_NUMBER}: {TITLE}** ({POINTS} points)
  - Blocked by: #{DEPENDENCY}
  - Imports/Uses: {WHAT_FROM_DEPENDENCY}
  - Outputs: {OUTPUTS}

{IF_PARALLEL_TASKS}

- **#{TASK_NUMBER}: {TITLE}** ({POINTS} points)
  - Blocked by: #{DEPENDENCY}
  - Can run in parallel with #{TASK_NUMBER}
  - Outputs: {OUTPUTS}

---

### Phase 3: {PHASE_NAME}

{CONTINUE_FOR_ALL_PHASES}

---

## Critical Path

**Longest sequence:** #{TASK_1} → #{TASK_2} → #{TASK_3}

**Total duration:** {TOTAL_POINTS} points (~{DAYS} days)

**Bottleneck:** {IF_ANY}

**Parallel opportunities:** {IF_ANY}

---

## Dependency Graph (Text)

```
#{TASK_1} (Foundation)
  ├─→ #{TASK_2} (Uses Task 1 output)
  │     └─→ #{TASK_4} (Uses Task 2 API)
  └─→ #{TASK_3} (Imports Task 1 component)
        └─→ #{TASK_4} (Also uses Task 3)
```

**Legend:**

- `→` : Blocking dependency (must wait)
- `├─` : Branches (multiple dependencies)
- `└─` : Final dependency in chain

---

## Integration Points

### Task #{TASK_1} → Task #{TASK_2}

**What's passed:**

- {EXPORT/API/COMPONENT}

**How it's used:**

- {USAGE_DESCRIPTION}

**Integration risk:** {LOW|MEDIUM|HIGH}

**Mitigation:**

- {IF_HIGH_RISK}

---

{CONTINUE_FOR_ALL_INTEGRATION_POINTS}

---

## Recommended Workflow

### Option 1: Sequential (Safest)

1. Complete #{TASK_1} fully (code + tests + review)
2. Merge #{TASK_1} to main
3. Complete #{TASK_2} fully
4. Merge #{TASK_2} to main
5. Continue sequentially...

**Pros:**

- Stable foundation for each task
- Easy to review incrementally
- No merge conflicts

**Cons:**

- Slower overall
- More PR overhead

---

### Option 2: Parallel Development (Faster)

1. Start #{TASK_1} on `feature/{ISSUE}-task-1`
2. Once #{TASK_1} API is stable (even if not merged):
   - Start #{TASK_2} on `feature/{ISSUE}-task-2`
   - Use mocks/stubs for Task 1 outputs
3. Once #{TASK_1} merged:
   - Update #{TASK_2} to use real implementation
4. Continue with dependent tasks...

**Pros:**

- Faster overall delivery
- Efficient use of time

**Cons:**

- Risk of API changes requiring rework
- More complex branch management
- Potential merge conflicts

---

### Recommended Approach: {OPTION_1|OPTION_2|HYBRID}

**Rationale:**
{WHY_THIS_APPROACH}

**Special considerations:**

- {CONSIDERATION_1}
- {CONSIDERATION_2}

---

## Risk Mitigation

### API Stability

**Risk:** #{TASK_2} depends on #{TASK_1} API, which might change

**Mitigation:**

- Finalize #{TASK_1} API contract first
- Document API in #{TASK_1} plan before implementation
- Get user approval on API design
- Freeze API once #{TASK_2} starts

---

### Integration Issues

**Risk:** #{TASK_3} might not integrate cleanly with #{TASK_1} + #{TASK_2}

**Mitigation:**

- Create integration tests early
- Mock integration points during development
- Test integration before marking tasks complete

---

{CONTINUE_FOR_ALL_RISKS}

---

## Notes

### Task Order Rationale

**Why #{TASK_1} first:**

- {REASON}

**Why #{TASK_2} after #{TASK_1}:**

- {REASON}

### Parallel Work Opportunities

{IF_ANY}

- #{TASK_A} and #{TASK_B} can run in parallel because {REASON}

{IF_NONE}

- No parallel opportunities - all tasks are sequential

### Estimates Confidence

**High confidence:** {TASKS}  
**Medium confidence:** {TASKS}  
**Low confidence:** {TASKS}

**Total estimate range:** {MIN_POINTS}-{MAX_POINTS} points

---

## Progress Tracking

| Task      | Status   | Started | Completed | Blockers   |
| --------- | -------- | ------- | --------- | ---------- |
| #{TASK_1} | {STATUS} | {DATE}  | {DATE}    | {BLOCKERS} |
| #{TASK_2} | {STATUS} | {DATE}  | {DATE}    | {BLOCKERS} |
| #{TASK_3} | {STATUS} | {DATE}  | {DATE}    | {BLOCKERS} |

**Legend:**

- ⏳ PENDING - Not started
- 🏗️ IN_PROGRESS - Active development
- ✅ COMPLETED - Done and merged
- 🚫 BLOCKED - Waiting on dependency

---

## References

- Parent Plan: [IMPLEMENTATION-PLAN.md](IMPLEMENTATION-PLAN.md)
- Subtask Plans: [subtask-{NUMBER}.md](subtask-{NUMBER}.md)
- GitHub Issue: https://github.com/0xbaitan/FulgensUI/issues/{PARENT_ISSUE_NUMBER}
