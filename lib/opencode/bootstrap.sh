#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "========================================"
echo "OpenCode Integration Bootstrap"
echo "========================================"
echo ""

# 1. Load config
echo "[1/6] Loading config..."
source "$SCRIPT_DIR/config.sh"

# 2. Run Penpot setup if needed
echo "[2/6] Checking Penpot setup..."
if [ ! -d "$PENPOT_DIR" ]; then
    echo "      Penpot not found. Running setup..."
    if [ -f "$PROJECT_ROOT/lib/penpot/setup.sh" ]; then
        "$PROJECT_ROOT/lib/penpot/setup.sh"
    else
        echo "      Warning: Penpot setup script not found at lib/penpot/setup.sh"
    fi
else
    echo "      Penpot already setup at $PENPOT_DIR"
fi

# 3. Create .env from template if doesn't exist
echo "[3/6] Checking .env file..."
if [ ! -f "$SCRIPT_DIR/.env" ]; then
    cp "$SCRIPT_DIR/.env.template" "$SCRIPT_DIR/.env"
    echo "      Created .env file. Please edit with your tokens."
else
    echo "      .env already exists"
fi

# 4. Install direnv if needed
echo "[4/6] Checking direnv..."
if ! command -v direnv &> /dev/null; then
    echo "      direnv not found. Attempting to install..."
    if [ "$(uname)" = "Darwin" ]; then
        if command -v brew &> /dev/null; then
            brew install direnv
        else
            echo "      Error: Homebrew not found. Please install direnv manually."
            echo "      macOS: brew install direnv"
        fi
    elif [ "$(uname)" = "Linux" ]; then
        if command -v apt-get &> /dev/null; then
            echo "      Installing direnv via apt..."
            sudo apt-get update && sudo apt-get install -y direnv
        elif command -v dnf &> /dev/null; then
            sudo dnf install direnv
        elif command -v pacman &> /dev/null; then
            sudo pacman -S direnv
        else
            echo "      Error: No supported package manager found."
            echo "      Please install direnv manually."
        fi
    fi
else
    echo "      direnv already installed"
fi

# 5. Allow direnv
echo "[5/6] Configuring direnv..."
if command -v direnv &> /dev/null; then
    direnv allow "$SCRIPT_DIR"
    echo "      direnv allowed for $SCRIPT_DIR"
else
    echo "      Warning: direnv not available, skipping allow"
fi

# 6. Add direnv hook to shell if needed
echo "[6/6] Checking shell integration..."
SHELL_RC=""
SHELL_NAME=""
if [ -n "$ZSH_VERSION" ]; then
    SHELL_RC="$HOME/.zshrc"
    SHELL_NAME="zsh"
elif [ -n "$BASH_VERSION" ]; then
    SHELL_RC="$HOME/.bashrc"
    SHELL_NAME="bash"
fi

if [ -n "$SHELL_RC" ]; then
    if ! grep -q "direnv hook" "$SHELL_RC" 2>/dev/null; then
        echo "      Adding direnv hook to $SHELL_RC..."
        echo "" >> "$SHELL_RC"
        echo "# direnv hook (added by OpenCode bootstrap)" >> "$SHELL_RC"
        echo "eval \"\$(direnv hook $SHELL_NAME)\"" >> "$SHELL_RC"
        echo "      Added direnv hook. Run: source $SHELL_RC"
    else
        echo "      direnv hook already present in $SHELL_RC"
    fi
fi

# 7. Create wrapper script symlink
echo ""
echo "Creating opencode wrapper..."
WRAPPER_SOURCE="$SCRIPT_DIR/opencode-wrapper.sh"
WRAPPER_TARGET="$HOME/bin/opencode-penpot"
mkdir -p "$HOME/bin"

if [ -L "$WRAPPER_TARGET" ]; then
    rm "$WRAPPER_TARGET"
fi
ln -sf "$WRAPPER_SOURCE" "$WRAPPER_TARGET"
chmod +x "$WRAPPER_SOURCE"
echo "      Created: $WRAPPER_TARGET"

echo ""
echo "========================================"
echo "Bootstrap complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo ""
echo "1. Edit lib/opencode/.env with your access tokens"
echo "   - PENPOT_ACCESS_TOKEN (from Penpot → Profile → Access tokens)"
echo "   - GITHUB_TOKEN (if needed)"
echo ""
echo "2. Restart your shell:"
echo "   source ~/.bashrc  # or ~/.zshrc"
echo ""
echo "3. Run OpenCode with integrations:"
echo "   opencode-penpot"
echo ""
echo "   Or from within the project:"
echo "   cd lib/opencode && opencode"
echo ""
