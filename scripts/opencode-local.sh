#!/bin/bash
# OpenCode with local Ollama model (qwen2.5-coder:7b)

set -e

echo "=== OpenCode Local Runner ==="
echo "Using model: qwen2.5-coder:7b"

# Check if Ollama is installed
if ! command -v ollama &> /dev/null; then
    echo "Error: Ollama is not installed."
    echo "Install from: https://ollama.com/"
    exit 1
fi

# Check if Ollama is running, start if not
if ! curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
    echo "Starting Ollama server..."
    ollama serve &
    OLLAMA_PID=$!
    echo "Ollama started (PID: $OLLAMA_PID)"
    
    # Wait for Ollama to be ready
    echo "Waiting for Ollama to be ready..."
    for i in {1..30}; do
        if curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
            echo "Ollama is ready!"
            break
        fi
        sleep 1
    done
fi

# Check if model exists, pull if not
if ! ollama list | grep -q "qwen2.5-coder:7b"; then
    echo "Pulling qwen2.5-coder:7b model..."
    ollama pull qwen2.5-coder:7b
    echo "Model ready!"
else
    echo "Model qwen2.5-coder:7b already available"
fi

echo ""
echo "Starting OpenCode..."
echo ""

# Run opencode
exec opencode "$@"
