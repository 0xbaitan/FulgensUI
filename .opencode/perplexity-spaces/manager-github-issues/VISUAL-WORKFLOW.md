# Visual Workflow Guide

This guide shows the complete flow from conversation to GitHub issue creation.

---

## 📊 The Complete Workflow

````
┌─────────────────────────────────────────────────────────────────┐
│                    Team Member Needs Ticket                      │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 1: Open Perplexity Space "GitHub Issue Creator"           │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ 💬 "Bug: Button hover doesn't work on mobile Safari"     │  │
│  └───────────────────────────────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 2: Agent Asks Clarifying Questions (2-3 minutes)          │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ 🤖 "Can you reproduce this consistently?"                │  │
│  │ 👤 "Yes, every time on iOS Safari"                       │  │
│  │                                                           │  │
│  │ 🤖 "What browser/device?"                                │  │
│  │ 👤 "Safari 16 on iPhone 14"                              │  │
│  │                                                           │  │
│  │ 🤖 "Can you share a screenshot?"                         │  │
│  │ 👤 "Yes, I have screenshot-button.png"                   │  │
│  │                                                           │  │
│  │ 🤖 "What about other browsers?"                          │  │
│  │ 👤 "Works fine on Chrome and Firefox"                    │  │
│  └───────────────────────────────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 3: Agent Checks Atomicity                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ ✅ Ticket is atomic (single component, clear scope)      │  │
│  │ ✅ Estimate: 5 points (1 week)                           │  │
│  │ ✅ Priority: must-have (blocks mobile users)             │  │
│  └───────────────────────────────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 4: Agent Generates Field-by-Field Output                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ 📋 TITLE                                                  │  │
│  │ ```                                                       │  │
│  │ Button hover state not working on mobile Safari          │  │
│  │ ```                                                       │  │
│  │                                                           │  │
│  │ 📋 Metadata: Priority                                    │  │
│  │ Select: must-have                                        │  │
│  │                                                           │  │
│  │ 📋 Metadata: Estimate                                    │  │
│  │ Select: 5 (= 1 week)                                     │  │
│  │                                                           │  │
│  │ 📋 Field: Feature                                        │  │
│  │ ```                                                       │  │
│  │ Button component - hover state                           │  │
│  │ ```                                                       │  │
│  │                                                           │  │
│  │ 📋 Field: Scenario                                       │  │
│  │ ```                                                       │  │
│  │ 1. Open demo site on iOS Safari                          │  │
│  │ 2. Navigate to Button page                               │  │
│  │ 3. Tap primary button                                    │  │
│  │ 4. Observe no feedback                                   │  │
│  │ ```                                                       │  │
│  │                                                           │  │
│  │ [... continues for all fields ...]                       │  │
│  └───────────────────────────────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 5: Team Member Goes to GitHub                             │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ 🌐 github.com/0xbaitan/FulgensUI/issues/new/choose       │  │
│  │                                                           │  │
│  │ Select: 🐞 Bug Report                                    │  │
│  └───────────────────────────────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 6: Copy-Paste Each Field (One by One)                     │
│                                                                  │
│  GitHub Form:                  Perplexity Output:               │
│  ┌─────────────────────┐       ┌─────────────────────┐         │
│  │ Title:              │  ◄──  │ 📋 TITLE            │         │
│  │ [Bug]: _______      │       │ ```                 │         │
│  └─────────────────────┘       │ Button hover...     │         │
│                                 │ ```                 │         │
│  ┌─────────────────────┐       └─────────────────────┘         │
│  │ Priority: [▼]       │  ◄──  📋 Metadata: Priority           │
│  │ ☑ must-have         │       Select: must-have               │
│  └─────────────────────┘                                        │
│                                                                  │
│  ┌─────────────────────┐       ┌─────────────────────┐         │
│  │ Feature:            │  ◄──  │ 📋 Field: Feature   │         │
│  │ ___________________ │       │ ```                 │         │
│  │                     │       │ Button component... │         │
│  └─────────────────────┘       │ ```                 │         │
│                                 └─────────────────────┘         │
│  [... repeat for all fields ...]                                │
│                                                                  │
│  ┌─────────────────────┐                                        │
│  │ [Submit Issue]      │                                        │
│  └─────────────────────┘                                        │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  ✅ DONE! Issue Created                                         │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ github.com/0xbaitan/FulgensUI/issues/567                  │  │
│  │                                                           │  │
│  │ 🐞 Button hover state not working on mobile Safari       │  │
│  │                                                           │  │
│  │ Labels:                                                   │  │
│  │ 🏷️ status:backlog                                        │  │
│  │ 🏷️ issue:bug                                             │  │
│  │ 🏷️ priority:must-have                                    │  │
│  │ 🏷️ scope:core                                            │  │
│  │ 🏷️ estimate:5                                            │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
````

---

## 🎯 Key Benefits at Each Step

### Step 1-2: Conversation Phase

✅ **No template memorization** - Just describe the issue naturally
✅ **Proactive guidance** - Agent asks about edge cases you'd miss
✅ **Learning opportunity** - New team members learn SCRUM concepts

### Step 3: Atomicity Check

✅ **Prevents large tickets** - Catches scope creep early
✅ **Better estimates** - Smaller tickets = more accurate estimates
✅ **Faster delivery** - Atomic tickets ship incrementally

### Step 4: Output Generation

✅ **Structured format** - Every field populated correctly
✅ **Easy to review** - See full ticket before creating
✅ **Copy-paste ready** - No manual formatting

### Step 5-6: GitHub Creation

✅ **No errors** - Fields match form exactly
✅ **Fast entry** - Copy-paste faster than typing
✅ **Consistent quality** - Every ticket well-formed

---

## ⏱️ Time Comparison

### Without Perplexity Space

```
┌─────────────────────────────┬──────────┐
│ Activity                    │ Time     │
├─────────────────────────────┼──────────┤
│ Remember issue template     │ 2 min    │
│ Think through all fields    │ 5 min    │
│ Type each field manually    │ 8 min    │
│ Realize you forgot edge case│ 3 min    │
│ Update fields               │ 2 min    │
├─────────────────────────────┼──────────┤
│ TOTAL                       │ 20 min   │
└─────────────────────────────┴──────────┘
```

### With Perplexity Space

```
┌─────────────────────────────┬──────────┐
│ Activity                    │ Time     │
├─────────────────────────────┼──────────┤
│ Describe issue to agent     │ 30 sec   │
│ Answer 5-10 questions       │ 2.5 min  │
│ Review generated output     │ 30 sec   │
│ Copy-paste into GitHub      │ 1.5 min  │
├─────────────────────────────┼──────────┤
│ TOTAL                       │ 5 min    │
└─────────────────────────────┴──────────┘

Savings: 15 minutes per ticket (75% faster!)
```

---

## 📱 Example: Real Conversation

```
👤 User:
Bug: Modal doesn't close when I press ESC key

🤖 Agent:
Got it! Let me help you create a Bug report. A few quick questions:

1. Can you reproduce this consistently?
2. What browser/device are you using?
3. Does the modal close with the X button?

👤 User:
1. Yes, every time
2. Chrome 120 on Windows 11
3. Yes, X button works fine

🤖 Agent:
Perfect! A couple more things:

4. Does this happen in other browsers too?
5. Can you share a screenshot or console error?
6. What were you doing when you noticed this?

👤 User:
4. Tested Safari, same issue
5. No console errors, but I have screenshot
6. Trying to close settings modal

🤖 Agent:
Great! Let me check if this is atomic... ✅

This looks good - single component, clear scope, 3 points.

Here's your field-by-field output for GitHub:

---
📋 TITLE
Use this as your title (keep the "[Bug]:" prefix):
```

[Bug]: Modal doesn't close on ESC key press

```

[... continues with all fields ...]

👤 User:
Perfect! [Goes to GitHub and creates issue in 2 minutes]
```

---

## 🚦 Quality Gates

The agent enforces these quality checks:

### ✅ Completeness Check

- All required fields have content
- No "TBD" in critical sections
- Evidence requested for bugs

### ✅ Conciseness Check

- Title < 120 characters
- Sections < 500 characters
- Subtasks < 8 items

### ✅ Atomicity Check

- Single clear goal
- Estimate < 13 points
- Not affecting "all components"

### ✅ Testability Check

- Clear acceptance criteria
- How to verify completion
- Edge cases considered

---

## 🎓 Learning Curve

```
Day 1: First Ticket
┌──────────────────────────────────────────┐
│ • Feels like interview                   │
│ • Lots of questions                      │
│ • Learning SCRUM terms                   │
│ • Time: 8-10 minutes                     │
└──────────────────────────────────────────┘

Week 1: Getting Comfortable
┌──────────────────────────────────────────┐
│ • Anticipate questions                   │
│ • Understand "atomic"                    │
│ • Know priority scale                    │
│ • Time: 5-6 minutes                      │
└──────────────────────────────────────────┘

Month 1: Expert User
┌──────────────────────────────────────────┐
│ • Provide context upfront                │
│ • Self-check atomicity                   │
│ • Faster copy-paste                      │
│ • Time: 3-4 minutes                      │
└──────────────────────────────────────────┘
```

---

## 🎯 Success Stories (Hypothetical)

### Story 1: New Developer

> "I joined the team last week and had never used SCRUM before. The Perplexity Space taught me everything I needed - story points, atomicity, MoSCoW priority - all through natural conversation. Created my first ticket in 6 minutes and it was approved without any changes!"
>
> — Junior Dev, Week 1

### Story 2: Senior Engineer

> "I used to spend 15-20 minutes per ticket making sure I covered all edge cases. Now the agent proactively asks me about things I'd miss. My tickets are more thorough and I'm 3x faster."
>
> — Senior Engineer, Month 2

### Story 3: Product Manager

> "Our ticket quality went from 60% to 95% 'ready for development' after implementing this. Developers spend less time in refinement meetings and more time coding."
>
> — Product Manager, Quarter 2

---

## 📊 Visual Comparison

### Before: Manual Ticket Creation

```
Developer Brain 🧠
    │
    ├─ Remember template ❌ (Often forget fields)
    ├─ Think through edge cases ⚠️ (Miss some)
    ├─ Type everything manually ⏰ (Slow)
    ├─ Format markdown ⚠️ (Inconsistent)
    └─ Submit → Refinement needed 🔄
```

### After: Perplexity Space

```
Developer Brain 🧠
    │
    └─ Describe issue naturally ✅
           │
           ▼
    AI Agent 🤖
    │
    ├─ Ask clarifying questions ✅
    ├─ Suggest edge cases ✅
    ├─ Check atomicity ✅
    ├─ Format perfectly ✅
    └─ Generate output ✅
           │
           ▼
    Developer 🧠
    │
    └─ Copy-paste → Submit ✅
           │
           ▼
    Ready for Development 🚀
```

---

## 🔄 Continuous Improvement

As your team uses this system:

1. **Track pain points** - What questions are confusing?
2. **Update instructions** - Refine based on feedback
3. **Add examples** - Real tickets become templates
4. **Measure success** - Time saved, quality improved
5. **Iterate** - Continuously improve the prompts

---

**Ready to transform your ticket creation process?** 🚀

See `QUICK-SETUP.md` to get started in 5 minutes!
