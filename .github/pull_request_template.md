<!--
  ℹ️ Using Default PR Template

  For specialized templates, add ?template={name} to your PR URL:
  - ?template=feature.md - New features (type:feat)
  - ?template=bugfix.md - Bug fixes (type:fix)
  - ?template=docs.md - Documentation (type:docs)
  - ?template=refactor.md - Refactoring (type:refactor)
  - ?template=performance.md - Performance improvements (type:perf)
  - ?template=chore.md - Maintenance (type:chore, type:build, type:ci, type:test)

  Example: https://github.com/0xbaitan/FulgensUI/compare/main...your-branch?template=bugfix.md
-->

---

## 🎯 Type & Summary

**Type of change:**

- [ ] ✨ New feature (`type:feat`)
- [ ] 🐛 Bug fix (`type:fix`)
- [ ] 📚 Documentation (`type:docs`)
- [ ] 🔄 Refactor (`type:refactor`)
- [ ] ⚡ Performance improvement (`type:perf`)
- [ ] 🛠️ Chore/Build/CI/Test (`type:chore`, `type:build`, `type:ci`, `type:test`)

**One-line summary:**

<!-- Provide a concise summary (max 120 chars) that describes the change -->

---

## 🔗 Related Issues

<!-- Use auto-close syntax to link related issues -->

**Closes:** #
**Fixes:** #
**Relates to:** #

---

## 💥 Breaking Changes

<!-- If this PR introduces breaking changes, describe them here -->

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

### Files Changed

<!-- List all files created or modified -->

- [ ]
- [ ]
- [ ]

### Description

<!-- Provide a detailed description of the changes -->

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

### Test Cases

<!-- List key test cases added or modified -->

- [ ]
- [ ]
- [ ]

### Manual Testing

<!-- Describe manual testing performed -->

- [ ] Tested in Storybook (if applicable)
- [ ] Tested in browser (Chrome, Firefox, Safari)
- [ ] Tested responsive behavior (mobile, tablet, desktop)
- [ ] Tested edge cases

---

## 📚 Documentation

### Documentation Updates

<!-- List documentation updated -->

- [ ] Updated Storybook documentation (if applicable)
- [ ] Updated `README.md` (if public API changed)
- [ ] Updated `AGENTS.md` (if developer workflow changed)
- [ ] Updated component exports in `packages/core/src/index.ts` (if new component)

### Architecture Documentation

<!-- Link to planning documents from agent workflow -->

- [ ] **IMPLEMENTATION-PLAN**: `specs/architecture/{issue}/IMPLEMENTATION-PLAN.md`
- [ ] **COMPONENT-PLAN** (if UI component): `specs/{branch}/{component}/COMPONENT-PLAN.md`

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

## 🎨 Visual Changes (If Applicable)

<!-- For UI components, provide visual evidence -->

- [ ] This PR includes visual changes

<details>
<summary>Screenshots (click to expand)</summary>

**Before:**

<!-- Add screenshot -->

**After:**

<!-- Add screenshot -->

</details>

**Storybook link:**
`http://localhost:6006/?path=/story/{component}--default`

---

## 🏷️ Suggested Labels

<!-- These labels align with .github/labels.yml -->

**Suggested labels to apply:**

- `type:{type}` (feat, fix, docs, refactor, perf, build, test, ci, chore)
- `status:review` 👀 (Ready for code review)
- `estimate:X` 📊 (Story points: 1, 2, 3, 5, 8, 13, 21, 34, 55, 89)
- `scope:core` or `scope:docsite` 📦
- `priority:{level}` (must-have, should-have, could-have, won't-have)

**Workflow status:**
Current: `status:review` → Next: `status:qa` → Final: `status:done`

---

## 👀 Reviewer Checklist

<!-- Reviewers should verify these items -->

### Code Quality

- [ ] **TDD compliance** - Tests written appropriately
- [ ] **SOLID principles** - Code follows best practices
- [ ] **Minimal changes** - Only necessary changes made
- [ ] **Type safety** - No `any` types, explicit types used

### Testing

- [ ] **Test coverage** - Appropriate tests added
- [ ] **Edge cases** - Handles invalid inputs and edge conditions
- [ ] **Accessibility** - ARIA attributes, keyboard navigation (if applicable)

### Documentation

- [ ] **Complete** - All changes documented
- [ ] **Accurate** - Documentation reflects implementation

### Integration

- [ ] **CI passes** - All checks green
- [ ] **Breaking changes documented** - Migration guide provided (if applicable)
- [ ] **Dependencies updated** - `package.json` updated if needed

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
- [ ] Tests added and passing
- [ ] Documentation updated
- [ ] Labels applied correctly
- [ ] Issue will auto-close on merge

---

**Conventional Commit Format:**

```
{type}({scope}): {description}

{optional body}

{optional footer}
```

**Examples:**

```
feat(button): add primary variant with hover state
fix(input): resolve value not updating on change
docs(readme): update installation instructions
refactor(toggle): simplify state management logic
perf(table): virtualize large datasets
chore(deps): upgrade react to 19.0.0
```
