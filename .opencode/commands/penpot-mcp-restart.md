---
description: Restart the Penpot MCP server
agent: designer
subtask: true
---

# /penpot-mcp-restart Command

Restart the Penpot MCP server (stop then start).

## Pre-flight Checks

### Step 1: Verify Vendor Directory Exists

Execute:

```bash
ls -la vendor/penpot-mcp
```

**If missing:** Stop and report: "Penpot MCP vendor directory not found. Cannot restart."

## Steps

### Step 1: Check Current Status

Call the `penpot_mcp_status` tool to check if server is running.

### Step 2: Stop the Server

Call the `penpot_mcp_stop` tool.

### Step 3: Verify Stop Succeeded

Call the `penpot_mcp_status` tool to confirm server is stopped.

**If still running after stop:** Abort restart and report: "Failed to stop server. Cannot restart."

### Step 4: Start the Server

Call the `penpot_mcp_start` tool.

### Step 5: Verify Start Succeeded

Call the `penpot_mcp_status` tool to confirm server is running.

## Precautions

- **Stop failure:** If stop fails, do NOT attempt to start. Report: "Stop failed, restart aborted. Please check server status manually."

- **Start failure after successful stop:** Report partial failure:
  - "Server was stopped but failed to restart. Please run `/penpot-mcp-start` manually to recover."
  - Include troubleshooting steps:
    - Check vendor/penpot-mcp configuration
    - Verify no port conflicts
    - Try starting manually with `pnpm run start` in vendor/penpot-mcp

- **Already stopped:** If server was not running at start of restart, still attempt to start it

- **Timeout:** Restart may take 5-10 seconds. Wait for full sequence to complete before reporting status.

## Success Output

Report: "Penpot MCP server restarted with PID [PID]"

## Notes

- Combines stop and start operations
- Checks status between operations to ensure clean transition
- Useful after configuration changes or if server becomes unresponsive
