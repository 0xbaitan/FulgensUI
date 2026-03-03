# Status Label Transition Rules

## State Machine Diagram

```
┌──────────────┐
│   backlog    │ ◄─────────────────────────┐
└──────┬───────┘                           │
       │                                   │
       │ ✅ ready                          │
       │ ✅ development                    │
       │ ✅ defect                         │
       ▼                                   │
┌──────────────┐                           │
│     ready    │                           │
└──────┬───────┘                           │
       │                                   │
       │ ✅ development                    │
       │ ✅ backlog                        │
       ▼                                   │
┌──────────────┐                           │
│ development  │ ◄─────────┐               │
└──────┬───────┘           │               │
       │                   │               │
       │ ✅ review          │               │
       │ ✅ qa              │               │
       │ ✅ defect          │               │
       │ ✅ backlog         │               │
       ▼                   │               │
┌──────────────┐           │               │
│    review    │           │               │
└──────┬───────┘           │               │
       │                   │               │
       │ ✅ qa              │               │
       │ ✅ development ────┘               │
       │ ✅ defect                          │
       ▼                                   │
┌──────────────┐                           │
│      qa      │                           │
└──────┬───────┘                           │
       │                                   │
       │ ✅ done                            │
       │ ✅ defect                          │
       │ ✅ development                     │
       │ ✅ backlog ────────────────────────┘
       ▼
┌──────────────┐
│     done     │ (closes issue)
└──────────────┘
       │
       │ (reopen)
       ▼
┌──────────────┐
│   backlog    │ (auto-reset on reopen)
└──────────────┘

┌──────────────┐
│    defect    │ ─────► development
└──────────────┘ ─────► backlog
  (rework path)
```

## Transition Matrix

| From \ To       | backlog | ready | development | review | qa   | defect | done |
| --------------- | ------- | ----- | ----------- | ------ | ---- | ------ | ---- |
| **backlog**     | -       | ✅    | ✅          | ❌     | ❌   | ✅     | ❌   |
| **ready**       | ✅      | -     | ✅          | ❌     | ❌   | ❌     | ❌   |
| **development** | ✅      | ❌    | -           | ✅     | ✅   | ✅     | ❌   |
| **review**      | ❌      | ❌    | ✅          | -      | ✅   | ✅     | ❌   |
| **qa**          | ✅      | ❌    | ✅          | ❌     | -    | ✅     | ✅   |
| **defect**      | ✅      | ❌    | ✅          | ❌     | ❌   | -      | ❌   |
| **done**        | ✅\*    | ✅\*  | ✅\*        | ✅\*   | ✅\* | ✅\*   | -    |

_\* Done can transition to any state when the issue is reopened (auto-resets to backlog)_

## Detailed Rules

### From `backlog`

- ✅ **→ ready** - Issue is triaged and ready for development
- ✅ **→ development** - Start working immediately (skip ready)
- ✅ **→ defect** - Issue identified as having a defect before work started
- ❌ **→ review** - Cannot skip development phase
- ❌ **→ qa** - Cannot skip development and review phases
- ❌ **→ done** - Cannot complete without doing the work

### From `ready`

- ✅ **→ development** - Start active development
- ✅ **→ backlog** - Move back to backlog (de-prioritize)
- ❌ **→ review** - Must go through development first
- ❌ **→ qa** - Must go through development first
- ❌ **→ defect** - Not started yet, nothing to be defective
- ❌ **→ done** - Cannot complete without doing the work

### From `development`

- ✅ **→ review** - Code is ready for review
- ✅ **→ qa** - Skip review, go directly to testing (small changes)
- ✅ **→ defect** - Issue found during development
- ✅ **→ backlog** - Halt development and return to backlog
- ❌ **→ ready** - Cannot go backward to ready
- ❌ **→ done** - Must pass review/qa before completion

### From `review`

- ✅ **→ qa** - Review approved, ready for testing
- ✅ **→ development** - Changes requested, back to development
- ✅ **→ defect** - Critical issue found during review
- ❌ **→ ready** - Cannot skip back multiple states
- ❌ **→ backlog** - Must go through development first
- ❌ **→ done** - Must pass qa before completion

### From `qa`

- ✅ **→ done** - Testing passed, ready to close
- ✅ **→ defect** - Bug found during testing
- ✅ **→ development** - Minor fixes needed, skip formal defect
- ✅ **→ backlog** - Major issues, needs complete rework
- ❌ **→ ready** - Cannot skip back multiple states
- ❌ **→ review** - Cannot go backward to review

### From `defect`

- ✅ **→ development** - Defect understood, back to development
- ✅ **→ backlog** - Defect too large, needs complete re-planning
- ❌ **→ ready** - Defect is already past the ready phase
- ❌ **→ review** - Must fix in development before review
- ❌ **→ qa** - Must fix in development before testing
- ❌ **→ done** - Cannot complete with known defects

### From `done`

- ✅ **→ (any)** - When issue is reopened, auto-resets to `backlog`
- Issue is automatically closed when `status:done` is applied
- Reopening the issue triggers auto-reset to `status:backlog`

## Common Workflows

### Happy Path (Full Process)

```
backlog → ready → development → review → qa → done
```

### Quick Fix (Skip Ready)

```
backlog → development → review → qa → done
```

### Small Change (Skip Review)

```
backlog → ready → development → qa → done
```

### Hotfix (Minimal Process)

```
backlog → development → qa → done
```

### Bug Fix from QA

```
development → review → qa → defect → development → review → qa → done
```

### Major Rework

```
development → review → defect → backlog → ready → development → ...
```

### De-prioritize

```
ready → backlog
development → backlog
```

### Reopen Completed Issue

```
done (closed) → (reopen) → backlog (open)
```

## Error Messages

When an invalid transition is attempted, the workflow posts a concise error comment:

### Examples

**backlog → done**

```
❌ Cannot go from backlog → done. Valid next: ready, development, defect
```

**ready → review**

```
❌ Cannot go from ready → review. Valid next: development, backlog
```

**review → backlog**

```
❌ Cannot go from review → backlog. Valid next: qa, development, defect
```

**development → ready**

```
❌ Cannot go from development → ready. Valid next: review, qa, defect, backlog
```

## Special Cases

### Multiple Labels Added Simultaneously

- If multiple status labels are added at once, only the most recently added one is kept
- Transition validation applies to the final resulting label

### Reopening Issues

- When a closed issue is reopened, `status:done` is automatically removed
- `status:backlog` is automatically added
- No transition validation applies (always allowed)

### New Issues

- New issues automatically get `status:backlog`
- This ensures every issue starts in the correct initial state

### Daily Cleanup

- The cleanup workflow runs at 00:00 GMT daily
- It removes duplicate status labels (keeps first one)
- It adds `status:backlog` to issues missing a status label
- No transition validation is performed during cleanup

## Philosophy

The transition rules enforce a **sequential workflow** to maintain quality and traceability:

1. **No shortcuts** - Issues must pass through proper phases
2. **Forward progress** - Most backward transitions are blocked
3. **Escape hatches** - `defect` and `backlog` provide paths to recover
4. **Flexibility** - Multiple paths exist for different change sizes
5. **Safety** - Invalid transitions are caught immediately

## Updating Rules

To modify transition rules, update the `TRANSITION_RULES` object in `.github/workflows/enforce-single-status.yml`:

```javascript
const TRANSITION_RULES = {
  backlog: ["ready", "development", "defect"],
  ready: ["development", "backlog"],
  development: ["review", "qa", "defect", "backlog"],
  review: ["qa", "development", "defect"],
  qa: ["done", "defect", "development", "backlog"],
  defect: ["development", "backlog"],
  done: [], // Special case: allows any transition on reopen
};
```

After updating, test with sample issues to verify the new rules work as expected.
