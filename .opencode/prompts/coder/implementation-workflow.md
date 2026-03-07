# Implementation Workflow - 8-Phase Process

# Loaded: Phase 0-7 (referenced throughout execution)

# Detailed step-by-step guide for executing IMPLEMENTATION-PLAN.md

version: 1.0

## Overview

This workflow executes an IMPLEMENTATION-PLAN.md created by @architect agent, following strict TDD methodology, SOLID principles, and phase-based commits.

**Total Phases:** 8 (0-7)  
**Typical Duration:** 30-120 minutes depending on complexity  
**Commits:** 2-4 (implementation, docs, validation optional)

---

## Phase 0: Plan Ingestion (5% of work)

### Goal

Understand what to implement, verify plan validity, load dependencies

### Prerequisites

- IMPLEMENTATION-PLAN.md path provided by user
- @architect has created and APPROVED the plan
- Plan validation status is GREEN or YELLOW (RED requires user confirmation)

### Steps

1. **Read Plan File**

   ```bash
   # Verify file exists
   test -f specs/architecture/130/IMPLEMENTATION-PLAN.md && echo "Found" || echo "Missing"
   ```

2. **Parse Frontmatter**
   Extract key metadata:
   - `issue_number` - GitHub issue number
   - `issue_type` - bug, story, task, item
   - `validation.technical_feasibility` - GREEN/YELLOW/RED
   - `validation.atomicity_check` - PASS/FAIL
   - `subtasks` - Array of subtask issue numbers
   - `designer_delegation.required` - true/false
   - `designer_delegation.plan_path` - Path to COMPONENT-PLAN.md

3. **Load SOLID Principles**

   ```
   LOAD: solid-principles.yaml (80 lines)
   ```

4. **Review Acceptance Criteria**
   - Read section 1: Issue Overview
   - Identify testable behaviors
   - Note edge cases mentioned

5. **Check Validation Status**
   - If RED: Warn user, ask to proceed (y/n)
   - If YELLOW: Note warnings, proceed
   - If GREEN: Proceed confidently

6. **Identify File Changes**
   - Section 3: Codebase Analysis
   - Files to Create (list)
   - Files to Modify (list)
   - Files to Delete (list, usually none)

7. **Load Designer Plan (if applicable)**

   ```bash
   # If designer_delegation.required = true
   test -f specs/feature-123/button/COMPONENT-PLAN.md && echo "Loaded"
   ```

   - Read PandaCSS recipe specification
   - Note design tokens and variants
   - Review interactive states

8. **Load Dependencies (if subtasks exist)**

   ```bash
   # If subtasks array not empty
   cat specs/architecture/130/DEPENDENCIES.md
   ```

   - Note execution order
   - Identify critical path
   - Plan subtask sequence

### Context Budget

- coder.md: 150 lines
- solid-principles.yaml: 80 lines
- **Total:** 230 lines

### Output

Confirmation message:

```
✅ Plan loaded successfully

Issue: #130 - Add dark mode toggle to settings
Type: story
Validation: YELLOW (test coverage warning)
Subtasks: 3 (#131, #132, #133)

Files to create: 8
Files to modify: 2
Designer plan: Yes (Toggle component)

Ready to proceed to Phase 1: Branch Setup
```

### Error Handling

- **File not found:** Suggest closest match, offer to run @architect
- **Invalid YAML:** Report parsing errors, suggest manual fix
- **RED validation:** Ask user: "Plan has blockers. Proceed anyway? (y/n)"

---

## Phase 1: Branch Setup (5% of work)

### Goal

Create feature branch following `feat/{issue}-{short-desc}` pattern

### Prerequisites

- Plan ingestion complete
- User ready to start implementation
- Working directory clean (no uncommitted changes)

### Steps

1. **Unload Config**

   ```
   UNLOAD: solid-principles.yaml
   LOAD: commit-strategy.yaml (50 lines)
   ```

2. **Extract Issue Number**
   From plan frontmatter: `issue_number: 130`

3. **Generate Branch Name Suggestion**
   Format: `feat/{issue-number}-{short-description}`

   Examples:
   - Issue #130 "Add dark mode toggle" → `feat/130-dark-mode`
   - Issue #125 "Fix button hover" → `fix/125-button-hover`
   - Issue #142 "Refactor theme provider" → `refactor/142-theme-provider`

4. **Ask User for Branch Name**

   ```
   Suggested branch: feat/130-dark-mode
   Create this branch? (y/n/custom):
   ```

   User responses:
   - `y` or `yes` → Use suggested name
   - `n` or `no` → Abort (user will create manually)
   - Custom input → Use provided name

5. **Validate Branch Name**

   ```bash
   # Check branch doesn't already exist
   git branch --list {branch-name}
   ```

   If exists:
   - Ask: "Branch exists. Switch to it? (y/n)"
   - If yes: `git switch {branch-name}`
   - If no: Abort

6. **Create Branch**

   ```bash
   git checkout -b feat/130-dark-mode
   ```

   Verify creation:

   ```bash
   git branch --show-current
   ```

7. **Optional: Setup Commit**
   If substantial setup work (directory structure, boilerplate):

   ```bash
   mkdir -p src/components/ui/toggle
   git add .
   git commit -m "chore(setup): initialize toggle component implementation"
   ```

   Skip if:
   - Only creating files in Phase 3
   - No directory structure needed
   - Minimal boilerplate

### Context Budget

- coder.md: 150 lines
- commit-strategy.yaml: 50 lines
- **Total:** 200 lines

### Output

```
✅ Branch created: feat/130-dark-mode

Ready to proceed to Phase 2: TDD Red Phase
```

### Error Handling

- **Branch exists:** Offer to switch or abort
- **Uncommitted changes:** Warn user, suggest stash or commit
- **Git command fails:** Report error, suggest manual branch creation

---

## Phase 2: TDD Red Phase - Write Failing Tests (15% of work)

### Goal

Write tests that fail because features don't exist yet

### Prerequisites

- Branch created and checked out
- Plan specifies files to create
- tdd-workflow.yaml loaded

### Steps

1. **Unload Config**

   ```
   UNLOAD: commit-strategy.yaml
   LOAD: tdd-workflow.yaml (70 lines)
   ```

2. **For Each Component/Utility to Create**

   Example: Toggle component

   a. **Read Acceptance Criteria**

   ```
   - [ ] Toggle component in settings allows switching between light/dark modes
   - [ ] Component has checked/unchecked states
   - [ ] Clicking toggles the state
   - [ ] Component is accessible (ARIA switch role)
   ```

   b. **Identify Testable Behaviors**
   - Renders with default unchecked state
   - Renders with checked prop
   - Toggles on click
   - Calls onChange handler
   - Has ARIA switch role
   - Handles disabled state

   c. **Write Test File**
   Use test-template.test.tsx as starting point

   ```typescript
   // src/components/ui/toggle/__tests__/toggle.test.tsx
   import { describe, it, expect, vi } from "vitest";
   import { render, screen, fireEvent } from "@testing-library/react";
   import { Toggle } from "../toggle";

   describe("Toggle", () => {
     describe("Rendering", () => {
       it("renders with default unchecked state", () => {
         render(<Toggle />);
         const toggle = screen.getByRole("switch");
         expect(toggle).toHaveAttribute("aria-checked", "false");
       });

       it("renders with checked prop", () => {
         render(<Toggle checked />);
         const toggle = screen.getByRole("switch");
         expect(toggle).toHaveAttribute("aria-checked", "true");
       });
     });

     describe("User Interaction", () => {
       it("toggles state on click", () => {
         render(<Toggle />);
         const toggle = screen.getByRole("switch");

         fireEvent.click(toggle);
         expect(toggle).toHaveAttribute("aria-checked", "true");

         fireEvent.click(toggle);
         expect(toggle).toHaveAttribute("aria-checked", "false");
       });

       it("calls onChange handler with new state", () => {
         const onChange = vi.fn();
         render(<Toggle onChange={onChange} />);
         const toggle = screen.getByRole("switch");

         fireEvent.click(toggle);
         expect(onChange).toHaveBeenCalledWith(true);
       });
     });

     describe("Edge Cases", () => {
       it("handles disabled state", () => {
         render(<Toggle disabled />);
         const toggle = screen.getByRole("switch");
         expect(toggle).toBeDisabled();
       });

       it("prevents interaction when disabled", () => {
         const onChange = vi.fn();
         render(<Toggle disabled onChange={onChange} />);
         const toggle = screen.getByRole("switch");

         fireEvent.click(toggle);
         expect(onChange).not.toHaveBeenCalled();
       });
     });
   });
   ```

   d. **Run Test**

   ```bash
   bunx vitest run src/components/ui/toggle/__tests__/toggle.test.tsx
   ```

   e. **Verify Failure**
   Expected error: `Cannot find module '../toggle'`
   Or: `Unable to find role 'switch'`

   This is GOOD - test fails because component doesn't exist yet

   f. **Document Expected Failure**
   Note what the error tells us:
   - Component file doesn't exist
   - No implementation yet
   - Tests describe expected behavior

3. **Repeat for All Components/Utilities**
   - Toggle component tests (above)
   - ThemeProvider tests
   - useTheme hook tests
   - storage utility tests

4. **Do NOT Commit Yet**
   Tests should remain uncommitted in failing state
   Will commit with implementation in Phase 3

### Context Budget

- coder.md: 150 lines
- tdd-workflow.yaml: 70 lines
- **Total:** 220 lines

### Output

```
✅ TDD Red Phase complete

Tests written: 4 files
Total test cases: 18
Status: All failing as expected ❌

Failures:
- toggle.test.tsx: Cannot find module '../toggle' (6 tests)
- ThemeProvider.test.tsx: Cannot find module '../ThemeProvider' (5 tests)
- useTheme.test.tsx: Cannot find module '../useTheme' (4 tests)
- storage.test.ts: Cannot find module './storage' (3 tests)

Ready to proceed to Phase 3: TDD Green Phase (Implementation)
```

### Error Handling

- **Test passes unexpectedly:** Error - component shouldn't exist yet
- **Wrong error message:** Review test expectations, adjust assertions

---

## Phase 3: TDD Green Phase - Implement Features (40% of work)

### Goal

Write minimal code to make failing tests pass

### Prerequisites

- All tests written and failing
- Test failure messages reviewed
- Ready to implement

### Steps

1. **Load SOLID Config**

   ```
   Keep: tdd-workflow.yaml (70 lines)
   Re-LOAD: solid-principles.yaml (80 lines)
   ```

2. **For Each Failing Test**

   Example: Toggle component

   a. **Review Failure Message**

   ```
   Cannot find module '../toggle'
   ```

   b. **Create Component File**
   Use component-template.tsx as starting point

   ```typescript
   // src/components/ui/toggle/toggle.tsx
   import { ComponentProps, useState } from "react";
   import { toggle } from "@styled-system/recipes";
   import type { ToggleVariantProps } from "@styled-system/recipes";

   export type { ToggleVariantProps } from "@styled-system/recipes";

   export type ToggleProps = Omit<ComponentProps<"button">, "onChange"> &
     ToggleVariantProps & {
       checked?: boolean;
       onChange?: (checked: boolean) => void;
     };

   export function Toggle({
     checked: controlledChecked,
     onChange,
     disabled,
     ...props
   }: ToggleProps) {
     const [uncontrolledChecked, setUncontrolledChecked] = useState(false);
     const checked = controlledChecked !== undefined
       ? controlledChecked
       : uncontrolledChecked;

     const handleClick = () => {
       if (disabled) return;

       const newChecked = !checked;
       if (controlledChecked === undefined) {
         setUncontrolledChecked(newChecked);
       }
       onChange?.(newChecked);
     };

     return (
       <button
         role="switch"
         aria-checked={checked}
         disabled={disabled}
         onClick={handleClick}
         className={toggle({ ...props })}
         {...props}
       />
     );
   }
   ```

   c. **Create Index Export**

   ```typescript
   // src/components/ui/toggle/index.ts
   export * from "./toggle";
   ```

   d. **Check SOLID Compliance**
   - **Single Responsibility:** ✅ Toggle only manages toggle state
   - **Open/Closed:** ✅ Extended via props (checked, onChange, disabled)
   - **Liskov:** ✅ All button props accepted
   - **Interface Segregation:** ✅ All required props used
   - **Dependency Inversion:** ✅ No hardcoded dependencies
   - **Minimal Changes:** ✅ Only files in plan created

   e. **Run Tests**

   ```bash
   bunx vitest run src/components/ui/toggle/__tests__/toggle.test.tsx
   ```

   f. **Verify Tests Pass**
   Expected: All 6 tests pass ✅

   g. **Run All Tests (Check Regressions)**

   ```bash
   bun run ci:test
   ```

   Ensure no existing tests broke

3. **Create PandaCSS Recipe**

   ```typescript
   // src/components/ui/toggle/config/toggle-recipe.ts
   import { defineRecipe } from "@pandacss/dev";

   export const toggle = defineRecipe({
     className: "toggle",
     base: {
       display: "inline-flex",
       alignItems: "center",
       cursor: "pointer",
       // ... recipe definition from designer plan
     },
     variants: {
       size: {
         sm: { width: "32px", height: "18px" },
         md: { width: "44px", height: "24px" },
       },
     },
     defaultVariants: {
       size: "md",
     },
   });
   ```

4. **Update Config Exports**

   ```typescript
   // src/config/recipes.ts
   export { toggle } from "../components/ui/toggle/config/toggle-recipe";
   ```

5. **Repeat for All Components**
   Continue until all tests pass

6. **Final Test Run**

   ```bash
   bun run ci:test:coverage
   ```

   Check coverage report

7. **Review Against Minimal Changes**
   - Only files from IMPLEMENTATION-PLAN.md created? ✅
   - No refactoring of existing code? ✅
   - Following existing patterns? ✅
   - No bonus features? ✅

8. **Commit Implementation**

   ```bash
   git add .
   git commit -m "feat(toggle): implement toggle component with variants

   Implements toggle component with controlled/uncontrolled states,
   accessibility (ARIA switch), and disabled handling.

   Files added:
   - src/components/ui/toggle/toggle.tsx
   - src/components/ui/toggle/index.ts
   - src/components/ui/toggle/config/toggle-recipe.ts
   - src/components/ui/toggle/__tests__/toggle.test.tsx

   Closes #131"
   ```

### Context Budget

- coder.md: 150 lines
- tdd-workflow.yaml: 70 lines
- **Total:** 220 lines

### Output

```
✅ TDD Green Phase complete

Implementation: Complete
Tests: 18/18 passing ✅
Coverage: 95% branch, 96% line
SOLID Compliance: ✅
Minimal Changes: ✅

Committed: feat(toggle): implement toggle component with variants

Ready to proceed to Phase 4: TDD Refactor Phase
```

---

## Phase 4: TDD Refactor Phase - Improve Code (10% of work)

### Goal

Refactor code without changing behavior (only if coverage ≥90%)

### Prerequisites

- All tests passing
- Coverage ≥90%
- No obvious code smells acceptable (skip refactor if code is clean)

### Steps

1. **Check Coverage**

   ```bash
   bun run ci:test:coverage
   ```

   If coverage <90%: SKIP this phase
   If coverage ≥90%: Proceed

2. **Identify Refactoring Opportunities**
   Look for:
   - Duplicated logic
   - Complex conditionals
   - Long functions (>20 lines)
   - Unclear variable names
   - Violations of SOLID principles

3. **Apply Refactorings**
   Example: Extract state logic to hook

   Before:

   ```typescript
   // toggle.tsx has internal state logic mixed with UI
   ```

   After:

   ```typescript
   // Extract to useToggleState.ts
   function useToggleState(checked, onChange) {
     const [internal, setInternal] = useState(false);
     const current = checked !== undefined ? checked : internal;

     const toggle = () => {
       const next = !current;
       if (checked === undefined) setInternal(next);
       onChange?.(next);
     };

     return [current, toggle];
   }

   // toggle.tsx uses hook
   const [checked, toggleChecked] = useToggleState(controlledChecked, onChange);
   ```

4. **Run Tests After EACH Refactor**

   ```bash
   bunx vitest run src/components/ui/toggle/__tests__/toggle.test.tsx
   ```

   If tests fail: STOP, revert refactor

5. **Verify All Tests Still Pass**

   ```bash
   bun run ci:test
   ```

6. **Commit Refactor (if substantial)**

   ```bash
   git add .
   git commit -m "refactor(toggle): extract state logic to custom hook"
   ```

   Skip commit if refactoring was minimal

### Context Budget

- coder.md: 150 lines
- tdd-workflow.yaml: 70 lines
- **Total:** 220 lines

### Output (if refactoring done)

```
✅ TDD Refactor Phase complete

Refactorings applied: 2
Tests: 18/18 still passing ✅
Coverage: Maintained at 95%

Committed: refactor(toggle): extract state logic to custom hook

Ready to proceed to Phase 5: Documentation
```

### Output (if skipped)

```
⏭️ TDD Refactor Phase skipped

Reason: Code is clean, no refactoring needed
Coverage: 95% (threshold met)

Ready to proceed to Phase 5: Documentation
```

---

## Phase 5: Documentation (10% of work)

### Goal

Write Storybook stories and documentation

### Prerequisites

- Implementation complete
- Tests passing
- Component exported from index.ts

### Steps

1. **Unload Configs**

   ```
   UNLOAD: tdd-workflow.yaml, solid-principles.yaml
   Keep: coder.md (150 lines only)
   ```

2. **Create Storybook Story**
   Use story-template.stories.tsx as starting point

   ```typescript
   // src/components/ui/toggle/storybook/toggle.stories.tsx
   import type { Meta, StoryObj } from "@storybook/react";
   import { Toggle } from "../toggle";

   const meta = {
     title: "Components/Toggle",
     component: Toggle,
     tags: ["autodocs"],
     argTypes: {
       checked: {
         control: "boolean",
         description: "Controlled checked state",
       },
       onChange: {
         action: "changed",
         description: "Callback when toggle state changes",
       },
       disabled: {
         control: "boolean",
         description: "Disable toggle interaction",
       },
       size: {
         control: "select",
         options: ["sm", "md"],
         description: "Toggle size variant",
       },
     },
   } satisfies Meta<typeof Toggle>;

   export default meta;
   type Story = StoryObj<typeof meta>;

   export const Default: Story = {
     args: {},
   };

   export const Checked: Story = {
     args: {
       checked: true,
     },
   };

   export const Disabled: Story = {
     args: {
       disabled: true,
     },
   };

   export const Small: Story = {
     args: {
       size: "sm",
     },
   };
   ```

3. **Create MDX Documentation (if complex)**

   ```markdown
   # Toggle

   A toggle component for binary on/off states.

   ## Usage

   \`\`\`tsx
   import { Toggle } from "@fulgensui/core";

   function Example() {
   const [checked, setChecked] = useState(false);
   return <Toggle checked={checked} onChange={setChecked} />;
   }
   \`\`\`

   ## Variants

   - **Size:** sm, md

   ## Accessibility

   - Uses ARIA switch role
   - Supports keyboard navigation
   - Screen reader friendly
   ```

4. **Update CHANGELOG.md**

   ```markdown
   ## [Unreleased]

   ### Added

   - Toggle component with controlled/uncontrolled modes (#131)
   - Dark mode theme provider (#130)
   ```

5. **Verify Storybook Builds**

   ```bash
   bun run storybook
   ```

   Check stories render correctly

6. **Commit Documentation**
   ```bash
   git add .
   git commit -m "docs(toggle): add storybook stories and usage examples"
   ```

### Context Budget

- coder.md: 150 lines
- **Total:** 150 lines

### Output

```
✅ Documentation complete

Storybook stories: 4 (Default, Checked, Disabled, Small)
MDX docs: 1
CHANGELOG: Updated

Committed: docs(toggle): add storybook stories and usage examples

Ready to proceed to Phase 6: Validation
```

---

## Phase 6: Validation (10% of work)

### Goal

Run CI validation, auto-fix errors, ensure production-ready

### Prerequisites

- All implementation and documentation complete
- Ready for final validation

### Steps

1. **Load Validation Config**

   ```
   LOAD: validation-rules.yaml (60 lines)
   ```

2. **Run Validation Checks in Order**

   a. **PandaCSS Generation**

   ```bash
   bun run ci:panda
   ```

   If fails: Report error, stop

   b. **Lint Check**

   ```bash
   bun run ci:lint
   ```

   If fails:
   - Auto-fix: `bun run lint --fix`
   - Retry: `bun run ci:lint`
   - If still fails: Report unfixable errors

   c. **Type Check**

   ```bash
   bun run ci:type-check
   ```

   If fails:
   - Parse tsc output
   - Report file paths and error messages
   - Ask user: "How to proceed? (fix/show/skip)"

   d. **Tests with Coverage**

   ```bash
   bun run ci:test:coverage
   ```

   If fails:
   - Report failing tests
   - Show coverage report
   - Ask user: "How to proceed? (fix/show/skip)"

   e. **Build**

   ```bash
   bun run ci:build
   ```

   If fails:
   - Report build errors
   - Check if type-related
   - Ask user for guidance

3. **Auto-Fix Application**
   If lint or format errors auto-fixed:

   ```bash
   git add .
   git commit -m "ci: validate toggle component implementation"
   ```

4. **Final Validation Report**

   ```
   ✅ All CI validations passed!

   - PandaCSS: Generated
   - Lint: Passed (auto-fixed: 3 issues)
   - Type Check: Passed
   - Tests: Passed (18/18)
   - Coverage: 95% branch, 96% line
   - Build: Success

   Ready for commit (if fixes applied)
   ```

### Context Budget

- coder.md: 150 lines
- validation-rules.yaml: 60 lines
- **Total:** 210 lines

### Output (success)

```
✅ CI Validation complete

All checks passed ✅
Auto-fixes applied: 3
Committed: ci: validate toggle component implementation

Ready to proceed to Phase 7: Delivery
```

### Output (failures)

```
❌ CI Validation failed

Failed checks:
- Type Check: 2 errors in ThemeProvider.tsx
- Build: Failed due to type errors

Action required:
1. Review errors above
2. Fix manually or skip validation
3. Re-run validation after fixes

How should I proceed? (fix/show/skip):
```

---

## Phase 7: Delivery (Summary)

### Goal

Summarize work completed, prepare for PR creation

### Prerequisites

- All phases complete
- CI validation passed (or user acknowledged failures)

### Steps

1. **Unload All Configs**

   ```
   UNLOAD: validation-rules.yaml
   Keep: coder.md (150 lines only)
   ```

2. **Generate Summary**

   ```bash
   git log --oneline feat/130-dark-mode ^main
   git diff --stat main...feat/130-dark-mode
   ```

3. **Display Summary to User**

   ```
   ✅ Implementation complete!

   Branch: feat/130-dark-mode
   Issue: #130 - Add dark mode toggle to settings

   Files created: 8
   - src/components/ui/toggle/toggle.tsx
   - src/components/ui/toggle/index.ts
   - src/components/ui/toggle/config/toggle-recipe.ts
   - src/components/ui/toggle/__tests__/toggle.test.tsx
   - src/components/ui/toggle/storybook/toggle.stories.tsx
   - ... (3 more)

   Files modified: 2
   - src/components/index.ts
   - src/config/recipes.ts

   Commits: 3
   - 6a0a3c2 feat(toggle): implement toggle component with variants
   - 8b1d4e5 docs(toggle): add storybook stories and usage examples
   - 9c2e5f6 ci: validate toggle component implementation

   Test coverage: 95% branch, 96% line
   CI validation: All checks passed ✅

   Referenced plans:
   - specs/architecture/130/IMPLEMENTATION-PLAN.md
   - specs/feature-123/toggle/COMPONENT-PLAN.md (designer)
   ```

4. **Suggest Next Steps**

   ```
   Next steps:
   1. Review changes:
      git log --oneline feat/130-dark-mode ^main
      git diff main...feat/130-dark-mode

   2. Push branch to remote:
      git push origin feat/130-dark-mode

   3. Create pull request:
      gh pr create \
        --title "feat: add dark mode toggle to settings" \
        --body "Implements #130

        See implementation plan: specs/architecture/130/IMPLEMENTATION-PLAN.md"

   4. Or use slash command:
      /prepare-commit
   ```

5. **Do NOT Create PR Automatically**
   User handles PR creation manually or via slash commands

### Context Budget

- coder.md: 150 lines
- **Total:** 150 lines

### Output

```
✅ Implementation delivered successfully!

See summary above for details.
User can now review, push, and create PR.

Coder agent work complete. 🎉
```

---

## Subtask Handling

**If IMPLEMENTATION-PLAN.md has subtasks:**

1. After Phase 0, check for `subtasks` array in frontmatter
2. Load DEPENDENCIES.md to determine execution order
3. For each subtask in dependency order:

   ```
   Subtask #131: Toggle Component (2 points)
   Dependencies: None
   Plan: specs/architecture/130/subtask-131.md

   Ready to implement this subtask? (y/n/skip):
   ```

   If yes:
   - Load subtask plan
   - Execute Phases 2-6 for this subtask
   - Commit implementation
   - Move to next subtask

   If skip:
   - Stop and wait for user

   If n:
   - Stop entire workflow

4. After all subtasks complete:
   - Phase 5: Documentation for all components
   - Phase 6: Validation for entire feature
   - Phase 7: Delivery

---

## Error Recovery

**Mid-phase failures:**

- Save progress (staged files)
- Report error with context
- Offer options: fix/retry/skip/abort

**User intervention needed:**

- Pause workflow
- Wait for user action
- Resume from same phase

**Critical failures:**

- Stop immediately
- Report issue
- Suggest manual resolution
- Offer to abort or wait

---

## Summary

This 8-phase workflow provides a systematic approach to implementing features from architectural specifications, ensuring quality through TDD, maintainability through SOLID principles, and traceability through phase-based commits.

**Key Principles:**

- Test first, always
- Minimal changes only
- Phase-complete commits
- Auto-fix when possible
- User controls critical decisions

**Typical Flow:**
Plan → Branch → Tests → Implement → Refactor → Document → Validate → Deliver
