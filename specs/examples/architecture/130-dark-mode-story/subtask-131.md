---
type: subtask_plan
parent_issue: 130
subtask_issue: 131
subtask_title: "Create Toggle component"
dependencies: []
estimate: 2
status: "PENDING"
created_at: "2026-03-06T11:15:00Z"
---

# Subtask Plan: Create Toggle component

> **Parent Issue:** #130  
> **Subtask Issue:** #131  
> **Dependencies:** None  
> **Estimate:** 2 points  
> **Status:** PENDING

---

## 1. Goal

Create a reusable Toggle component following the Penpot design specifications for use in dark mode settings.

**Context:**
This is the foundation component for the dark mode feature. It provides the UI interaction for switching themes. The ThemeProvider (subtask #132) will consume this component.

---

## 2. Acceptance Criteria

From GitHub issue #131:

- [ ] Toggle component renders with on/off states
- [ ] Clicking toggle switches state
- [ ] Supports controlled and uncontrolled modes
- [ ] Matches Penpot design (48x24px switch, 20x20px knob)
- [ ] Smooth transition (0.2s ease-in-out)
- [ ] ARIA switch pattern implemented
- [ ] Keyboard accessible (Space/Enter to toggle)
- [ ] Focus indicator visible (WCAG AA)
- [ ] Storybook story created with examples

**Definition of Done:**

- [ ] All acceptance criteria met
- [ ] Tests passing (>90% coverage)
- [ ] Code reviewed
- [ ] Documentation updated

---

## 3. Dependencies

**Blocked By:**
None - can start immediately

**Blocks:**

- Issue #132: Theme Provider
  - **Why:** ThemeProvider will use Toggle component in settings UI

---

## 4. Files to Modify

### Create

**packages/core/src/components/ui/toggle/toggle.tsx**

- **Purpose:** Main Toggle component with controlled/uncontrolled modes
- **Key exports:** `Toggle`, `ToggleProps`
- **Estimated lines:** 60

**packages/core/src/components/ui/toggle/index.ts**

- **Purpose:** Barrel export
- **Key exports:** Re-exports from toggle.tsx
- **Estimated lines:** 2

**packages/core/src/components/ui/toggle/config/toggle-recipe.ts**

- **Purpose:** PandaCSS recipe for Toggle styles
- **Key exports:** `toggle` recipe
- **Estimated lines:** 80

**packages/core/src/components/ui/toggle/**tests**/toggle.test.tsx**

- **Purpose:** Unit tests for Toggle component
- **Key exports:** Test suite
- **Estimated lines:** 120

**packages/core/src/components/ui/toggle/storybook/toggle.stories.tsx**

- **Purpose:** Storybook stories
- **Key exports:** Toggle stories
- **Estimated lines:** 50

### Modify

**packages/core/src/components/index.ts**

- **Changes needed:**
  - Add `export * from './ui/toggle'`
- **Impact:** Makes Toggle available as `@fulgensui/core/components/toggle`

**packages/core/src/config/recipes.ts**

- **Changes needed:**
  - Import toggle recipe
  - Export in recipes object
- **Impact:** Makes toggle recipe available to PandaCSS

### Delete

None

---

## 5. Implementation Steps

### Step 1: Create PandaCSS recipe

**Action:** Create `packages/core/src/components/ui/toggle/config/toggle-recipe.ts`

**Code pattern:**

```typescript
import { defineRecipe } from "@pandacss/dev";

export const toggle = defineRecipe({
  className: "toggle",
  base: {
    // From Penpot: 48x24px switch
    width: "48px",
    height: "24px",
    // ... (rest of base styles)
  },
  variants: {
    checked: {
      true: { bg: "colors.primary.500" },
      false: { bg: "colors.neutral.200" },
    },
  },
});
```

**Verification:**

- [ ] Recipe exports correctly
- [ ] Matches Penpot measurements

---

### Step 2: Create Toggle component

**Action:** Create `packages/core/src/components/ui/toggle/toggle.tsx`

**Code pattern:**

```typescript
import { ComponentProps, useState } from 'react'
import { toggle } from './config/toggle-recipe'

export type ToggleProps = ComponentProps<'button'> & {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export function Toggle({
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  ...props
}: ToggleProps) {
  const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked)
  const checked = controlledChecked ?? uncontrolledChecked

  const handleClick = () => {
    const newChecked = !checked
    if (controlledChecked === undefined) {
      setUncontrolledChecked(newChecked)
    }
    onCheckedChange?.(newChecked)
  }

  return (
    <button
      role="switch"
      aria-checked={checked}
      className={toggle({ checked })}
      onClick={handleClick}
      {...props}
    />
  )
}
```

**Verification:**

- [ ] Controlled mode works
- [ ] Uncontrolled mode works
- [ ] ARIA attributes present

---

### Step 3: Create barrel export

**Action:** Create `packages/core/src/components/ui/toggle/index.ts`

**Code:**

```typescript
export * from "./toggle";
```

---

### Step 4: Write tests

**Action:** Create `packages/core/src/components/ui/toggle/__tests__/toggle.test.tsx`

**Test cases:**

- Render test
- Controlled mode
- Uncontrolled mode
- Keyboard interaction (Space, Enter)
- ARIA attributes
- onCheckedChange callback

---

### Step 5: Create Storybook story

**Action:** Create `packages/core/src/components/ui/toggle/storybook/toggle.stories.tsx`

**Stories:**

- Default (uncontrolled)
- Controlled
- Disabled
- With label

---

### Step 6: Update exports

**Action:** Update `packages/core/src/components/index.ts` and `packages/core/src/config/recipes.ts`

---

## 6. Test Checklist

### Unit Tests

**File:** `packages/core/src/components/ui/toggle/__tests__/toggle.test.tsx`

**Test cases:**

- [ ] Renders with default props
  - **Given:** Toggle component
  - **When:** Rendered without props
  - **Then:** Displays in unchecked state

- [ ] Toggles on click (uncontrolled)
  - **Given:** Uncontrolled Toggle
  - **When:** User clicks
  - **Then:** State changes, callback fires

- [ ] Respects controlled value
  - **Given:** Controlled Toggle with checked=true
  - **When:** User clicks
  - **Then:** callback fires but UI doesn't change until prop updates

- [ ] Keyboard interaction
  - **Given:** Focused Toggle
  - **When:** User presses Space or Enter
  - **Then:** Toggle switches state

- [ ] ARIA attributes
  - **Given:** Toggle in any state
  - **When:** Inspected
  - **Then:** Has role="switch" and aria-checked

### Integration Tests

None required (standalone component)

### Manual Testing

- [ ] Visual appearance matches Penpot
- [ ] Smooth transition (0.2s)
- [ ] Focus indicator visible
- [ ] Works with keyboard only
- [ ] Screen reader announces correctly

---

## 7. Definition of Done

**Code Complete:**

- [ ] All implementation steps complete
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Follows button/ component structure

**Testing Complete:**

- [ ] All unit tests passing
- [ ] Coverage ≥90%
- [ ] Manual testing complete

**Documentation Complete:**

- [ ] Storybook story created
- [ ] Props documented in TypeScript

**Quality Checks:**

- [ ] `bun run type-check` passes
- [ ] `bun run lint` passes
- [ ] `bun run ci:all` passes
- [ ] Self-review complete

**Ready for Review:**

- [ ] All acceptance criteria met
- [ ] Can be demonstrated in Storybook

---

## 8. Implementation Notes

### Key Considerations

**Controlled vs Uncontrolled**

- Support both patterns (like input elements)
- Use `checked` prop for controlled
- Use `defaultChecked` for uncontrolled

**ARIA Pattern**

- Must use `role="switch"`
- Must include `aria-checked` attribute
- Should support keyboard (Space/Enter)

### Gotchas

**PandaCSS conditional styles**

- Use `checked` variant, not `data-checked`
- PandaCSS will generate correct classes

**Focus management**

- Use native `<button>` for automatic focus support
- Don't use `<div>` (accessibility issue)

### Tips

**Testing controlled components**

- Test that internal state doesn't change when controlled
- Verify callback fires but UI unchanged until prop updates

### Related Code

**Similar patterns:**

- packages/core/src/components/ui/button/button.tsx - Component structure
- packages/core/src/components/ui/checkbox/checkbox.tsx - Toggle-like interaction

---

## 9. Progress Tracking

**Started:** {DATE}  
**Last Updated:** {DATE}  
**Completed:** {DATE}

**Blockers:**
None

---

## References

- Parent Plan: [IMPLEMENTATION-PLAN.md](IMPLEMENTATION-PLAN.md)
- GitHub Issue: https://github.com/0xbaitan/FulgensUI/issues/131
- Designer Plan: [toggle/COMPONENT-PLAN.md](toggle/COMPONENT-PLAN.md)
- ARIA Switch: https://www.w3.org/WAI/ARIA/apg/patterns/switch/
