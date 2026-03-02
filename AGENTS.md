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
npm install

# Run all packages in dev mode
npm run dev

# Build all packages
npm run build

# Lint all packages
npm run lint

# Test all packages
npm run test

# Clean all packages
npm run clean
```

### Core Package (packages/core)

```bash
cd packages/core

# Run Vite dev server
npm run dev

# Run Storybook (port 6006)
npm run storybook

# Build for production
npm run build

# Lint with ESLint
npm run lint

# Type check with TypeScript
npm run type-check

# Run a single test file
npx vitest run path/to/testfile.test.ts

# Run tests in watch mode
npx vitest

# Run tests with coverage
npx vitest run --coverage
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
npx vitest run src/components/ui/button/__tests__/button.test.tsx
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
npm run lint
npm run type-check
```

## CI/CD

- **GitHub Actions**: Runs on push/PR to build core and deploy docsite
- **GitLab CI**: Full pipeline with build, test, and deployment

## Git Hooks & Commit Workflow

### Husky

The project uses Husky for Git hooks with the following configuration:

- **pre-commit**: Runs lint-staged to lint staged files before commit
- **commit-msg**: Validates commit messages against Conventional Commits format

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
npm run ai-commit
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
5. **Generate message**: Use `npm run ai-commit` or manually craft a conventional commit
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
