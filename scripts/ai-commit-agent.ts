#!/usr/bin/env bun
import { execSync, spawn } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const OLLAMA_MODEL = "opencode/big-pickle";

interface Coverage {
  branches: number;
  functions: number;
  lines: number;
  statements: number;
}

interface CommitContext {
  stagedFiles: string[];
  gitDiff: string;
  branchName: string;
  issueId: string | null;
  testOutput: string;
  coverage: Coverage | null;
}

function execCommand(command: string): string {
  try {
    return execSync(command, { encoding: "utf-8", stdio: "pipe" });
  } catch (error: unknown) {
    if (error instanceof Error && "stdout" in error) {
      return (error as { stdout: string }).stdout || "";
    }
    return "";
  }
}

function extractIssueId(branchName: string): string | null {
  const patterns = [
    /(?:issues?|tasks?|PRs?|bugs?|features?)[\/-]?(\d+)/i,
    /\/(\d+)-/,
    /(?:^|[-\/])(\d+)(?:[-\/]|$)/,
  ];

  for (const pattern of patterns) {
    const match = branchName.match(pattern);
    if (match) {
      return match[1];
    }
  }
  return null;
}

function determineScope(stagedFiles: string[]): string | null {
  if (stagedFiles.length === 0) return null;

  const scopes = new Set<string>();
  for (const file of stagedFiles) {
    const packageMatch = file.match(/^packages\/(\w+)\//);
    if (packageMatch) {
      scopes.add(packageMatch[1]);
    } else if (file.startsWith("packages/core/src/components/ui/")) {
      const componentMatch = file.match(
        /packages\/core\/src\/components\/ui\/(\w+)/
      );
      if (componentMatch) {
        scopes.add(componentMatch[1]);
      }
    }
  }

  return scopes.size === 1 ? Array.from(scopes)[0] : null;
}

async function runTests(scope: string | null): Promise<{
  output: string;
  coverage: Coverage | null;
}> {
  console.log("\n🧪 Running tests...");

  let command: string;
  if (scope === "core") {
    command = "cd packages/core && bun vitest run --coverage";
  } else if (scope === "docsite") {
    command = "cd packages/docsite && bun vitest run --coverage 2>/dev/null || echo 'No tests configured'";
  } else {
    command = "bun run test";
  }

  const output = execCommand(command);

  const coverageMatch = output.match(
    /All files\s*\|\s*[\d.]+\s*\|\s*([\d.]+)\s*\|\s*([\d.]+)\s*\|\s*([\d.]+)\s*\|\s*([\d.]+)/
  );

  let coverage: Coverage | null = null;
  if (coverageMatch) {
    coverage = {
      statements: parseFloat(coverageMatch[1]),
      branches: parseFloat(coverageMatch[2]),
      functions: parseFloat(coverageMatch[3]),
      lines: parseFloat(coverageMatch[4]),
    };
  }

  console.log("✅ Tests complete");

  return { output, coverage };
}

async function callOllama(prompt: string): Promise<string> {
  console.log("\n🤖 Generating commit message with Ollama...");

  const curlCommand = `curl -s http://localhost:11434/api/generate -d '${JSON.stringify({
    model: OLLAMA_MODEL,
    prompt,
    stream: false,
  })}'`;

  const response = execCommand(curlCommand);

  try {
    const json = JSON.parse(response) as { response?: string };
    return json.response || "";
  } catch {
    return "";
  }
}

function buildPrompt(context: CommitContext): string {
  const commitTypes = `
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

Examples:
- feat(button): add primary variant
- fix(button): fix hover state not applying
- docs(readme): update installation instructions
- refactor(button): simplify variant logic
- test(button): add tests for new variant
`;

  const scope = determineScope(context.stagedFiles);
  const coverageInfo = context.coverage
    ? `- Lines: ${context.coverage.lines}%
- Branches: ${context.coverage.branches}%
- Functions: ${context.coverage.functions}%
- Statements: ${context.coverage.statements}%`
    : "Coverage data not available";

  return `
You are an AI assistant that generates conventional commit messages.
Given the following git diff and context, generate a commit message.

${commitTypes}

## Context
- Branch: ${context.branchName}
- Issue: ${context.issueId ? `#${context.issueId}` : "No issue referenced"}
- Scope: ${scope || "various"}

## Staged Files
${context.stagedFiles.join("\n")}

## Git Diff
${context.gitDiff}

## Test Coverage
${coverageInfo}

## Instructions
1. Analyze the git diff to understand what changed
2. Select the appropriate commit type from the list above
3. Determine the scope (component or package affected)
4. Write a concise, imperative description (max 72 chars)
5. If there's an issue reference, include "Refs #<issue>" in the body
6. Include a brief body explaining the "why" if needed

Generate ONLY the commit message (no explanation). Use this format:
type(scope): description

Body (optional, after a blank line):
- Detail 1
- Detail 2
Refs #<issue>

Do NOT include any markdown formatting or code blocks.
`;
}

async function openInEditor(content: string, filePath: string): Promise<string> {
  const editor = process.env.EDITOR || process.env.VISUAL || "nano";

  await writeFile(filePath, content);

  return new Promise((resolve, reject) => {
    const child = spawn(editor, [filePath], {
      stdio: "inherit",
      shell: true,
    });

    child.on("close", async (code) => {
      if (code === 0) {
        try {
          const result = await readFile(filePath, "utf-8");
          resolve(result.trim());
        } catch {
          reject(new Error("Failed to read edited file"));
        }
      } else {
        reject(new Error("Editor closed with non-zero exit code"));
      }
    });
  });
}

async function main(): Promise<void> {
  console.log("🚀 AI Commit Agent\n");

  console.log("📋 Getting git information...");
  const stagedFiles = execCommand("git diff --cached --name-only")
    .split("\n")
    .filter((line): boolean => line.length > 0);

  if (stagedFiles.length === 0) {
    console.log("❌ No files staged for commit");
    process.exit(1);
  }

  const branchName = execCommand("git branch --show-current").trim();
  const issueId = extractIssueId(branchName);
  const scope = determineScope(stagedFiles);

  console.log(`   Branch: ${branchName}`);
  console.log(`   Issue: ${issueId ? `#${issueId}` : "None"}`);
  console.log(`   Scope: ${scope || "multiple"}`);
  console.log(`   Files: ${stagedFiles.length}`);

  const gitDiff = execCommand("git diff --cached");

  const { coverage } = await runTests(scope);

  const context: CommitContext = {
    stagedFiles,
    gitDiff,
    branchName,
    issueId,
    testOutput: "",
    coverage,
  };

  const prompt = buildPrompt(context);
  const commitMessage = await callOllama(prompt);

  const tempFilePath = join(tmpdir(), "ai-commit-message.txt");

  const coverageDisplay = coverage
    ? `Lines: ${coverage.lines}% | Branches: ${coverage.branches}% | Functions: ${coverage.functions}%`
    : "Not available";

  const editorContent = `====== AI Generated Commit Message ======
${commitMessage}

====== Coverage ======
${coverageDisplay}

====== Instructions ======
- Edit the message above as needed
- Save and close to commit
- Delete the file or close without saving to cancel

Issue Reference: ${issueId ? `#${issueId}` : "None"}
================================================

`;

  console.log("\n📝 Opening editor for review...");

  try {
    const finalMessage = await openInEditor(editorContent, tempFilePath);

    const lines = finalMessage.split("\n");
    const dividerIndex = lines.indexOf("====== AI Generated Commit Message ======");
    const commitMsg = lines
      .slice(dividerIndex + 1)
      .join("\n")
      .split("======")[0]
      .trim();

    if (!commitMsg || commitMsg.length < 10) {
      console.log("❌ Commit cancelled (empty or too short message)");
      process.exit(1);
    }

    console.log("\n✅ Commit message:");
    console.log(commitMsg);

    console.log("\n📨 Creating commit...");
    execCommand(`git commit -m "${commitMsg.replace(/"/g, '\\"')}"`);

    console.log("✅ Commit created successfully!");
  } catch (error) {
    if (error instanceof Error && error.message.includes("non-zero")) {
      console.log("❌ Commit cancelled by user");
      process.exit(0);
    }
    throw error;
  }
}

main().catch(console.error);
