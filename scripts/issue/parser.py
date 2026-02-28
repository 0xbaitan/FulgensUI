#!/usr/bin/env python3
"""Atomic YAML parsing functions for issue processing."""

import yaml
from typing import Any


def parse_yaml(path: str) -> dict:
    """Parse a YAML file and return as dictionary.
    
    Args:
        path: Path to the YAML file
        
    Returns:
        Dictionary representation of YAML content
        
    Raises:
        FileNotFoundError: If file doesn't exist
        yaml.YAMLError: If YAML is invalid
    """
    with open(path, 'r') as f:
        return yaml.safe_load(f)


def extract_body_field(data: dict, field_id: str, default: str = "") -> str:
    """Extract a field value from the body array by field ID.
    
    Args:
        data: Parsed YAML dictionary
        field_id: The id of the field to extract
        default: Default value if field not found
        
    Returns:
        The placeholder value of the field, or default
    """
    body = data.get('body', [])
    for item in body:
        if item.get('id') == field_id:
            return item.get('attributes', {}).get('placeholder', default)
    return default


def extract_body_fields(data: dict) -> dict[str, str]:
    """Extract all body fields as a dictionary.
    
    Args:
        data: Parsed YAML dictionary
        
    Returns:
        Dictionary mapping field_id -> placeholder value
    """
    body = data.get('body', [])
    return {
        item.get('id'): item.get('attributes', {}).get('placeholder', '')
        for item in body
        if item.get('id')
    }


def extract_frontmatter(markdown_path: str) -> dict:
    """Extract YAML frontmatter from a markdown file.
    
    Args:
        markdown_path: Path to the markdown file
        
    Returns:
        Dictionary of frontmatter key-value pairs
        
    Raises:
        FileNotFoundError: If file doesn't exist
    """
    with open(markdown_path, 'r') as f:
        content = f.read()
    
    # Check for frontmatter delimiters
    if not content.startswith('---'):
        return {}
    
    # Find end of frontmatter
    lines = content.split('\n')
    end_idx = None
    for i, line in enumerate(lines[1:], 1):
        if line.strip() == '---':
            end_idx = i
            break
    
    if end_idx is None:
        return {}
    
    # Extract frontmatter content
    fm_content = '\n'.join(lines[1:end_idx])
    
    # Parse as simple key: value pairs
    result = {}
    for line in fm_content.split('\n'):
        line = line.strip()
        if ':' in line:
            key, value = line.split(':', 1)
            result[key.strip()] = value.strip()
    
    return result


def extract_markdown_body(markdown_path: str) -> str:
    """Extract body content from a markdown file (excluding frontmatter).
    
    Args:
        markdown_path: Path to the markdown file
        
    Returns:
        Body content as string (without frontmatter)
        
    Raises:
        FileNotFoundError: If file doesn't exist
    """
    with open(markdown_path, 'r') as f:
        content = f.read()
    
    # Check for frontmatter delimiters
    if not content.startswith('---'):
        return content
    
    # Find end of frontmatter
    lines = content.split('\n')
    end_idx = None
    for i, line in enumerate(lines[1:], 1):
        if line.strip() == '---':
            end_idx = i
            break
    
    if end_idx is None:
        return content
    
    # Return content after frontmatter
    return '\n'.join(lines[end_idx + 1:]).strip()


def extract_subtasks(markdown_path: str) -> list[str]:
    """Extract subtasks from Actionable items section.
    
    Args:
        markdown_path: Path to the markdown file
        
    Returns:
        List of subtask strings
    """
    body = extract_markdown_body(markdown_path)
    subtasks = []
    
    if '## Actionable items' not in body:
        return []
    
    # Get content after "## Actionable items"
    parts = body.split('## Actionable items')
    if len(parts) < 2:
        return []
    
    subtask_section = parts[1]
    
    # Check if there's another section after
    if '## ' in subtask_section:
        subtask_section = subtask_section.split('## ')[0]
    
    # Extract checklist items
    for line in subtask_section.split('\n'):
        if '- [ ]' in line:
            task = line.replace('- [ ]', '').strip()
            if task:
                subtasks.append(task)
    
    return subtasks


def get_all_body_fields(data: dict) -> dict[str, str]:
    """Get all body fields with their values.
    
    Args:
        data: Parsed YAML dictionary
        
    Returns:
        Dictionary mapping field_id -> placeholder value
    """
    return extract_body_fields(data)


if __name__ == '__main__':
    import sys
    
    if len(sys.argv) < 2:
        print("Usage: parser.py <yaml_file>")
        sys.exit(1)
    
    try:
        data = parse_yaml(sys.argv[1])
        print("Parsed YAML successfully")
        print(f"Keys: {list(data.keys())}")
        fields = get_all_body_fields(data)
        print(f"Body fields: {list(fields.keys())}")
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)
