# GitHub Actions: Label ↔ Project Status Sync

This directory contains automated workflows that maintain bidirectional synchronization between GitHub issue labels and GitHub Projects V2 status fields.

## 📋 Overview

**Goal:** Keep issue `status:*` labels in sync with the "Status" field on Project #9 (FulgensUI Kanban board).

### Workflow Files

1. **`sync-label-to-project.yml`** - Instant label → project sync
2. **`sync-project-to-label.yml`** - Scheduled project → label sync (every 15 min)
3. **`manual-sync-all.yml`** - Manual full bidirectional sync with dry-run support

---

## 🔄 How It Works

### Workflow 1: Label → Project (Instant)

**Trigger:** When a `status:*` label is added/removed from an issue

**Flow:**

```
User adds/removes status:* label
    ↓
GitHub triggers "issues" event
    ↓
Workflow validates label format
    ↓
Finds issue in Project #9 via GraphQL
    ↓
Maps label to Status field option ID
    ↓
Updates Project Status field via GraphQL mutation
    ↓
✅ Project board updates instantly (<30 seconds)
```

**Example:**

- Add `status:development` to issue #4 → Issue moves to "Development" column
- Change `status:ready` to `status:review` → Issue moves to "Review" column

---

### Workflow 2: Project → Label (Scheduled)

**Trigger:** Runs every 15 minutes (cron: `*/15 * * * *`) + manual dispatch

**Flow:**

```
Cron trigger fires (every 15 min)
    ↓
Fetches all items from Project #9
    ↓
For each issue:
  - Get Status field value (e.g., "Development")
  - Get current status:* labels
  - Compare and detect mismatches
  - Remove old status:* label
  - Add new status:* label matching Status field
    ↓
✅ Labels sync with project within 15 minutes
```

**Example:**

- Drag issue #4 from "Backlog" to "Review" on project board
- Wait up to 15 minutes (or trigger manually)
- Label `status:backlog` removed, `status:review` added

---

### Workflow 3: Manual Full Sync

**Trigger:** Manual `workflow_dispatch` only

**Features:**

- **Dry-run mode:** Preview changes without applying them
- **Direction control:** Sync one-way or bidirectionally
  - `labels-to-project`: Update project Status based on labels
  - `project-to-labels`: Update labels based on project Status
  - `both`: Full bidirectional sync

**Use cases:**

- Initial setup after adding workflows
- Fixing inconsistencies after manual changes
- Testing sync logic before production use

**How to use:**

1. Go to Actions tab → "Manual Full Sync"
2. Click "Run workflow"
3. Select options:
   - Dry run: `true` (preview) or `false` (apply)
   - Direction: `both`, `labels-to-project`, or `project-to-labels`
4. View detailed logs of all changes

---

## 🗺️ Status Mapping

### Label ↔ Status Field

| GitHub Label         | Project Status Field | Option ID  |
| -------------------- | -------------------- | ---------- |
| `status:backlog`     | Backlog              | `8b99bfa8` |
| `status:ready`       | Ready                | `f75ad846` |
| `status:development` | Development          | `47fc9ee4` |
| `status:review`      | Review               | `c5e8bce6` |
| `status:qa`          | QA                   | `33f744ff` |
| `status:defect`      | Defect               | `9b5ee227` |
| `status:done`        | Done                 | `98236657` |

---

## 🔧 Configuration

### Environment Variables

All workflows use these hardcoded values:

```yaml
PROJECT_NUMBER: 9 # FulgensUI project
PROJECT_OWNER: "0xbaitan" # Project owner (user account)
REPO_OWNER: "0xbaitan" # Repository owner
REPO_NAME: "FulgensUI" # Repository name
STATUS_FIELD_ID: "PVTSSF_lAHOAeQxRM4BQVimzg-fIIo" # Status field ID
```

### Required Permissions

Workflows need these GitHub Actions permissions (configured in workflow files):

```yaml
permissions:
  issues: write # Add/remove labels
  repository-projects: write # Update project items
  contents: read # Read repository
```

**Repository Settings:**

- Go to: Settings → Actions → General → Workflow permissions
- Set to: **"Read and write permissions"** ✅

---

## 🧪 Testing

### Test 1: Label → Project (Instant Sync)

1. Open issue #4 (or any issue in project)
2. Add label `status:development`
3. Go to Actions tab → "Sync Label to Project Status"
4. Wait ~10-30 seconds for workflow to complete
5. Check Project #9 board → Issue should be in "Development" column

**Expected:** ✅ Instant sync (<30 seconds)

---

### Test 2: Project → Label (Scheduled Sync)

1. Open Project #9 board
2. Drag issue #4 from "Backlog" to "Review"
3. Wait up to 15 minutes (or manually trigger "Sync Project Status to Labels")
4. Check issue #4 labels
5. Verify `status:backlog` removed, `status:review` added

**Expected:** ✅ Sync within 15 minutes (or instant if manually triggered)

---

### Test 3: Manual Full Sync (Dry Run)

1. Go to Actions → "Manual Full Sync"
2. Click "Run workflow"
3. Set:
   - Dry run: `true`
   - Direction: `both`
4. View logs to see what changes would be made
5. Run again with dry_run: `false` to apply

**Expected:** ✅ Preview of all sync operations without applying changes

---

## 📊 Workflow Logs

Each workflow provides detailed logs:

### Success Log Example:

```
=== Sync Label to Project - Summary ===
Issue: #4
Label: status:development
Action: labeled
Skipped: false
Status: success
✅ Successfully updated Status field for issue #4
```

### Scheduled Sync Log Example:

```
=== Sync Summary ===
Items processed: 3
Changes made: 1
Items already in sync: 2

Issue #4: 'status:backlog' → 'status:review'
  ✅ Synced issue #4
```

---

## ⚠️ Troubleshooting

### Issue 1: "Issue not in project #9"

**Cause:** Issue hasn't been added to the project board

**Solution:**

1. Open Project #9
2. Click "+ Add item"
3. Search for issue and add it
4. Try triggering workflow again

---

### Issue 2: "Error updating project" (GraphQL mutation failed)

**Cause:** Missing permissions or invalid field IDs

**Solution:**

1. Check repo settings: Actions → Workflow permissions → "Read and write"
2. Verify project still exists: `gh project view 9 --owner 0xbaitan`
3. Verify Status field ID hasn't changed (rare, but possible)

---

### Issue 3: Scheduled sync not running

**Cause:** GitHub Actions may delay scheduled workflows

**Solution:**

1. Trigger manually: Actions → "Sync Project Status to Labels" → "Run workflow"
2. Check if workflow is disabled: Actions → Workflow → Enable if disabled
3. Note: Scheduled workflows may have 3-10 minute delays on GitHub's infrastructure

---

### Issue 4: Label added but project not updating

**Cause:** Workflow may have failed or been skipped

**Solution:**

1. Check Actions tab for failed runs
2. View workflow logs for error messages
3. Common issues:
   - Label typo (must be exactly `status:backlog`, not `Status:Backlog`)
   - Issue not in project
   - Permissions issue

---

## 🔍 Advanced Usage

### Trigger Manual Sync via GitHub CLI

```bash
# Trigger project-to-label sync
gh workflow run sync-project-to-label.yml

# Trigger full sync with options (dry run)
gh workflow run manual-sync-all.yml \
  -f dry_run=true \
  -f direction=both

# Trigger full sync (live mode, project to labels only)
gh workflow run manual-sync-all.yml \
  -f dry_run=false \
  -f direction=project-to-labels
```

### View Recent Workflow Runs

```bash
# List recent runs
gh run list --workflow=sync-label-to-project.yml --limit 5

# View specific run logs
gh run view <run-id> --log
```

### Disable Scheduled Sync Temporarily

If you need to pause scheduled syncs:

1. Edit `.github/workflows/sync-project-to-label.yml`
2. Comment out the schedule trigger:
   ```yaml
   on:
     # schedule:
     #   - cron: '*/15 * * * *'
     workflow_dispatch: # Keep manual trigger
   ```
3. Commit and push

---

## 🚀 Future Enhancements

Potential improvements:

1. **Priority field sync:** Extend to `priority:*` labels
2. **Webhook-based sync:** Use GitHub Apps for instant project→label sync (requires org)
3. **Multi-project support:** Sync across multiple projects
4. **Custom field mapping:** Support other custom fields (Sprint, Issue Type, etc.)
5. **Slack notifications:** Alert team when sync operations occur

---

## 📝 Maintenance

### Updating Status Field Options

If you add/remove/rename Status field options:

1. Get new option IDs:

   ```bash
   gh project field-list 9 --owner 0xbaitan --format json | jq '.fields[] | select(.name=="Status")'
   ```

2. Update mappings in all three workflow files:
   - `sync-label-to-project.yml` (line ~40)
   - `sync-project-to-label.yml` (line ~75)
   - `manual-sync-all.yml` (line ~130, ~220)

3. Update this README's mapping table

### Updating Project ID/Number

If you move to a different project:

1. Get project number:

   ```bash
   gh project list --owner 0xbaitan
   ```

2. Update `PROJECT_NUMBER` in all workflow files

3. Get Status field ID:

   ```bash
   gh project field-list <project-number> --owner 0xbaitan --format json
   ```

4. Update `STATUS_FIELD_ID` in workflow files

---

## 📚 References

- [GitHub Actions: Workflow syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [GitHub GraphQL API: Projects V2](https://docs.github.com/en/graphql/reference/objects#projectv2)
- [GitHub REST API: Issues](https://docs.github.com/en/rest/issues)
- [GitHub CLI: Projects](https://cli.github.com/manual/gh_project)

---

**Created:** March 3, 2026  
**Last Updated:** March 3, 2026  
**Maintained by:** @0xbaitan
