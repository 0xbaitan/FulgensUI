#!/usr/bin/env bun

/**
 * Manual Project Sync Script
 *
 * Syncs issue labels to GitHub Project #9 board (one-way: labels → project)
 *
 * Usage: bun run scripts/sync-project-manual.ts
 */

import { Octokit } from "@octokit/rest";

// Configuration
const REPO_OWNER = "0xbaitan";
const REPO_NAME = "FulgensUI";
const PROJECT_NUMBER = 9;
const PROJECT_OWNER = "0xbaitan";

// GitHub token from environment
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

if (!GITHUB_TOKEN) {
  console.error(
    "❌ Error: GITHUB_TOKEN or GH_TOKEN environment variable is required",
  );
  console.error("   Set it with: export GITHUB_TOKEN=your_token_here");
  process.exit(1);
}

// Initialize Octokit
const octokit = new Octokit({ auth: GITHUB_TOKEN });

// Label to Project field value mappings
const STATUS_MAPPING: Record<string, string> = {
  "status:backlog": "Backlog",
  "status:ready": "Ready",
  "status:development": "Development",
  "status:review": "Review",
  "status:qa": "QA",
  "status:defect": "Defect",
  "status:done": "Done",
};

const PRIORITY_MAPPING: Record<string, string> = {
  "priority:must-have": "Must Have",
  "priority:should-have": "Should Have",
  "priority:could-have": "Could Have",
  "priority:won't-have": "Won't Have",
};

const TYPE_MAPPING: Record<string, string> = {
  "type:feat": "Feature",
  "type:fix": "Bug Fix",
  "type:docs": "Documentation",
  "type:refactor": "Refactoring",
  "type:perf": "Performance",
  "type:build": "Build",
  "type:test": "Testing",
  "type:ci": "CI/CD",
  "type:revert": "Revert",
  "type:chore": "Chore",
  "type:style": "Style",
};

interface SyncResult {
  issueNumber: number;
  success: boolean;
  message: string;
}

interface ProjectIdResponse {
  user: {
    projectV2: {
      id: string;
    };
  };
}

interface ProjectFieldOption {
  id: string;
  name: string;
}

interface ProjectField {
  id: string;
  name: string;
  options?: ProjectFieldOption[];
}

interface ProjectFieldsResponse {
  node: {
    fields: {
      nodes: ProjectField[];
    };
  };
}

interface ProjectItemContent {
  id?: string;
}

interface ProjectItem {
  id: string;
  content?: ProjectItemContent;
}

interface ProjectItemsResponse {
  node: {
    items: {
      nodes: ProjectItem[];
    };
  };
}

interface IssueLabel {
  name: string;
}

interface Issue {
  number: number;
  title: string;
  node_id: string;
  labels: IssueLabel[];
}

/**
 * Get project ID using GraphQL
 */
async function getProjectId(): Promise<string | null> {
  const query = `
    query($owner: String!, $number: Int!) {
      user(login: $owner) {
        projectV2(number: $number) {
          id
        }
      }
    }
  `;

  try {
    const response = await octokit.graphql<ProjectIdResponse>(query, {
      owner: PROJECT_OWNER,
      number: PROJECT_NUMBER,
    });

    return response.user.projectV2.id;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`❌ Failed to get project ID: ${errorMessage}`);
    return null;
  }
}

/**
 * Get project field IDs
 */
async function getProjectFields(
  projectId: string,
): Promise<Record<
  string,
  { id: string; options: Record<string, string> }
> | null> {
  const query = `
    query($projectId: ID!) {
      node(id: $projectId) {
        ... on ProjectV2 {
          fields(first: 20) {
            nodes {
              ... on ProjectV2SingleSelectField {
                id
                name
                options {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  `;
  try {
    const response = await octokit.graphql<ProjectFieldsResponse>(query, {
      projectId,
    });

    const fields = response.node.fields.nodes;

    const result: Record<
      string,
      { id: string; options: Record<string, string> }
    > = {};

    for (const field of fields) {
      if (field.name && field.options) {
        const options: Record<string, string> = {};
        for (const option of field.options) {
          options[option.name] = option.id;
        }
        result[field.name] = {
          id: field.id,
          options,
        };
      }
    }

    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`❌ Failed to get project fields: ${errorMessage}`);
    return null;
  }
}

/**
 * Get project item ID for an issue
 */
async function getProjectItemId(
  projectId: string,
  issueNodeId: string,
): Promise<string | null> {
  const query = `
    query($projectId: ID!, $issueId: ID!) {
      node(id: $projectId) {
        ... on ProjectV2 {
          items(first: 100) {
            nodes {
              id
              content {
                ... on Issue {
                  id
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await octokit.graphql<ProjectItemsResponse>(query, {
      projectId,
      issueId: issueNodeId,
    });

    const items = response.node.items.nodes;
    const item = items.find((i) => i.content?.id === issueNodeId);

    return item?.id || null;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`❌ Failed to get project item ID: ${errorMessage}`);
    return null;
  }
}

/**
 * Update project field value
 */
async function updateProjectField(
  projectId: string,
  itemId: string,
  fieldId: string,
  optionId: string,
): Promise<boolean> {
  const mutation = `
    mutation($projectId: ID!, $itemId: ID!, $fieldId: ID!, $value: ProjectV2FieldValue!) {
      updateProjectV2ItemFieldValue(input: {
        projectId: $projectId
        itemId: $itemId
        fieldId: $fieldId
        value: $value
      }) {
        projectV2Item {
          id
        }
      }
    }
  `;

  try {
    await octokit.graphql(mutation, {
      projectId,
      itemId,
      fieldId,
      value: { singleSelectOptionId: optionId },
    });

    return true;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`   ❌ Failed to update field: ${errorMessage}`);
    return false;
  }
}

/**
 * Sync a single issue
 */
async function syncIssue(
  issue: Issue,
  projectId: string,
  fields: Record<string, { id: string; options: Record<string, string> }>,
): Promise<SyncResult> {
  const issueNumber = issue.number;
  const labels = issue.labels.map((l) => l.name);

  console.log(`\n📝 Issue #${issueNumber}: ${issue.title}`);
  console.log(`   Labels: ${labels.join(", ")}`);

  // Get project item ID
  const itemId = await getProjectItemId(projectId, issue.node_id);
  if (!itemId) {
    return {
      issueNumber,
      success: false,
      message: "Issue not in project (add it manually to Project #9)",
    };
  }

  let updatedFields = 0;

  // Sync Status
  const statusLabel = labels.find((l: string) => l.startsWith("status:"));
  if (statusLabel && STATUS_MAPPING[statusLabel]) {
    const statusValue = STATUS_MAPPING[statusLabel];
    const statusField = fields["Status"];

    if (statusField && statusField.options[statusValue]) {
      const success = await updateProjectField(
        projectId,
        itemId,
        statusField.id,
        statusField.options[statusValue],
      );
      if (success) {
        console.log(`   ✅ Updated Status: ${statusValue}`);
        updatedFields++;
      }
    }
  }

  // Sync Priority
  const priorityLabel = labels.find((l: string) => l.startsWith("priority:"));
  if (priorityLabel && PRIORITY_MAPPING[priorityLabel]) {
    const priorityValue = PRIORITY_MAPPING[priorityLabel];
    const priorityField = fields["Priority"];

    if (priorityField && priorityField.options[priorityValue]) {
      const success = await updateProjectField(
        projectId,
        itemId,
        priorityField.id,
        priorityField.options[priorityValue],
      );
      if (success) {
        console.log(`   ✅ Updated Priority: ${priorityValue}`);
        updatedFields++;
      }
    }
  }

  // Sync Type
  const typeLabel = labels.find((l: string) => l.startsWith("type:"));
  if (typeLabel && TYPE_MAPPING[typeLabel]) {
    const typeValue = TYPE_MAPPING[typeLabel];
    const typeField = fields["Type"];

    if (typeField && typeField.options[typeValue]) {
      const success = await updateProjectField(
        projectId,
        itemId,
        typeField.id,
        typeField.options[typeValue],
      );
      if (success) {
        console.log(`   ✅ Updated Type: ${typeValue}`);
        updatedFields++;
      }
    }
  }

  if (updatedFields > 0) {
    return {
      issueNumber,
      success: true,
      message: `Synced ${updatedFields} field(s)`,
    };
  } else {
    return {
      issueNumber,
      success: true,
      message: "No fields to sync (no relevant labels)",
    };
  }
}

/**
 * Main sync function
 */
async function main() {
  console.log("🚀 Starting manual project sync...");
  console.log(`   Repository: ${REPO_OWNER}/${REPO_NAME}`);
  console.log(`   Project: #${PROJECT_NUMBER}`);
  console.log("");

  // Get project ID
  console.log("📋 Fetching project information...");
  const projectId = await getProjectId();
  if (!projectId) {
    console.error("❌ Failed to get project ID. Exiting.");
    process.exit(1);
  }
  console.log(`   ✅ Project ID: ${projectId}`);

  // Get project fields
  console.log("📋 Fetching project fields...");
  const fields = await getProjectFields(projectId);
  if (!fields) {
    console.error("❌ Failed to get project fields. Exiting.");
    process.exit(1);
  }
  console.log(`   ✅ Found fields: ${Object.keys(fields).join(", ")}`);

  // Get all open issues
  console.log("\n📋 Fetching open issues...");
  const { data: issues } = await octokit.rest.issues.listForRepo({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    state: "open",
    per_page: 100,
  });

  const regularIssues = issues.filter((i) => !i.pull_request);
  console.log(`   ✅ Found ${regularIssues.length} open issues`);

  // Sync each issue
  const results: SyncResult[] = [];
  for (const issue of regularIssues) {
    const result = await syncIssue(issue, projectId, fields);
    results.push(result);
  }

  // Print summary
  console.log("\n" + "=".repeat(60));
  console.log("SYNC SUMMARY");
  console.log("=".repeat(60));
  console.log(`Total issues processed: ${results.length}`);
  console.log(`Successful syncs: ${results.filter((r) => r.success).length}`);
  console.log(`Failed syncs: ${results.filter((r) => !r.success).length}`);

  const failed = results.filter((r) => !r.success);
  if (failed.length > 0) {
    console.log("\n⚠️  Failed issues:");
    for (const result of failed) {
      console.log(`   Issue #${result.issueNumber}: ${result.message}`);
    }
  }

  console.log("=".repeat(60));
  console.log("✅ Sync complete!");
}

// Run main function
main().catch((error) => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});
