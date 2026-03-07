<!--
  🐛 Bug Fix PR Template
  Use this template for bug fixes (type:fix)
-->

## 🎯 Type & Summary

**Type of change:**

- [ ] 🐛 Bug fix (`type:fix`)

**One-line summary:**

<!-- Provide a concise summary (max 120 chars) that describes what bug is fixed -->

---

## 🔗 Related Issues

<!-- Use auto-close syntax to link related issues -->

**Fixes:** #
**Relates to:** #

---

## 🐛 Bug Details

### Reproduction Steps

<!-- Provide step-by-step instructions to reproduce the bug -->

1.
2.
3.

### Expected Behavior

<!-- What should happen? -->

### Actual Behavior

<!-- What actually happens? -->

### Environment

<!-- Where does the bug occur? -->

- **Browser:**
- **OS:**
- **Package version:**
- **Component affected:**

### Root Cause

<!-- Explain what caused the bug (code-level analysis) -->

---

## 🔧 Fix Details

### Files Changed

<!-- List all files modified to fix the bug -->

- [ ] `packages/core/src/components/ui/{component}/{component}.tsx` - Fixed {issue}
- [ ] `packages/core/src/components/ui/{component}/__tests__/{component}.test.tsx` - Added regression test
- [ ]

### Approach Taken

<!-- Explain your fix approach -->

### Why This Fixes It

<!-- Explain why your fix resolves the root cause -->

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

### Regression Test Added

<!-- Describe the regression test added to prevent this bug in the future -->

- [ ] **Test case:** `it("should {expected behavior}", () => { ... })`
- [ ] **Test coverage:** Covers exact reproduction steps
- [ ] **Edge cases:** Tests related edge cases that could cause similar bugs

**Test file:** `packages/core/src/components/ui/{component}/__tests__/{component}.test.tsx`

### Coverage Impact (Optional)

<!-- Coverage thresholds are DISABLED but metrics are informative -->

**Before fix:**

- Line coverage: `___%`

**After fix:**

- Line coverage: `___%` (increase of `___%`)

### Manual Verification

<!-- Confirm manual testing performed -->

- [ ] Reproduced original bug before fix
- [ ] Verified bug is fixed after changes
- [ ] Tested in Storybook (all variants)
- [ ] Tested in multiple browsers (Chrome, Firefox, Safari)
- [ ] Tested edge cases manually
- [ ] Verified no new bugs introduced

---

## 💥 Breaking Changes

<!-- Only if the fix introduces breaking changes -->

- [ ] ⚠️ This fix introduces breaking changes

<details>
<summary>Breaking change details (if applicable)</summary>

**What breaks:**

<!-- Describe what existing functionality is affected by the fix -->

**Migration guide:**

<!-- Provide step-by-step instructions for migrating existing code -->

**Versioning impact:**

<!-- Fix with breaking change triggers MINOR version bump (not MAJOR) -->

</details>

---

## 📚 Documentation

### Updated Documentation

<!-- List documentation updated due to behavior change -->

- [ ] Updated component Storybook documentation (if behavior changed)
- [ ] Updated `README.md` (if public API changed)
- [ ] Updated `AGENTS.md` (if developer workflow affected)

### Architecture Documentation

<!-- Link to planning documents from agent workflow -->

- [ ] **IMPLEMENTATION-PLAN**: `specs/architecture/{issue}/IMPLEMENTATION-PLAN.md`

**Storybook link:**
`http://localhost:6006/?path=/story/{component}--default`

---

## 🏗️ Agent Workflow Integration

<!-- Confirm which agents were used in implementation -->

**Agent workflow used:**

- [ ] `@architect` - Created IMPLEMENTATION-PLAN.md from bug issue
- [ ] `@coder` - Executed fix via TDD workflow (Red → Green → Refactor)

**Specs references:**

- Architecture plan: `specs/architecture/{issue}/IMPLEMENTATION-PLAN.md`

---

## 🏷️ Suggested Labels

<!-- These labels align with .github/labels.yml -->

**Suggested labels to apply:**

- `type:fix` 🐛 (Bug fix)
- `issue:bug` 🚨 (Bug report)
- `status:review` 👀 (Ready for code review)
- `estimate:X` 📊 (Story points: 1, 2, 3, 5 typical for bugs)
- `scope:core` 📦 (If core package affected)
- `priority:must-have` 🔥 (If critical bug)

**Workflow status:**
Current: `status:review` → Next: `status:qa` → Final: `status:done`

---

## 👀 Reviewer Checklist

<!-- Reviewers should verify these items -->

### Bug Fix Quality

- [ ] **Root cause addressed** - Fix targets actual root cause, not symptoms
- [ ] **Minimal changes** - Only necessary changes made to fix bug
- [ ] **No scope creep** - No refactoring or features added beyond fix
- [ ] **Regression test** - Test added that would fail without this fix
- [ ] **No new bugs** - Fix doesn't introduce new issues

### Testing

- [ ] **Reproduction verified** - Reviewer can reproduce original bug
- [ ] **Fix verified** - Reviewer confirms bug is fixed
- [ ] **Edge cases covered** - Tests cover related edge cases
- [ ] **Coverage maintained** - No decrease in test coverage

### Code Quality

- [ ] **Type safety** - No `any` types, explicit types used
- [ ] **Error handling** - Proper error handling added if needed
- [ ] **Comments added** - Complex fix logic explained with comments

### Documentation

- [ ] **Behavior change documented** - If fix changes expected behavior
- [ ] **Storybook updated** - If visual behavior changed
- [ ] **Architecture docs accurate** - IMPLEMENTATION-PLAN.md reflects fix

### Integration

- [ ] **CI passes** - All 6 checks green
- [ ] **No breaking changes** - Or breaking changes properly documented
- [ ] **Compatible with existing code** - Fix doesn't break other components

---

## 📝 Additional Notes

<!-- Any other context reviewers should know -->
<!-- Example: Known limitations, follow-up issues, alternative approaches considered -->

---

## ✅ Pre-Merge Checklist

<!-- Complete before merging -->

- [ ] All CI checks pass
- [ ] At least one approval from reviewer
- [ ] All review comments addressed
- [ ] Regression test added and passing
- [ ] Original bug verified fixed
- [ ] No new bugs introduced
- [ ] Documentation updated (if needed)
- [ ] Labels applied correctly
- [ ] Issue will auto-close on merge

---

**Conventional Commit Format:**

```
fix(component): resolve {bug description}

Fixes issue #{number}

Root cause: {brief explanation}
Solution: {brief explanation}

BREAKING CHANGE: {description} (only if applicable)
```
