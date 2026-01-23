---
sidebar_position: 1
---

# Button Component

The Button component is a reusable UI element built with React and PandaCSS.

## Features

- Multiple variants (primary, secondary)
- Built with PandaCSS for styling
- Fully customizable
- TypeScript support (coming soon)

## Usage

```jsx
import { Button } from '@fulgensui/core';

function App() {
  return (
    <div>
      <Button variant="primary">Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' | 'primary' | The visual style of the button |
| children | ReactNode | - | The content to display inside the button |

## Examples

### Primary Button

Primary buttons are used for the main call-to-action on a page.

```jsx
<Button variant="primary">Click me</Button>
```

### Secondary Button

Secondary buttons are used for less prominent actions.

```jsx
<Button variant="secondary">Cancel</Button>
```

## Storybook

You can view this component in Storybook with interactive controls to explore all variants and states.
