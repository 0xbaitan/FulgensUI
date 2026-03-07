// Storybook Story Template for @coder Agent
// This template demonstrates Storybook 7 patterns with CSF 3.0

import type { Meta, StoryObj } from "@storybook/react";
import { ComponentName } from "../component-name";

const meta = {
  title: "Components/ComponentName",
  component: ComponentName,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary"],
      description: "Visual style variant",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Component size",
    },
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default ComponentName with medium size and primary variant
 */
export const Default: Story = {
  args: {
    children: "Default ComponentName",
    variant: "primary",
    size: "md",
  },
};

/**
 * Primary variant examples
 */
export const Primary: Story = {
  args: {
    children: "Primary ComponentName",
    variant: "primary",
  },
};

/**
 * Secondary variant examples
 */
export const Secondary: Story = {
  args: {
    children: "Secondary ComponentName",
    variant: "secondary",
  },
};

/**
 * Small size example
 */
export const Small: Story = {
  args: {
    children: "Small ComponentName",
    size: "sm",
  },
};

/**
 * Large size example
 */
export const Large: Story = {
  args: {
    children: "Large ComponentName",
    size: "lg",
  },
};

/**
 * All variants side-by-side
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <ComponentName variant="primary">Primary</ComponentName>
      <ComponentName variant="secondary">Secondary</ComponentName>
    </div>
  ),
};

/**
 * All sizes side-by-side
 */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <ComponentName size="sm">Small</ComponentName>
      <ComponentName size="md">Medium</ComponentName>
      <ComponentName size="lg">Large</ComponentName>
    </div>
  ),
};
