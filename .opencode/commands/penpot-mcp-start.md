---
description: Start the Penpot MCP server
agent: designer
subtask: true
---

# /penpot-mcp-start Command

Start the Penpot MCP server for design integration.

## Pre-flight Checks

### Step 1: Verify Vendor Directory Exists

Execute:

```bash
ls -la vendor/penpot-mcp
```

**If missing:** Stop and report: "Penpot MCP vendor directory not found. Please run `git clone` or setup to get the penpot-mcp package."

### Step 2: Verify Dependencies Installed

Execute:

```bash
ls vendor/penpot-mcp/node_modules
```

**If missing:** Report: "Dependencies not installed. Run `pnpm install` in vendor/penpot-mcp directory."

## Steps

### Step 1: Check Current Status

Call the `penpot_mcp_status` tool to check if server is already running.

### Step 2: Start the Server

If not running, call the `penpot_mcp_start` tool.

## Precautions

- **Already running:** Report "Penpot MCP server is already running" with the current status. Do NOT attempt to start again.

- **Failed to start:**
  - Check for errors in terminal output
  - Verify vendor/penpot-mcp has proper configuration
  - Try running `pnpm run start` manually in vendor/penpot-mcp to see detailed errors
  - Check if port is already in use

- **Permission errors:** Ensure the process has permissions to write to `.opencode` directory

## Success Output

Report the PID to the user: "Penpot MCP server started with PID [PID]"

## Notes

- The server runs in detached mode
- PID is saved to `.opencode/penpot-mcp.pid` for tracking
