<!--
  🔄 Refactor PR Template
  Use this template for code refactoring (type:refactor)
-->

## 🎯 Type & Summary

**Type of change:**

- [ ] 🔄 Refactor (`type:refactor`)

**One-line summary:**

<!-- Provide a concise summary (max 120 chars) of what was refactored -->

---

## 🔗 Related Issues

<!-- Use auto-close syntax to link related issues -->

**Closes:** #
**Relates to:** #

---

## 🔄 Refactoring Details

### What Changed

<!-- Describe what code was refactored -->

**Files affected:**

- `packages/core/src/components/ui/{component}/{component}.tsx`
- `packages/core/src/components/ui/{component}/__tests__/{component}.test.tsx`
-

### Why Refactored

<!-- Explain the motivation for refactoring -->

**Problems addressed:**

- [ ] Code duplication
- [ ] Poor performance
- [ ] Hard to test
- [ ] Hard to understand
- [ ] Violation of SOLID principles
- [ ] Technical debt
- [ ] Other:

**Specific issues:**

### How It Improved

<!-- Describe the improvements made -->

**SOLID principles applied:**

- [ ] **Single Responsibility** - Each function/component does one thing
- [ ] **Open/Closed** - Extended via composition, not modification
- [ ] **Liskov Substitution** - Maintains interface contracts
- [ ] **Interface Segregation** - No forced unused dependencies
- [ ] **Dependency Inversion** - Depends on abstractions, not implementations

**Improvements:**

- [ ] Reduced code duplication (removed `___` lines)
- [ ] Improved readability (clearer naming, better structure)
- [ ] Enhanced testability (easier to mock, more isolated)
- [ ] Better performance (optimized algorithms, reduced re-renders)
- [ ] Type safety improved (removed `any` types, added explicit types)

---

## ⚠️ Behavior Verification

<!-- CRITICAL: Refactoring should NOT change behavior -->

- [ ] ✅ **No behavior changes** - All existing functionality works exactly as before
- [ ] ✅ **All tests pass** - Existing tests pass without modification
- [ ] ✅ **Coverage maintained** - Test coverage same or better than before

**Behavior guarantee:**

<!-- Explain how you verified behavior didn't change -->

---

## 💥 Breaking Changes

<!-- Only if refactoring changes internal APIs -->

- [ ] ⚠️ This refactor introduces breaking changes to internal APIs

<details>
<summary>Breaking change details (if applicable)</summary>

**What breaks:**

<!-- Describe what internal APIs changed (not public APIs) -->

**Migration guide:**

<!-- Provide instructions for other internal code -->

**Versioning impact:**

<!-- Internal breaking changes typically don't trigger version bumps -->

</details>

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

**Before refactor:**

- Branch: `___%`
- Line: `___%`
- Function: `___%`

**After refactor:**

- Branch: `___%` (change: `+/- ___%`)
- Line: `___%` (change: `+/- ___%`)
- Function: `___%` (change: `+/- ___%`)

**Coverage impact:**

- [ ] Coverage maintained (no decrease)
- [ ] Coverage improved (increase of `___%`)

### Tests Modified

<!-- List any tests that needed updating -->

- [ ] No test changes required (refactoring only)
- [ ] Tests refactored (same behavior, better structure)
- [ ] New tests added (to cover edge cases revealed during refactor)

**Test files:**

- `packages/core/src/components/ui/{component}/__tests__/{component}.test.tsx`

### Manual Testing

<!-- Confirm manual testing performed -->

- [ ] Tested in Storybook (all variants)
- [ ] Tested user interactions (click, hover, focus)
- [ ] Verified no visual regressions
- [ ] Checked browser console for errors
- [ ] Tested edge cases manually

---

## 📚 Documentation

### Updated Documentation

<!-- List documentation updated due to refactoring -->

- [ ] Updated code comments (explain complex refactored logic)
- [ ] Updated Storybook docs (if component API changed internally)
- [ ] Updated `AGENTS.md` (if developer workflow affected)
- [ ] No documentation updates needed (internal refactoring only)

### Architecture Documentation

<!-- Link to planning documents from agent workflow -->

- [ ] **IMPLEMENTATION-PLAN**: `specs/architecture/{issue}/IMPLEMENTATION-PLAN.md`

---

## 🏗️ Agent Workflow Integration

<!-- Confirm which agents were used in implementation -->

**Agent workflow used:**

- [ ] `@architect` - Created IMPLEMENTATION-PLAN.md from refactor task
- [ ] `@coder` - Executed refactor via TDD workflow (maintain green tests)

**Specs references:**

- Architecture plan: `specs/architecture/{issue}/IMPLEMENTATION-PLAN.md`

---

## 🏷️ Suggested Labels

<!-- These labels align with .github/labels.yml -->

**Suggested labels to apply:**

- `type:refactor` 🔄 (Code refactoring)
- `status:review` 👀 (Ready for code review)
- `estimate:X` 📊 (Story points: 2-8 typical for refactors)
- `scope:core` 📦 (If core package affected)
- `priority:should-have` or `priority:could-have` (Refactors rarely must-have)

**Workflow status:**
Current: `status:review` → Next: `status:qa` → Final: `status:done`

---

## 👀 Reviewer Checklist

<!-- Reviewers should verify these items -->

### Refactoring Quality

- [ ] **No behavior change** - Functionality identical to before refactor
- [ ] **Tests still pass** - All existing tests pass without modification
- [ ] **Coverage maintained** - Test coverage not decreased
- [ ] **SOLID compliance** - Refactor improves adherence to SOLID principles
- [ ] **Readability improved** - Code is clearer and easier to understand

### Code Quality

- [ ] **No code duplication** - DRY principle followed
- [ ] **Proper abstractions** - Functions/components properly isolated
- [ ] **Type safety** - No `any` types introduced
- [ ] **Error handling** - Edge cases still handled correctly
- [ ] **Performance** - No performance regressions

### Testing

- [ ] **All tests pass** - No test failures
- [ ] **No test changes** - Or test changes only for structure, not behavior
- [ ] **Manual testing** - Reviewer verified functionality unchanged

### Documentation

- [ ] **Comments added** - Complex refactored logic explained
- [ ] **Internal APIs documented** - If internal APIs changed
- [ ] **Architecture docs accurate** - IMPLEMENTATION-PLAN.md reflects refactor

### Integration

- [ ] **CI passes** - All 6 checks green
- [ ] **No breaking changes** - Or breaking changes properly documented
- [ ] **Build size** - No significant increase in bundle size

---

## 📊 Code Metrics (Optional)

<!-- Provide metrics to show improvement -->

**Lines of code:**

- Before: `___` lines
- After: `___` lines
- Change: `-___` lines (reduction is good)

**Cyclomatic complexity:**

- Before: `___` (complexity score)
- After: `___` (complexity score)
- Change: `-___` (reduction is good)

**Duplication:**

- Before: `___` duplicate blocks
- After: `___` duplicate blocks
- Change: `-___` duplicates removed

---

## 📝 Additional Notes

<!-- Any other context reviewers should know -->
<!-- Example: Follow-up refactors planned, alternative approaches considered -->

---

## ✅ Pre-Merge Checklist

<!-- Complete before merging -->

- [ ] All CI checks pass
- [ ] At least one approval from reviewer
- [ ] All review comments addressed
- [ ] No behavior changes (functionality identical)
- [ ] All tests pass without modification
- [ ] Coverage maintained or improved
- [ ] Code readability improved
- [ ] SOLID principles better applied
- [ ] Labels applied correctly
- [ ] Issue will auto-close on merge

---

**Conventional Commit Format:**

```
refactor(component): {what was refactored}

Refactors {component} to improve {aspect}

No behavior changes. All tests pass.
```

**Examples:**

```
refactor(button): extract event handlers into separate hooks
refactor(toggle): simplify state management logic
refactor(input): remove code duplication in validation
```
