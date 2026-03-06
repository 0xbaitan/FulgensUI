# Token Synchronization Examples

This directory contains reference examples for synchronizing design tokens between PandaCSS and Penpot using the designer agent.

## Overview

The designer agent can:

- Extract colors and values from Penpot designs
- Compare against PandaCSS token configuration
- Create missing tokens in Penpot via MCP connection
- Manage token sets and themes
- Verify token creation and document results

## Use Cases

### 1. Creating Missing Color Tokens

**Scenario:** You have colors defined in PandaCSS but not in Penpot

**Example:**

```
User: @designer Create plan for Button component
Designer: I found 2 colors missing from Penpot: blue.600 and blue.800
          Would you like me to create these tokens?
User: yes, create them
Designer: ✅ Created colors/primary/600 and colors/primary/800 in Penpot
```

**See:** [code-snippets.md#creating-color-tokens](./code-snippets.md#creating-color-tokens)

---

### 2. Setting Up Token Sets

**Scenario:** First time setup - create the FulgensUI token set

**Example:**

```
Designer: No token set named "FulgensUI" found in Penpot.
          I'll create it and add 5 color tokens from PandaCSS.
User: go ahead
Designer: ✅ Token set "FulgensUI" created and activated
```

**See:** [code-snippets.md#creating-token-sets](./code-snippets.md#creating-token-sets)

---

### 3. Creating Light/Dark Themes

**Scenario:** Component has dark mode variants in Penpot

**Example:**

```
Designer: I detected dark mode frames in your Button design.
          Should I create FulgensUI/Light and FulgensUI/Dark themes?
User: yes
Designer: ✅ Created both themes with proper token overrides
```

**See:** [code-snippets.md#creating-themes](./code-snippets.md#creating-themes)

---

### 4. Handling Token Creation Errors

**Scenario:** Token already exists or creation fails

**Example:**

```
Designer: ⚠️ colors/primary/600 already exists in Penpot
          Value: #2563EB (matches PandaCSS ✅)
          Skipping creation, documented in planning doc.
```

**See:** [code-snippets.md#error-handling](./code-snippets.md#error-handling)

---

### 5. Spacing and Sizing Tokens

**Scenario:** Extract and create non-color tokens

**Example:**

```
Designer: Found spacing values: 8px, 12px, 16px, 24px
          Mapping to spacing/sm, spacing/md, spacing/lg, spacing/xl
          Create these in Penpot?
User: yes
Designer: ✅ Created 4 spacing tokens in FulgensUI set
```

**See:** [code-snippets.md#spacing-tokens](./code-snippets.md#spacing-tokens)

---

## Workflow Diagram

```
┌─────────────────────────────────────────────┐
│ Designer Agent Analyzes Penpot Design      │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│ Extract Colors/Values from Shapes          │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│ Query Existing Penpot Tokens               │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│ Compare Against PandaCSS Config            │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│ Build Token Gap Report                     │
│ - ✅ Matched                               │
│ - ⚠️ Missing from Penpot                   │
│ - 🔄 Extra in Penpot                       │
│ - ❌ Value mismatch                        │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│ Present Findings to User                   │
│ "Would you like me to create X tokens?"   │
└────────────────┬────────────────────────────┘
                 │
        ┌────────┴────────┐
        │                 │
        ▼                 ▼
   User Approves    User Declines
        │                 │
        ▼                 │
┌──────────────────┐      │
│ Execute Code via │      │
│ Penpot MCP       │      │
│ - Create set     │      │
│ - Add tokens     │      │
│ - Create themes  │      │
└────────┬─────────┘      │
         │                │
         ▼                │
┌──────────────────┐      │
│ Verify Creation  │      │
└────────┬─────────┘      │
         │                │
         └────────┬───────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│ Update Planning Document with Results      │
└─────────────────────────────────────────────┘
```

---

## Token Naming Conventions

### PandaCSS → Penpot Mapping

| PandaCSS Token     | Penpot Token Name    | Type      |
| ------------------ | -------------------- | --------- |
| `colors.blue.500`  | `colors/primary/500` | color     |
| `colors.blue.600`  | `colors/primary/600` | color     |
| `colors.gray.100`  | `colors/neutral/100` | color     |
| `colors.white`     | `colors/white`       | color     |
| `spacing.2` (8px)  | `spacing/sm`         | dimension |
| `spacing.3` (12px) | `spacing/md`         | dimension |
| `spacing.4` (16px) | `spacing/lg`         | dimension |

**Naming rules:**

- Use `/` separators for hierarchy (not `.`)
- Group by category: `colors/`, `spacing/`, `sizing/`, `typography/`
- Use semantic names when applicable: `primary`, `secondary`, `neutral`
- Include scale numbers: `/50`, `/100`, `/500`, `/900`

---

## Best Practices

### ✅ DO

- Always ask user permission before creating tokens
- Verify tokens after creation
- Document all actions in planning doc section 3.5
- Use hierarchical naming with `/` separators
- Group related tokens in single set `FulgensUI`
- Create themes for light/dark mode support
- Handle errors gracefully and continue workflow

### ❌ DON'T

- Don't create tokens without explicit approval
- Don't overwrite existing tokens without warning
- Don't create multiple sets for same component
- Don't use hard-coded values without checking PandaCSS first
- Don't halt the entire workflow on token creation failure
- Don't skip verification step

---

## Troubleshooting

### Token creation fails with "already exists"

**Solution:** Check if token has correct value. If yes, skip creation. If no, warn user and document mismatch.

### MCP connection error

**Solution:** Check Penpot MCP server status with `/penpot-mcp-status`. Restart if needed. Document tokens for manual creation as fallback.

### Token values don't match between systems

**Solution:** Flag as ❌ MISMATCH in gap analysis. Ask user which value is correct. Update appropriate system.

### Theme creation not working

**Solution:** Verify Penpot API version supports themes. Check token set exists first. Document theme structure for manual creation if needed.

---

## Related Documentation

- [Designer Agent Configuration](../../../.opencode/agents/designer.md)
- [Code Snippets Reference](./code-snippets.md)
- [AGENTS.md - Designer Workflow](../../../AGENTS.md#designer-to-coder-workflow)
- [PandaCSS Token Configuration](../../../packages/core/src/config/base/colors.ts)

---

## Example Planning Documents

See real-world examples of token sync in action:

- [Button Component Plan](../button/COMPONENT-PLAN.md) - No sync needed (all tokens matched)
- [Token Sync Example](./example-plan-with-sync.md) - Full sync workflow with 5 new tokens
