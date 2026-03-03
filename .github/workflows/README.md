# GitHub Actions: Label Automation System

This directory contains automated workflows that enforce label-based issue management for FulgensUI.

## 📋 Overview

**Goal:** Maintain consistent, validated issue labels as the single source of truth for status, priority, and type tracking.

### Why Label-Based?

Previously, we attempted bidirectional sync with GitHub Project #9, but this failed because:

- User-owned projects require PAT authentication (GITHUB_TOKEN doesn't work)
- GraphQL queries fail in Actions for user projects
- Webhook events (`projects_v2_item`) only work for org-owned projects

**Benefits of label-only approach:**

- ✅ No authentication issues (uses default GITHUB_TOKEN)
- ✅ Instant sync (<30 seconds vs 15-minute delay)
- ✅ Simpler implementation (REST API only, no GraphQL)
- ✅ More portable (works in any repo)
- ✅ No external dependencies

### Workflow Files

1. **`enforce-single-status.yml`** - Status label mutual exclusion + transition validation
2. **`enforce-single-priority.yml`** - Priority label mutual exclusion
3. **`enforce-single-type.yml`** - Type label mutual exclusion
4. **`auto-label-new-issues.yml`** - Add status:backlog to new issues
5. **`auto-close-done.yml`** - Close issues when status:done applied
6. **`auto-reopen-backlog.yml`** - Reset to backlog when reopened
7. **`cleanup-labels.yml`** - Daily cleanup job (00:00 GMT)

### Documentation Files

- **[LABEL-AUTOMATION.md](./LABEL-AUTOMATION.md)** - Comprehensive user guide (~400 lines)
- **[TRANSITION-RULES.md](./TRANSITION-RULES.md)** - Visual transition matrix (~200 lines)
- **[DIAGRAM.txt](./DIAGRAM.txt)** - Workflow diagrams

---

## 🏷️ Label Categories

### 1. Status Labels (Mutually Exclusive)

**Only ONE status label per issue:**

- `status:backlog` - In backlog, not ready
- `status:ready` - Ready for work
- `status:development` - Actively being developed
- `status:review` - In code review
- `status:qa` - Being tested
- `status:defect` - Has defect, needs rework
- `status:done` - Complete (auto-closes issue)

**Strict transition validation enforced.** See [TRANSITION-RULES.md](./TRANSITION-RULES.md).

### 2. Priority Labels (Mutually Exclusive)

**Only ONE priority label per issue:**

- `priority:must-have` - Critical priority
- `priority:should-have` - High priority
- `priority:could-have` - Medium priority
- `priority:won't-have` - Low priority

**No transition validation** - any-to-any allowed.

### 3. Type Labels (Mutually Exclusive)

**Only ONE type label per issue:**

- `type:feat` - New feature
- `type:fix` - Bug fix
- `type:docs` - Documentation
- `type:refactor` - Code refactoring
- `type:perf` - Performance improvement
- `type:build` - Build system changes
- `type:test` - Test changes
- `type:ci` - CI/CD changes
- `type:revert` - Revert change
- `type:chore` - Other changes
- `type:style` - Code style changes

**No transition validation** - any-to-any allowed.

### 4. Issue Labels (NOT Mutually Exclusive)

**Multiple allowed** (separate from type labels):

- `issue:bug` - Something broken
- `issue:story` - User story
- `issue:epic` - Large feature
- `issue:task` - General task
- `issue:item` - Generic work item

---

## 🔄 How It Works

### Workflow 1: Status Label Enforcement (Instant)

**Trigger:** When any label is added to an issue

**Flow:**

```
User adds status:* label
    ↓
Workflow checks for multiple status labels
    ↓
Validates transition (from old → new)
    ↓
If valid: Remove old label, keep new label
If invalid: Remove new label, post error comment
    ↓
✅ Only one status label remains (<30 seconds)
```

**Example (Valid):**

- Issue has `status:development`
- User adds `status:review`
- ✅ Kept `status:review`, removed `status:development`

**Example (Invalid):**

- Issue has `status:backlog`
- User adds `status:done`
- ❌ Removed `status:done`, kept `status:backlog`
- Comment: "Cannot go from backlog → done. Valid next: ready, development, defect"

---

### Workflow 2: Priority/Type Label Enforcement (Instant)

**Trigger:** When any label is added to an issue

**Flow:**

```
User adds priority:* or type:* label
    ↓
Workflow checks for multiple labels in category
    ↓
Removes old label, keeps new label
    ↓
✅ Only one label remains (<30 seconds)
```

**Example:**

- Issue has `priority:must-have`
- User adds `priority:could-have`
- ✅ Kept `priority:could-have`, removed `priority:must-have`

---

### Workflow 3: Auto-Label New Issues

**Trigger:** When a new issue is created

**Flow:**

```
New issue created
    ↓
Check if status label already exists
    ↓
If not: Add status:backlog
    ↓
✅ Issue enters workflow (<30 seconds)
```

---

### Workflow 4: Auto-Close on Done

**Trigger:** When `status:done` label is added

**Flow:**

```
User adds status:done
    ↓
Check if issue is open
    ↓
Close issue (state: closed, reason: completed)
    ↓
Add informative comment
    ↓
✅ Issue closed automatically
```

---

### Workflow 5: Auto-Reopen to Backlog

**Trigger:** When a closed issue is reopened

**Flow:**

```
User reopens closed issue
    ↓
Remove current status label
    ↓
Add status:backlog
    ↓
Add informative comment
    ↓
✅ Issue reset to start of workflow
```

---

### Workflow 6: Daily Cleanup

**Trigger:** Daily at 00:00 GMT + manual dispatch

**Flow:**

```
Cron fires at midnight UTC
    ↓
Fetch all open issues
    ↓
For each issue:
  - Check for multiple status/priority/type labels
  - Check for missing status label
  - Fix violations (keep first, remove rest)
  - Add comment explaining fixes
    ↓
✅ All issues clean (<5 minutes)
```

---

## 🗺️ Status Transitions

### Valid Transitions

```
backlog → ready, development, defect
ready → development, backlog
development → review, qa, defect, backlog
review → qa, development, defect
qa → done, defect, development, backlog
defect → development, backlog
done → (any - for reopening)
```

### Common Workflows

**Happy Path:**

```
backlog → ready → development → review → qa → done
```

**Quick Fix:**

```
backlog → development → qa → done
```

**Bug from QA:**

```
qa → defect → development → review → qa → done
```

**See [TRANSITION-RULES.md](./TRANSITION-RULES.md) for complete state machine diagram.**

---

## 🔧 Configuration

### Hardcoded Values

All workflows use:

```yaml
REPO_OWNER: "0xbaitan"
REPO_NAME: "FulgensUI"
```

### Required Permissions

```yaml
permissions:
  issues: write # Add/remove labels, close/reopen issues
```

**Repository Settings:**

- Settings → Actions → General → Workflow permissions
- Set to: **"Read and write permissions"** ✅

---

## 🧪 Testing

### Test 1: Status Label Enforcement

1. Open any issue
2. Add label `status:development`
3. Add label `status:done` (invalid transition)
4. Check Actions tab → "Enforce Single Status Label"
5. Verify error comment posted
6. Verify `status:done` was removed

**Expected:** ❌ Invalid transition blocked with error comment

---

### Test 2: Priority Label Enforcement

1. Open any issue
2. Add label `priority:must-have`
3. Add label `priority:could-have`
4. Check Actions tab → "Enforce Single Priority Label"
5. Verify only `priority:could-have` remains

**Expected:** ✅ Old priority removed, new priority kept

---

### Test 3: Auto-Label New Issues

1. Create new issue
2. Check Actions tab → "Auto-Label New Issues"
3. Verify `status:backlog` was added automatically

**Expected:** ✅ New issue has `status:backlog`

---

### Test 4: Auto-Close on Done

1. Open any issue
2. Add label `status:done`
3. Check Actions tab → "Auto-Close Done Issues"
4. Verify issue is closed

**Expected:** ✅ Issue automatically closed

---

### Test 5: Auto-Reopen to Backlog

1. Close any issue with `status:done`
2. Reopen the issue
3. Check Actions tab → "Auto-Reopen to Backlog"
4. Verify `status:backlog` was added

**Expected:** ✅ Issue reset to `status:backlog`

---

### Test 6: Daily Cleanup

1. Manually add multiple status labels to an issue
2. Go to Actions → "Cleanup Labels" → "Run workflow"
3. Check issue - should have only one status label
4. Verify cleanup comment was added

**Expected:** ✅ Violations fixed, comment added

---

## 📊 Workflow Logs

### Success Log Example (Status Enforcement):

```
Current labels: status:backlog, status:ready
Triggered by label: status:ready
Previous status: status:backlog
New status: status:ready
Transition: backlog → ready
✅ Transition is valid
Removing label: status:backlog
Status label enforcement complete
```

### Error Log Example (Invalid Transition):

```
Current labels: status:backlog
Triggered by label: status:done
Previous status: status:backlog
New status: status:done
Transition: backlog → done
❌ Transition is INVALID
Valid transitions from backlog: ready, development, defect
Removing invalid label: status:done
```

### Cleanup Log Example:

```
Starting daily label cleanup...
Found 12 open issues to check

Issue #4: status:backlog, status:ready, status:done
  ⚠️  Multiple status labels
  ❌ Removed: status:ready
  ❌ Removed: status:done
  ✅ Issue #4 fixed

=== CLEANUP SUMMARY ===
Total issues checked: 12
Issues fixed: 3
Total violations corrected: 5
Clean issues: 9
```

---

## ⚠️ Troubleshooting

### Issue 1: Label added but not enforced

**Cause:** Workflow may have failed or been skipped

**Solution:**

1. Check Actions tab for failed runs
2. View workflow logs for errors
3. Verify label name is exact (e.g., `status:backlog`, not `Status:Backlog`)

---

### Issue 2: Invalid transition not blocked

**Cause:** Transition rules may need updating

**Solution:**

1. Check [TRANSITION-RULES.md](./TRANSITION-RULES.md) for current rules
2. Verify `TRANSITION_RULES` object in `enforce-single-status.yml`
3. Open issue if rules are incorrect

---

### Issue 3: Cleanup not running

**Cause:** Scheduled workflows may be delayed by GitHub

**Solution:**

1. Trigger manually: Actions → "Cleanup Labels" → "Run workflow"
2. Check if workflow is disabled: Actions → Enable if needed
3. Note: Cron jobs may have 3-10 minute delays

---

### Issue 4: Multiple labels still present after enforcement

**Cause:** Race condition or workflow failure

**Solution:**

1. Wait for daily cleanup (00:00 GMT)
2. Or manually trigger cleanup workflow
3. Or manually remove extra labels

---

## 🔍 Advanced Usage

### Trigger Cleanup via GitHub CLI

```bash
# Trigger cleanup immediately
gh workflow run cleanup-labels.yml

# View recent cleanup runs
gh run list --workflow=cleanup-labels.yml --limit 5

# View specific run logs
gh run view <run-id> --log
```

### Disable Daily Cleanup Temporarily

1. Edit `.github/workflows/cleanup-labels.yml`
2. Comment out schedule trigger:
   ```yaml
   on:
     # schedule:
     #   - cron: '0 0 * * *'
     workflow_dispatch: # Keep manual trigger
   ```
3. Commit and push

### Update Transition Rules

1. Edit `.github/workflows/enforce-single-status.yml`
2. Update `TRANSITION_RULES` object (~line 50):
   ```javascript
   const TRANSITION_RULES = {
     backlog: ["ready", "development", "defect"],
     // ... add/remove transitions
   };
   ```
3. Update [TRANSITION-RULES.md](./TRANSITION-RULES.md) to match
4. Test with sample issues

---

## 🚀 Manual Project Sync

**Note:** Project #9 board is optional. Labels are the source of truth.

To manually sync labels to the project board, use:

```bash
/sync-project
```

This is a **one-way sync** (labels → project) implemented as an OpenCode command.

See `.opencode/commands/sync-project.md` for details.

---

## 📝 Maintenance

### Adding New Labels

1. Create labels in GitHub: Settings → Labels
2. Update workflow files to include new labels
3. Update documentation ([LABEL-AUTOMATION.md](./LABEL-AUTOMATION.md), [TRANSITION-RULES.md](./TRANSITION-RULES.md))
4. Test with sample issues

### Removing Old Workflows

The following workflows have been deprecated:

- ~~`sync-label-to-project.yml`~~ (197 lines) - Replaced by label-only system
- ~~`sync-project-to-label.yml`~~ (219 lines) - Replaced by label-only system
- ~~`manual-sync-all.yml`~~ (294 lines) - Replaced by label-only system

These will be deleted after confirming new system works correctly.

---

## 📚 References

- [GitHub Actions: Workflow syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [GitHub REST API: Issues](https://docs.github.com/en/rest/issues)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [LABEL-AUTOMATION.md](./LABEL-AUTOMATION.md) - Full user guide
- [TRANSITION-RULES.md](./TRANSITION-RULES.md) - State machine diagram

---

**Created:** March 3, 2026  
**Last Updated:** March 3, 2026  
**Maintained by:** @0xbaitan
