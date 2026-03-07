import { defineTokens } from "@pandacss/dev";

/**
 * Border Radius Tokens
 *
 * Defines consistent border radius values for rounded corners throughout
 * the design system. Values range from sharp (none) to fully rounded (full).
 *
 * @example
 * // Small radius (subtle rounding)
 * borderRadius: "{radii.sm}"  // 4px
 *
 * // Default radius (friendly appearance)
 * borderRadius: "{radii.md}"  // 8px
 *
 * // Pill/circle buttons
 * borderRadius: "{radii.full}"  // 9999px
 */
export const radii = defineTokens.radii({
  /**
   * No border radius (sharp corners)
   * Use for: Modern, geometric designs
   */
  none: { value: "0" },

  /**
   * Small border radius (4px)
   * Use for: Tags, badges, small UI elements
   */
  sm: { value: "4px" },

  /**
   * Medium border radius (8px) - DEFAULT
   * Use for: Buttons, cards, input fields
   */
  md: { value: "8px" },

  /**
   * Large border radius (12px)
   * Use for: Large buttons, prominent cards
   */
  lg: { value: "12px" },

  /**
   * Extra large border radius (16px)
   * Use for: Hero sections, feature cards
   */
  xl: { value: "16px" },

  /**
   * Full border radius (pill/circle)
   * Use for: Circle buttons, avatar badges, pill buttons
   */
  full: { value: "9999px" },
});
