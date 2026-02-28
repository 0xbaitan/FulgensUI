#!/usr/bin/env python3
"""Draft issue command - create issue drafts from templates."""

import argparse
import os
import shutil
import sys
import yaml

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from templates.loader import load_template, template_exists


VALID_TYPES = ["bug", "epic", "story", "task", "item"]
VALID_PRIORITIES = ["must have", "should have", "could have", "won't have"]
VALID_ESTIMATES = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89]


def validate_type(issue_type: str) -> bool:
    """Validate issue type."""
    return issue_type in VALID_TYPES


def merge_template(template: dict, title: str = None, priority: str = None, 
                   estimate: int = None, theme: str = None) -> dict:
    """Merge pre-fill values into template."""
    merged = template.copy()
    
    if title:
        merged["title"] = title
    if priority:
        merged["priority"] = priority
    if estimate:
        merged["estimate"] = estimate
    if theme:
        merged["theme"] = theme
    
    return merged


def save_draft(issue_type: str, content: dict) -> str:
    """Save draft to .temp/issues directory."""
    output_dir = ".temp/issues"
    os.makedirs(output_dir, exist_ok=True)
    
    output_path = os.path.join(output_dir, f"draft-{issue_type}.yaml")
    
    with open(output_path, "w") as f:
        yaml.dump(content, f, default_flow_style=False, sort_keys=False)
    
    return output_path


def open_in_editor(filepath: str) -> None:
    """Open file in editor."""
    editor = os.environ.get("EDITOR", "vim")
    os.system(f"{editor} {filepath}")


def main():
    parser = argparse.ArgumentParser(description="Create issue draft from template")
    parser.add_argument("type", help="Issue type (bug, epic, story, task, item)")
    parser.add_argument("--title", help="Pre-fill title")
    parser.add_argument("--priority", help="Pre-fill priority")
    parser.add_argument("--estimate", type=int, help="Pre-fill estimate (Fibonacci)")
    parser.add_argument("--theme", help="Pre-fill theme/component")
    
    args = parser.parse_args()
    
    # Step 1: Validate type
    if not validate_type(args.type):
        print(f"Error: Invalid type '{args.type}'")
        print(f"Available types: {', '.join(VALID_TYPES)}")
        sys.exit(1)
    
    # Step 2: Check template exists
    if not template_exists(args.type):
        print(f"Error: Template '{args.type}' not found")
        sys.exit(1)
    
    # Step 3: Load template
    template = load_template(args.type)
    if template is None:
        print(f"Error: Failed to load template '{args.type}'")
        sys.exit(1)
    
    # Step 4: Merge pre-fill values
    if args.priority and args.priority not in VALID_PRIORITIES:
        print(f"Error: Invalid priority '{args.priority}'")
        print(f"Valid priorities: {', '.join(VALID_PRIORITIES)}")
        sys.exit(1)
    
    if args.estimate and args.estimate not in VALID_ESTIMATES:
        print(f"Error: Invalid estimate '{args.estimate}'")
        print(f"Valid estimates: {', '.join(map(str, VALID_ESTIMATES))}")
        sys.exit(1)
    
    merged = merge_template(
        template, 
        title=args.title, 
        priority=args.priority,
        estimate=args.estimate,
        theme=args.theme
    )
    
    # Step 5: Save draft
    output_path = save_draft(args.type, merged)
    
    # Step 6: Open in editor
    open_in_editor(output_path)
    
    # Step 7: Show next steps
    print(f"\n✅ Draft saved to: {output_path}")
    print("\nNext steps:")
    print(f"  /validate-issue {output_path}")
    print(f"  /enhance-issue {output_path}")


if __name__ == "__main__":
    main()
