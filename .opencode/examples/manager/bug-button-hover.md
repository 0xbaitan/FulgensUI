---
title: Button hover state not working in dark mode
issue_type: bug
priority: must-have
estimate: 3
scope: core
blocked_by: null
parent_link: null
---

## Feature

Button component (`packages/core/src/components/ui/button/`)

## Scenario

**Given** I am using the application in dark mode  
**And** I hover over a primary button  
**When** the cursor enters the button area  
**Then** the button should show the hover state

**Current behavior**: Button does not visibly change on hover in dark mode

## Expected Behavior

The button should:

1. Change background color to `primary.600` (from `primary.500`)
2. Show smooth transition (200ms ease)
3. Display elevated shadow (`shadow.md`)
4. Maintain contrast ratio ≥4.5:1 (WCAG AA)

## Actual Behavior

- No visual change occurs on hover in dark mode
- Hover state works correctly in light mode
- Focus state (keyboard) works in both modes
- Active (click) state works in both modes

## Environment

- **Browser**: Chrome 121.0.6167.85
- **OS**: macOS Sonoma 14.3
- **Package**: `@fulgensui/core@0.1.0`
- **Theme**: Dark mode enabled via system preference
- **Screen**: Retina display (2x scaling)

## Reproduction Steps

1. Enable dark mode in system settings
2. Navigate to Button Storybook story
3. Hover cursor over any primary button
4. Observe no visual change

## Attachments

- Screenshot: `.temp/issues/attachments/20260306_123456/button-hover-bug.png`
- Screen recording: `.temp/issues/attachments/20260306_123456/hover-demo.mp4`

## Additional Context

- Issue does not occur with `secondary` or `outline` variants
- CSS inspection shows `.button:hover` rule is present but not triggering
- Possible specificity conflict with dark mode theme overrides

## Acceptance Criteria

- [ ] Hover state visible in dark mode with correct color (`primary.600`)
- [ ] Transition animation smooth (200ms)
- [ ] Contrast ratio ≥4.5:1 verified
- [ ] No regression in light mode
- [ ] All button variants tested (primary, secondary, outline)
- [ ] Storybook story updated to demonstrate fix

<!-- GITHUB_METADATA
{
  "labels": ["status:backlog", "issue:bug", "priority:must-have", "estimate:3", "scope:core"],
  "project_fields": {
    "PVTSSF_lAHOAeQxRM4BQVimzg-fIIo": "f75ad846",
    "PVTSSF_lAHOAeQxRM4BQVimzg-fsa4": "a76e54fc",
    "PVTF_lAHOAeQxRM4BQVimzg-fxsg": "3",
    "PVTSSF_lAHOAeQxRM4BQVimzg-gKWI": "251c6465"
  }
}
-->
