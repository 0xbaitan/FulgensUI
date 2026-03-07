import type { Meta, StoryObj } from "@storybook/react";

import { Button, ButtonProps } from "../button";
import { button } from "@/styled-system/recipes";

const meta: Meta<ButtonProps> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],

  argTypes: {
    visual: {
      control: "select",
      description: "The visual style of the button",
      type: { name: "string", required: false },
      options: button.variantMap.visual,
      table: {
        defaultValue: {
          summary: "solid",
          detail: "Filled background with contrasting text",
        },
      },
    },
    intent: {
      control: "select",
      description: "The semantic intent/color of the button",
      type: { name: "string", required: false },
      options: button.variantMap.intent,
      table: {
        defaultValue: {
          summary: "primary",
          detail: "Primary brand color (blue)",
        },
      },
    },
    size: {
      control: "select",
      description: "The size of the button",
      type: { name: "string", required: false },
      options: button.variantMap.size,
      table: {
        defaultValue: {
          summary: "md",
          detail: "Medium size",
        },
      },
    },
    shape: {
      control: "select",
      description: "The shape/border radius of the button",
      type: { name: "string", required: false },
      options: button.variantMap.shape,
      table: {
        defaultValue: {
          summary: "base",
          detail: "Normal rounded corners",
        },
      },
    },
    children: {
      control: "text",
      table: {
        disable: true,
      },
    },
  },
  args: {
    children: "Button",
  },
} satisfies Meta<ButtonProps>;

export default meta;

export const Default: StoryObj<ButtonProps> = {};

export const Primary: StoryObj<ButtonProps> = {
  args: button.raw({
    visual: "solid",
    intent: "primary",
  }),
};

export const Secondary: StoryObj<ButtonProps> = {
  args: button.raw({
    visual: "solid",
    intent: "secondary",
  }),
};

export const Accent: StoryObj<ButtonProps> = {
  args: button.raw({
    visual: "solid",
    intent: "accent",
  }),
};

export const Success: StoryObj<ButtonProps> = {
  args: button.raw({
    visual: "solid",
    intent: "success",
  }),
};

export const Danger: StoryObj<ButtonProps> = {
  args: button.raw({
    visual: "solid",
    intent: "danger",
  }),
};

export const Warning: StoryObj<ButtonProps> = {
  args: button.raw({
    visual: "solid",
    intent: "warning",
  }),
};

export const Info: StoryObj<ButtonProps> = {
  args: button.raw({
    visual: "solid",
    intent: "info",
  }),
};

export const Outline: StoryObj<ButtonProps> = {
  args: button.raw({
    visual: "outline",
    intent: "primary",
  }),
};

export const Ghost: StoryObj<ButtonProps> = {
  args: button.raw({
    visual: "ghost",
    intent: "primary",
  }),
};

export const Subtle: StoryObj<ButtonProps> = {
  args: button.raw({
    visual: "subtle",
    intent: "primary",
  }),
};

export const Small: StoryObj<ButtonProps> = {
  args: button.raw({
    size: "sm",
  }),
};

export const Large: StoryObj<ButtonProps> = {
  args: button.raw({
    size: "lg",
  }),
};

export const Circle: StoryObj<ButtonProps> = {
  args: {
    ...button.raw({
      shape: "circle",
    }),
    children: "🚀",
  },
};

export const Square: StoryObj<ButtonProps> = {
  args: button.raw({
    shape: "square",
  }),
};
