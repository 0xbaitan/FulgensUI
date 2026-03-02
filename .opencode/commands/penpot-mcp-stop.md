---
description: Stop the Penpot MCP server
agent: designer
subtask: true
---

# /penpot-mcp-stop Command

Stop the running Penpot MCP server.

## Steps

### Step 1: Check Current Status

Call the `penpot_mcp_status` tool to verify if server is running.

### Step 2: Stop the Server

Call the `penpot_mcp_stop` tool.

## Precautions

- **Not running:** Report "Penpot MCP server is not running" and confirm no action needed. Do NOT attempt to stop again.

- **Stale PID file (process dead but PID file exists):**
  - The plugin should automatically clean up stale PID files
  - If still an issue, manually remove: `rm /home/hexbaitan/Projects/.opencode/penpot-mcp.pid`

- **Process won't terminate:**
  - Wait a few seconds, the server may take time to shutdown
  - If still running after 5 seconds, show manual kill command:
    ```bash
    # Find the PID
    cat /home/hexbaitan/Projects/.opencode/penpot-mcp.pid
    # Kill manually
    kill <PID>
    # Or force kill if needed
    kill -9 <PID>
    ```

- **Partial failure:** If stop reports failure but process may still be running, verify with `penpot_mcp_status` tool again

## Success Output

Report: "Penpot MCP server stopped"

## Notes

- Gives the server 2 seconds to gracefully terminate
- Automatically cleans up PID file after stop
