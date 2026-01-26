import type { Meta, StoryObj } from "@storybook/react";

import { Button as FulgensButton, ButtonProps } from "@components/button";
import { button } from "@styled-system/recipes";

const meta: Meta<ButtonProps> = {
  title: "Components/Button",
  component: FulgensButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],

  argTypes: {
    variant: {
      control: "select",
      description: "The style variant of the button",
      type: { name: "string", required: false },
      options: button.variantMap.variant,
      table: {
        defaultValue: {
          summary: "primary",
          detail: "The primary button variant",
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

export const Button: StoryObj<ButtonProps> = {};

export const Primary: StoryObj<ButtonProps> = {
  args: button.raw({
    variant: "primary",
  }),
  argTypes: {
    variant: {
      table: {
        disable: true,
      },
    },
  },
};

export const Secondary: StoryObj<ButtonProps> = {
  args: button.raw({
    variant: "secondary",
  }),
  argTypes: {
    variant: {
      table: {
        disable: true,
      },
    },
  },
};
