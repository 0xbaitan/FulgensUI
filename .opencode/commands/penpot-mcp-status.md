---
description: Check the Penpot MCP server status
agent: designer
subtask: true
---

# /penpot-mcp-status Command

Check if the Penpot MCP server is running.

## Steps

### Step 1: Check Status

Call the `penpot_mcp_status` tool.

## Precautions

- **Not running:** Report "Penpot MCP server is not running" and suggest: "Run `/penpot-mcp-start` to start the server."

- **Running:** Report the PID: "Penpot MCP server is running (PID: [PID])"

- **Stale PID (process dead but file exists):** The plugin should automatically clean this up. If status shows not running after a previous crash, no manual action needed.

## Example Outputs

### Server Running
```
Penpot MCP server is running (PID: 179688)
```

### Server Not Running
```
Penpot MCP server is not running
Run /penpot-mcp-start to start the server
```

## Notes

- Quick way to verify server state before performing operations
- Useful for debugging connection issues
- No side effects - read-only check
