import { fn } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react";

import { Button as FulgensButton } from "@components/button";

const meta = {
  title: "Examples/Button",
  component: FulgensButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof FulgensButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Button",
  },
};
