// Component Template for @coder Agent
// This template demonstrates the standard React component pattern for FulgensUI

import { ComponentProps } from "react";
import { componentName } from "@styled-system/recipes";
import type { ComponentNameVariantProps } from "@styled-system/recipes";

export type { ComponentNameVariantProps } from "@styled-system/recipes";

export type ComponentNameProps = ComponentProps<"element"> &
  ComponentNameVariantProps & {
    // Add component-specific props here
    // Example: label?: string;
  };

/**
 * ComponentName component
 *
 * @description Brief description of what this component does
 * @example
 * ```tsx
 * <ComponentName variant="primary" size="md">
 *   Content
 * </ComponentName>
 * ```
 */
export function ComponentName(props: ComponentNameProps) {
  const { children, ...restProps } = props;

  return (
    <element className={componentName(restProps)} {...restProps}>
      {children}
    </element>
  );
}
