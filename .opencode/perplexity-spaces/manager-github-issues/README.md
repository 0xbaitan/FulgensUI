# Perplexity Space: GitHub Issue Creator

This directory contains files for setting up a Perplexity Space that helps team members create well-formed GitHub issues through conversational refinement.

## 📁 Files in This Directory

1. **PERPLEXITY-INSTRUCTIONS.md** (7,950 chars)
   - Main conversational prompt for the Perplexity Space
   - Core agent behavior and workflow
   - Load this as the primary "Instructions" in Perplexity Space settings

2. **01-ISSUE-TYPES-GUIDE.md** (2,850 chars)
   - Explains Bug, Story, Epic, Task, and Item types
   - Decision tree for choosing the right type
   - Maps to GitHub Issue Form fields

3. **02-CONVERSATION-FLOW.md** (2,700 chars)
   - Phase-by-phase questions the agent will ask
   - Type-specific refinement patterns
   - Atomicity check procedures

4. **03-SCRUM-CONCEPTS.md** (3,100 chars)
   - Story points explained (1 point = 1 day)
   - MoSCoW priority system
   - Atomicity concept
   - Blocked vs. Parent relationships

5. **04-GITHUB-METADATA-GUIDE.md** (2,900 chars)
   - Metadata fields explanation (Priority, Estimate, Blocked By, Parent)
   - How labels are auto-applied
   - Project field mappings

6. **05-OUTPUT-EXAMPLES.md** (4,800 chars)
   - Complete output examples for all issue types
   - Field-by-field copyable markdown blocks
   - Visual guide for pasting into GitHub

**Total:** ~24,300 characters across 6 files

## 🚀 How to Set Up Perplexity Space

### Step 1: Create a New Space

1. Go to [Perplexity AI](https://perplexity.ai)
2. Click **Spaces** (left sidebar or menu)
3. Click **+ New Space**
4. Name it: **"GitHub Issue Creator"** or **"SCRUM Ticket Coach"**

### Step 2: Configure Space Settings

1. Click **Space Settings** (gear icon)
2. In the **Instructions** field:
   - Copy the **entire contents** of `PERPLEXITY-INSTRUCTIONS.md`
   - Paste into the Instructions textarea
3. Click **Save**

### Step 3: Upload Reference Files

If Perplexity Spaces supports file attachments:

1. Click **Add Files** or **Attach Documents**
2. Upload these 5 files:
   - `01-ISSUE-TYPES-GUIDE.md`
   - `02-CONVERSATION-FLOW.md`
   - `03-SCRUM-CONCEPTS.md`
   - `04-GITHUB-METADATA-GUIDE.md`
   - `05-OUTPUT-EXAMPLES.md`

**Note:** If Perplexity doesn't support attachments, you can share these files with your team via:

- Internal wiki/docs
- Google Drive folder
- GitHub repository (this location!)
- Notion page

The agent will reference them conceptually, and team members can read them if they need clarification.

### Step 4: Test the Space

1. Start a conversation in the Space
2. Try creating a simple Bug:
   ```
   Bug: Button hover doesn't work on mobile Safari
   ```
3. Verify the agent:
   - Asks clarifying questions
   - Suggests edge cases
   - Generates field-by-field output
   - Provides metadata instructions

### Step 5: Share with Team

1. Click **Share Space** (if available)
2. Set permissions:
   - **View & Chat** for team members
   - **Admin** for yourself
3. Share the Space link

Alternatively:

- Add team members to your Perplexity workspace
- Direct them to the Space you created

## 📋 How Team Members Use It

### Typical Workflow

1. **Navigate to Space**
   - Click on "GitHub Issue Creator" Space in Perplexity

2. **Start conversation**
   - Describe what they need: "Bug: Modal doesn't close on ESC key"

3. **Answer questions**
   - Agent asks 5-10 questions over 2-3 minutes
   - Be specific, share screenshots/logs

4. **Receive field-by-field output**
   - Agent generates copyable markdown blocks for each field

5. **Create GitHub issue**
   - Go to GitHub → New Issue
   - Select appropriate form (Bug/Story/Epic/Task/Item)
   - Copy-paste each block into corresponding field
   - Submit

### Example Invocations

```
"I found a bug where the button hover doesn't work"
"Create a story for adding dark mode support"
"I need an epic for redesigning the component library"
"Task: refactor the build configuration"
"Help me create a ticket for fixing the header alignment"
```

## 🎯 Use Cases

### Team Onboarding

- New team members unfamiliar with SCRUM
- Learn concepts through guided conversation
- Create their first tickets with confidence

### Quality Assurance

- Ensure tickets have all required information
- Catch atomicity issues early
- Consistent ticket format across team

### Efficiency

- Faster ticket creation (5 minutes vs 20 minutes)
- No need to memorize issue templates
- Proactive edge case discovery

## 🔧 Customization

### Adjusting Story Point Scale

If your team uses a different scale (e.g., 1 point = 4 hours):

1. Edit `PERPLEXITY-INSTRUCTIONS.md`
2. Find the "Story Points = Days of Work" section
3. Update the scale:
   ```markdown
   - **1 point** = 4 hours of focused work
   - **2 points** = 8 hours (1 day)
   - **3 points** = 12 hours (1.5 days)
   ```
4. Also update `03-SCRUM-CONCEPTS.md` with the same scale
5. Re-paste the updated instructions into Perplexity Space

### Adding Custom Issue Types

If you have additional issue forms:

1. Read the form YAML: `.github/ISSUE_TEMPLATE/your-type.yaml`
2. Add a section to `01-ISSUE-TYPES-GUIDE.md`
3. Add question flow to `02-CONVERSATION-FLOW.md`
4. Add output example to `05-OUTPUT-EXAMPLES.md`
5. Update `PERPLEXITY-INSTRUCTIONS.md` to reference the new type

### Adjusting Priority Definitions

If your team uses different priority criteria:

1. Edit `03-SCRUM-CONCEPTS.md` → "MoSCoW Priority" section
2. Redefine must-have, should-have, could-have, won't-have
3. Update examples to match your team's context

## 📊 Success Metrics

Track these to measure effectiveness:

✅ **Ticket Quality**

- Fewer "needs more info" comments
- Faster ticket refinement in standup
- Less back-and-forth during implementation

✅ **Team Adoption**

- % of team using the Space
- Number of tickets created via Space
- Positive feedback from developers

✅ **Time Savings**

- Time to create ticket (before vs after)
- Time spent in refinement meetings

✅ **Atomicity**

- Fewer tickets flagged as "too large"
- More predictable sprint velocity

## 🐛 Troubleshooting

### Agent doesn't reference files

**Issue:** Agent doesn't seem to know about the 5 reference files

**Solution:**

- If Perplexity doesn't support file attachments, that's okay
- The main instructions file is self-contained
- Reference files are for team members to read directly
- You can paste relevant sections into chat when needed

### Output is too verbose

**Issue:** Agent generates too much explanation

**Solution:**

- Edit `PERPLEXITY-INSTRUCTIONS.md`
- Add to "Output Rules for Me" section:
  ```markdown
  - Be concise in explanations
  - Focus on copyable blocks
  - Minimize commentary
  ```

### Agent asks too many questions

**Issue:** Team feels interrogated

**Solution:**

- Edit `02-CONVERSATION-FLOW.md`
- Reduce number of questions in Phase 2
- Make more questions optional based on context

### Estimate scale doesn't match team

**Issue:** 1 point = 1 day is too large/small

**Solution:** See "Adjusting Story Point Scale" in Customization section above

## 📚 Additional Resources

### For Team Members

- [SCRUM Guide](https://scrumguides.org/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [GitHub Issue Forms Documentation](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms)

### For Admins

- [Perplexity Spaces Documentation](https://docs.perplexity.ai/) (if available)
- [GitHub Projects API](https://docs.github.com/en/issues/planning-and-tracking-with-projects)
- [FulgensUI Issue Templates](.github/ISSUE_TEMPLATE/) (local reference)

## 🤝 Contributing

Found improvements? Update these files:

1. **Make changes** to the relevant `.md` file
2. **Update character counts** in this README if needed
3. **Test in Perplexity** to verify behavior
4. **Commit changes** with clear message
5. **Update Space instructions** by re-pasting updated content

## 📝 Notes

### Character Limits

- Perplexity Spaces instructions: **8,000 character limit**
- Main instructions file: **7,950 chars** (fits comfortably)
- Reference files: No strict limit if uploaded as attachments

### Browser Compatibility

- Works best in desktop browsers (Chrome, Firefox, Safari, Edge)
- Mobile works but copy-paste is more cumbersome
- Recommend desktop for first few tickets

### Language

- Currently English only
- To translate: translate all 6 `.md` files
- Keep technical terms (SCRUM, Epic, Story) consistent

## 🆘 Support

If team members have questions:

1. **Read the guide files** - Most answers are in there
2. **Try the Space** - Agent is patient and educational
3. **Ask in Slack/Teams** - Share learnings with team
4. **Update documentation** - Found a gap? Add to these files!

---

**Last Updated:** 2026-03-06
**Maintainer:** [Your Name/Team]
**Version:** 1.0.0
