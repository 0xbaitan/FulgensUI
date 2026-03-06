# Story Refinement Rules

Load this file when user specifies story type ticket.

## Required Fields

- user_story (As a X, I want Y, So that Z)
- acceptance_criteria (Gherkin format)
- background (optional context)

## Acceptance Criteria Format

Use **Gherkin** (Given/When/Then) for stories.

## User Story Format (Concise)

One line each:

- **As a** [specific user/role] (max 50 chars)
- **I want** [specific action/capability] (max 100 chars)
- **So that** [clear benefit/value] (max 100 chars)

Total: ~250 chars max

## Question Flow

### Phase 1: User & Goal (Always Ask)

1. "Who is the user?" (developer using FulgensUI, end user of apps, etc.)
2. "What do they want to do?" (specific action)
3. "Why? What's the benefit?" (value proposition)

### Phase 2: Acceptance Criteria (Always Ask)

4. "What needs to be true when this is done?"

Guide user to provide 1-3 scenarios in Gherkin format:

```
Given [context/precondition]
When [action/trigger]
Then [expected outcome]
```

### Phase 3: Scope Check (Level 3 Proactive)

5. "Are there edge cases?" (error states, validation, empty states)
6. "What about accessibility?" (keyboard nav, screen readers, ARIA)
7. "Any performance requirements?" (load time, animation smoothness)
8. "Mobile/responsive considerations?"

### Phase 4: Implementation (Level 3 Proactive)

9. "Which components will this affect?"
10. "Any new components needed?"
11. "Dependencies on other stories/tasks?"

## Conciseness Checks

After gathering responses:

- **>3 acceptance criteria?** → Suggest splitting into separate stories
- **Multiple user personas?** → Create separate story per persona
- **>8 subtasks?** → Break into items
- **Affects >3 components?** → Consider epic with child items

## Subtasks (Max 6)

Default subtasks for stories:

- [ ] Design component/feature interface
- [ ] Implement core functionality
- [ ] Write unit tests
- [ ] Write integration tests
- [ ] Update documentation
- [ ] Accessibility review

Adjust based on scope.

## Complexity Signals (Trigger Atomicity Check)

Watch for:

- "all components"
- "entire page"
- "multiple user types"
- ">3 API endpoints"
- "database schema changes"
- "breaking changes"

If detected → SWAP to atomicity-check.md

## Definition of Done (Always Include)

Standard DoD for stories:

- [ ] Functionality implemented
- [ ] Unit tests pass (>90% coverage)
- [ ] Integration tests pass
- [ ] Accessibility audit complete
- [ ] Documentation updated
- [ ] Code review approved

## GitHub Metadata

Generate:

```yaml
github:
  labels:
    - "issue:story"
    - "priority:{user-specified}"
    - "status:backlog"
    - "estimate:{user-specified}" (if provided)
    - "scope:{inferred}"
```

## Template Deviations

Add these sections if valuable:

- **User Personas** - If multiple users, describe each
- **Technical Approach** - If complex implementation
- **API Changes** - If affecting public APIs
