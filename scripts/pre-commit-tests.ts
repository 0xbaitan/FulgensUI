#!/usr/bin/env bun

/**
 * Pre-commit Test Runner with Interactive Prompts
 *
 * Runs tests on affected packages using turbo --filter=[affected]
 * If tests fail, prompts user: "Tests failed. Continue anyway? [y/N]"
 * Exits with appropriate code based on user response.
 */

import { $ } from "bun";
import * as readline from "node:readline";

// ANSI colors for output
const colors = {
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  reset: "\x1b[0m",
};

function log(color: string, message: string) {
  console.log(`${color}${message}${colors.reset}`);
}

function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    });
  });
}

async function main() {
  log(colors.blue, "\n🧪 Running tests on affected packages...\n");

  try {
    // Run turbo test with affected filter
    // Note: No coverage in pre-commit (user choice for speed)
    await $`turbo run test --filter=[affected] --force`.quiet();

    log(colors.green, "\n✅ All tests passed!\n");
    process.exit(0);
  } catch {
    log(colors.red, "\n❌ Tests failed!\n");

    // Interactive prompt
    const answer = await prompt(
      `${colors.yellow}Continue with commit anyway? [y/N]:${colors.reset} `,
    );

    if (answer === "y" || answer === "yes") {
      log(
        colors.yellow,
        "\n⚠️  Proceeding with commit despite test failures...\n",
      );
      process.exit(0); // Allow commit
    } else {
      log(colors.red, "\n🛑 Commit aborted. Fix tests and try again.\n");
      log(colors.blue, "Tip: Run 'bun run ci:test' to see full test output\n");
      process.exit(1); // Block commit
    }
  }
}

main();
