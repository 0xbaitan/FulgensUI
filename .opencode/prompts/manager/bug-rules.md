# Bug Refinement Rules

Load this file when user specifies bug type ticket.

## Required Fields

- title
- feature (affected component/area)
- scenario (reproduction steps)
- expected_behavior
- actual_behavior
- environment

## Acceptance Criteria Format

Use **checklist format** (not Gherkin) for bugs.

## Question Flow (Concise)

### Phase 1: Core Details (Always Ask)

1. "What's broken?" (component/feature name)
2. "Can you reproduce this consistently?" (yes/no/sometimes)
3. "Steps to reproduce?" (numbered list, max 5 steps)

### Phase 2: Behavior (Always Ask)

4. "What did you expect to happen?"
5. "What actually happened?"

### Phase 3: Environment (Always Ask)

6. "Environment details?"
   - Device/OS
   - Browser + version
   - FulgensUI version
   - Dev or production build?

### Phase 4: Evidence (Always Request)

7. "Can you provide:"
   - Error logs/console output? (paste or attach)
   - Screenshot showing the issue? (attach)
   - Code snippet where this occurs? (paste)

### Phase 5: Context (Level 3 Proactive)

8. "Does this happen in both dev and production?"
9. "Are there console errors or warnings?"
10. "Does this affect other variants/props?"
11. "What's the user impact?" (blocks workflow, cosmetic, data loss)

### Phase 6: Related Work (Level 3 Proactive)

12. "Are there existing tests that should catch this?"
13. "Could this be a regression from recent changes?"
14. "Could this affect related components?"

## Conciseness Checks

After gathering responses, check:

- **Multiple components affected?** → Suggest separate items per component
- **>5 reproduction steps?** → Ask user to simplify or break down
- **Description >500 chars?** → Ask user to trim

## Subtasks (Max 8)

Default subtasks for bugs:

- [ ] Write failing test to reproduce
- [ ] Identify root cause
- [ ] Implement fix
- [ ] Verify fix across affected environments
- [ ] Add regression test
- [ ] Update docs if behavior changed

Adjust based on context (remove if not applicable).

## Complexity Signals (Trigger Atomicity Check)

Watch for:

- "all variants"
- "multiple components"
- "affects {3+} places"
- "frontend and backend"
- "database changes needed"

If detected → SWAP to atomicity-check.md

## File Attachments

Request and save:

- Error logs → `error-log.txt`
- Stack traces → `stack-trace.txt`
- Screenshots → `screenshot-{description}.png`
- Console output → `console-output.txt`

Save to: `.temp/issues/attachments/{session-id}/`

## GitHub Metadata

Generate:

```yaml
github:
  labels:
    - "issue:bug"
    - "priority:{user-specified}"
    - "status:backlog"
    - "estimate:{user-specified}" (if provided)
    - "scope:{inferred-from-component}"
```

## Template Deviations

Add these sections if applicable:

- **Root Cause Hypothesis** - If user provides technical context
- **Impact Assessment** - If affecting production/critical workflow
- **Workaround** - If temporary solution exists
