import type { ComponentProps } from "react";
import {
  button as buttonRecipe,
  ButtonVariantProps,
} from "@styled-system/recipes";

export type { ButtonVariantProps } from "@styled-system/recipes";

export type ButtonProps = ComponentProps<"button"> & ButtonVariantProps;

export function Button(props: ButtonProps) {
  return <button className={buttonRecipe({ ...props })} {...props}></button>;
}
