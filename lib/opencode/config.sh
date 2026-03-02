#!/bin/bash

# OpenCode Integration Config
# This file provides paths and defaults for OpenCode integrations

# Base directories
export PENPOT_DIR="${PENPOT_DIR:-$HOME/penpot}"
export PENPOT_MCP_DIR="$PENPOT_DIR/mcp-server"

# MCP server path (auto-detect if exists)
if [ -f "$PENPOT_MCP_DIR/packages/server/dist/index.js" ]; then
    export PENPOT_MCP_SERVER_PATH="$PENPOT_MCP_DIR/packages/server/dist/index.js"
fi

# Default URLs
export PENPOT_API_URL="${PENPOT_API_URL:-http://localhost:9001/api}"
export PENPOT_PUBLIC_URI="${PENPOT_PUBLIC_URI:-http://localhost:9001}"

# MCP server ports
export MCP_PORT="${MCP_PORT:-4401}"
export MCP_WEBSOCKET_PORT="${MCP_WEBSOCKET_PORT:-4402}"
