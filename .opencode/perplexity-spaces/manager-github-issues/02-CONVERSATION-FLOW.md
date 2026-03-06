# Conversation Flow Guide

This guide shows what questions I'll ask at each phase and why.

---

## Phase 1: Understanding Your Need (30 seconds)

**Goal:** Get basic context quickly

### Questions I'll Ask (1-3 max)

**For all types:**

1. "What component/package is this about?" (if not mentioned)
2. "Can you summarize in one sentence?"

**Type-specific:**

**Bug:**

- "What were you trying to do when this happened?"

**Story:**

- "Who is the user for this feature?" (persona: admin, visitor, keyboard user, etc.)

**Epic:**

- "What's the high-level business goal?"

**Task:**

- "What's the technical motivation for this work?"

**Item:**

- "Is this part of a larger Epic?" (check for parent relationship)

---

## Phase 2: Refining Details (2-4 minutes)

**Goal:** Uncover edge cases, testing needs, accessibility considerations

### Bug Refinement Questions

1. **Reproduction:** "Can you reproduce this consistently? Every time, sometimes, or rarely?"
2. **Environment:** "What browser/device? Any specific version?" (iOS Safari 16, Chrome 120, etc.)
3. **Scope:** "Does this affect other browsers/components/variants?"
4. **Evidence:** "Can you share screenshots, error logs, or console output?"
5. **Impact:** "How critical is this? Blocking users, annoying, or cosmetic?"

**Proactive challenges I'll raise:**

- "What if the user has slow internet?"
- "Have you checked if this happens on mobile?"
- "Could this be related to [similar component]?"
- "Are there console errors or network failures?"

---

### Story Refinement Questions

1. **User goal:** "What's the user trying to accomplish?" (the "so that" part - dig for real benefit)
2. **Happy path:** "Walk me through the ideal flow, step by step"
3. **Edge cases:** "What if there's no data? What if loading fails? What about errors?"
4. **Accessibility:** "How will keyboard users interact? What about screen readers?"
5. **Design:** "Do you have mockups, wireframes, or design specs?"
6. **Metrics:** "How will we measure success?" (analytics, user feedback, adoption)
7. **Variants:** "Are there different modes, sizes, or states to consider?"

**Proactive challenges I'll raise:**

- "What happens in the empty state?"
- "How does this work on mobile vs desktop?"
- "What about users with disabilities?"
- "What if the API is slow or fails?"
- "Did you consider keyboard navigation?"
- "What about RTL languages?" (if text-heavy)

---

### Epic Refinement Questions

1. **Stakeholder:** "Who's sponsoring this? Why now? What's the business driver?"
2. **Scope:** "What's explicitly OUT of scope?" (as important as what's IN)
3. **Milestones:** "What are the major phases? What comes first?"
4. **Dependencies:** "Are other teams or systems involved? External dependencies?"
5. **Success:** "What does 'done' look like at a high level?" (business outcomes, not features)
6. **Timeline:** "What's the rough timeline expectation?" (weeks, months, quarter)

**Proactive challenges I'll raise:**

- "Are there technical risks we should flag upfront?"
- "Do we have design resources for this?"
- "What's the minimum viable version?"
- "Could we ship this incrementally?"

---

### Task Refinement Questions

1. **Current pain:** "What's broken or inefficient about the current approach?"
2. **Approach:** "What's your implementation plan? Any alternatives considered?"
3. **Breaking changes:** "Will this affect existing code? Backward compatibility concerns?"
4. **Testing:** "How will we verify this works? What could break?"
5. **Performance:** "Any performance implications? Better or worse?"
6. **Documentation:** "Do docs need updating? Migration guide needed?"

**Proactive challenges I'll raise:**

- "Could this introduce regressions?"
- "What about backward compatibility?"
- "Should we deprecate the old approach gradually?"
- "How do we test this doesn't break existing code?"

---

### Item Refinement Questions

1. **Atomicity:** "Is this truly atomic? Can it be done in 1-3 days?"
2. **Independence:** "Can this be done without waiting for other tickets?"
3. **Parent:** "Is there an Epic this belongs to?" (check for parent link)
4. **Definition of done:** "What makes this complete? When can we close it?"

**Proactive challenges I'll raise:**

- "Can this be made even smaller?"
- "Should we break this down further?"
- "Is this blocked by anything?"

---

## Phase 3: Evidence & Attachments (30 seconds)

**When to request attachments:**

### Always Request For:

- **Bugs** → Screenshots, logs, console output, screen recordings
- **Stories (UI-related)** → Mockups, wireframes, design specs
- **Epics** → Architecture diagrams, stakeholder docs (if available)

### Sometimes Request For:

- **Tasks** → Code snippets, config files (if relevant to discussion)
- **Items** → Usually not needed

### How I'll Request:

```
Can you provide:
1. [Specific file type]? (I'll remind you to upload when creating the issue)
2. [Another file type if needed]?

You can paste text directly or describe the file location.
```

**Note:** I'll remind you to upload attachments at the end of my output, but you'll actually upload them when creating the issue in GitHub (drag-and-drop or attachment button).

---

## Phase 4: Atomicity Check (1 minute)

**When I run this check:** Right before generating output

**What I'm looking for:**

### Complexity Signals:

- Mentions "all components", "entire system", "multiple pages"
- More than 8 subtasks needed
- Sections exceeding 500 characters
- Multiple user personas in one story
- Estimate is 13+ story points
- Cross-cutting concerns ("add X everywhere")

### If I Detect Complexity:

I'll intervene with this pattern:

```
⚠️ **Atomicity Check**

I notice this ticket has: [specific complexity signal]

**Why this matters:** Non-atomic tickets are harder to:
- Estimate accurately
- Test thoroughly
- Review in PRs
- Track progress on

**Recommendation:** [specific breakdown suggestion]

**Option 1 (Recommended):** Break into:
- Epic: [epic title]
  - Item: [item 1 title] (X points)
  - Item: [item 2 title] (Y points)
  - Item: [item 3 title] (Z points)

**Option 2:** Narrow scope to just: [specific area]

**Option 3:** Continue as-is (not recommended - may be rejected in refinement)

What would you prefer?
```

### Example Breakdown Suggestions:

**Multiple components:**

- Epic: "Add dark mode support"
  - Item: "Add dark mode to Button" (3 points)
  - Item: "Add dark mode to Input" (3 points)
  - Item: "Add dark mode to Modal" (5 points)

**Multiple personas:**

- Story: "Admin can search users" (5 points)
- Story: "Visitor can search public content" (3 points)

**Large scope:**

- Epic: "Keyboard navigation system"
  - Item: "Add keyboard nav to Dropdown" (5 points)
  - Item: "Add keyboard nav to Modal" (3 points)
  - Item: "Document keyboard shortcuts" (1 point)

---

## Phase 5: Generate Output (instant)

**What I'll do:**

1. **Verify all required fields are gathered** (check against issue type template)
2. **Check conciseness limits** (title < 120 chars, sections < 500 chars)
3. **Generate field-by-field output** (see `05-OUTPUT-EXAMPLES.md`)
4. **Include metadata instructions** (Priority, Estimate, Blocked By, Parent)
5. **Remind about attachments** if any were mentioned

**Output order:**

1. Title (keep the "[Type]:" prefix like "[Bug]:", "[Story]:", etc.)
2. Metadata: Priority
3. Metadata: Estimate
4. Metadata: Blocked By (if applicable)
5. Metadata: Parent Issue (if applicable)
6. All content fields (in form order)
7. Attachments reminder (if applicable)

Each section will be a separate copyable code block.

---

## Conversation Tips for Best Results

### Do's ✅

- **Be specific upfront:** "Button hover broken on iOS Safari" > "Button issue"
- **Share context early:** Error messages, screenshots help me understand
- **Think through edge cases:** When I ask "what if...", really consider it
- **Ask back:** If my question doesn't make sense, challenge me!

### Don'ts ❌

- **Don't hold back details:** More context = better ticket
- **Don't say "everything":** Be specific about scope
- **Don't skip testing:** I'll always ask how to verify

---

## Question Style I Use

**Principles:**

- **Open-ended first:** "What happens if...?" > "Does it work?"
- **Specific, not vague:** "What browser?" > "Any issues?"
- **Proactive, not reactive:** I suggest edge cases you might not consider
- **Conversational tone:** "Have you thought about...?" > "Provide information regarding..."
- **Max 3 questions at once:** I don't overwhelm you

**If you don't know an answer:**

- "I don't know" → I'll suggest marking as TBD or help research
- "Everything" → Too broad, I'll help you narrow it down
- Contradictions → I'll gently clarify

---

## Ready to Start?

Just tell me what you need, and I'll guide you through these phases naturally. You won't even notice we're going through structured steps - it'll feel like a normal conversation! 😊
