---
title: Add dark mode support to all UI components
issue_type: story
priority: should-have
estimate: 21
scope: core
blocked_by: null
parent_link: null
---

## User Story

**As a** application user  
**I want** all UI components to support dark mode  
**So that** I can use the app comfortably in low-light environments and match my system preferences

## Acceptance Criteria

```gherkin
Feature: Dark Mode Support

Background:
  Given the user has system dark mode enabled
  And the application detects the system preference

Scenario: Components render in dark mode
  When I navigate to any page with UI components
  Then all components should use dark mode color tokens
  And text should maintain WCAG AA contrast (≥4.5:1)
  And interactive states (hover/focus/active) should be visible

Scenario: Theme toggle switch
  Given I am viewing the application
  When I click the theme toggle in the header
  Then the theme should switch between light and dark
  And my preference should persist in localStorage
  And all components should re-render with new theme

Scenario: Smooth transitions
  When the theme switches
  Then all color changes should animate smoothly (200ms)
  And there should be no flash of unstyled content (FOUC)
  And images/icons should swap if theme-specific variants exist
```

## Background

Users have requested dark mode support to reduce eye strain and match system preferences. Currently, only light mode is available. This story implements dark mode across all components using PandaCSS semantic tokens.

**Design references:**

- Figma mockups: [Link to Figma]
- Color palette: `.temp/issues/attachments/20260306_140000/dark-mode-palette.png`

**Technical approach:**

- Use PandaCSS semantic tokens (e.g., `colors.bg.primary`, `colors.text.primary`)
- Detect system preference with `prefers-color-scheme` media query
- Persist user override in localStorage
- Toggle via context provider

## Edge Cases

- **System override**: User manually toggles theme (ignore system preference)
- **No system preference**: Default to light mode
- **Mixed content**: Images with transparent backgrounds should work in both themes
- **Storybook**: Each story should have light/dark toggle in toolbar
- **Performance**: Theme switch should not cause full page re-render

## Testing Notes

- Test all components in Storybook (light + dark)
- Verify contrast ratios with axe DevTools
- Test theme persistence across page reloads
- Check for FOUC on initial load

<!-- GITHUB_METADATA
{
  "labels": ["status:backlog", "issue:story", "priority:should-have", "estimate:21", "scope:core"],
  "project_fields": {
    "PVTSSF_lAHOAeQxRM4BQVimzg-fIIo": "f75ad846",
    "PVTSSF_lAHOAeQxRM4BQVimzg-fsa4": "0aafcd8f",
    "PVTF_lAHOAeQxRM4BQVimzg-fxsg": "21",
    "PVTSSF_lAHOAeQxRM4BQVimzg-gKWI": "d2a6d334"
  }
}
-->
