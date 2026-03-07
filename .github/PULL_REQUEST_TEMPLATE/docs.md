<!--
  📚 Documentation PR Template
  Use this template for documentation changes (type:docs)
-->

## 🎯 Type & Summary

**Type of change:**

- [ ] 📚 Documentation (`type:docs`)

**One-line summary:**

<!-- Provide a concise summary (max 120 chars) of documentation changes -->

---

## 🔗 Related Issues

<!-- Use auto-close syntax to link related issues -->

**Closes:** #
**Relates to:** #

---

## 📝 Documentation Changes

### Files Updated

<!-- List all documentation files created or modified -->

- [ ] `README.md` - Updated {section}
- [ ] `AGENTS.md` - Updated {section}
- [ ] `packages/core/src/components/ui/{component}/storybook/{component}.mdx` - Added/updated docs
- [ ] `packages/docsite/docs/{page}.md` - Updated documentation site
- [ ]

### Type of Documentation

<!-- Check all that apply -->

- [ ] **API documentation** - Component props, types, interfaces
- [ ] **Usage examples** - Code examples and patterns
- [ ] **Installation guide** - Setup and configuration instructions
- [ ] **Migration guide** - Upgrading from previous versions
- [ ] **Architecture docs** - System design and technical decisions
- [ ] **Storybook docs** - Component documentation in Storybook
- [ ] **README updates** - Project overview and getting started
- [ ] **Developer guide** - Contributing and development workflow

### What Changed

<!-- Describe what documentation was added, updated, or removed -->

### Why This Change

<!-- Explain why the documentation needed updating -->

---

## ✅ CI Validation Checklist

<!-- Confirm relevant CI checks pass before requesting review -->

- [ ] ✅ **PandaCSS Generation** (`bun run ci:panda`) - No errors
- [ ] ✅ **ESLint** (`bun run ci:lint`) - No warnings or errors (for .ts/.tsx files)
- [ ] ✅ **TypeScript** (`bun run ci:type-check`) - No type errors (for .ts/.tsx files)
- [ ] ✅ **Build** (`bun run ci:build`) - Builds successfully

**Note:** Test coverage and Storybook build checks may be skipped for docs-only changes.

**Local validation:**

```bash
bun run ci:lint    # Validate markdown/code blocks
bun run ci:build   # Ensure no build errors
```

---

## 📸 Visual Changes (If Applicable)

<!-- For Storybook documentation or visual examples -->

- [ ] This PR includes visual documentation changes

<details>
<summary>Screenshots (click to expand)</summary>

**Before:**

<!-- Add screenshot of old documentation -->

**After:**

<!-- Add screenshot of new documentation -->

</details>

**Storybook documentation link:**
`http://localhost:6006/?path=/docs/{component}--docs`

---

## 🏷️ Suggested Labels

<!-- These labels align with .github/labels.yml -->

**Suggested labels to apply:**

- `type:docs` 📚 (Documentation)
- `status:review` 👀 (Ready for code review)
- `estimate:1` or `estimate:2` 📊 (Documentation typically 1-2 points)
- `scope:core` or `scope:docsite` 📦 (Depending on which package affected)

**Workflow status:**
Current: `status:review` → Next: `status:done` (QA optional for docs)

---

## 👀 Reviewer Checklist

<!-- Reviewers should verify these items -->

### Documentation Quality

- [ ] **Accurate** - Information is technically correct
- [ ] **Clear** - Easy to understand for target audience
- [ ] **Complete** - Covers all necessary information
- [ ] **Consistent** - Follows existing documentation style
- [ ] **Up-to-date** - Reflects current codebase state

### Writing Quality

- [ ] **Grammar and spelling** - No typos or grammatical errors
- [ ] **Formatting** - Proper markdown syntax, headings, lists
- [ ] **Code examples** - Examples are valid and runnable
- [ ] **Links work** - All internal/external links are valid

### Technical Accuracy

- [ ] **API signatures correct** - Props, types, interfaces match code
- [ ] **Examples tested** - Code examples actually work
- [ ] **Breaking changes noted** - If API changed, migration guide provided

### Integration

- [ ] **CI passes** - Build and lint checks green
- [ ] **No broken links** - All references resolve correctly
- [ ] **Images/diagrams included** - If referenced in text

---

## 📝 Additional Notes

<!-- Any other context reviewers should know -->

---

## ✅ Pre-Merge Checklist

<!-- Complete before merging -->

- [ ] All relevant CI checks pass
- [ ] At least one approval from reviewer
- [ ] All review comments addressed
- [ ] Links verified working
- [ ] Code examples tested (if applicable)
- [ ] Labels applied correctly
- [ ] Issue will auto-close on merge

---

**Conventional Commit Format:**

```
docs({scope}): {what was documented}

Updates documentation for issue #{number}
```

**Examples:**

```
docs(readme): add installation instructions for bun
docs(button): add usage examples to storybook
docs(contributing): update agent workflow guidelines
```
