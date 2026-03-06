# Epic Refinement Rules

Load this file when user specifies epic type ticket.

## Required Fields

- goal (one sentence high-level objective)
- stakeholder (who needs this and why)
- scope (what's included/excluded)
- timeline (target quarter/sprint)

## Epic Definition

Large initiative requiring multiple stories/tasks/items, typically >13 story points or >1 sprint.

## Question Flow (Minimal)

### Phase 1: Vision (Always Ask)

1. "What's the high-level goal?" (one sentence)
2. "Who are the stakeholders?" (roles, not names)
3. "Why now?" (business justification)

### Phase 2: Scope (Always Ask)

4. "What's IN scope?" (main features/changes)
5. "What's OUT of scope?" (explicitly defer)
6. "Timeline?" (target quarter, sprint, or "TBD")

### Phase 3: Success Metrics (Level 3 Proactive)

7. "How will you measure success?" (1-2 metrics)
8. "What are the risks/dependencies?"

### Phase 4: Breakdown (Critical)

9. "Let's identify child items. What are the main pieces?"

Guide user to list 3-10 distinct work items:

```
1. Item: {specific scope} - {brief description}
2. Item: {specific scope} - {brief description}
...
```

## Conciseness Checks

- **Goal >200 chars?** → Ask user to simplify
- **<3 child items?** → Might not need epic, suggest task/story
- **>15 child items?** → Too large, suggest splitting epic

## No Subtasks for Epics

Epics don't have subtasks. Instead, they have **child items**.

Work breakdown happens at the item level.

## Child Item Suggestions

After understanding scope, proactively suggest:

```
I've identified these child items:

1. Item: Design dark mode color tokens
2. Item: Implement ThemeProvider component
3. Item: Update Button component for theme support
4. Item: Update Input component for theme support
5. Item: Update remaining components
6. Item: Storybook theme toggle integration
7. Item: Documentation updates

Should I help you create the epic spec with these listed?
```

## Epic Spec Content

Keep minimal:

- **Goal** (1 sentence)
- **Stakeholder & Business Value** (2-3 sentences)
- **Scope** (bullet list: in-scope, out-of-scope)
- **Success Criteria** (1-2 measurable outcomes)
- **Timeline** (target date or TBD)
- **Child Items** (list with brief descriptions)
- **Risks/Dependencies** (if any)

No detailed implementation - that belongs in child items.

## Next Steps Guidance

After creating epic:

```
✅ Epic created: {title}

Next steps:
1. Create this epic issue on GitHub
2. Come back to create child items:
   @manager Create an item for {first-child-description}
3. Link children to parent using parent_issue field
```

## GitHub Metadata

Generate:

```yaml
github:
  labels:
    - "issue:epic"
    - "priority:{user-specified}"
    - "status:backlog"
    - "scope:{inferred}"
```

Note: Epics typically don't have story point estimates (sum of children instead).
