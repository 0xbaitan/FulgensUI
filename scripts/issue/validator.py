#!/usr/bin/env python3
"""Atomic field validation functions for issue processing."""

from typing import Any, List, Tuple

VALID_PRIORITIES = ["must have", "should have", "could have", "won't have"]
FIBONACCI = ["1", "2", "3", "5", "8", "13", "21", "34", "55", "89"]
MAX_TITLE_LENGTH = 256


def extract_body_field(data: dict, field_id: str, default: str = "") -> str:
    """Extract a field value from the body array by field ID."""
    body = data.get('body', [])
    for item in body:
        if item.get('id') == field_id:
            return item.get('attributes', {}).get('placeholder', default)
    return default


def validate_priority(val: str) -> Tuple[bool, str]:
    """Validate priority field value."""
    if not val:
        return False, "Priority is required"
    if val not in VALID_PRIORITIES:
        return False, f"Invalid priority: '{val}'. Must be one of: {', '.join(VALID_PRIORITIES)}"
    return True, ""


def validate_estimate(val: str) -> Tuple[bool, str]:
    """Validate estimate field value (Fibonacci)."""
    if not val:
        return True, ""  # Empty is okay
    if val not in FIBONACCI:
        return False, f"Invalid estimate: '{val}'. Must be a Fibonacci number: {', '.join(FIBONACCI)}"
    return True, ""


def validate_title_length(title: str) -> Tuple[bool, str]:
    """Validate title length."""
    if not title:
        return False, "Title is required"
    if len(title) > MAX_TITLE_LENGTH:
        return False, f"Title too long: {len(title)} chars (max {MAX_TITLE_LENGTH})"
    return True, ""


def validate_blocked_by(val: str) -> Tuple[bool, str]:
    """Validate blocked_by field value."""
    if not val:
        return True, ""  # Empty is okay
    if not val.isdigit():
        return False, f"Invalid blocked_by: '{val}' must be a number"
    return True, ""


def validate_parent_link(val: str) -> Tuple[bool, str]:
    """Validate parent_link field value."""
    if not val:
        return True, ""  # Empty is okay
    if not val.isdigit():
        return False, f"Invalid parent_link: '{val}' must be a number"
    return True, ""


def validate_theme(val: str) -> Tuple[bool, str]:
    """Validate theme field value."""
    if not val:
        return True, ""  # Empty is okay
    if len(val) > 100:
        return False, f"Theme too long: {len(val)} chars (max 100)"
    return True, ""


def validate_all(data: dict) -> List[dict]:
    """Validate all fields in a parsed YAML dictionary."""
    errors = []
    
    # Extract fields
    title = extract_body_field(data, 'title', '')
    priority = extract_body_field(data, 'priority', '')
    estimate = extract_body_field(data, 'estimate', '')
    blocked_by = extract_body_field(data, 'blocked_by', '')
    parent_link = extract_body_field(data, 'parent_link', '')
    theme = extract_body_field(data, 'theme', '')
    
    # Validate each field
    valid, msg = validate_title_length(title)
    if not valid:
        errors.append({"field": "title", "message": msg, "severity": "error"})
    
    valid, msg = validate_priority(priority)
    if not valid:
        errors.append({"field": "priority", "message": msg, "severity": "error"})
    
    valid, msg = validate_estimate(estimate)
    if not valid:
        errors.append({"field": "estimate", "message": msg, "severity": "error"})
    
    valid, msg = validate_blocked_by(blocked_by)
    if not valid:
        errors.append({"field": "blocked_by", "message": msg, "severity": "error"})
    
    valid, msg = validate_parent_link(parent_link)
    if not valid:
        errors.append({"field": "parent_link", "message": msg, "severity": "error"})
    
    valid, msg = validate_theme(theme)
    if not valid:
        errors.append({"field": "theme", "message": msg, "severity": "error"})
    
    return errors


if __name__ == '__main__':
    import sys
    import yaml
    
    if len(sys.argv) < 2:
        print("Usage: validator.py <yaml_file>")
        sys.exit(1)
    
    try:
        with open(sys.argv[1], 'r') as f:
            data = yaml.safe_load(f)
        errors = validate_all(data)
        
        if errors:
            print("Validation errors found:")
            for err in errors:
                print(f"  [{err['severity']}] {err['field']}: {err['message']}")
            sys.exit(1)
        else:
            print("✅ All validations passed")
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)
