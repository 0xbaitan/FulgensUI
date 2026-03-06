# GitHub Metadata Fields Guide

This guide explains the metadata fields at the top of GitHub Issue Forms and how they work.

---

## What Are Metadata Fields?

At the **top** of every GitHub Issue Form, before the actual issue content, you'll see these fields:

```
⚙️ Metadata Fields
━━━━━━━━━━━━━━━━━━━━━━━━━━
Priority          [dropdown menu]
Estimate          [dropdown menu]
Blocked By        [text input]
Parent Issue      [text input]
```

**Important:** These fields do NOT appear in the issue description! They're used to automatically apply labels and organize the issue in the project board.

---

## Field 1: Priority (Required ⚠️)

### What It Does

Automatically applies a priority label to classify urgency

### Options

- **must-have** - Critical, urgent, blocking work
- **should-have** - Important but not critical
- **could-have** - Nice to have, lower priority
- **won't-have** - Out of scope, rejected

### When I Generate Output

I'll tell you:

```
📋 Metadata: Priority
Select: must-have
```

Then you select "must-have" from the dropdown menu in GitHub.

### How to Decide Priority

See `03-SCRUM-CONCEPTS.md` for detailed guidance, but quick rules:

🔴 **must-have** = Users blocked, security issue, hard deadline, critical bug
🟡 **should-have** = Important enhancement, quality improvement, common use case
🟢 **could-have** = Nice improvement, edge case, low impact
⚪ **won't-have** = Out of scope, deprioritized

**Tip:** Most tickets are "should-have". Don't overuse "must-have"!

### What Label Gets Applied

- Selecting "must-have" → Applies `priority:must-have` label
- Selecting "should-have" → Applies `priority:should-have` label
- And so on...

---

## Field 2: Estimate (Optional)

### What It Does

Automatically applies a story points label for effort estimation

### Options

- **(blank)** - No estimate
- **1, 2, 3, 5, 8, 13, 21, 34, 55, 89** - Fibonacci numbers

### Remember: 1 Point = 1 Day

- **1** = 1 day
- **2** = 2 days
- **3** = 3 days
- **5** = 1 week (5 days)
- **8** = 1.5 weeks
- **13** = 2.5 weeks (consider breaking down!)
- **21+** = Too large, must break into smaller tickets

### When I Generate Output

I'll tell you:

```
📋 Metadata: Estimate
Select: 5 (= 1 week)
```

Then you select "5" from the dropdown menu in GitHub.

### Special Cases

**For Epics:**

```
📋 Metadata: Estimate
Leave blank
```

Epics are NOT estimated directly! Child Items have estimates instead. The Epic's total effort = sum of all child Items.

**For uncertain estimates:**

- It's okay to leave blank
- You can add estimate later during refinement
- When in doubt, estimate higher

### What Label Gets Applied

- Selecting "5" → Applies `estimate:5` label
- Leaving blank → No estimate label applied

---

## Field 3: Blocked By (Optional)

### What It Does

Marks this issue as blocked by another issue (can't start until blocker is resolved)

### Format

`#123` - Issue number with `#` symbol

### When to Use

Use this field when:

- Can't physically start this work until another ticket is done
- Technical dependency (needs API endpoint, needs migration, etc.)
- Waiting for decision from another ticket

**Examples:**

- Task #201 "Migrate config format" is blocked by Task #200 "Upgrade PandaCSS"
  - Enter: `#200`
- Story #301 "Add search to dashboard" is blocked by Task #300 "Build search API"
  - Enter: `#300`

### When I Generate Output

If there's a blocker:

```
📋 Metadata: Blocked By
Enter: #200
```

If no blocker:

```
📋 Metadata: Blocked By
Leave blank
```

### What Label Gets Applied

- Entering `#200` → Applies `blocked` label
- Leaving blank → No blocked label

### Important Notes

❗ Don't use this for "nice to have" relationships - only true blockers
❗ Issue will stay in backlog until blocker is resolved
❗ You can edit this later if blocker changes

---

## Field 4: Parent Issue (Optional)

### What It Does

Links this issue to a parent Epic (marks as child of larger initiative)

### Format

`#456` - Issue number with `#` symbol

### When to Use

Use this field when:

- This Item is part of an Epic's scope
- Work is one piece of a larger initiative
- Want to track progress against parent Epic

**Examples:**

- Item #102 "Create Select component" is part of Epic #100 "Build form system"
  - Enter: `#100`
- Item #205 "Add dark mode to Button" is part of Epic #200 "Dark mode support"
  - Enter: `#200`

### When I Generate Output

If there's a parent:

```
📋 Metadata: Parent Issue
Enter: #100
```

If no parent:

```
📋 Metadata: Parent Issue
Leave blank
```

### What Label Gets Applied

- Entering `#100` → Applies `has-parent` label
- Leaving blank → No has-parent label

### Important Notes

❗ Usually used for **Items** that are part of **Epics**
❗ Stories and Tasks can also have parents, but less common
❗ Epics themselves usually don't have parents (unless nested, which is rare)

---

## Using Both Blocked By AND Parent Issue

You can use both fields together!

**Example:**

Epic #100: "Build form system"

- Item #101: "Base FormField component" (parent: #100)
- Item #102: "Input component" (parent: #100, blocked by: #101)
- Item #103: "Select component" (parent: #100, blocked by: #101)

**Item #102 would have:**

```
Blocked By: #101
Parent Issue: #100
```

**Meaning:** Part of Epic #100, but can't start until Item #101 is done.

---

## How Labels Are Applied Automatically

Based on your metadata selections, GitHub applies these labels:

### From Priority Field

- `priority:must-have`
- `priority:should-have`
- `priority:could-have`
- `priority:won't-have`

### From Estimate Field

- `estimate:1`
- `estimate:2`
- `estimate:3`
- `estimate:5`
- `estimate:8`
- `estimate:13`
- `estimate:21`
- (etc.)

### From Issue Type (Set by Form)

When you choose which issue form to use, it automatically applies:

- `issue:bug` (Bug Report form)
- `issue:story` (Story form)
- `issue:epic` (Epic form)
- `issue:task` (Task form)
- `issue:item` (Item form)

### From Relationships

- `blocked` (if Blocked By is filled)
- `has-parent` (if Parent Issue is filled)

### Default for All New Issues

- `status:backlog` (all new issues start in backlog)

**You never manually add these labels!** The form handles everything automatically based on your selections.

---

## How It Works with GitHub Projects

Your repository uses **GitHub Project #9** to track all issues.

### Project Fields Auto-Populated

When you create an issue with metadata:

**Priority field** → Syncs to Project "Priority" field

- must-have → "Must Have"
- should-have → "Should Have"
- could-have → "Could Have"
- won't-have → "Won't Have"

**Estimate field** → Syncs to Project "Story Points" field

- 5 → 5 (numeric value)

**Issue Type** → Syncs to Project "Issue Type" field

- issue:bug → "Bug"
- issue:story → "Story"
- issue:epic → "Epic"
- issue:task → "Task"
- issue:item → "Item"

**Status** → Defaults to "Todo" (backlog)

### Workflow

1. You create issue with metadata
2. GitHub applies labels automatically
3. Issue appears in Project board
4. Project fields are populated from labels
5. Team can filter/sort by priority, estimate, type

---

## Pro Tips

### ✅ Do's

✅ **Always set Priority** - It's required for a reason
✅ **Estimate when possible** - Helps with sprint planning
✅ **Use Blocked By for real blockers** - Not just "nice to have" dependencies
✅ **Link Items to Epics** - Use Parent Issue to track progress
✅ **Edit later if needed** - Metadata can be updated anytime

### ❌ Don'ts

❌ **Don't skip Priority** - Form won't let you submit anyway
❌ **Don't estimate Epics** - Only child Items get estimates
❌ **Don't block unnecessarily** - Only for true technical dependencies
❌ **Don't overthink it** - Metadata can be adjusted during refinement

---

## Common Questions

**Q: Can I change metadata after creating the issue?**
A: Yes! Edit the issue and change the dropdown values. Labels will update automatically.

**Q: What if I'm not sure about the estimate?**
A: Leave it blank. You can add it later during sprint planning or refinement.

**Q: Can an issue be blocked by multiple issues?**
A: The form only accepts one issue number, but you can manually add more in the issue description.

**Q: Do I need to add labels manually?**
A: No! The form automatically applies labels based on your metadata selections.

**Q: What if the blocking issue gets closed?**
A: Manually remove the `#123` from the Blocked By field and the `blocked` label will be removed.

**Q: Can a Story or Task have a parent?**
A: Yes, but it's uncommon. Usually Items have parents (Epics). But if your Story is part of a larger Epic, you can link it.

---

## Quick Reference

| Field            | Required? | Format               | Effect                     |
| ---------------- | --------- | -------------------- | -------------------------- |
| **Priority**     | Yes ⚠️    | Dropdown             | Applies `priority:*` label |
| **Estimate**     | No        | Dropdown (Fibonacci) | Applies `estimate:*` label |
| **Blocked By**   | No        | `#123`               | Applies `blocked` label    |
| **Parent Issue** | No        | `#456`               | Applies `has-parent` label |

**Remember:** These fields are at the TOP of the form, before the issue content fields!

---

## Visual Example

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚙️ Metadata Fields
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Priority: [must-have ▼]         ← Select from dropdown

Estimate: [5 ▼]                 ← Select from dropdown (or leave blank)

Blocked By: [#200]              ← Type issue number (or leave blank)

Parent Issue: [#100]            ← Type issue number (or leave blank)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 Issue Details
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Content fields below...]
```

---

Need help deciding what values to use? That's what our conversation is for! I'll guide you through selecting the right priority, estimate, and relationships. 😊
