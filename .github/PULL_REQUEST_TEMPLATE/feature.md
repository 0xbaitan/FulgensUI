<!--
  🎯 Feature PR Template
  Use this template for new features (type:feat)
-->

## 🎯 Type & Summary

**Type of change:**

- [ ] ✨ New feature (`type:feat`)

**One-line summary:**

<!-- Provide a concise summary (max 120 chars) that describes what this feature adds -->

---

## 🔗 Related Issues

<!-- Use auto-close syntax to link related issues -->

**Closes:** #
**Relates to:** #

---

## 💥 Breaking Changes

<!-- If this feature introduces breaking changes, describe them here -->

- [ ] ⚠️ This PR introduces breaking changes

<details>
<summary>Breaking change details (if applicable)</summary>

**What breaks:**

<!-- Describe what existing functionality is affected -->

**Migration guide:**

<!-- Provide step-by-step instructions for migrating existing code -->

**Versioning impact:**

<!-- This will trigger a MAJOR version bump -->

</details>

---

## 📝 Changes

### Component Files

<!-- List all component files created or modified -->

- [ ] `packages/core/src/components/ui/{component}/{component}.tsx` - Main component implementation
- [ ] `packages/core/src/components/ui/{component}/index.ts` - Barrel export
- [ ] `packages/core/src/components/ui/{component}/__tests__/{component}.test.tsx` - Test suite

### PandaCSS Recipes & Tokens

<!-- List all recipe and token files created or modified -->

- [ ] `packages/core/src/config/recipes/{component}-recipe.ts` - PandaCSS recipe
- [ ] `packages/core/src/config/semantic-tokens/{component}-semantic-tokens.ts` - Semantic tokens (if needed)

### Storybook

<!-- List all Storybook files created or modified -->

- [ ] `packages/core/src/components/ui/{component}/storybook/{component}.stories.tsx` - Stories
- [ ] `packages/core/src/components/ui/{component}/storybook/{component}.mdx` - Documentation (optional)

### Other Files

<!-- List any other files modified (configs, types, etc.) -->

- [ ]

---

## ✅ CI Validation Checklist

<!-- Confirm all CI checks pass before requesting review -->

- [ ] ✅ **PandaCSS Generation** (`bun run ci:panda`) - No errors
- [ ] ✅ **ESLint** (`bun run ci:lint`) - No warnings or errors
- [ ] ✅ **TypeScript** (`bun run ci:type-check`) - No type errors
- [ ] ✅ **Tests with Coverage** (`bun run ci:test:coverage`) - All tests passing
- [ ] ✅ **Build** (`bun run ci:build`) - Builds successfully
- [ ] ✅ **Storybook Build** (`bun run ci:build-storybook`) - Builds successfully

**Local validation:**

```bash
bun run ci:all  # Run complete CI pipeline locally
```

---

## 🧪 Testing Details

### Test Coverage (Optional)

<!-- Coverage thresholds are DISABLED but metrics are informative -->

**Coverage metrics:**

- Branch: `___%` (informational only)
- Line: `___%` (informational only)
- Function: `___%` (informational only)

### Test Cases Implemented

<!-- List key test cases added -->

- [ ] Component renders correctly
- [ ] All variants render correctly
- [ ] User interactions work (click, hover, focus)
- [ ] Disabled state prevents interaction
- [ ] Accessibility attributes present (ARIA, role, etc.)
- [ ] Keyboard navigation works
- [ ] Edge cases handled (empty values, invalid props, etc.)

### Manual Testing Performed

<!-- Describe manual testing you performed -->

- [ ] Tested in Storybook (all variants)
- [ ] Tested in browser (Chrome, Firefox, Safari)
- [ ] Tested responsive behavior (mobile, tablet, desktop)
- [ ] Tested dark mode (if applicable)
- [ ] Tested keyboard navigation
- [ ] Tested screen reader compatibility (if applicable)

---

## 📚 Documentation

### Storybook Stories

<!-- Describe Storybook stories added -->

- [ ] **Default story** - Shows default variant
- [ ] **All variants** - Shows all recipe variants
- [ ] **Interactive states** - Shows hover/focus/active/disabled
- [ ] **Custom props** - Shows common prop combinations
- [ ] **Playground** - Interactive story with controls

**Storybook link:**

<!-- Add link once deployed -->

`http://localhost:6006/?path=/story/{component}--default`

### Architecture Documentation

<!-- Link to planning documents from agent workflow -->

- [ ] **IMPLEMENTATION-PLAN**: `specs/architecture/{issue}/IMPLEMENTATION-PLAN.md`
- [ ] **COMPONENT-PLAN** (if UI component): `specs/{branch}/{component}/COMPONENT-PLAN.md`

### Other Documentation

<!-- List other docs updated -->

- [ ] Updated `README.md` (if public API changed)
- [ ] Updated `AGENTS.md` (if developer workflow changed)
- [ ] Updated component exports in `packages/core/src/index.ts`

---

## 🏗️ Agent Workflow Integration

<!-- Confirm which agents were used in implementation -->

**Agent workflow used:**

- [ ] `@architect` - Created IMPLEMENTATION-PLAN.md from GitHub issue
- [ ] `@designer` - Created COMPONENT-PLAN.md from Penpot design (if UI component)
- [ ] `@coder` - Executed implementation via 8-phase TDD workflow

**Specs references:**

- Architecture plan: `specs/architecture/{issue}/IMPLEMENTATION-PLAN.md`
- Component plan: `specs/{branch}/{component}/COMPONENT-PLAN.md` (if applicable)

---

## 🎨 Visual Changes

<!-- For UI components, provide visual evidence -->

- [ ] This PR includes visual changes

### Screenshots

<!-- Add screenshots of the component in different states -->
<details>
<summary>Screenshots (click to expand)</summary>

**Default state:**

<!-- Add screenshot -->

**Variants:**

<!-- Add screenshot showing all variants side-by-side -->

**Interactive states:**

<!-- Add screenshot showing hover/focus/active/disabled -->

**Responsive behavior:**

<!-- Add screenshot showing mobile/tablet/desktop -->

</details>

### Storybook Preview

<!-- Once deployed, link to Storybook preview -->

**Storybook link:** `http://localhost:6006/?path=/story/{component}--all-variants`

---

## 🏷️ Suggested Labels

<!-- These labels align with .github/labels.yml -->

**Suggested labels to apply:**

- `type:feat` ✨ (New feature)
- `status:review` 👀 (Ready for code review)
- `estimate:X` 📊 (Story points: 1, 2, 3, 5, 8, 13, 21, 34, 55, 89)
- `scope:core` 📦 (If core package affected)
- `priority:should-have` 🎯 (Or appropriate priority)

**Workflow status:**
Current: `status:review` → Next: `status:qa` → Final: `status:done`

---

## 👀 Reviewer Checklist

<!-- Reviewers should verify these items -->

### Code Quality

- [ ] **TDD compliance** - Tests written before implementation (Red → Green → Refactor)
- [ ] **SOLID principles** - Component follows SRP, OCP, LSP, ISP, DIP
- [ ] **Minimal changes** - Only files in IMPLEMENTATION-PLAN.md modified
- [ ] **No scope creep** - Only implements acceptance criteria from issue
- [ ] **Type safety** - No `any` types, explicit types for props/returns

### Testing

- [ ] **Test coverage** - All code paths tested
- [ ] **Edge cases** - Handles invalid inputs, empty values, edge conditions
- [ ] **Accessibility** - ARIA attributes, keyboard navigation, screen reader support
- [ ] **Regression prevention** - Tests prevent future breakage

### Documentation

- [ ] **Storybook complete** - All variants and states documented
- [ ] **Code comments** - Complex logic explained with comments
- [ ] **Props documented** - TypeScript types serve as documentation
- [ ] **Architecture docs** - IMPLEMENTATION-PLAN.md accurately reflects implementation

### Integration

- [ ] **CI passes** - All 6 checks green
- [ ] **Breaking changes documented** - Migration guide provided if applicable
- [ ] **Dependencies updated** - `package.json` updated if new deps added
- [ ] **Exports updated** - Component exported from `packages/core/src/index.ts`

### Atomicity

- [ ] **Single feature** - PR implements one atomic feature
- [ ] **No refactoring** - No refactoring beyond plan scope
- [ ] **No extra features** - No features beyond acceptance criteria
- [ ] **Independently deployable** - Can be merged and deployed without other PRs

---

## 📝 Additional Notes

<!-- Any other context reviewers should know -->

---

## ✅ Pre-Merge Checklist

<!-- Complete before merging -->

- [ ] All CI checks pass
- [ ] At least one approval from reviewer
- [ ] All review comments addressed
- [ ] Breaking changes documented (if applicable)
- [ ] Storybook stories verified
- [ ] Manual testing completed
- [ ] Architecture docs updated
- [ ] Labels applied correctly
- [ ] Issue will auto-close on merge

---

**Conventional Commit Format:**

```
feat(component): add {feature} with {capability}

Implements acceptance criteria from issue #{number}

BREAKING CHANGE: {description} (if applicable)
```
