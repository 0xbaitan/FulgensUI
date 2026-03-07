import { defineRecipe } from "@pandacss/dev";

/**
 * Button Recipe
 *
 * A comprehensive button recipe using design tokens for consistent styling.
 * Supports 4 variant dimensions:
 * - visual: solid, outline, ghost, subtle
 * - intent: primary, secondary, accent, success, danger, warning, info
 * - size: xs, sm, md, lg, xl
 * - shape: base, circle, square
 *
 * @example
 * ```tsx
 * <Button visual="solid" intent="primary" size="md" shape="base">
 *   Click me
 * </Button>
 * ```
 */
export const buttonRecipe = defineRecipe({
  className: "button",
  jsx: ["Button"],

  base: {
    // Layout
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "{spacing.3} {spacing.6}",
    gap: "{spacing.2}",

    // Typography
    fontSize: "{fontSizes.md}",
    fontWeight: "600",
    lineHeight: "1",
    textAlign: "center",
    whiteSpace: "nowrap",

    // Visual
    borderRadius: "{radii.md}",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "transparent",

    // Interaction
    cursor: "pointer",
    userSelect: "none",
    transition: "all 0.2s",

    // States
    _hover: {
      transform: "translateY(-2px)",
      boxShadow: "{shadows.md}",
    },
    _focusVisible: {
      outline: "2px solid {colors.primary.500}",
      outlineOffset: "2px",
    },
    _active: {
      transform: "translateY(0)",
      boxShadow: "none",
    },
    _disabled: {
      opacity: "0.5",
      cursor: "not-allowed",
      pointerEvents: "none",
    },
  },

  variants: {
    /**
     * Visual style of the button
     * - solid: Filled background with contrasting text
     * - outline: Border only with transparent background
     * - ghost: No border/background, shows on hover
     * - subtle: Light background, no border
     *
     * Note: Actual colors come from compound variants (visual + intent)
     */
    visual: {
      solid: {
        // Colors defined in compound variants
      },
      outline: {
        backgroundColor: "transparent",
        // Border and text colors defined in compound variants
      },
      ghost: {
        backgroundColor: "transparent",
        borderColor: "transparent",
        // Text color defined in compound variants
      },
      subtle: {
        borderColor: "transparent",
        // Background and text colors defined in compound variants
      },
    },

    /**
     * Semantic intent of the button
     * Uses semantic color tokens that map to base colors
     * These are placeholder definitions - actual colors come from compound variants
     */
    intent: {
      primary: {},
      secondary: {},
      accent: {},
      success: {},
      danger: {},
      warning: {},
      info: {},
    },

    /**
     * Size of the button
     * Uses spacing and font size tokens
     */
    size: {
      xs: {
        padding: "{spacing.1} {spacing.3}",
        fontSize: "{fontSizes.xs}",
        gap: "{spacing.1}",
      },
      sm: {
        padding: "{spacing.2} {spacing.4}",
        fontSize: "{fontSizes.sm}",
        gap: "{spacing.1}",
      },
      md: {
        padding: "{spacing.3} {spacing.6}",
        fontSize: "{fontSizes.md}",
        gap: "{spacing.2}",
      },
      lg: {
        padding: "{spacing.4} {spacing.8}",
        fontSize: "{fontSizes.lg}",
        gap: "{spacing.2}",
      },
      xl: {
        padding: "{spacing.5} {spacing.10}",
        fontSize: "{fontSizes.xl}",
        gap: "{spacing.3}",
      },
    },

    /**
     * Shape of the button
     * Uses border radius tokens
     */
    shape: {
      base: {
        borderRadius: "{radii.md}",
      },
      circle: {
        borderRadius: "{radii.full}",
        aspectRatio: "1",
        padding: "{spacing.3}",
      },
      square: {
        borderRadius: "{radii.none}",
      },
    },
  },

  defaultVariants: {
    visual: "solid",
    intent: "primary",
    size: "md",
    shape: "base",
  },

  compoundVariants: [
    // Solid + Intent combinations
    {
      visual: "solid",
      intent: "primary",
      css: {
        backgroundColor: "{colors.primary.500}",
        color: "white",
        _hover: { backgroundColor: "{colors.primary.600}" },
        _active: { backgroundColor: "{colors.primary.700}" },
      },
    },
    {
      visual: "solid",
      intent: "secondary",
      css: {
        backgroundColor: "{colors.secondary.500}",
        color: "white",
        _hover: { backgroundColor: "{colors.secondary.600}" },
        _active: { backgroundColor: "{colors.secondary.700}" },
      },
    },
    {
      visual: "solid",
      intent: "accent",
      css: {
        backgroundColor: "{colors.accent.500}",
        color: "white",
        _hover: { backgroundColor: "{colors.accent.600}" },
        _active: { backgroundColor: "{colors.accent.700}" },
      },
    },
    {
      visual: "solid",
      intent: "success",
      css: {
        backgroundColor: "{colors.success.500}",
        color: "white",
        _hover: { backgroundColor: "{colors.success.600}" },
        _active: { backgroundColor: "{colors.success.700}" },
      },
    },
    {
      visual: "solid",
      intent: "danger",
      css: {
        backgroundColor: "{colors.danger.500}",
        color: "white",
        _hover: { backgroundColor: "{colors.danger.600}" },
        _active: { backgroundColor: "{colors.danger.700}" },
      },
    },
    {
      visual: "solid",
      intent: "warning",
      css: {
        backgroundColor: "{colors.warning.500}",
        color: "white",
        _hover: { backgroundColor: "{colors.warning.600}" },
        _active: { backgroundColor: "{colors.warning.700}" },
      },
    },
    {
      visual: "solid",
      intent: "info",
      css: {
        backgroundColor: "{colors.info.500}",
        color: "white",
        _hover: { backgroundColor: "{colors.info.600}" },
        _active: { backgroundColor: "{colors.info.700}" },
      },
    },

    // Outline + Intent combinations
    {
      visual: "outline",
      intent: "primary",
      css: {
        borderColor: "{colors.primary.500}",
        color: "{colors.primary.600}",
        _hover: {
          backgroundColor: "{colors.primary.50}",
          borderColor: "{colors.primary.600}",
        },
        _active: { backgroundColor: "{colors.primary.100}" },
      },
    },
    {
      visual: "outline",
      intent: "secondary",
      css: {
        borderColor: "{colors.secondary.500}",
        color: "{colors.secondary.600}",
        _hover: {
          backgroundColor: "{colors.secondary.50}",
          borderColor: "{colors.secondary.600}",
        },
        _active: { backgroundColor: "{colors.secondary.100}" },
      },
    },
    {
      visual: "outline",
      intent: "accent",
      css: {
        borderColor: "{colors.accent.500}",
        color: "{colors.accent.600}",
        _hover: {
          backgroundColor: "{colors.accent.50}",
          borderColor: "{colors.accent.600}",
        },
        _active: { backgroundColor: "{colors.accent.100}" },
      },
    },
    {
      visual: "outline",
      intent: "success",
      css: {
        borderColor: "{colors.success.500}",
        color: "{colors.success.600}",
        _hover: {
          backgroundColor: "{colors.success.50}",
          borderColor: "{colors.success.600}",
        },
        _active: { backgroundColor: "{colors.success.100}" },
      },
    },
    {
      visual: "outline",
      intent: "danger",
      css: {
        borderColor: "{colors.danger.500}",
        color: "{colors.danger.600}",
        _hover: {
          backgroundColor: "{colors.danger.50}",
          borderColor: "{colors.danger.600}",
        },
        _active: { backgroundColor: "{colors.danger.100}" },
      },
    },
    {
      visual: "outline",
      intent: "warning",
      css: {
        borderColor: "{colors.warning.500}",
        color: "{colors.warning.600}",
        _hover: {
          backgroundColor: "{colors.warning.50}",
          borderColor: "{colors.warning.600}",
        },
        _active: { backgroundColor: "{colors.warning.100}" },
      },
    },
    {
      visual: "outline",
      intent: "info",
      css: {
        borderColor: "{colors.info.500}",
        color: "{colors.info.600}",
        _hover: {
          backgroundColor: "{colors.info.50}",
          borderColor: "{colors.info.600}",
        },
        _active: { backgroundColor: "{colors.info.100}" },
      },
    },

    // Ghost + Intent combinations
    {
      visual: "ghost",
      intent: "primary",
      css: {
        color: "{colors.primary.600}",
        _hover: { backgroundColor: "{colors.primary.50}" },
        _active: { backgroundColor: "{colors.primary.100}" },
      },
    },
    {
      visual: "ghost",
      intent: "secondary",
      css: {
        color: "{colors.secondary.600}",
        _hover: { backgroundColor: "{colors.secondary.50}" },
        _active: { backgroundColor: "{colors.secondary.100}" },
      },
    },
    {
      visual: "ghost",
      intent: "accent",
      css: {
        color: "{colors.accent.600}",
        _hover: { backgroundColor: "{colors.accent.50}" },
        _active: { backgroundColor: "{colors.accent.100}" },
      },
    },
    {
      visual: "ghost",
      intent: "success",
      css: {
        color: "{colors.success.600}",
        _hover: { backgroundColor: "{colors.success.50}" },
        _active: { backgroundColor: "{colors.success.100}" },
      },
    },
    {
      visual: "ghost",
      intent: "danger",
      css: {
        color: "{colors.danger.600}",
        _hover: { backgroundColor: "{colors.danger.50}" },
        _active: { backgroundColor: "{colors.danger.100}" },
      },
    },
    {
      visual: "ghost",
      intent: "warning",
      css: {
        color: "{colors.warning.600}",
        _hover: { backgroundColor: "{colors.warning.50}" },
        _active: { backgroundColor: "{colors.warning.100}" },
      },
    },
    {
      visual: "ghost",
      intent: "info",
      css: {
        color: "{colors.info.600}",
        _hover: { backgroundColor: "{colors.info.50}" },
        _active: { backgroundColor: "{colors.info.100}" },
      },
    },

    // Subtle + Intent combinations
    {
      visual: "subtle",
      intent: "primary",
      css: {
        backgroundColor: "{colors.primary.50}",
        color: "{colors.primary.700}",
        _hover: { backgroundColor: "{colors.primary.100}" },
        _active: { backgroundColor: "{colors.primary.200}" },
      },
    },
    {
      visual: "subtle",
      intent: "secondary",
      css: {
        backgroundColor: "{colors.secondary.50}",
        color: "{colors.secondary.700}",
        _hover: { backgroundColor: "{colors.secondary.100}" },
        _active: { backgroundColor: "{colors.secondary.200}" },
      },
    },
    {
      visual: "subtle",
      intent: "accent",
      css: {
        backgroundColor: "{colors.accent.50}",
        color: "{colors.accent.700}",
        _hover: { backgroundColor: "{colors.accent.100}" },
        _active: { backgroundColor: "{colors.accent.200}" },
      },
    },
    {
      visual: "subtle",
      intent: "success",
      css: {
        backgroundColor: "{colors.success.50}",
        color: "{colors.success.700}",
        _hover: { backgroundColor: "{colors.success.100}" },
        _active: { backgroundColor: "{colors.success.200}" },
      },
    },
    {
      visual: "subtle",
      intent: "danger",
      css: {
        backgroundColor: "{colors.danger.50}",
        color: "{colors.danger.700}",
        _hover: { backgroundColor: "{colors.danger.100}" },
        _active: { backgroundColor: "{colors.danger.200}" },
      },
    },
    {
      visual: "subtle",
      intent: "warning",
      css: {
        backgroundColor: "{colors.warning.50}",
        color: "{colors.warning.700}",
        _hover: { backgroundColor: "{colors.warning.100}" },
        _active: { backgroundColor: "{colors.warning.200}" },
      },
    },
    {
      visual: "subtle",
      intent: "info",
      css: {
        backgroundColor: "{colors.info.50}",
        color: "{colors.info.700}",
        _hover: { backgroundColor: "{colors.info.100}" },
        _active: { backgroundColor: "{colors.info.200}" },
      },
    },
  ],
});
