# Quick Setup Guide - Perplexity Space

## ⚡ 5-Minute Setup

### 1. Create Perplexity Space

- Go to Perplexity AI → Spaces → New Space
- Name: **"GitHub Issue Creator"**

### 2. Add Main Instructions

Copy **all content** from `PERPLEXITY-INSTRUCTIONS.md` and paste into Space Instructions field

### 3. Share Reference Files

Share these 5 files with your team (via wiki, Drive, or GitHub):

- `01-ISSUE-TYPES-GUIDE.md`
- `02-CONVERSATION-FLOW.md`
- `03-SCRUM-CONCEPTS.md`
- `04-GITHUB-METADATA-GUIDE.md`
- `05-OUTPUT-EXAMPLES.md`

### 4. Test It

Try: `"Bug: Button hover doesn't work on mobile Safari"`

### 5. Share with Team

Share the Space link with your team

---

## 📊 File Sizes (Actual)

| File                        | Characters | Status                              |
| --------------------------- | ---------- | ----------------------------------- |
| PERPLEXITY-INSTRUCTIONS.md  | 4,388      | ✅ Within 10k limit (53% reduction) |
| 01-ISSUE-TYPES-GUIDE.md     | 7,697      | ✅                                  |
| 02-CONVERSATION-FLOW.md     | 8,941      | ✅                                  |
| 03-SCRUM-CONCEPTS.md        | 10,986     | ✅                                  |
| 04-GITHUB-METADATA-GUIDE.md | 10,380     | ✅                                  |
| 05-OUTPUT-EXAMPLES.md       | 16,300     | ✅                                  |
| **Total**                   | **58,692** | ✅                                  |

---

## 🎯 What You Get

### Agent Behavior

- Conversational, beginner-friendly SCRUM coach
- Asks 5-10 clarifying questions
- Suggests edge cases and testing criteria
- Checks for atomicity (breaks down large tickets)
- Generates field-by-field copyable markdown

### Story Point Scale

**1 point = 1 day of work**

- 1 = 1 day
- 2 = 2 days
- 3 = 3 days
- 5 = 1 week
- 8 = 1.5 weeks
- 13+ = Too large, break down

### Output Format

Each GitHub Issue Form field gets its own copyable code block:

```
📋 Field: Feature
Copy this into the "Feature" field:

```

Button component - hover state

```

```

Team members copy-paste one field at a time into GitHub.

---

## 🚀 First Ticket Guide for Team

1. Open Perplexity Space: "GitHub Issue Creator"
2. Describe issue: "Bug: Modal doesn't close on ESC key"
3. Answer questions (2-3 minutes)
4. Receive field-by-field output
5. Go to GitHub → New Issue → Select Bug form
6. Copy-paste each block into corresponding field
7. Submit

**Time:** ~5 minutes vs ~20 minutes manually

---

## 🔧 Customization Quick Links

**Change story point scale?**
→ Edit `PERPLEXITY-INSTRUCTIONS.md` "Story Points = Days of Work" section
→ Also update `03-SCRUM-CONCEPTS.md`

**Add custom issue type?**
→ Add sections to `01-ISSUE-TYPES-GUIDE.md`, `02-CONVERSATION-FLOW.md`, `05-OUTPUT-EXAMPLES.md`

**Change priority definitions?**
→ Edit `03-SCRUM-CONCEPTS.md` "MoSCoW Priority" section

---

## ✅ Success Checklist

After setup, verify:

- [ ] Perplexity Space created and named
- [ ] Main instructions pasted into Space settings
- [ ] Test conversation works (try creating a bug)
- [ ] Agent asks clarifying questions
- [ ] Agent generates field-by-field output
- [ ] Output includes metadata instructions
- [ ] Reference files shared with team (wiki/Drive/GitHub)
- [ ] Space link shared with team
- [ ] At least 2 team members have tested it
- [ ] First real GitHub issue created successfully

---

## 🆘 Quick Troubleshooting

**Q: Agent doesn't reference the 5 files**
A: That's okay! Main instructions are self-contained. Reference files are for team members to read directly.

**Q: 1 point = 1 day is too large for us**
A: Edit the scale in `PERPLEXITY-INSTRUCTIONS.md` and `03-SCRUM-CONCEPTS.md` (see "Change story point scale" above)

**Q: Output is too verbose**
A: Add "Be concise" to "Output Rules" section in `PERPLEXITY-INSTRUCTIONS.md`

**Q: Team feels interrogated by questions**
A: Reduce questions in `02-CONVERSATION-FLOW.md` Phase 2

---

## 📚 Full Documentation

See `README.md` in this directory for:

- Detailed setup instructions
- Customization guide
- Troubleshooting
- Success metrics
- Team onboarding tips

---

**Ready to go!** Open Perplexity and create your first ticket. 🚀
