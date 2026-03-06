# Item Refinement Rules

Load this file when user specifies item type ticket.

## Item Definition

Smallest, atomic work unit:

- Quick changes
- Simple updates
- Unambiguous tasks
- Typically <3 story points

Items are the "leaves" of the work tree - no further breakdown.

## Required Fields

- title
- description (2-3 sentences max)
- rationale (why this is needed)

## Question Flow (Minimal)

### Phase 1: What & Why (Always Ask)

1. "What needs to be done?" (one sentence)
2. "Why?" (business/technical reason, one sentence)

### Phase 2: Scope Validation (Always Check)

3. "Is this truly atomic, or can it be broken down further?"

If user describes multiple steps or components → Suggest this should be a task with child items instead.

## No Subtasks

Items DON'T have subtasks. They are the atomic work.

If user lists subtasks → Suggest:

```
This sounds like it needs breakdown.

Option 1: Create a task/story with these as items
Option 2: Pick the highest priority piece and make that the item
```

## Conciseness Enforcement (Strict)

Items must be:

- **Title:** <80 chars
- **Description:** <300 chars (2-3 sentences)
- **No subtasks:** If needs steps, promote to task

## Scope Check

Ask:

- "Can this be completed in <1 day by one person?"
- "Is the scope 100% clear?"

If NO to either → Promote to task or story.

## Common Item Types

- Update documentation
- Fix typo in code
- Add missing prop type
- Update dependency version
- Create example/demo
- Add test case
- Fix lint warning

## GitHub Metadata

Generate:

```yaml
github:
  labels:
    - "issue:item"
    - "priority:{user-specified or default:could-have}"
    - "status:backlog"
    - "estimate:{1-3}" (if provided, items are small)
    - "scope:{inferred}"
```

## Template Simplification

Item specs are minimal:

- Title
- Description (2-3 sentences)
- Rationale (1 sentence)
- No subtasks
- No complex sections

Keep it SHORT.
