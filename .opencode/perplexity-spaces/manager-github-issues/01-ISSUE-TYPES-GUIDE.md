# Issue Type Guide

This guide explains the 5 types of issues you can create and which GitHub Issue Form fields you'll need to fill for each.

---

## 🐛 Bug Report

**Use when:** Something is broken or behaving incorrectly

**GitHub form fields you'll fill:**

1. **Feature** - What component/feature is broken
2. **Scenario** - Steps to reproduce the bug
3. **Expected Behavior** - What should happen
4. **Actual Behavior** - What actually happens
5. **Environment** - Browser, device, OS, package version
6. **Subtasks** - Checklist of work to fix (optional, max 8)

**Example Bug:**
"Button hover state not working on mobile Safari"

**When to use:**

- Existing feature doesn't work as designed
- Error messages appear
- Visual glitches or layout issues
- Performance degradation
- Security vulnerabilities

**When NOT to use:**

- Feature doesn't exist yet → Use **Story**
- Requesting enhancement to working feature → Use **Story**
- Technical improvement with no user impact → Use **Task**

---

## 📖 Story

**Use when:** Building a new user-facing feature or enhancement

**GitHub form fields you'll fill:**

1. **User Story** - As a [user], I want [action], So that [benefit]
2. **Acceptance Criteria** - Given/When/Then scenarios (multiple scenarios okay)
3. **Background** - Additional context, mockups, design references
4. **Subtasks** - Checklist of work (optional, max 8)

**Example Story:**
"Add keyboard navigation to Dropdown component"

**When to use:**

- New user-facing feature
- Enhancement that changes user experience
- Accessibility improvements users will notice
- UI/UX changes

**When NOT to use:**

- Bug fix → Use **Bug**
- Internal refactoring with no UX change → Use **Task**
- Very large feature spanning weeks → Use **Epic** with child Items

**Story writing tips:**

- **Be specific about the user:** "admin user", "keyboard-only user", not just "user"
- **Focus on ONE user goal:** If you have multiple personas, create separate stories
- **Keep it atomic:** If story needs 13+ points, consider breaking down

---

## 🎯 Epic

**Use when:** Large initiative requiring multiple child tickets (no implementation details!)

**GitHub form fields you'll fill:**

1. **Goal** - High-level business objective
2. **Stakeholder** - Who requested this and why
3. **Feature** - High-level feature description
4. **Scope & Deliverables** - What's in/out of scope (use markdown lists)
5. **Milestones** - Key phases or milestones
6. **Child Issues** - List of child Items/Stories to create (checklist format)

**Example Epic:**
"Build accessible form system"

**When to use:**

- Initiative spanning multiple weeks/sprints
- Requires coordination across multiple developers
- Needs stakeholder tracking
- Has clear phases/milestones

**When NOT to use:**

- Can be completed in 1-2 weeks → Use **Story** or **Task**
- Single component with clear scope → Use **Story**
- Technical work with no coordination needed → Use **Task**

**Important about Epics:**

- **DON'T estimate Epics** - Leave Estimate field blank
- **DON'T include implementation details** - That's for child Items
- **DO list child issues** in the "Child Issues" field
- **DO create separate Items** after the Epic is created, linking them with Parent Issue field

---

## 🔧 Task

**Use when:** Technical/internal work with no direct user-facing changes

**GitHub form fields you'll fill:**

1. **Technical Context** - Background, why this is needed, current pain points
2. **Implementation Approach** - How to approach the task (optional but helpful)
3. **Dependencies** - What's needed first, blockers (optional)
4. **Test Criteria** - How to verify completion
5. **Subtasks** - Checklist of work (optional, max 8)

**Example Task:**
"Migrate PandaCSS config to v0.40"

**When to use:**

- Refactoring (no behavior change)
- Dependency upgrades
- Build/CI configuration changes
- Performance optimization (no UI change)
- Code cleanup or tech debt
- Documentation updates (developer-facing)

**When NOT to use:**

- Changes user experience → Use **Story**
- Fixes a bug → Use **Bug**
- Part of larger initiative → Use **Item** under an Epic

**Task tips:**

- Be clear about "why now" - what's the pain point?
- Include test/verification criteria
- Note any breaking changes
- Consider backward compatibility

---

## ✅ Item

**Use when:** Small, atomic work unit (often child of an Epic)

**GitHub form fields you'll fill:**

1. **Description** - Clear, concise description of what needs to be done
2. **Acceptance Criteria** - How to verify completion (checklist format)
3. **Notes** - Additional information, hints, constraints
4. **Subtasks** - Usually leave blank (acceptance criteria covers it)

**Example Item:**
"Update README with Bun installation instructions"

**When to use:**

- Breaking down an Epic into implementable pieces
- Small enhancement (1-3 points)
- Quick fixes
- Documentation updates (user-facing)
- Individual component work as part of larger feature

**When NOT to use:**

- More than 3 story points → Use **Story** or **Task**
- Fixes a bug → Use **Bug**
- Standalone feature → Use **Story**

**Item characteristics:**

- **Ideal size:** 1-3 story points (1-3 days)
- **Independently implementable:** Can be done without other tickets (unless blocked)
- **Clear definition of done:** No ambiguity about completion
- **Often has parent:** Linked to an Epic via "Parent Issue" field

---

## How to Choose the Right Type

### Decision Tree

```
Is something broken?
├─ YES → 🐛 Bug
└─ NO → Is this user-facing?
    ├─ YES → Is it large (13+ points)?
    │   ├─ YES → 🎯 Epic (then create child Items)
    │   └─ NO → 📖 Story
    └─ NO → Is it technical/internal?
        ├─ YES → Is it small (1-3 points)?
        │   ├─ YES → ✅ Item (especially if part of Epic)
        │   └─ NO → 🔧 Task
        └─ UNSURE → Ask me! I'll help decide
```

### Common Mistakes

❌ **Using Bug for feature requests**

- "Button doesn't support dark mode" → Not a bug if dark mode was never implemented
- ✅ Use **Story** instead

❌ **Using Story for technical work**

- "Refactor button recipe for better performance" → No UX change
- ✅ Use **Task** instead

❌ **Creating giant Stories**

- "Add dark mode support to all components" → Too big!
- ✅ Use **Epic** with child **Items** per component

❌ **Estimating Epics**

- Epics are NOT estimated directly
- ✅ Child Items have estimates; Epic total = sum of children

---

## Type Detection Keywords

When you start the conversation, I look for these keywords:

**Bug indicators:**

- "bug", "broken", "error", "issue", "doesn't work", "not working", "fails", "crash"

**Story indicators:**

- "feature", "add", "support", "implement", "user wants", "as a user", "so that"

**Epic indicators:**

- "epic", "initiative", "redesign", "overhaul", "system", "platform", "multiple"

**Task indicators:**

- "task", "refactor", "update", "upgrade", "configure", "migrate", "optimize"

**Item indicators:**

- "item", "quick", "small", "simple", "update docs", "fix typo"

**If I'm unsure**, I'll ask you to clarify!

---

## Still Unsure?

Just describe what you need in plain language:

```
"The button doesn't respond when I click it on mobile"
→ I'll suggest Bug

"I want users to be able to search the component gallery"
→ I'll suggest Story

"We need to build an entire design system from scratch"
→ I'll suggest Epic

"We need to upgrade React to v19"
→ I'll suggest Task

"Just need to update the README with new install commands"
→ I'll suggest Item
```

I'm here to help you choose! 😊
