---
description: Restore a previous @manager conversation session
agent: manager
subtask: false
---

# /restore-session Command

Restore a previous @manager conversation session to continue refining an issue.

## Arguments

- `<session_id>`: Optional - Session ID to restore (format: `YYYYMMDD_HHMMSS`)
- `--list`: List all available sessions with preview

## Workflow

### Step 1: List Available Sessions (if no session_id or --list)

```bash
# Find all session files
find .temp/issues/sessions/ -name "*.json" -type f | sort -r

# Display preview of each
for session_file in $(find .temp/issues/sessions/ -name "*.json" -type f | sort -r | head -10); do
  echo "────────────────────────────────────────"
  echo "Session: $(basename "$session_file" .json)"

  # Extract metadata
  python3 -c "
import json, sys
with open('$session_file', 'r') as f:
    data = json.load(f)
print(f'Started: {data.get(\"started_at\", \"unknown\")}')
print(f'Type: {data.get(\"issue_type\", \"unknown\")}')
print(f'Status: {data.get(\"status\", \"in_progress\")}')
print(f'Title: {data.get(\"title\", \"(untitled)\")}')
print(f'Messages: {len(data.get(\"messages\", []))}')
"
done
```

Ask user which session to restore.

### Step 2: Load Session

```bash
SESSION_FILE=".temp/issues/sessions/${session_id}.json"

if [ ! -f "$SESSION_FILE" ]; then
  echo "❌ Session not found: $session_id"
  exit 1
fi

# Parse session
python3 -c "
import json
with open('$SESSION_FILE', 'r') as f:
    session = json.load(f)

print('✅ Session restored')
print()
print('Session Details:')
print(f'  ID: ${session_id}')
print(f'  Started: {session.get(\"started_at\")}')
print(f'  Issue Type: {session.get(\"issue_type\")}')
print(f'  Title: {session.get(\"title\", \"(untitled)\")}')
print(f'  Status: {session.get(\"status\", \"in_progress\")}')
print(f'  Messages: {len(session.get(\"messages\", []))}')
print()
print('📝 Conversation History:')
print('─' * 60)

for i, msg in enumerate(session.get('messages', []), 1):
    role = msg.get('role', 'unknown')
    content = msg.get('content', '')
    timestamp = msg.get('timestamp', '')

    # Truncate long messages
    preview = content[:200] + '...' if len(content) > 200 else content

    print(f'{i}. [{role.upper()}] {timestamp}')
    print(f'   {preview}')
    print()

print('─' * 60)
print()
print('💬 Continue the conversation below...')
"
```

### Step 3: Restore Agent Context

Load the session into the @manager agent's context so it can continue the conversation:

1. **Load type-specific rules** based on `session.issue_type`
2. **Restore conversation history** in agent memory
3. **Resume at current refinement phase** (e.g., atomicity check, spec generation)

### Step 4: Continue Conversation

The @manager agent should:

1. Greet user with session summary
2. Show current status/phase
3. Ask what the user wants to do next:
   - Continue refining
   - Regenerate spec
   - Change issue type
   - Archive session

## Session File Structure

Sessions are stored as JSON in `.temp/issues/sessions/{session_id}.json`:

```json
{
  "session_id": "20260306_123456",
  "started_at": "2026-03-06T12:34:56Z",
  "updated_at": "2026-03-06T12:45:30Z",
  "issue_type": "bug",
  "title": "Fix button hover state",
  "status": "in_progress",
  "phase": "atomicity_check",
  "spec_path": ".temp/issues/specs/20260306_123456_button-bug.md",
  "attachments": [".temp/issues/attachments/20260306_123456/screenshot.png"],
  "messages": [
    {
      "role": "user",
      "content": "I found a bug where the button hover state doesn't work",
      "timestamp": "2026-03-06T12:34:56Z"
    },
    {
      "role": "assistant",
      "content": "I'll help you create a bug ticket. Can you describe...",
      "timestamp": "2026-03-06T12:35:12Z"
    }
  ],
  "metadata": {
    "priority": "must-have",
    "estimate": "3",
    "scope": "core"
  }
}
```

## Notes

- Sessions are auto-saved after every agent response
- Sessions persist until explicitly archived or deleted
- Use `--list` to browse recent sessions
- Archived sessions move to `.temp/issues/sessions/archive/`

## Example Usage

```bash
# List sessions
/restore-session --list

# Restore specific session
/restore-session 20260306_123456
```
