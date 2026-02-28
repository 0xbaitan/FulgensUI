#!/usr/bin/env python3
"""Atomic GitHub API functions for issue processing."""

import subprocess
import json
from typing import Optional, Tuple, Dict, Any


def run_gh_command(args: list[str]) -> Tuple[int, str, str]:
    """Run a gh command and return result."""
    try:
        result = subprocess.run(
            ['gh'] + args,
            capture_output=True,
            text=True,
            check=False
        )
        return result.returncode, result.stdout, result.stderr
    except FileNotFoundError:
        return 1, "", "gh command not found"


def is_authenticated() -> bool:
    """Check if user is authenticated with GitHub."""
    code, _, _ = run_gh_command(['auth', 'status'])
    return code == 0


def create_issue(title: str, body: str, labels: Optional[list[str]] = None) -> Tuple[bool, str]:
    """Create a new issue on GitHub."""
    if not is_authenticated():
        return False, "Not authenticated with GitHub. Run: gh auth login"
    
    args = ['issue', 'create', '--title', title, '--body', body]
    
    if labels:
        args.extend(['--label', ','.join(labels)])
    
    code, stdout, stderr = run_gh_command(args)
    
    if code == 0:
        return True, stdout.strip()
    else:
        return False, stderr or "Failed to create issue"


def add_comment(issue_num: int, body: str) -> Tuple[bool, str]:
    """Add a comment to an existing issue."""
    if not is_authenticated():
        return False, "Not authenticated with GitHub"
    
    args = ['issue', 'comment', str(issue_num), '--body', body]
    code, stdout, stderr = run_gh_command(args)
    
    if code == 0:
        return True, "Comment added"
    else:
        return False, stderr or "Failed to add comment"


def get_issue(issue_num: int) -> Tuple[bool, Dict[str, Any]]:
    """Get an issue by number."""
    if not is_authenticated():
        return False, {"error": "Not authenticated with GitHub"}
    
    args = ['issue', 'view', str(issue_num), '--json', 'number,title,labels,state']
    code, stdout, stderr = run_gh_command(args)
    
    if code == 0:
        try:
            return True, json.loads(stdout)
        except json.JSONDecodeError:
            return False, {"error": "Failed to parse issue data"}
    else:
        return False, {"error": stderr or "Failed to get issue"}


def link_issues(from_num: int, to_num: int, link_type: str = "blocks") -> Tuple[bool, str]:
    """Link two issues together via comment."""
    if not is_authenticated():
        return False, "Not authenticated with GitHub"
    
    comment_body = f"This issue {link_type} #{to_num}"
    return add_comment(from_num, comment_body)


def get_repo_info() -> Tuple[bool, Dict[str, Any]]:
    """Get current repository information."""
    args = ['repo', 'view', '--json', 'name,owner,url']
    code, stdout, stderr = run_gh_command(args)
    
    if code == 0:
        try:
            return True, json.loads(stdout)
        except json.JSONDecodeError:
            return False, {"error": "Failed to parse repo data"}
    else:
        return False, {"error": stderr or "Failed to get repo info"}


if __name__ == '__main__':
    import sys
    
    if len(sys.argv) < 2:
        print("Usage: api.py <command> [args...]")
        print("Commands: auth, create, comment, get, repo")
        sys.exit(1)
    
    cmd = sys.argv[1]
    
    if cmd == 'auth':
        print(f"Authenticated: {is_authenticated()}")
    elif cmd == 'repo':
        success, data = get_repo_info()
        if success:
            print(json.dumps(data, indent=2))
        else:
            print(f"Error: {data}")
    else:
        print(f"Unknown command: {cmd}")
