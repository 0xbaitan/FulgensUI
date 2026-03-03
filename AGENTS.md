# AGENTS.md - FulgensUI Developer Guide

This file provides guidelines and commands for AI agents working in this repository.

## Project Overview

FulgensUI is a modern UI component library built with React 19, Vite, and PandaCSS. It's a monorepo managed with Turborepo using Bun as the package manager.

## Directory Structure

```text
FulgensUI/
├── packages/
│   ├── core/          # Main UI component library
│   │   ├── src/
│   │   │   ├── components/ui/{component-name}/  # Component files
│   │   │   ├── config/           # PandaCSS tokens, recipes, semantic tokens
│   │   │   └── styled-system/    # Generated PandaCSS output
│   │   └── .storybook/            # Storybook configuration
│   └── docsite/       # Docusaurus documentation site
├── turbo.json         # Turborepo configuration
└── package.json       # Root workspace config
```

## Commands

### Root Level (from project root)

```bash
# Install dependencies
bun install

# Run all packages in dev mode
bun run dev

# Build all packages
bun run build

# Lint all packages
bun run lint

# Test all packages
bun run test

# Clean all packages
bun run clean
```

### Core Package (packages/core)

```bash
cd packages/core

# Run Vite dev server
bun run dev

# Run Storybook (port 6006)
bun run storybook

# Build for production
bun run build

# Lint with ESLint
bun run lint

# Type check with TypeScript
bun run type-check

# Run a single test file
bunx vitest run path/to/testfile.test.ts

# Run tests in watch mode
bunx vitest

# Run tests with coverage
bunx vitest run --coverage
```

## Component Structure

New components should follow this structure:

```text
src/components/ui/{component-name}/
├── index.ts           # Barrel export
├── {component}.tsx    # Main component
├── config/
│   ├── {component}-recipe.ts        # PandaCSS recipe
│   └── {component}-semantic-tokens.ts # Semantic tokens (if needed)
└── storybook/
    ├── {component}.stories.tsx      # Storybook stories
    └── {component}.mdx              # Documentation
```

### Component File Pattern

```typescript
// packages/core/src/components/ui/button/button.tsx
import { ComponentProps } from "react";
import { button } from "@styled-system/recipes";
import type { ButtonVariantProps } from "@styled-system/recipes";

export type { ButtonVariantProps } from "@styled-system/recipes";

export type ButtonProps = ComponentProps<"button"> & ButtonVariantProps;

export function Button(props: ButtonProps) {
  return <button className={button({ ...props })} {...props}></button>;
}
```

### Index File Pattern

```typescript
// packages/core/src/components/ui/button/index.ts
export * from "./button";
```

## Code Style Guidelines

### TypeScript

- **Strict mode enabled** - No implicit any, strict null checks
- Use explicit types for function parameters and return values when not obvious
- Use `interface` for public APIs, `type` for unions/intersections
- Avoid `any` - use `unknown` when type is truly unknown

### Naming Conventions

- **Components**: PascalCase (e.g., `Button`, `Modal`)
- **Files**: kebab-case (e.g., `button.tsx`, `my-component.ts`)
- **Directories**: kebab-case (e.g., `ui/button/`)
- **Variables/functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Types/Interfaces**: PascalCase with `Props` suffix (e.g., `ButtonProps`)

### Imports

Use path aliases when available:

```typescript
// Good
import { button } from "@styled-system/recipes";
import { Button } from "@components/ui/button";
import { colors } from "@config/base";

// Avoid
import { button } from "../../styled-system/recipes";
```

Configured aliases:

- `@/*` → `./src/*`
- `@styled-system/*` → `./src/styled-system/*`
- `@components/*` → `./src/components/*`
- `@config/*` → `./src/config/*`

### ESLint Rules

The project uses ESLint with these key rules:

- `no-unused-vars`: Error on unused variables (except those starting with `_`)
- React hooks rules from `eslint-plugin-react-hooks`
- React refresh rules from `eslint-plugin-react-refresh`

### Error Handling

- Use TypeScript types to prevent runtime errors
- Use early returns for error conditions
- Never use `any` type - use `unknown` instead

### PandaCSS Recipes

Components use PandaCSS recipes for variant styling:

```typescript
// packages/core/src/config/recipes.ts
import { defineRecipe } from "@pandacss/dev";

export const button = defineRecipe({
  className: "button",
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
  variants: {
    variant: {
      primary: { bg: "primary.500", color: "white" },
      secondary: { bg: "secondary.500", color: "white" },
    },
    size: {
      sm: { px: 3, py: 1 },
      md: { px: 4, py: 2 },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});
```

## Testing

### Vitest

Tests are co-located with components or in a `__tests__` directory:

```typescript
import { describe, it, expect } from "vitest";

describe("Button", () => {
  it("renders correctly", () => {
    // Test implementation
  });
});
```

Run a single test file:

```bash
cd packages/core
bunx vitest run src/components/ui/button/__tests__/button.test.tsx
```

### Storybook

Components should have Storybook stories for visual testing and documentation:

```typescript
// packages/core/src/components/ui/button/storybook/button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button";

const meta = {
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Click me",
    variant: "primary",
  },
};
```

## Linting & Type Checking

Always run lint and type check before committing:

```bash
cd packages/core
bun run lint
bun run type-check
```

## CI/CD

- **GitHub Actions**: Runs on push/PR to build core and deploy docsite using Bun 1.3.6
- **GitLab CI**: Full pipeline with build, test, and deployment

## Local CI Testing

FulgensUI provides atomic CI scripts that mirror the GitHub Actions pipeline for local testing before commits.

### CI Scripts

All CI scripts use the `ci:` prefix and can be run individually or as a full suite:

#### Individual Scripts

```bash
# Install dependencies (frozen lockfile, matches CI)
bun run ci:install

# Generate PandaCSS (required before other tasks)
bun run ci:panda

# Lint all packages
bun run ci:lint

# TypeScript type checking
bun run ci:type-check

# Run tests (fast, no coverage)
bun run ci:test

# Run tests with coverage (CI behavior)
bun run ci:test:coverage

# Build all packages
bun run ci:build

# Build Storybook
bun run ci:build-storybook
```

#### Full CI Suite

```bash
# Run complete CI pipeline locally
bun run ci:all
```

This executes all CI steps in order: install → panda → lint → type-check → test with coverage → build → build-storybook.

### Pre-commit Scripts

The pre-commit hook runs a subset of CI checks for faster feedback:

```bash
# Fast checks (no tests, no coverage)
bun run pre-commit:checks

# Interactive test runner (prompts on failure)
bun run pre-commit:test:staged
```

### Turbo Task Orchestration

CI scripts leverage Turborepo for task orchestration and caching:

**Task Dependency Chain:**

```
panda (generate PandaCSS)
  ↓
  ├→ lint
  ├→ type-check
  ├→ test
  └→ build
```

All tasks wait for PandaCSS generation to complete before running.

**Turbo Filtering:**

Run tasks only for affected packages:

```bash
# Test only affected packages
turbo run test --filter=[affected]

# Build specific package
turbo run build --filter=@fulgensui/core
```

### Coverage Thresholds

Test coverage thresholds (enforced in CI only):

- **Lines**: 90%
- **Branches**: 100%
- **Functions**: 90%
- **Statements**: 90%

Pre-commit tests do NOT enforce coverage for speed. Use `bun run ci:test:coverage` to check coverage locally.

### Troubleshooting

**Pre-commit hook too slow?**

Skip the hook temporarily:

```bash
git commit --no-verify -m "your message"
```

Or remove `bun run pre-commit:test:staged` from `.husky/pre-commit` to disable tests.

**Tests failing in CI but passing locally?**

Ensure you're using frozen lockfile:

```bash
rm -rf node_modules bun.lock
bun install
bun run ci:all
```

**Turbo cache issues?**

Clear turbo cache:

```bash
rm -rf .turbo
bun run clean
```

## Git Hooks & Commit Workflow

### Husky

The project uses Husky for Git hooks with the following configuration:

- **pre-commit**:
  1. Runs `lint-staged` to format and fix staged files (eslint --fix, prettier)
  2. Runs `pre-commit:checks` for fast validation (panda, lint, type-check)
  3. Runs `pre-commit:test:staged` for interactive test runner on affected packages
- **commit-msg**: Validates commit messages against Conventional Commits format

### Pre-commit Hook Behavior

**What runs:**

1. **lint-staged** (~5-15s): Auto-fixes formatting issues in staged files
2. **pre-commit:checks** (~10-30s): Validates PandaCSS, linting, TypeScript types
3. **pre-commit:test:staged** (~10-60s): Runs tests on affected packages only

**If tests fail:**

- Hook prompts: `Tests failed. Continue with commit anyway? [y/N]`
- Press `y` to commit anyway (useful for WIP commits)
- Press `n` or Enter to abort commit and fix tests

**Total time:** ~25-105 seconds depending on changes

**Skip the hook:**

```bash
git commit --no-verify -m "wip: work in progress"
```

### lint-staged Configuration

Located in `.lintstagedrc`:

```json
{
  "*.{ts,tsx}": ["eslint --fix --max-warnings=0"],
  "*.{json,md,yml,yaml}": ["prettier --write"]
}
```

### Conventional Commits

All commit messages must follow the Conventional Commits specification:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (formatting)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to CI configuration files and scripts
- `chore`: Other changes that don't modify src or test files
- `revert`: Reverts a previous commit

**Examples:**

```
feat(button): add primary variant with hover state
fix(input): resolve value not updating on change
docs(readme): update installation instructions
```

### AI Commit Agent

The project includes an AI-powered commit agent that helps generate conventional commit messages.

**Usage:**

```bash
bun run ai-commit
```

**How it works:**

1. **Staged Files**: Analyzes which files are staged for commit
2. **Issue Detection**: Extracts issue ID from branch name (e.g., `feature/123-add-button` → `#123`)
3. **Test Execution**: Runs tests with coverage (scoped to affected package when possible)
4. **AI Generation**: Uses Ollama with `opencode/big-pickle` model to generate commit message
5. **Review**: Opens editor for user to review/edit the generated message
6. **Commit**: Creates the commit when user saves and closes the editor

**Coverage Requirements:**

- **Branch**: 100% (default threshold)
- **Line**: 90% (default threshold)

The agent displays coverage metrics before committing, allowing you to make an informed decision about whether to proceed.

**Branch Naming for Issue Tracking:**

Create branches with issue IDs using these patterns:

- `feature/123-add-button`
- `fix/456-hover-issue`
- `tasks/789-update-docs`

### Git Subagent for Committing

When asked to commit changes, the git subagent should:

1. **Check staged files**: `git diff --cached --name-only`
2. **Determine scope**: Identify which package/component is affected
3. **Run tests**: Execute tests for the affected package (or all tests if integration tests needed)
4. **Discuss coverage**: Review coverage metrics with user - are thresholds met?
5. **Generate message**: Use `bun run ai-commit` or manually craft a conventional commit
6. **Validate format**: Ensure commit follows Conventional Commits specification
7. **Allow edits**: Give user opportunity to edit the commit message if needed

**Test Scope Selection:**

- Package-scoped changes: Run tests only for that package
- Integration/breaking changes: Run full test suite
- Ask user if unsure about required test scope

## Additional Notes

- Uses Bun as package manager (>= 1.3.0)
- Node.js >= 18.0.0 required
- React 19 with Vite 7
- PandaCSS for zero-runtime CSS-in-JS styling
