# Task Refinement Rules

Load this file when user specifies task type ticket.

## Required Fields

- title
- technical_context (what problem/need)
- implementation_approach (how you'll solve it)
- rationale (why this approach)

## Task Definition

Technical work without direct user-facing features:

- Refactoring
- Build system changes
- Configuration updates
- Infrastructure work
- Technical debt
- Developer tooling

## Question Flow

### Phase 1: Context (Always Ask)

1. "What technical problem are you solving?"
2. "Why is this needed now?" (triggering event, technical debt, blocker)

### Phase 2: Approach (Always Ask)

3. "How will you implement this?" (brief technical approach)
4. "Are there alternative approaches?" (considered and rejected)

### Phase 3: Impact (Level 3 Proactive)

5. "Does this affect other systems/packages?"
6. "Any breaking changes?"
7. "Performance implications?"
8. "Security considerations?"

### Phase 4: Testing & Validation (Level 3 Proactive)

9. "How will you test this?"
10. "How will you validate it works?"
11. "Rollback plan if something breaks?"

## Conciseness Checks

- **Affects >2 systems?** → Break into separate tasks per system
- **>8 subtasks?** → Break into items
- **Description >500 chars?** → Ask user to summarize

## Subtasks (Max 6)

Default subtasks for tasks:

- [ ] Research/design approach
- [ ] Implement changes
- [ ] Update tests
- [ ] Update documentation
- [ ] Validate with team
- [ ] Deploy/integrate

Adjust based on type of task.

## Complexity Signals (Trigger Atomicity Check)

Watch for:

- "refactor entire system"
- "update all configs"
- "affects multiple packages"
- "breaking changes across components"

If detected → SWAP to atomicity-check.md

## Documentation Needs

Always ask:

- "Will this require documentation updates?" (README, CONTRIBUTING, etc.)
- "Any migration guide needed?"
- "Team notification required?"

## GitHub Metadata

Generate:

```yaml
github:
  labels:
    - "issue:task"
    - "priority:{user-specified}"
    - "status:backlog"
    - "estimate:{user-specified}" (if provided)
    - "scope:{inferred}"
    - "type:{conventional-commit-type}" (e.g., type:refactor, type:build)
```

Map task to conventional commit type when possible:

- Refactoring → `type:refactor`
- Build/tooling → `type:build`
- Config → `type:chore`
- CI/CD → `type:ci`

## Template Deviations

Add these sections if relevant:

- **Breaking Changes** - If API/behavior changes
- **Migration Guide** - If users need to update code
- **Rollback Plan** - If high-risk changes
