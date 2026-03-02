#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Change to the opencode directory to ensure direnv loads
cd "$SCRIPT_DIR"

# Load env vars via direnv export
eval "$(direnv export bash)"

# Run opencode with all arguments
exec opencode "$@"
