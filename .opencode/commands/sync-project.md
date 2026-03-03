# Sync Project Command

**Command:** `/sync-project`

**Description:** Manually sync issue labels to GitHub Project #9 board (one-way: labels → project)

## Purpose

This command performs a **manual one-way sync** from issue labels to the GitHub Project #9 board. Labels are the source of truth, and this command updates the project board to match the current label state.

## Context

- **Project #9:** FulgensUI Kanban board (user-owned by @0xbaitan)
- **Sync direction:** Labels → Project (one-way only)
- **Source of truth:** Issue labels (status, priority, type)
- **Project fields:**
  - Status (single select)
  - Priority (single select)
  - Type (single select)

## Workflow

When this command is invoked, you should:

1. **Execute the sync script:**

   ```bash
   bun run scripts/sync-project-manual.ts
   ```

2. **Monitor the output** for:
   - Number of issues synced
   - Success/failure messages
   - Any errors or warnings

3. **Report results** to the user:
   - Summary of issues updated
   - Any issues that couldn't be synced
   - Confirmation of completion

## Expected Behavior

The script will:

- Fetch all open issues from the repository
- For each issue with a status/priority/type label:
  - Find the issue in Project #9
  - Update the corresponding project field
  - Log the sync operation
- Provide a summary report at the end

## Error Handling

Common errors and solutions:

- **"Issue not in project"** - Issue needs to be manually added to Project #9
- **"Authentication failed"** - GitHub token needs project permissions
- **"Field not found"** - Project field IDs may have changed

## Notes

- This is a **one-way sync** (labels → project only)
- Project changes do NOT sync back to labels
- Labels remain the source of truth
- Project board is optional and for visualization only

## Usage Example

```
User: /sync-project
```
