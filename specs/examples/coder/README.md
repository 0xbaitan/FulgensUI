# @coder Agent Examples

This directory contains reference examples demonstrating the @coder agent workflow for implementing components from architecture plans.

## Available Examples

### 1. Dark Mode Toggle Execution (`130-dark-mode-execution/`)

**Scenario:** Implementing a Toggle component for dark mode support (issue #130, subtask #131)

**Demonstrates:**

- Complete 8-phase TDD workflow
- Phase-based commits (implementation → documentation)
- Auto-fix lint errors with retry
- SOLID principles compliance checking
- User-controlled branch creation
- Coverage reporting without blocking

**Files:**

- `README.md` - High-level execution overview with metrics
- `execution-log.md` - Detailed phase-by-phase terminal output

**Key Learnings:**

- TDD discipline catches edge cases early (keyboard handling, disabled state)
- Auto-fix reduces manual intervention (lint errors fixed automatically)
- Phase-based commits create clean git history
- SOLID checks prevent over-engineering (component stayed minimal at 42 lines)

---

## How to Use These Examples

### As a User (Learning the @coder Agent)

1. **Read README.md first** - Get the high-level overview and metrics
2. **Read execution-log.md** - See exact commands and outputs per phase
3. **Compare with templates** - See how templates were applied in practice
4. **Try it yourself** - Use @coder with a real implementation plan

### As an Agent (Executing Implementation)

1. **Reference structure** - Follow the same 8-phase workflow
2. **Match commit patterns** - Use similar conventional commit messages
3. **Apply SOLID checks** - Verify principles at implementation phase
4. **Report metrics** - Include similar summary at delivery phase

### As a Contributor (Adding New Examples)

**Directory naming:** `{issue-number}-{short-description}/`

**Required files:**

- `README.md` - Overview, metrics, key learnings
- `execution-log.md` - Detailed terminal output per phase

**Optional files:**

- Screenshots of Storybook stories
- Coverage reports
- Git diffs

**Example structure:**

```
specs/examples/coder/{issue}-{name}/
├── README.md                    # High-level summary
├── execution-log.md             # Phase-by-phase log
├── assets/
│   ├── storybook-screenshot.png
│   └── coverage-report.png
└── diffs/
    ├── implementation.diff
    └── documentation.diff
```

---

## Example Scenarios to Add

**Suggested future examples:**

1. **Bug fix execution** (`125-button-hover-bug/`)
   - Demonstrates: TDD for bug reproduction, minimal fix, regression tests
2. **Multi-file component** (`140-dropdown-menu/`)
   - Demonstrates: Multiple components (Dropdown, DropdownItem, DropdownDivider), composition pattern

3. **Hook implementation** (`145-use-local-storage/`)
   - Demonstrates: Custom hook testing with renderHook, edge cases (localStorage unavailable)

4. **Integration with designer plan** (`150-card-component/`)
   - Demonstrates: Reading COMPONENT-PLAN.md from @designer, token mapping, accessibility validation

5. **Refactor phase execution** (`155-button-refactor/`)
   - Demonstrates: Phase 4 refactor when coverage drops below 90%, SOLID improvements

---

## Related Documentation

- **Agent definition:** `.opencode/agents/coder.md`
- **Workflow prompts:** `.opencode/prompts/coder/implementation-workflow.md`
- **TDD patterns:** `.opencode/prompts/coder/tdd-patterns.md`
- **SOLID patterns:** `.opencode/prompts/coder/solid-patterns.md`
- **Code templates:** `.opencode/templates/coder/`

---

## Tips for Effective Examples

**For clarity:**

- Include exact command outputs (not paraphrased)
- Show both successful and failed validation attempts
- Document decision points (e.g., "Why skip refactor phase?")
- Include git commit SHAs and messages

**For realism:**

- Use realistic component/issue names
- Show actual code snippets (not placeholders)
- Include timing metrics (phase duration)
- Document user interactions (approvals, clarifications)

**For learning:**

- Highlight key decision points
- Explain why certain patterns were chosen
- Show before/after for auto-fixes
- Include "Key Learnings" section

---

## Contributing

When adding new examples:

1. Follow existing directory structure
2. Keep README.md concise (<300 lines)
3. Make execution-log.md detailed (show all output)
4. Reference related plans (architecture, design)
5. Include metrics table (time, coverage, files)
6. Add to this index with description

**Questions?** See main documentation in `AGENTS.md` or ask in project discussions.
