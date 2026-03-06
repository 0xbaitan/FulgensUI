# Output Format Examples

This guide shows EXACTLY what I'll generate for you. Each section maps to ONE field in the GitHub Issue Form.

**How to use these outputs:**

1. I generate field-by-field copyable blocks
2. You copy each block (click inside, Ctrl+A, Ctrl+C)
3. You paste into the corresponding GitHub field
4. Repeat for all fields
5. Submit the issue

---

## 🐛 Bug Report Example

### Full Output You'll Receive

---

#### 📋 TITLE

Use this as your title (keep the "[Bug]:" prefix):

```
[Bug]: Button hover state not working on mobile Safari
```

**Instruction:** Paste this directly into the title field

---

#### 📋 Metadata: Priority

```
Select: must-have
```

**Where:** First dropdown in "⚙️ Metadata Fields" section

---

#### 📋 Metadata: Estimate

```
Select: 5
```

**Note:** 5 points = 1 week of work

**Where:** Second dropdown in "⚙️ Metadata Fields" section

---

#### 📋 Metadata: Blocked By

```
Leave blank
```

**Where:** "Blocked By" text input in "⚙️ Metadata Fields" section

---

#### 📋 Metadata: Parent Issue

```
Leave blank
```

**Where:** "Parent Issue" text input in "⚙️ Metadata Fields" section

---

#### 📋 Field: Feature

Copy this into the "Feature" field:

```
Button component - hover state
```

---

#### 📋 Field: Scenario

Copy this into the "Scenario" field:

```
1. Open demo site on iOS Safari (https://fulgensui.dev)
2. Navigate to Button component page
3. Tap any primary button
4. Observe no visual feedback on touch
```

---

#### 📋 Field: Expected Behavior

Copy this into the "Expected Behavior" field:

```
Button should show active state with darker background color on tap/press
```

---

#### 📋 Field: Actual Behavior

Copy this into the "Actual Behavior" field:

```
No visual feedback appears. Button looks identical in pressed state. The :active pseudo-class does not trigger on iOS Safari.
```

---

#### 📋 Field: Environment

Copy this into the "Environment" field:

```
- Browser: Safari 16 on iOS 16.3
- Device: iPhone 14
- Package: @fulgensui/core@1.2.0
- Build: Production
```

---

#### 📋 Field: Subtasks

Copy this into the "Subtasks" field:

```markdown
- [ ] Investigate touch event handling on iOS Safari
- [ ] Test :active pseudo-class behavior
- [ ] Implement fix (likely touch-action CSS or JS touchstart event)
- [ ] Add regression test for mobile Safari
- [ ] Verify on iOS 15, 16, 17
```

---

#### 📋 ATTACHMENTS

Upload these files you mentioned:

- `screenshot-button-mobile.png`
- `console-error.txt`

**How:** Drag files into any textarea field (like "Feature" or "Scenario") or use the attachment button at the bottom of the form

---

### Labels That Will Be Applied Automatically

```
status:backlog
issue:bug
priority:must-have
scope:core
estimate:5
```

You don't manually add these - GitHub applies them based on your metadata selections!

---

## 📖 Story Example

### Full Output You'll Receive

---

#### 📋 TITLE

Use this as your title (keep the "[Story]:" prefix):

```
[Story]: Add keyboard navigation to Dropdown component
```

---

#### 📋 Metadata: Priority

```
Select: should-have
```

---

#### 📋 Metadata: Estimate

```
Select: 8
```

**Note:** 8 points = 1.5 weeks of work

---

#### 📋 Metadata: Blocked By

```
Leave blank
```

---

#### 📋 Metadata: Parent Issue

```
Leave blank
```

---

#### 📋 Field: User Story

Copy this into the "User Story" field:

```
As a keyboard-only user,
I want to navigate Dropdown options using arrow keys and select with Enter,
So that I can use the component without a mouse.
```

---

#### 📋 Field: Acceptance Criteria

Copy this into the "Acceptance Criteria" field:

```markdown
### Scenario: Open dropdown with keyboard

**Given** I have focus on the Dropdown trigger button
**When** I press Enter or Space
**Then** The dropdown menu opens and first option receives focus

### Scenario: Navigate options with arrow keys

**Given** The dropdown menu is open
**When** I press ArrowDown
**Then** Focus moves to the next option (wrapping to first after last)

**When** I press ArrowUp
**Then** Focus moves to the previous option (wrapping to last after first)

### Scenario: Select option with Enter

**Given** An option has focus
**When** I press Enter
**Then** The option is selected, menu closes, and focus returns to trigger

### Scenario: Close menu with Escape

**Given** The dropdown menu is open
**When** I press Escape
**Then** The menu closes and focus returns to trigger without selecting

### Scenario: Type-ahead search

**Given** The dropdown menu is open
**When** I type "ap" quickly (within 500ms)
**Then** Focus jumps to the first option starting with "ap" (e.g., "Apple")
```

---

#### 📋 Field: Background

Copy this into the "Background" field:

```
Current Dropdown component only supports mouse/touch interaction. Users relying on keyboard navigation cannot use this component, violating WCAG 2.1 Level AA (2.1.1 Keyboard).

Design reference: https://penpot.app/file/xyz123
ARIA reference: https://www.w3.org/WAI/ARIA/apg/patterns/listbox/
```

---

#### 📋 Field: Subtasks

Copy this into the "Subtasks" field:

```markdown
- [ ] Review ARIA Authoring Practices Guide for Listbox pattern
- [ ] Implement keyboard event handlers (ArrowUp, ArrowDown, Enter, Escape)
- [ ] Add focus management logic with focus trap
- [ ] Implement type-ahead search with 500ms debounce
- [ ] Test with screen readers (VoiceOver on Mac, NVDA on Windows)
- [ ] Update Storybook with keyboard interaction examples
- [ ] Add unit tests for keyboard event handlers
- [ ] Update documentation with keyboard shortcuts table
```

---

#### 📋 ATTACHMENTS

No attachments for this story.

---

### Labels That Will Be Applied Automatically

```
status:backlog
issue:story
priority:should-have
scope:core
estimate:8
```

---

## ✅ Item Example

### Full Output You'll Receive

---

#### 📋 TITLE

Use this as your title (keep the "[Item]:" prefix):

```
[Item]: Update README with Bun installation instructions
```

---

#### 📋 Metadata: Priority

```
Select: should-have
```

---

#### 📋 Metadata: Estimate

```
Select: 1
```

**Note:** 1 point = 1 day

---

#### 📋 Metadata: Blocked By

```
Leave blank
```

---

#### 📋 Metadata: Parent Issue

```
Enter: #890
```

**Note:** This Item is part of Epic #890 "Standardize on Bun"

**Where:** Type `#890` into the "Parent Issue" text input

---

#### 📋 Field: Description

Copy this into the "Description" field:

```
Update root README.md to reflect Bun-based installation process and remove all references to npm/yarn.
```

---

#### 📋 Field: Acceptance Criteria

Copy this into the "Acceptance Criteria" field:

```markdown
- [ ] Replace all npm/yarn commands with bun equivalents (bun install, bun run, etc.)
- [ ] Add note about Bun version requirement (>=1.3.0)
- [ ] Update "Getting Started" section with clear installation steps
- [ ] Update "Available Scripts" section with bun commands
- [ ] Verify all links still work after changes
- [ ] Preview markdown locally to ensure formatting is correct
```

---

#### 📋 Field: Notes

Copy this into the "Notes" field:

```
Keep the README concise - users just need the quick start. Link to full documentation site for detailed instructions. Use code blocks for all commands.
```

---

#### 📋 Field: Subtasks

```
Leave blank
```

**Note:** Acceptance criteria already covers all the work for this small Item

---

#### 📋 ATTACHMENTS

No attachments for this item.

---

### Labels That Will Be Applied Automatically

```
status:backlog
issue:item
priority:should-have
scope:none
estimate:1
has-parent
```

**Note:** The `has-parent` label is applied because you entered a value in "Parent Issue"

---

## 🎯 Epic Example

### Full Output You'll Receive

---

#### 📋 TITLE

Use this as your title (keep the "[Epic]:" prefix):

```
[Epic]: Build accessible form system
```

---

#### 📋 Metadata: Priority

```
Select: must-have
```

---

#### 📋 Metadata: Estimate

```
Leave blank
```

**Important:** Epics are NOT estimated! Child Items will have individual estimates. The total effort = sum of all child Items.

---

#### 📋 Metadata: Blocked By

```
Leave blank
```

---

#### 📋 Metadata: Parent Issue

```
Leave blank
```

---

#### 📋 Field: Goal

Copy this into the "Goal" field:

```
Create a comprehensive, accessible form system that supports validation, error handling, and complex layouts while meeting WCAG 2.1 AA standards.
```

---

#### 📋 Field: Stakeholder

Copy this into the "Stakeholder" field:

```
Product team needs this for the upcoming admin dashboard redesign (Q2 2026). Current form components lack validation and accessibility features, causing user frustration and accessibility audit failures.
```

---

#### 📋 Field: Feature

Copy this into the "Feature" field:

```
Form system including Input, Textarea, Select, Checkbox, and Radio components with built-in client-side validation, error message display, and full keyboard/screen reader support.
```

---

#### 📋 Field: Scope & Deliverables

Copy this into the "Scope & Deliverables" field:

```markdown
## In Scope

- Form field components (Input, Textarea, Select, Checkbox, Radio, RadioGroup)
- Client-side validation system (required, email, length, regex, custom)
- Error message display patterns
- Form layout utilities (inline, stacked, grid)
- Accessibility features (ARIA labels, keyboard navigation, focus management)
- Comprehensive documentation with 10+ real-world examples
- Storybook stories for all components and variants

## Out of Scope

- Server-side validation (users implement in their backend)
- Form state management library (users choose their own: React Hook Form, Formik, etc.)
- File upload components (separate Epic planned for Q3)
- Multi-step form wizards (future consideration)
- Payment form components (PCI compliance concerns)
```

---

#### 📋 Field: Milestones

Copy this into the "Milestones" field:

```markdown
1. **Foundation** (Week 1-2)
   - Design validation system architecture
   - Create base FormField component with error display
   - Define ARIA patterns for all field types

2. **Core Text Fields** (Week 3-5)
   - Implement Input component with validation
   - Implement Textarea component
   - Implement Select/Dropdown component
   - Integration tests for validation

3. **Selection Fields** (Week 6-7)
   - Implement Checkbox component
   - Implement Radio and RadioGroup components
   - Handle group validation scenarios

4. **Polish & Documentation** (Week 8)
   - Write comprehensive documentation
   - Create 10+ real-world form examples
   - External accessibility audit
   - Performance optimization for large forms
```

---

#### 📋 Field: Child Issues

Copy this into the "Child Issues" field:

```markdown
- [ ] Item: Design validation system architecture (3 points)
- [ ] Item: Create base FormField component (5 points)
- [ ] Item: Implement Input component with validation (5 points)
- [ ] Item: Implement Textarea component (3 points)
- [ ] Item: Implement Select component (5 points)
- [ ] Item: Implement Checkbox component (3 points)
- [ ] Item: Implement Radio and RadioGroup components (5 points)
- [ ] Item: Write comprehensive documentation (3 points)
- [ ] Item: External accessibility audit (2 points)
```

**Important:** After creating this Epic, create each of these as separate Item tickets. In each Item's "Parent Issue" metadata field, enter the Epic's issue number (e.g., `#100`).

**Estimated total:** ~34 points (6-7 weeks)

---

#### 📋 ATTACHMENTS

Upload if you have them:

- Architecture diagram
- Design mockups
- Stakeholder requirements doc

---

### Labels That Will Be Applied Automatically

```
status:backlog
issue:epic
priority:must-have
scope:core
```

**Note:** No estimate label because Epics aren't estimated!

---

## 🔧 Task Example

### Full Output You'll Receive

---

#### 📋 TITLE

Use this as your title (keep the "[Task]:" prefix):

```
[Task]: Migrate PandaCSS config to v0.40 format
```

---

#### 📋 Metadata: Priority

```
Select: should-have
```

---

#### 📋 Metadata: Estimate

```
Select: 5
```

**Note:** 5 points = 1 week of work

---

#### 📋 Metadata: Blocked By

```
Enter: #567
```

**Note:** Can't migrate config until we upgrade PandaCSS itself (Task #567)

---

#### 📋 Metadata: Parent Issue

```
Leave blank
```

---

#### 📋 Field: Technical Context

Copy this into the "Technical Context" field:

```
PandaCSS v0.40 introduces a new consolidated config format that merges tokens, semanticTokens, and recipes into a single file structure. Our current config is spread across 5 files in src/config/, making it hard to maintain and preventing us from using new tree-shaking features.
```

---

#### 📋 Field: Implementation Approach

Copy this into the "Implementation Approach" field:

```markdown
1. Create new panda.config.ts in project root
2. Migrate src/config/tokens.ts → theme.tokens section
3. Migrate src/config/semantic-tokens.ts → theme.semanticTokens section
4. Migrate src/config/recipes/\*.ts → theme.recipes section
5. Update all import paths in components (search for @config/\* imports)
6. Run panda codegen to regenerate styled-system
7. Verify no visual regressions in Storybook
8. Remove old config files
9. Update documentation
```

---

#### 📋 Field: Dependencies

Copy this into the "Dependencies" field:

```
- Blocked by Task #567: Upgrade PandaCSS to v0.40 (must be completed first)
- Requires: Node.js >= 18, Bun >= 1.3.0
```

---

#### 📋 Field: Test Criteria

Copy this into the "Test Criteria" field:

```markdown
- [ ] All components render identically (run visual regression tests in Storybook)
- [ ] Build succeeds without warnings (bun run build)
- [ ] Type checking passes (bun run type-check)
- [ ] Storybook builds successfully (bun run build-storybook)
- [ ] Bundle size reduced by at least 10% (check build output)
- [ ] All tests pass (bun run test)
- [ ] No console errors in dev or production mode
```

---

#### 📋 Field: Subtasks

Copy this into the "Subtasks" field:

```markdown
- [ ] Create new panda.config.ts structure
- [ ] Migrate tokens
- [ ] Migrate semantic tokens
- [ ] Migrate recipes
- [ ] Update component imports
- [ ] Regenerate styled-system
- [ ] Run visual regression tests
- [ ] Update documentation
```

---

#### 📋 ATTACHMENTS

No attachments needed for this task.

---

### Labels That Will Be Applied Automatically

```
status:backlog
issue:task
priority:should-have
scope:core
estimate:5
blocked
```

**Note:** The `blocked` label is applied because you entered a value in "Blocked By"

---

## General Tips for All Output Types

### How to Copy Each Block Efficiently

1. **Click once inside the code block**
2. **Select all:**
   - Windows/Linux: `Ctrl + A`
   - Mac: `Cmd + A`
   - Or triple-click to select all
3. **Copy:**
   - Windows/Linux: `Ctrl + C`
   - Mac: `Cmd + C`
4. **Navigate to GitHub field**
5. **Paste:**
   - Windows/Linux: `Ctrl + V`
   - Mac: `Cmd + V`

### Field Order in GitHub Forms

The fields appear in this order (varies slightly by type):

1. **Title** (top of page)
2. **⚙️ Metadata Fields** section:
   - Priority (dropdown)
   - Estimate (dropdown)
   - Blocked By (text input)
   - Parent Issue (text input)
3. **📝 Issue Details** section:
   - [Type-specific fields like Feature, Scenario, User Story, etc.]
   - Subtasks (last field)

### Common Mistakes to Avoid

❌ **Don't paste into wrong field** - Read the field label carefully
❌ **Don't include the code fence** (```) - Only paste content inside
❌ **Don't skip metadata fields** - Priority is required!
✅ **Keep the "[Type]:" prefix** in the title (e.g., "[Bug]: Button hover broken")

### Mobile Users

If using mobile:

- Fields may be smaller/harder to navigate
- Consider using desktop for first few tickets until familiar
- Copy-paste still works the same way

---

## Need Help?

If you're unsure which field to paste into:

- Look for the 📋 section header in my output
- Match it to the field label in GitHub form
- Field names are EXACTLY the same

Example:

```
📋 Field: Scenario
```

→ Look for "Scenario" field in GitHub form

Still confused? Just ask me during our conversation! 😊
