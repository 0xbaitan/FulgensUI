#!/usr/bin/env python3
"""Template loading functions for issue templates."""

import os
import yaml
from typing import Optional


TEMPLATE_DIR = ".github/ISSUE_TEMPLATE"


def list_templates() -> list[dict]:
    """List all available issue templates.
    
    Returns:
        List of template info dictionaries with keys: name, type, description
    """
    templates = []
    
    if not os.path.exists(TEMPLATE_DIR):
        return templates
    
    for filename in os.listdir(TEMPLATE_DIR):
        if filename.endswith('.yaml') or filename.endswith('.yml'):
            filepath = os.path.join(TEMPLATE_DIR, filename)
            try:
                with open(filepath, 'r') as f:
                    data = yaml.safe_load(f)
                
                issue_type = filename.replace('.yaml', '').replace('.yml', '')
                
                templates.append({
                    'name': data.get('name', filename),
                    'type': issue_type,
                    'description': data.get('description', ''),
                    'filename': filename
                })
            except Exception:
                continue
    
    return templates


def load_template(issue_type: str) -> Optional[dict]:
    """Load a specific template by issue type.
    
    Args:
        issue_type: The type of issue (bug, epic, story, task, item)
        
    Returns:
        Parsed YAML dictionary, or None if not found
    """
    # Try both .yaml and .yml extensions
    for ext in ['.yaml', '.yml']:
        filepath = os.path.join(TEMPLATE_DIR, f"{issue_type}{ext}")
        if os.path.exists(filepath):
            try:
                with open(filepath, 'r') as f:
                    return yaml.safe_load(f)
            except Exception:
                return None
    
    return None


def get_template_filepath(issue_type: str) -> Optional[str]:
    """Get the filepath for a template.
    
    Args:
        issue_type: The type of issue
        
    Returns:
        Full filepath to template, or None if not found
    """
    for ext in ['.yaml', '.yml']:
        filepath = os.path.join(TEMPLATE_DIR, f"{issue_type}{ext}")
        if os.path.exists(filepath):
            return filepath
    return None


def template_exists(issue_type: str) -> bool:
    """Check if a template exists.
    
    Args:
        issue_type: The type of issue
        
    Returns:
        True if template exists, False otherwise
    """
    return get_template_filepath(issue_type) is not None


if __name__ == '__main__':
    templates = list_templates()
    
    print("📋 Available Issue Templates")
    print("============================")
    print()
    
    for t in templates:
        print(f"  {t['type']:<10} {t['description']}")
    
    print()
    print(f"Total: {len(templates)} templates")
