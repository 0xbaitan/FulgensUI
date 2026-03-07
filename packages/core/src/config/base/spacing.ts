import { defineTokens } from "@pandacss/dev";

/**
 * Spacing Tokens
 *
 * Consistent spacing scale based on 4px grid system.
 * Ensures visual rhythm and alignment across components.
 *
 * Mathematical progression: 4px base unit (aligns with Figma/Sketch)
 *
 * @example
 * // Compact button padding
 * padding: "{spacing.2} {spacing.3}"  // 8px 12px
 *
 * // Default button padding
 * padding: "{spacing.3} {spacing.6}"  // 12px 24px
 *
 * // Spacious layout
 * padding: "{spacing.8}"  // 32px
 */
export const spacing = defineTokens.spacing({
  /**
   * Zero spacing (0px)
   * Use for: Reset, flush layouts
   */
  0: { value: "0" },

  /**
   * 1 unit (4px)
   * Use for: Tight padding, minimal gaps
   */
  1: { value: "4px" },

  /**
   * 2 units (8px)
   * Use for: Compact layouts, small gaps
   */
  2: { value: "8px" },

  /**
   * 3 units (12px)
   * Use for: Default vertical padding
   */
  3: { value: "12px" },

  /**
   * 4 units (16px)
   * Use for: Comfortable spacing
   */
  4: { value: "16px" },

  /**
   * 5 units (20px)
   * Use for: Generous spacing
   */
  5: { value: "20px" },

  /**
   * 6 units (24px)
   * Use for: Default horizontal padding
   */
  6: { value: "24px" },

  /**
   * 8 units (32px)
   * Use for: Spacious layouts, section padding
   */
  8: { value: "32px" },

  /**
   * 10 units (40px)
   * Use for: Extra spacious layouts
   */
  10: { value: "40px" },

  /**
   * 12 units (48px)
   * Use for: Major section spacing
   */
  12: { value: "48px" },
});
