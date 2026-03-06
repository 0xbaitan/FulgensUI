# Atomicity Check Guide

Load ONLY when complexity signals detected during refinement.

## When to Load This File

Trigger atomicity check if user mentions:

- "all components" / "all pages"
- "multiple" (components, systems, pages)
- "entire" (system, application, codebase)
- > 8 subtasks mentioned
- > 3 user personas
- "frontend and backend"
- "database migration"
- "breaking changes"

## Detection Logic

Count complexity signals in user responses:

### Signal Checklist

- [ ] Multiple components (>2)
- [ ] Multiple user personas (>1)
- [ ] Cross-system changes (frontend + backend)
- [ ] Database schema changes
- [ ] Breaking API changes
- [ ] > 8 subtasks described
- [ ] Description >500 chars in any section

**If 2+ signals → Recommend breakdown**

## Breakdown Recommendation Format

```
⚠️ **Atomicity Warning**

This ticket is too large for a single unit of work.

**Complexity detected:**
- {signal-1}
- {signal-2}
- {signal-3}

**Recommendation:**
{breakdown-strategy}

What would you like to do?
```

## Breakdown Strategies

### Strategy 1: Convert to Epic

```
Create this as an **Epic** with child items:

1. Item: {Component A} - {specific change}
2. Item: {Component B} - {specific change}
3. Item: {Component C} - {specific change}
...

Shall I help you create the epic instead?
```

### Strategy 2: Narrow Scope

```
Focus this ticket on a smaller scope:

**Option 1:** {specific-component-or-feature}
**Option 2:** {different-specific-scope}
**Option 3:** {another-narrow-scope}

Defer the rest to future tickets. Which option?
```

### Strategy 3: Parent + Children

```
Create parent {task/story}:
- Title: {high-level-goal}

With separate child items:
1. {atomic-piece-1}
2. {atomic-piece-2}
3. {atomic-piece-3}

Proceed with this structure?
```

## Example Interventions

### Example 1: Too Many Components

User says: "Update all 15 components to support dark mode"

Response:

```
⚠️ This affects 15 components - too large for one ticket.

Recommendation: Create an Epic with grouped items:
1. Item: Dark mode for Button, Input, Textarea
2. Item: Dark mode for Card, Modal, Dialog
3. Item: Dark mode for Dropdown, Select, Combobox
4. Item: Dark mode for Table, List, Grid
5. Item: Dark mode for remaining components

Proceed with epic creation?
```

### Example 2: Cross-System Complexity

User describes bug affecting frontend + backend + database

Response:

```
⚠️ This spans multiple systems (frontend, backend, database).

Recommendation: Break into separate items:
1. Item: Fix frontend validation logic
2. Item: Update backend API endpoint
3. Item: Add database migration

Each can be worked independently. Create parent task to track?
```

## Unload After Use

After making recommendation and user decides:

- UNLOAD this file
- If creating epic → LOAD epic-rules.md
- If narrowing scope → RELOAD original type-rules.md
- If creating parent → LOAD appropriate type-rules.md
