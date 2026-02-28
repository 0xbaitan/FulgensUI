#!/usr/bin/env python3
"""Atomic markdown formatting functions for issue processing."""

import datetime
import os
import re
import yaml
from typing import Any, Optional


def extract_body_field(data: dict, field_id: str, default: str = "") -> str:
    """Extract a field value from the body array by field ID."""
    body = data.get('body', [])
    for item in body:
        if item.get('id') == field_id:
            return item.get('attributes', {}).get('placeholder', default)
    return default


def get_issue_type(data: dict) -> str:
    """Determine issue type from template name."""
    template_name = data.get('name', '')
    if 'Bug' in template_name:
        return 'bug'
    elif 'Epic' in template_name:
        return 'epic'
    elif 'Story' in template_name:
        return 'story'
    elif 'Task' in template_name:
        return 'task'
    elif 'Item' in template_name:
        return 'item'
    return 'item'


def sanitize_filename(title: str) -> str:
    """Create sanitized filename from title."""
    s = title.lower()
    s = re.sub(r'[^a-z0-9]+', '-', s)
    s = s.strip('-')
    return s[:50]


def format_markdown(data: dict, issue_type: Optional[str] = None) -> str:
    """Format parsed YAML data into markdown."""
    if issue_type is None:
        issue_type = get_issue_type(data)
    
    # Extract metadata
    title = extract_body_field(data, 'title', '')
    priority = extract_body_field(data, 'priority', '') or 'null'
    estimate = extract_body_field(data, 'estimate', '') or 'null'
    blocked_by = extract_body_field(data, 'blocked_by', '') or 'null'
    parent_link = extract_body_field(data, 'parent_link', '') or 'null'
    theme = extract_body_field(data, 'theme', '') or 'null'
    
    issue_type_enum = issue_type
    
    lines = []
    lines.append("---")
    lines.append(f"title: {title}")
    lines.append(f"issue_type: {issue_type_enum}")
    lines.append(f"priority: {priority}")
    lines.append(f"estimate: {estimate}")
    lines.append(f"blocked_by: {blocked_by}")
    lines.append(f"parent_link: {parent_link}")
    lines.append(f"theme: {theme}")
    lines.append("---")
    lines.append("")
    
    # Type-specific sections
    if issue_type == 'bug':
        lines.append("## Feature")
        lines.append(extract_body_field(data, 'feature', 'To be determined'))
        lines.append("")
        lines.append("## Scenario")
        lines.append(extract_body_field(data, 'scenario', 'To be determined'))
        lines.append("")
        lines.append("## Expected Behavior")
        lines.append(extract_body_field(data, 'expected_behavior', 'To be determined'))
        lines.append("")
        lines.append("## Actual Behavior")
        lines.append(extract_body_field(data, 'actual_behavior', 'To be determined'))
        lines.append("")
        lines.append("## Environment")
        lines.append(extract_body_field(data, 'environment', 'To be determined'))
        lines.append("")
    
    elif issue_type == 'epic':
        lines.append("## Goal")
        lines.append(extract_body_field(data, 'goal', 'To be determined'))
        lines.append("")
        lines.append("## Stakeholder")
        lines.append(extract_body_field(data, 'stakeholder', 'To be determined'))
        lines.append("")
        lines.append("## Feature")
        lines.append(extract_body_field(data, 'feature', 'To be determined'))
        lines.append("")
        lines.append("## Scope & Deliverables")
        lines.append(extract_body_field(data, 'scope', 'To be determined'))
        lines.append("")
        lines.append("## Milestones")
        lines.append(extract_body_field(data, 'milestones', 'To be determined'))
        lines.append("")
    
    elif issue_type == 'story':
        lines.append("## User Story")
        lines.append(extract_body_field(data, 'user_story', 'To be determined'))
        lines.append("")
        lines.append("## Acceptance Criteria")
        lines.append(extract_body_field(data, 'acceptance_criteria', 'To be determined'))
        lines.append("")
        lines.append("## Background")
        lines.append(extract_body_field(data, 'background', 'To be determined'))
        lines.append("")
    
    elif issue_type == 'task':
        lines.append("## Technical Context")
        lines.append(extract_body_field(data, 'technical_context', 'To be determined'))
        lines.append("")
        lines.append("## Implementation Approach")
        lines.append(extract_body_field(data, 'implementation_approach', 'To be determined'))
        lines.append("")
        lines.append("## Dependencies")
        lines.append(extract_body_field(data, 'dependencies', 'To be determined'))
        lines.append("")
        lines.append("## Test Criteria")
        lines.append(extract_body_field(data, 'test_criteria', 'To be determined'))
        lines.append("")
    
    else:  # item
        lines.append("## Description")
        lines.append(extract_body_field(data, 'description', 'To be determined'))
        lines.append("")
        lines.append("## Acceptance Criteria")
        lines.append(extract_body_field(data, 'acceptance_criteria', 'To be determined'))
        lines.append("")
        lines.append("## Notes")
        lines.append(extract_body_field(data, 'notes', 'To be determined'))
        lines.append("")
    
    return '\n'.join(lines)


def format_subtasks(subtasks: list[str], max_items: int = 15) -> str:
    """Format subtasks as markdown checklist."""
    lines = ["## Actionable items", "<!-- Auto-generated subtasks - edit as needed -->"]
    
    for task in subtasks[:max_items]:
        lines.append(f"- [ ] {task}")
    
    lines.append("")
    return '\n'.join(lines)


def generate_output_filename(title: str, output_dir: str = ".temp/issues") -> str:
    """Generate output filename with timestamp."""
    os.makedirs(output_dir, exist_ok=True)
    sanitized = sanitize_filename(title)
    timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    return os.path.join(output_dir, f"{sanitized}-{timestamp}.md")


def write_markdown(path: str, content: str) -> None:
    """Write markdown content to file."""
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w') as f:
        f.write(content)


if __name__ == '__main__':
    import sys
    
    if len(sys.argv) < 2:
        print("Usage: formatter.py <yaml_file>")
        sys.exit(1)
    
    try:
        with open(sys.argv[1], 'r') as f:
            data = yaml.safe_load(f)
        issue_type = get_issue_type(data)
        print(format_markdown(data, issue_type))
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)
