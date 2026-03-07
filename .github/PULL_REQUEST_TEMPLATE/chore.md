<!--
  🛠️ Chore PR Template
  Use this template for maintenance tasks (type:chore, type:build, type:ci, type:test)
-->

## 🎯 Type & Summary

**Type of change:**

- [ ] 🛠️ Chore - Other changes (`type:chore`)
- [ ] 📦 Build - Build system changes (`type:build`)
- [ ] 🚀 CI - CI/CD changes (`type:ci`)
- [ ] 🧪 Test - Test additions/changes (`type:test`)

**One-line summary:**

<!-- Provide a concise summary (max 120 chars) of the maintenance work -->

---

## 🔗 Related Issues

<!-- Use auto-close syntax to link related issues -->

**Closes:** #
**Relates to:** #

---

## 🛠️ Changes

### Files Modified

<!-- List key files created or modified -->

- [ ] `package.json` - Updated dependencies/scripts
- [ ] `bun.lock` - Updated lockfile
- [ ] `turbo.json` - Updated Turborepo config
- [ ] `.github/workflows/*.yml` - Updated CI workflows
- [ ] `tsconfig.json` - Updated TypeScript config
- [ ] `eslint.config.ts` - Updated ESLint config
- [ ] `vitest.config.ts` - Updated Vitest config
- [ ] `panda.config.ts` - Updated PandaCSS config
- [ ]

### What Changed

<!-- Describe the changes made -->

### Why This Change

<!-- Explain the motivation for this maintenance work -->

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

## 🧪 Testing (If Applicable)

<!-- For test-related chores -->

**Test changes:**

- [ ] New tests added (coverage increase: `___%`)
- [ ] Existing tests updated (behavior unchanged)
- [ ] Test infrastructure improved (faster, more reliable)

**For other chores:**

- [ ] No test changes required
- [ ] All existing tests still pass

---

## 🏷️ Suggested Labels

<!-- These labels align with .github/labels.yml -->

**Suggested labels to apply:**

- `type:chore` 🛠️ (or `type:build`, `type:ci`, `type:test`)
- `status:review` 👀 (Ready for code review)
- `estimate:1` or `estimate:2` 📊 (Chores typically 1-2 points)
- `scope:core` 📦 (If core package affected)

**Workflow status:**
Current: `status:review` → Next: `status:done` (QA often optional for chores)

---

## 👀 Reviewer Checklist

<!-- Reviewers should verify these items -->

### Quality Checks

- [ ] **No unintended side effects** - Changes are isolated to maintenance scope
- [ ] **Dependencies safe** - New dependencies vetted (security, license, size)
- [ ] **Config valid** - Config files have valid syntax
- [ ] **CI still works** - Workflow changes don't break automation

### Integration

- [ ] **CI passes** - All 6 checks green
- [ ] **Lockfile updated** - `bun.lock` regenerated if dependencies changed
- [ ] **Documentation updated** - If workflow/tooling changed

---

## 📝 Additional Notes

<!-- Any other context reviewers should know -->

---

## ✅ Pre-Merge Checklist

<!-- Complete before merging -->

- [ ] All CI checks pass
- [ ] At least one approval from reviewer
- [ ] All review comments addressed
- [ ] No unintended side effects
- [ ] Labels applied correctly
- [ ] Issue will auto-close on merge

---

**Conventional Commit Format:**

```
{type}({scope}): {what changed}

{why this change was made}
```

**Examples:**

```
chore(deps): upgrade @types/react to 19.0.5
build(vite): add bundle size analyzer plugin
ci(github): add daily cleanup workflow
test(button): add missing edge case tests
```
