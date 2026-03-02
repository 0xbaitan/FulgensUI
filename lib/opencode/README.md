# OpenCode Integrations

General-purpose bootstrap for OpenCode with environment variable support.

## Features

- **direnv integration** - Auto-loads environment variables when running OpenCode
- **Wrapper script** - Run `opencode-penpot` from anywhere
- **Extensible** - Add more integrations via `.env`

## Quick Start

```bash
# One-time bootstrap
./lib/opencode/bootstrap.sh

# Edit .env with your tokens
vim lib/opencode/.env

# Restart shell
source ~/.bashrc  # or ~/.zshrc

# Run OpenCode with integrations loaded
opencode-penpot
```

## Directory Structure

```
lib/opencode/
├── config.sh              # Integration paths & defaults
├── .env.template         # Template for env variables
├── .env                  # Your env variables (gitignored)
├── .envrc                # direnv config
├── bootstrap.sh          # Bootstrap script
├── opencode-wrapper.sh   # Wrapper for running opencode
└── README.md
```

## Environment Variables

Add tokens to `.env`:

```bash
# Penpot
PENPOT_ACCESS_TOKEN=your-penpot-token

# GitHub
GITHUB_TOKEN=your-github-token
```

These are loaded automatically when running OpenCode.

## Usage

### Option 1: Wrapper script (recommended)

```bash
opencode-penpot
```

### Option 2: From within directory

```bash
cd lib/opencode
opencode

# Or any subdirectory
cd lib/penpot
opencode
```

## Scripts

| Script | Description |
|--------|-------------|
| `bootstrap.sh` | First-time setup (installs direnv, creates .env, etc.) |
| `opencode-wrapper.sh` | Wrapper that loads env vars and runs opencode |

## Penpot Scripts

Penpot-specific scripts are in `lib/penpot/`:

```bash
./lib/penpot/setup.sh      # First-time setup
./lib/penpot/start.sh      # Start app + MCP
./lib/penpot/start-app.sh  # Start only Docker app
./lib/penpot/start-mcp.sh  # Start only MCP server
./lib/penpot/stop.sh       # Stop all services
./lib/penpot/restart.sh    # Restart services
./lib/penpot/status.sh     # Check status
./lib/penpot/logs.sh       # View logs
```

## Troubleshooting

### direnv not loading

```bash
# Manually allow the directory
direnv allow lib/opencode

# Check what's being loaded
direnv edit lib/opencode
```

### Wrapper not found

```bash
# Ensure ~/bin is in your PATH
echo $PATH

# If not, add to ~/.bashrc or ~/.zshrc
export PATH="$HOME/bin:$PATH"
```

### Environment variables not set

```bash
# Check current env vars
env | grep PENPOT

# Manually source config
source lib/opencode/config.sh
source lib/opencode/.env
```
