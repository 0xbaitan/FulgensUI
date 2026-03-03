# Label Automation System

## Overview

FulgensUI uses an automated label-based workflow to track issues through their lifecycle. Labels are the **single source of truth** for issue status, priority, and type. The system enforces strict rules to maintain consistency and prevent conflicts.

## Why Label-Based?

Previously, we attempted to sync with GitHub Project #9, but this failed because:

- User-owned projects require PAT authentication (GITHUB_TOKEN doesn't work)
- GraphQL queries fail in Actions for user projects
- Webhook events (`projects_v2_item`) only work for org-owned projects

**Benefits of label-only approach:**

- ✅ No authentication issues (uses default GITHUB_TOKEN)
- ✅ Instant sync (<30 seconds vs 15-minute delay)
- ✅ Simpler implementation (REST API only, no GraphQL)
- ✅ More portable (works in any repo)
- ✅ No external dependencies

## Label Categories

### 1. Status Labels (Mutually Exclusive)

**Only ONE status label is allowed per issue.**

- `status:backlog` - Issue is in the backlog, not yet ready for work
- `status:ready` - Issue is ready to be worked on
- `status:development` - Issue is actively being developed
- `status:review` - Issue is in code review
- `status:qa` - Issue is being tested/validated
- `status:defect` - Issue has a defect and needs rework
- `status:done` - Issue is complete and ready to close

**Transition Rules:** See [TRANSITION-RULES.md](./TRANSITION-RULES.md) for the state machine diagram.

### 2. Priority Labels (Mutually Exclusive)

**Only ONE priority label is allowed per issue.**

- `priority:must-have` - Critical priority, must be completed
- `priority:should-have` - High priority, should be completed if possible
- `priority:could-have` - Medium priority, nice to have
- `priority:won't-have` - Low priority, won't be done this iteration

**No transition validation** - you can change priority at any time.

### 3. Type Labels (Mutually Exclusive)

**Only ONE type label is allowed per issue.**

Based on [Conventional Commits](https://www.conventionalcommits.org/):

- `type:feat` - New feature
- `type:fix` - Bug fix
- `type:docs` - Documentation only changes
- `type:refactor` - Code refactoring (no behavior change)
- `type:perf` - Performance improvement
- `type:build` - Build system or dependency changes
- `type:test` - Adding or updating tests
- `type:ci` - CI/CD configuration changes
- `type:revert` - Revert a previous change
- `type:chore` - Other changes (tooling, formatting, etc.)
- `type:style` - Code style changes (formatting, whitespace, etc.)

**No transition validation** - you can change type at any time.

### 4. Issue Labels (NOT Mutually Exclusive)

**Multiple issue labels can coexist** (separate from type labels):

- `issue:bug` - Something isn't working correctly
- `issue:story` - User story or feature request
- `issue:epic` - Large feature spanning multiple issues
- `issue:task` - General task or chore
- `issue:item` - Generic work item

**Note:** These are separate from `type:*` labels and do not conflict with them.

### 5. Other Labels

The following labels are not automated and can be used freely:

- `scope:*` - Component or area scope (e.g., `scope:button`, `scope:docs`)
- `has:breaking-change` - Indicates a breaking change
- `wontfix` - Issue will not be fixed

## Automated Workflows

### 1. Enforce Single Status Label (`enforce-single-status.yml`)

**Triggers:** When any label is added to an issue

**What it does:**

- Ensures only ONE status label exists per issue
- Validates status transitions (see [TRANSITION-RULES.md](./TRANSITION-RULES.md))
- Blocks invalid transitions with a concise error comment
- Automatically removes conflicting status labels
- Keeps the most recently added label

**Example:**

```
Issue has: status:backlog, status:ready
User adds: status:done
Result: ❌ Blocked - "Cannot go from backlog → done. Valid next: ready, development, defect"
```

### 2. Enforce Single Priority Label (`enforce-single-priority.yml`)

**Triggers:** When any label is added to an issue

**What it does:**

- Ensures only ONE priority label exists per issue
- No transition validation (any-to-any allowed)
- Automatically removes conflicting priority labels
- Keeps the most recently added label

**Example:**

```
Issue has: priority:must-have
User adds: priority:could-have
Result: ✅ Kept priority:could-have, removed priority:must-have
```

### 3. Enforce Single Type Label (`enforce-single-type.yml`)

**Triggers:** When any label is added to an issue

**What it does:**

- Ensures only ONE type label exists per issue
- No transition validation (any-to-any allowed)
- Automatically removes conflicting type labels
- Keeps the most recently added label
- Does NOT conflict with `issue:*` labels

**Example:**

```
Issue has: type:feat, issue:bug
User adds: type:fix
Result: ✅ Kept type:fix, removed type:feat (issue:bug remains)
```

### 4. Auto-Label New Issues (`auto-label-new-issues.yml`)

**Triggers:** When a new issue is created

**What it does:**

- Automatically adds `status:backlog` to new issues
- Ensures every issue enters the workflow at the correct starting point
- Skips if issue already has a status label

**Example:**

```
User creates new issue
Result: ✅ Automatically labeled with status:backlog
```

### 5. Auto-Close Done Issues (`auto-close-done.yml`)

**Triggers:** When `status:done` label is added

**What it does:**

- Automatically closes the issue (state: closed, reason: completed)
- Adds an informative comment
- Skips if issue is already closed

**Example:**

```
User adds: status:done
Result: ✅ Issue automatically closed
```

### 6. Auto-Reopen to Backlog (`auto-reopen-backlog.yml`)

**Triggers:** When a closed issue is reopened

**What it does:**

- Removes any existing status label
- Adds `status:backlog` to reset the workflow
- Adds an informative comment explaining the change

**Example:**

```
User reopens closed issue (had status:done)
Result: ✅ Reset to status:backlog
```

### 7. Daily Cleanup (`cleanup-labels.yml`)

**Triggers:** Daily at 00:00 GMT (midnight UTC) + manual dispatch

**What it does:**

- Scans all open issues for label violations
- Fixes issues with:
  - Multiple status labels (keeps first, removes rest)
  - Multiple priority labels (keeps first, removes rest)
  - Multiple type labels (keeps first, removes rest)
  - Missing status labels (adds `status:backlog`)
- Adds a comment to each fixed issue
- Generates a summary report

**Example:**

```
Cleanup finds issue with: status:backlog, status:ready, status:done
Result: ✅ Kept status:backlog, removed status:ready and status:done
```

## Status Transition Rules

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

### Invalid Transitions (Blocked)

All other transitions are blocked with an error comment. Examples:

- `backlog → done` ❌ (must pass through development)
- `ready → review` ❌ (must go through development first)
- `review → backlog` ❌ (must go through development or defect)

**See [TRANSITION-RULES.md](./TRANSITION-RULES.md) for the complete state machine diagram.**

## User Guide

### Adding Labels Manually

1. **Status:** Add one of the `status:*` labels to move an issue through the workflow
2. **Priority:** Add one of the `priority:*` labels to set priority
3. **Type:** Add one of the `type:*` labels to categorize the work
4. **Issue:** Add any `issue:*` labels as needed (can have multiple)

### Understanding Automation Behavior

- **Mutual Exclusion:** Adding a new label in a mutually exclusive category will remove the old one
- **Transition Validation:** Invalid status transitions are blocked with an error
- **Auto-Close:** Adding `status:done` automatically closes the issue
- **Auto-Reopen:** Reopening an issue resets status to `status:backlog`

### Best Practices

1. **Start with backlog:** New issues automatically get `status:backlog`
2. **Follow the workflow:** Move issues through the status pipeline in order
3. **Use defect for rework:** If QA fails, use `status:defect` to send back to development
4. **Set priority early:** Add priority labels when triaging issues
5. **Type at creation:** Add type labels when creating issues if known

### Troubleshooting

**Issue has wrong label?**

- Just add the correct label - automation will remove the old one

**Transition blocked?**

- Check the error comment for valid next states
- Follow the workflow path through intermediate states

**Multiple labels in same category?**

- Wait for cleanup workflow (daily at 00:00 GMT)
- Or manually remove extra labels

**Missing status label?**

- Automation adds `status:backlog` to new issues
- Daily cleanup adds it to any issues missing status

## Manual Project Sync

To sync labels to GitHub Project #9 board, use the `/sync-project` command:

```bash
/sync-project
```

This is a **one-way sync** (labels → project) and is entirely manual. The project board is optional and labels remain the source of truth.

## Workflow Timing

- **Label enforcement:** Instant (<30 seconds after label change)
- **Auto-close/reopen:** Instant (<30 seconds after event)
- **Daily cleanup:** Runs at 00:00 GMT every day
- **Manual cleanup:** Can be triggered via workflow_dispatch

## Technical Details

### Workflow Files

```
.github/workflows/
├── enforce-single-status.yml      # Status label mutual exclusion + transition validation
├── enforce-single-priority.yml    # Priority label mutual exclusion
├── enforce-single-type.yml        # Type label mutual exclusion
├── auto-label-new-issues.yml      # Add status:backlog to new issues
├── auto-close-done.yml            # Close issues when status:done applied
├── auto-reopen-backlog.yml        # Reset to backlog when reopened
└── cleanup-labels.yml             # Daily cleanup job (00:00 GMT)
```

### API Used

All workflows use GitHub REST API v3 with `actions/github-script@v7`:

- `github.rest.issues.get()` - Fetch issue details
- `github.rest.issues.addLabels()` - Add labels
- `github.rest.issues.removeLabel()` - Remove labels
- `github.rest.issues.update()` - Close/reopen issues
- `github.rest.issues.createComment()` - Add comments

### Permissions

All workflows require `issues: write` permission (granted by default GITHUB_TOKEN).

## Comparison to Old System

| Feature        | Old (Project Sync)  | New (Label-Only)  |
| -------------- | ------------------- | ----------------- |
| Authentication | Required PAT        | Uses GITHUB_TOKEN |
| API            | GraphQL (complex)   | REST API (simple) |
| Latency        | ~15 minutes         | <30 seconds       |
| Dependencies   | Requires Project #9 | Standalone        |
| Portability    | Org-specific        | Works anywhere    |
| Maintenance    | High (webhooks)     | Low (pure labels) |

## FAQ

**Q: Can I have both `type:feat` and `issue:bug` on the same issue?**  
A: Yes! `type:*` and `issue:*` are separate systems and do not conflict.

**Q: What happens if I add multiple status labels at once?**  
A: The workflow keeps the most recently added one and removes the others.

**Q: Can I skip steps in the workflow?**  
A: No, status transitions are strictly validated. You must follow the workflow path.

**Q: What if I need to bypass transition validation?**  
A: You can't. This is by design to maintain workflow integrity. However, `defect` provides a path back to development from any state.

**Q: Does the project board get updated automatically?**  
A: No, labels are the source of truth. Use `/sync-project` to manually sync labels to the project board.

**Q: Can I customize the labels or workflows?**  
A: Yes, but be aware that label changes require updating all workflow files. Contact the maintainers for guidance.

**Q: What time zone is the cleanup scheduled for?**  
A: 00:00 GMT (midnight UTC). This is consistent across all time zones.

## Support

For issues or questions about label automation:

1. Check [TRANSITION-RULES.md](./TRANSITION-RULES.md) for workflow diagrams
2. Check [README.md](./README.md) for workflow documentation
3. Open an issue with label `type:ci` for automation bugs
