#!/usr/bin/env bun
import { execSync } from "node:child_process";
import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

interface CommitContext {
  stagedFiles: string[];
  unstagedFiles: string[];
  branchName: string;
  issueNumber: string;
  commitType: string;
  commitTypeSource: string;
  commitName: string;
  gitDiff: string;
}

interface TestResult {
  passed: boolean;
  output: string;
  coverage: {
    lines: string;
    branches: string;
    functions: string;
    statements: string;
  } | null;
}

interface LintResult {
  passed: boolean;
  output: string;
}

interface PrepareCommitOptions {
  dryRun?: boolean;
}

/**
 * Execute a shell command and return output
 */
function execCommand(command: string, silent = false): string {
  try {
    return execSync(command, {
      encoding: "utf-8",
      stdio: silent ? "pipe" : "pipe",
      maxBuffer: 10 * 1024 * 1024, // 10MB
    });
  } catch (error: unknown) {
    if (error instanceof Error && "stdout" in error) {
      const stdout = (error as { stdout: string }).stdout;
      if (stdout) return stdout;
    }
    if (error instanceof Error && "stderr" in error) {
      const stderr = (error as { stderr: string }).stderr;
      if (stderr) return stderr;
    }
    return "";
  }
}

/**
 * Step 1: Check Git Status
 */
function checkGitStatus(): Pick<
  CommitContext,
  "stagedFiles" | "unstagedFiles" | "branchName" | "gitDiff"
> {
  console.log("📋 Step 1: Checking git status...\n");

  const branchName = execCommand("git branch --show-current", true).trim();
  const stagedFilesRaw = execCommand("git diff --cached --name-only", true);
  const unstagedFilesRaw = execCommand("git diff --name-only", true);
  const gitDiff = execCommand("git diff --cached", true);

  const stagedFiles = stagedFilesRaw
    .split("\n")
    .filter((line) => line.trim().length > 0);
  const unstagedFiles = unstagedFilesRaw
    .split("\n")
    .filter((line) => line.trim().length > 0);

  console.log(`   Branch: ${branchName}`);
  console.log(`   Staged files: ${stagedFiles.length}`);
  console.log(`   Unstaged files: ${unstagedFiles.length}`);

  return { stagedFiles, unstagedFiles, branchName, gitDiff };
}

/**
 * Step 2: Extract Issue Number
 */
function extractIssueNumber(branchName: string): string {
  console.log("\n🔍 Step 2: Extracting issue number...\n");

  const patterns = [
    /feature\/(\d+)-/,
    /fix\/(\d+)-/,
    /bugfix\/(\d+)-/,
    /tasks?\/(\d+)-/,
    /docs\/(\d+)-/,
    /refactor\/(\d+)-/,
    /perf\/(\d+)-/,
    /test\/(\d+)-/,
    /build\/(\d+)-/,
    /ci\/(\d+)-/,
    /chore\/(\d+)-/,
  ];

  for (const pattern of patterns) {
    const match = branchName.match(pattern);
    if (match) {
      const issueNumber = match[1];
      console.log(`   Issue: #${issueNumber}`);
      return issueNumber;
    }
  }

  console.log("   Issue: None found");
  return "";
}

/**
 * Step 3: Determine Commit Type
 */
function determineCommitType(
  branchName: string,
  stagedFiles: string[],
): { type: string; source: string } {
  console.log("\n🏷️  Step 3: Determining commit type...\n");

  // 1. Branch prefix detection
  const branchPrefixMap: Record<string, string> = {
    "feature/": "feat",
    "fix/": "fix",
    "bugfix/": "fix",
    "docs/": "docs",
    "refactor/": "refactor",
    "perf/": "perf",
    "test/": "test",
    "build/": "build",
    "ci/": "ci",
    "chore/": "chore",
  };

  for (const [prefix, type] of Object.entries(branchPrefixMap)) {
    if (branchName.startsWith(prefix)) {
      console.log(`   Type: ${type} (from branch prefix: ${prefix})`);
      return { type, source: "branch prefix" };
    }
  }

  // 2. GitHub labels (if available)
  try {
    const prLabelsOutput = execCommand("gh pr view --json labels", true);
    const prData = JSON.parse(prLabelsOutput) as {
      labels?: { name: string }[];
    };

    if (prData.labels && prData.labels.length > 0) {
      const labelMap: Record<string, string> = {
        enhancement: "feat",
        feature: "feat",
        bug: "fix",
        documentation: "docs",
        refactor: "refactor",
        performance: "perf",
        test: "test",
        build: "build",
        ci: "ci",
      };

      for (const label of prData.labels) {
        const type = labelMap[label.name.toLowerCase()];
        if (type) {
          console.log(`   Type: ${type} (from GitHub label: ${label.name})`);
          return { type, source: `GitHub label: ${label.name}` };
        }
      }
    }
  } catch {
    // gh CLI not available or no PR found
  }

  // 3. File change analysis (fallback)
  const allTest = stagedFiles.every((f) =>
    f.match(/\.(test|spec)\.(ts|tsx|js|jsx)$/),
  );
  if (allTest) {
    console.log("   Type: test (from file analysis: only test files)");
    return { type: "test", source: "file analysis: only test files" };
  }

  const allStories = stagedFiles.every((f) =>
    f.match(/\.(stories|mdx)\.(ts|tsx|js|jsx)$/),
  );
  if (allStories) {
    console.log("   Type: feat (from file analysis: only story files)");
    return { type: "feat", source: "file analysis: only story files" };
  }

  const allDocs = stagedFiles.every((f) => f.match(/\.(md|mdx)$/));
  if (allDocs) {
    console.log("   Type: docs (from file analysis: only documentation)");
    return { type: "docs", source: "file analysis: only documentation" };
  }

  const allConfig = stagedFiles.every((f) =>
    f.match(
      /(package\.json|tsconfig\.json|vite\.config\.ts|turbo\.json|bun\.lock)/,
    ),
  );
  if (allConfig) {
    console.log("   Type: chore (from file analysis: only config files)");
    return { type: "chore", source: "file analysis: only config files" };
  }

  console.log("   Type: chore (from file analysis: mixed changes)");
  return { type: "chore", source: "file analysis: mixed changes" };
}

/**
 * Step 4: Run Tests with Coverage
 */
async function runTests(stagedFiles: string[]): Promise<TestResult> {
  console.log("\n🧪 Step 4: Running tests with coverage...\n");

  // Determine scope
  const packageScopes = new Set<string>();
  for (const file of stagedFiles) {
    const match = file.match(/^packages\/(\w+)\//);
    if (match) packageScopes.add(match[1]);
  }

  let command: string;
  if (packageScopes.size === 1 && packageScopes.has("core")) {
    command = "cd packages/core && bun vitest run --coverage";
    console.log("   Scope: packages/core");
  } else if (packageScopes.size === 1 && packageScopes.has("docsite")) {
    command = "cd packages/docsite && bun vitest run --coverage";
    console.log("   Scope: packages/docsite");
  } else {
    command = "bun run test";
    console.log("   Scope: all packages");
  }

  const output = execCommand(command, true);
  const passed = !output.toLowerCase().includes("failed");

  // Extract coverage
  const coverageMatch = output.match(
    /All files\s*\|\s*([\d.]+)\s*\|\s*([\d.]+)\s*\|\s*([\d.]+)\s*\|\s*([\d.]+)/,
  );

  let coverage = null;
  if (coverageMatch) {
    coverage = {
      statements: coverageMatch[1],
      branches: coverageMatch[2],
      functions: coverageMatch[3],
      lines: coverageMatch[4],
    };
    console.log(
      `   Coverage: Lines ${coverage.lines}% | Branches ${coverage.branches}% | Functions ${coverage.functions}%`,
    );
  } else {
    console.log("   Coverage: Not available");
  }

  console.log(`   Status: ${passed ? "✅ PASSED" : "❌ FAILED"}`);

  return { passed, output, coverage };
}

/**
 * Step 5: Run Linting
 */
async function runLinting(stagedFiles: string[]): Promise<LintResult> {
  console.log("\n🔍 Step 5: Running linting...\n");

  // Determine scope
  const packageScopes = new Set<string>();
  for (const file of stagedFiles) {
    const match = file.match(/^packages\/(\w+)\//);
    if (match) packageScopes.add(match[1]);
  }

  let command: string;
  if (packageScopes.size === 1 && packageScopes.has("core")) {
    command = "cd packages/core && bun run lint";
    console.log("   Scope: packages/core");
  } else if (packageScopes.size === 1 && packageScopes.has("docsite")) {
    command = "cd packages/docsite && bun run lint";
    console.log("   Scope: packages/docsite");
  } else {
    command = "bun run lint";
    console.log("   Scope: all packages");
  }

  const output = execCommand(command, true);
  const passed =
    !output.toLowerCase().includes("error") &&
    !output.toLowerCase().includes("✖");

  console.log(`   Status: ${passed ? "✅ PASSED" : "❌ FAILED"}`);

  return { passed, output };
}

/**
 * Step 6: Generate Commit Name
 */
function generateCommitName(branchName: string, issueNumber: string): string {
  console.log("\n📝 Step 6: Generating commit name...\n");

  let name = branchName;

  // Remove issue number prefix
  if (issueNumber) {
    name = name.replace(new RegExp(`\\d*${issueNumber}-?`), "");
  }

  // Remove branch type prefix
  name = name.replace(
    /^(feature|fix|bugfix|docs|refactor|perf|test|build|ci|chore)\//,
    "",
  );

  // Clean up
  name = name.replace(/\//g, "-");
  name = name.replace(/[^a-zA-Z0-9-]/g, "");
  name = name.toLowerCase();

  console.log(`   Name: ${name}`);
  return name;
}

/**
 * Step 7: Generate AI Commit Message
 */
async function generateAICommitMessage(
  context: CommitContext,
): Promise<string> {
  console.log("\n🤖 Step 7: Generating AI commit message...\n");

  // Try using Ollama
  try {
    const scope = determineScope(context.stagedFiles);
    const prompt = buildPrompt(context, scope);

    const curlCommand = `curl -s http://localhost:11434/api/generate -d '${JSON.stringify(
      {
        model: "opencode/big-pickle",
        prompt,
        stream: false,
      },
    ).replace(/'/g, "'\\''")}'`;

    const response = execCommand(curlCommand, true);
    const json = JSON.parse(response) as { response?: string };

    if (json.response && json.response.trim().length > 0) {
      console.log("   ✅ Generated with Ollama (opencode/big-pickle)");
      return json.response.trim();
    }
  } catch {
    console.log("   ⚠️  Ollama unavailable, using fallback");
  }

  // Fallback: basic commit message
  const scope = determineScope(context.stagedFiles);
  const filesSummary = context.stagedFiles.slice(0, 3).join(", ");
  const moreFiles =
    context.stagedFiles.length > 3
      ? ` and ${context.stagedFiles.length - 3} more`
      : "";

  const message = `${context.commitType}${scope ? `(${scope})` : ""}: update ${filesSummary}${moreFiles}`;

  console.log("   ✅ Generated fallback message");
  return message;
}

function determineScope(stagedFiles: string[]): string | null {
  const scopes = new Set<string>();

  for (const file of stagedFiles) {
    // Check for package scope
    const packageMatch = file.match(/^packages\/(\w+)\//);
    if (packageMatch) {
      scopes.add(packageMatch[1]);
      continue;
    }

    // Check for component scope in core package
    const componentMatch = file.match(
      /packages\/core\/src\/components\/ui\/(\w+)\//,
    );
    if (componentMatch) {
      scopes.add(componentMatch[1]);
    }
  }

  return scopes.size === 1 ? Array.from(scopes)[0] : null;
}

function buildPrompt(context: CommitContext, scope: string | null): string {
  return `You are an AI assistant that generates conventional commit messages.
Given the following git diff and context, generate a commit message.

Commit Types:
- feat: A new feature
- fix: A bug fix
- docs: Documentation only changes
- style: Changes that do not affect the meaning of the code (formatting)
- refactor: Code change that neither fixes a bug nor adds a feature
- perf: Code change that improves performance
- test: Adding missing tests or correcting existing tests
- build: Changes that affect the build system or external dependencies
- ci: Changes to CI configuration files and scripts
- chore: Other changes that don't modify src or test files
- revert: Reverts a previous commit

Format: type(scope): description

Context:
- Branch: ${context.branchName}
- Issue: ${context.issueNumber ? `#${context.issueNumber}` : "No issue referenced"}
- Suggested Type: ${context.commitType}
- Scope: ${scope || "various"}

Staged Files:
${context.stagedFiles.join("\n")}

Git Diff (truncated):
${context.gitDiff.substring(0, 2000)}

Instructions:
1. Analyze the git diff to understand what changed
2. Use the suggested type: ${context.commitType}
3. Determine the scope: ${scope || "various"}
4. Write a concise, imperative description (max 72 chars)
5. Include a brief body explaining the "why" if needed
6. If there's an issue, add "Refs #${context.issueNumber}" in the footer

Generate ONLY the commit message (no explanation). Use this format:
type(scope): description

[optional body]

[optional footer]
`;
}

/**
 * Step 8: Save to Temp File
 */
async function saveToTempFile(
  context: CommitContext,
  message: string,
  options: PrepareCommitOptions,
): Promise<string> {
  console.log("\n💾 Step 8: Saving to temp file...\n");

  const timestamp = new Date().toISOString().replace(/[:.]/g, "").slice(0, 15);
  const issuePrefix = context.issueNumber ? `${context.issueNumber}_` : "";
  const filename = `${issuePrefix}${context.commitType}_${context.commitName}_${timestamp}Z.txt`;
  const filepath = join(process.cwd(), ".temp", "commit-messages", filename);

  if (options.dryRun) {
    console.log(`   [DRY RUN] Would save to: ${filename}`);
    return filename;
  }

  // Ensure directory exists
  await mkdir(join(process.cwd(), ".temp", "commit-messages"), {
    recursive: true,
  });

  const content = `# Conventional Commit Message
# Edit this message before running /make-commit

${message}
`;

  await writeFile(filepath, content, "utf-8");
  console.log(`   ✅ Saved to: ${filename}`);

  return filename;
}

/**
 * Step 9: Log Action
 */
async function logAction(
  context: CommitContext,
  testResult: TestResult,
  lintResult: LintResult,
  outputFile: string,
  options: PrepareCommitOptions,
): Promise<string> {
  console.log("\n📋 Step 9: Creating log file...\n");

  const timestamp = new Date().toISOString().replace(/[:.]/g, "").slice(0, 15);
  const status = testResult.passed && lintResult.passed ? "success" : "warning";
  const filename = `prepare-commit_${status}_${timestamp}Z.log`;
  const filepath = join(process.cwd(), "logs", filename);

  const coverageDisplay = testResult.coverage
    ? `Lines ${testResult.coverage.lines}% | Branches ${testResult.coverage.branches}% | Functions ${testResult.coverage.functions}%`
    : "Not available";

  const logContent = `Prepare Commit Log
==================

Timestamp: ${new Date().toISOString()}
Issue: ${context.issueNumber ? `#${context.issueNumber}` : "None"}
Commit Type: ${context.commitType} (${context.commitTypeSource})
Branch: ${context.branchName}
Commit Name: ${context.commitName}

Staged Files (${context.stagedFiles.length}):
${context.stagedFiles.map((f) => `  - ${f}`).join("\n")}

Unstaged Files (${context.unstagedFiles.length}):
${context.unstagedFiles.map((f) => `  - ${f}`).join("\n")}

Tests: ${testResult.passed ? "✅ PASSED" : "❌ FAILED"}
Linting: ${lintResult.passed ? "✅ PASSED" : "❌ FAILED"}
Coverage: ${coverageDisplay}

Output File: ${outputFile}

${options.dryRun ? "DRY RUN - No files were actually saved" : ""}
`;

  if (options.dryRun) {
    console.log(`   [DRY RUN] Would save log to: ${filename}`);
    return filename;
  }

  // Ensure logs directory exists
  await mkdir(join(process.cwd(), "logs"), { recursive: true });

  await writeFile(filepath, logContent, "utf-8");
  console.log(`   ✅ Log saved to: ${filename}`);

  return filename;
}

/**
 * Step 10: Display Summary
 */
function displaySummary(
  context: CommitContext,
  testResult: TestResult,
  lintResult: LintResult,
  outputFile: string,
  options: PrepareCommitOptions,
): void {
  console.log("\n" + "=".repeat(50));
  console.log("✅ Prepare Commit Complete");
  console.log("=".repeat(50) + "\n");

  console.log("📁 Staged Files:");
  context.stagedFiles.slice(0, 10).forEach((file) => {
    console.log(`  - ${file}`);
  });
  if (context.stagedFiles.length > 10) {
    console.log(`  ... and ${context.stagedFiles.length - 10} more`);
  }

  if (context.unstagedFiles.length > 0) {
    console.log("\n📁 Unstaged Files:");
    context.unstagedFiles.slice(0, 5).forEach((file) => {
      console.log(`  - ${file}`);
    });
    if (context.unstagedFiles.length > 5) {
      console.log(`  ... and ${context.unstagedFiles.length - 5} more`);
    }
  }

  console.log(
    `\n🏷️  Commit Type: ${context.commitType} (${context.commitTypeSource})`,
  );
  console.log(
    `📋 Issue: ${context.issueNumber ? `#${context.issueNumber}` : "None"}`,
  );
  console.log(`🌿 Branch: ${context.branchName}`);

  const coverageDisplay = testResult.coverage
    ? `Lines ${testResult.coverage.lines}% | Branches ${testResult.coverage.branches}% | Functions ${testResult.coverage.functions}%`
    : "Not available";

  console.log(`\n📊 Coverage: ${coverageDisplay}`);
  console.log(
    `${testResult.passed ? "✅" : "❌"} Tests: ${testResult.passed ? "PASSED" : "FAILED"}`,
  );
  console.log(
    `${lintResult.passed ? "✅" : "❌"} Linting: ${lintResult.passed ? "PASSED" : "FAILED"}`,
  );

  console.log(`\n💾 Message saved to: .temp/commit-messages/${outputFile}`);

  if (options.dryRun) {
    console.log("\n⚠️  DRY RUN MODE - No files were actually saved");
  } else {
    console.log(
      "\nNext: Edit the message file manually, then run /make-commit",
    );
  }
}

/**
 * Main entry point
 */
async function main(): Promise<void> {
  console.log("\n🚀 Prepare Commit Workflow");
  console.log("=".repeat(50) + "\n");

  // Parse options
  const args = process.argv.slice(2);
  const options: PrepareCommitOptions = {
    dryRun: args.includes("--dry-run"),
  };

  if (options.dryRun) {
    console.log("⚠️  Running in DRY RUN mode\n");
  }

  // Step 1: Check git status
  const gitStatus = checkGitStatus();

  if (gitStatus.stagedFiles.length === 0) {
    console.log("\n❌ Error: No staged files found");
    console.log("   Please stage files with: git add <files>");
    process.exit(1);
  }

  // Step 2: Extract issue number
  const issueNumber = extractIssueNumber(gitStatus.branchName);

  // Step 3: Determine commit type
  const { type: commitType, source: commitTypeSource } = determineCommitType(
    gitStatus.branchName,
    gitStatus.stagedFiles,
  );

  // Step 6: Generate commit name (moving earlier as we need it for context)
  const commitName = generateCommitName(gitStatus.branchName, issueNumber);

  const context: CommitContext = {
    ...gitStatus,
    issueNumber,
    commitType,
    commitTypeSource,
    commitName,
  };

  // Step 4: Run tests
  const testResult = await runTests(gitStatus.stagedFiles);

  // Step 5: Run linting
  const lintResult = await runLinting(gitStatus.stagedFiles);

  // Step 7: Generate AI commit message
  const message = await generateAICommitMessage(context);

  // Step 8: Save to temp file
  const outputFile = await saveToTempFile(context, message, options);

  // Step 9: Log action
  await logAction(context, testResult, lintResult, outputFile, options);

  // Step 10: Display summary
  displaySummary(context, testResult, lintResult, outputFile, options);
}

// Run main
main().catch((error) => {
  console.error("\n❌ Error:", error instanceof Error ? error.message : error);
  process.exit(1);
});
