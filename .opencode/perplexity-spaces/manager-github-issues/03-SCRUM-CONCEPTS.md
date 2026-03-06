# SCRUM Concepts for Beginners

This guide explains SCRUM terminology in plain language for team members new to agile methodologies.

---

## Story Points = Effort Estimation

**Question:** "How much work is this ticket?"

**Answer:** We use **Fibonacci numbers** (1, 2, 3, 5, 8, 13, 21...) to estimate effort.

### Our Team's Scale: 1 Point = 1 Day

- **1 point** = 1 day of focused work
- **2 points** = 2 days
- **3 points** = 3 days
- **5 points** = 1 work week (5 days)
- **8 points** = 1.5 weeks (8 days)
- **13 points** = 2.5 weeks (consider breaking down!)
- **21+ points** = Too large, must break into smaller tickets

### What's Included in a Point?

✅ **Included:**

- Implementation/coding time
- Writing tests
- Code review time
- Documentation updates
- Bug fixes during development

❌ **NOT Included:**

- Meetings
- Interruptions
- Context switching
- Other unrelated work

### Important Notes

💡 **Points are effort, not time**

- A bug that takes 2 hours to fix but 6 hours to debug = **1 point** (1 day total)
- Includes unknowns and investigation time

💡 **When uncertain, estimate higher**

- Complexity emerges during work
- Better to overestimate than rush

💡 **Points are relative**

- Compare to past tickets: "Is this more or less complex than ticket #123?"

---

## Estimation Examples by Type

### 🐛 Bug Estimates

**1 point (1 day):**

- Obvious typo in error message
- Simple CSS fix (padding, color)
- Missing prop default value

**2 points (2 days):**

- Reproducible bug with clear root cause
- Fix requires updating tests
- Browser compatibility issue

**3 points (3 days):**

- Bug needs investigation (not immediately obvious)
- Affects multiple places in code
- Requires refactoring to fix properly

**5 points (1 week):**

- Complex bug affecting multiple components
- Race condition or timing issue
- Performance degradation requiring profiling

**8+ points:**

- If a bug needs 8+ points, it's likely a deeper architectural issue
- Consider creating Epic: "Fix [system] reliability" with child Items

---

### 📖 Story Estimates

**1 point (1 day):**

- Add single prop to existing component
- Simple variant with no new logic
- Basic documentation page

**2 points (2 days):**

- New variant with conditional logic
- Form field with basic validation
- Simple accessibility improvement

**3 points (3 days):**

- New component with single responsibility
- Feature with 2-3 edge cases
- Moderate refactor to support new behavior

**5 points (1 week):**

- Complex component from scratch (Dropdown, Select)
- Feature with multiple states and edge cases
- Keyboard navigation implementation
- Integration with external system

**8 points (1.5 weeks):**

- Very complex component (DatePicker, RichTextEditor)
- Feature with extensive testing needs
- Multiple components working together

**13+ points:**

- Too big! Break into Epic + Items
- Example: "Build form system" → Epic with child Items per component

---

### 🔧 Task Estimates

**1 point (1 day):**

- Config file update
- Dependency version bump (no breaking changes)
- Simple documentation update

**2 points (2 days):**

- Refactor single function/component
- Dependency upgrade with minor API changes
- CI/CD configuration change

**3 points (3 days):**

- Refactor multiple related components
- Migration script for data/config
- Performance optimization with measurement

**5 points (1 week):**

- Major refactor of core system
- Dependency upgrade with breaking changes
- Build system migration

**8+ points:**

- Consider breaking down or creating Epic
- Large refactors should be incremental

---

### ✅ Item Estimates (Always 1-3 Points!)

**1 point (1 day):**

- Update README
- Fix alignment issue
- Add missing type definition

**2 points (2 days):**

- Implement single component as part of larger feature
- Add validation to existing form field
- Write integration test suite for component

**3 points (3 days):**

- Build component with moderate complexity
- Implement specific feature slice
- Add comprehensive error handling

**If > 3 points:**

- It's not an Item! Use Story or Task instead

---

## MoSCoW Priority

**Question:** "How urgent/critical is this?"

**Answer:** We use **MoSCoW** (Must, Should, Could, Won't) to prioritize work.

### Priority Levels

#### 🔴 Must-have

**Definition:** Critical work that MUST be done

**Examples:**

- Blocks users from working (login broken, can't submit forms)
- Security vulnerability
- Critical bug in production
- Promised to client/stakeholder with hard deadline
- Legal/compliance requirement

**Timeline:** ASAP, top priority

---

#### 🟡 Should-have

**Definition:** Important but not critical

**Examples:**

- Important enhancement users are asking for
- Quality improvement (performance, accessibility)
- Common use case support
- Technical debt that's causing pain
- Non-critical bugs affecting some users

**Timeline:** Next sprint or two

---

#### 🟢 Could-have

**Definition:** Nice to have, but can be deferred

**Examples:**

- Edge case fixes
- Polish/cosmetic improvements
- Low-impact enhancements
- "Wouldn't it be cool if..." features
- Optimization for rare scenarios

**Timeline:** When time allows, backlog

---

#### ⚪ Won't-have

**Definition:** Explicitly out of scope (for now)

**Examples:**

- Feature request that doesn't align with roadmap
- Deprioritized indefinitely
- Not technically feasible
- Too expensive for value gained

**Timeline:** Not happening (may revisit later)

---

### How to Determine Priority

**Ask yourself:**

1. **Who's affected?** All users, some users, edge case users?
2. **What's the impact?** Blocks work, annoying, barely noticed?
3. **What happens if we wait?** Gets worse, stays same, goes away?
4. **Is there a workaround?** None, difficult, easy?

**Decision matrix:**

| Situation                             | Priority       |
| ------------------------------------- | -------------- |
| Blocks all users, no workaround       | Must-have 🔴   |
| Affects many users, workaround exists | Should-have 🟡 |
| Affects few users, minor impact       | Could-have 🟢  |
| Nice improvement, no urgency          | Could-have 🟢  |
| Rejected or deprioritized             | Won't-have ⚪  |

**Important:** Not everything is "must-have"! Most tickets are "should-have". Reserve must-have for truly critical work.

---

## Atomicity = One Clear Goal Per Ticket

**Bad Example (Not Atomic):**
"Update all components to support dark mode and add keyboard navigation"

**Why it's bad:**

- Two different goals (dark mode + keyboard nav)
- Affects many components (scope unclear)
- Hard to estimate (could be 50+ points!)
- Can't close until ALL components done
- Difficult to code review

**Good Example (Atomic):**

**Epic #100:** "Add dark mode support"

- **Item #101:** "Add dark mode to Button component" (3 points)
- **Item #102:** "Add dark mode to Input component" (3 points)
- **Item #103:** "Add dark mode to Modal component" (5 points)

**Story #200:** "Add keyboard navigation to Dropdown component" (5 points)

**Why it's good:**

- Each ticket has ONE clear goal
- Independently implementable
- Easy to estimate
- Can be done in parallel by different people
- Clear definition of done

---

### Signs Your Ticket is Too Big

⚠️ **Watch for these red flags:**

- Mentions "all components"
- Mentions "entire system" or "everywhere"
- More than 8 subtasks
- Affects multiple user personas
- Estimate is 13+ story points
- Title has multiple "and" clauses
- Description exceeds 500 characters

**Solution:** Create an Epic + break into atomic Items

---

### Atomicity Benefits

✅ **Easier to estimate** - Smaller scope = less uncertainty
✅ **Easier to test** - Focused testing, clear criteria
✅ **Easier to review** - Smaller PRs = better reviews
✅ **Easier to track** - Progress is visible
✅ **Easier to parallelize** - Multiple people can work simultaneously
✅ **Easier to ship** - Incremental delivery

---

## Blocked vs. Parent (Issue Relationships)

### Parent Issue

**What:** This ticket is part of a larger Epic

**When to use:** Item is one piece of a bigger initiative

**Example:**

```
Epic #100: "Build accessible form system"
└── Item #101: "Create Input component" (parent: #100)
└── Item #102: "Create Select component" (parent: #100)
└── Item #103: "Create Checkbox component" (parent: #100)
```

**In GitHub:** Enter `#100` in "Parent Issue" metadata field

**Effect:**

- Adds `has-parent` label
- Links to parent Epic
- Epic shows progress when children close

---

### Blocked By

**What:** Can't start this ticket until another is done

**When to use:** True dependency (not just "nice to have")

**Example:**

```
Task #200: "Upgrade to PandaCSS v0.40"
Task #201: "Migrate config to new format" (blocked by: #200)
```

**In GitHub:** Enter `#200` in "Blocked By" metadata field

**Effect:**

- Adds `blocked` label
- Marks as blocked in project board
- Shouldn't be picked up until blocker is resolved

---

### When to Use Each

**Use Parent when:**

- Item is part of Epic's scope
- Work is related but not dependent
- Can work in parallel with siblings

**Use Blocked By when:**

- Can't physically start until other ticket done
- Technical dependency (needs API, needs migration, etc.)
- Decision needed from other ticket

**Use both when:**

- Item is part of Epic AND blocked by another Item in same Epic

**Example:**

```
Epic #100: "Form system"
├── Item #101: "Base FormField component" (parent: #100)
├── Item #102: "Input component" (parent: #100, blocked by: #101)
└── Item #103: "Select component" (parent: #100, blocked by: #101)
```

---

## Quick Reference Card

| Concept          | What It Means    | Key Point            |
| ---------------- | ---------------- | -------------------- |
| **Story Points** | Effort estimate  | 1 point = 1 day      |
| **Must-have**    | Critical, urgent | Blocks users         |
| **Should-have**  | Important        | Next sprint          |
| **Could-have**   | Nice to have     | Backlog              |
| **Won't-have**   | Out of scope     | Not doing            |
| **Atomic**       | One clear goal   | Easy to complete     |
| **Parent**       | Part of Epic     | Links to larger work |
| **Blocked**      | Can't start yet  | Wait for dependency  |

---

## Still Confused?

No worries! When we chat, I'll guide you through these concepts. You don't need to memorize this - just reference it when you need clarification.

**Common questions:**

**"How do I know if it's 3 or 5 points?"**
→ When in doubt, go higher. We can always adjust during refinement.

**"Is this must-have or should-have?"**
→ Ask: "What happens if we wait a week?" If answer is "users are blocked", it's must-have. If "they'll complain but can work", it's should-have.

**"Is this atomic enough?"**
→ Ask: "Can one person complete this in 1-2 weeks?" If no, it's too big.

I'm here to help! 😊
