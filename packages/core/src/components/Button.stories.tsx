import { Button } from "./Button";

export default {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary"],
    },
  },
};

export const Primary = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const Secondary = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};
