import { defineTokens } from "@pandacss/dev";

/**
 * Font Size Tokens
 *
 * Typography scale for consistent text sizing across the design system.
 * Based on a minor third scale (1.2 ratio) with accessible defaults.
 *
 * Note: Exported as 'sizes' but uses PandaCSS's fontSizes() helper
 * to register these as font size tokens.
 *
 * @example
 * // Small button text
 * fontSize: "{fontSizes.sm}"  // 14px
 *
 * // Default button text (accessible)
 * fontSize: "{fontSizes.md}"  // 16px
 *
 * // Large hero button
 * fontSize: "{fontSizes.xl}"  // 20px
 */
export const sizes = defineTokens.fontSizes({
  /**
   * Extra small (12px)
   * Use for: Tiny buttons, mobile UI, compact layouts
   */
  xs: { value: "12px" },

  /**
   * Small (14px)
   * Use for: Compact buttons, secondary text
   */
  sm: { value: "14px" },

  /**
   * Medium (16px) - DEFAULT
   * Use for: Default buttons, body text (WCAG AAA compliant)
   */
  md: { value: "16px" },

  /**
   * Large (18px)
   * Use for: Prominent buttons, CTAs, headings
   */
  lg: { value: "18px" },

  /**
   * Extra large (20px)
   * Use for: Hero buttons, featured CTAs
   */
  xl: { value: "20px" },
});
