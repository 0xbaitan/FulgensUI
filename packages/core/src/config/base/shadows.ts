import { defineTokens } from "@pandacss/dev";

/**
 * Box Shadow Tokens
 *
 * Elevation system for depth and layering in the UI.
 * Shadows use consistent alpha values for natural appearance.
 *
 * @example
 * // Subtle elevation (cards)
 * boxShadow: "{shadows.sm}"
 *
 * // Default elevation (dropdowns)
 * boxShadow: "{shadows.md}"
 *
 * // High elevation (modals)
 * boxShadow: "{shadows.xl}"
 */
export const shadows = defineTokens.shadows({
  /**
   * Small shadow (subtle elevation)
   * Use for: Cards, raised buttons
   * Elevation: 1dp
   */
  sm: { value: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" },

  /**
   * Medium shadow (default elevation)
   * Use for: Dropdowns, popovers, tooltips
   * Elevation: 4dp
   */
  md: { value: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },

  /**
   * Large shadow (prominent elevation)
   * Use for: Modals, dialogs
   * Elevation: 8dp
   */
  lg: { value: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" },

  /**
   * Extra large shadow (highest elevation)
   * Use for: Sticky headers, floating action buttons
   * Elevation: 16dp
   */
  xl: { value: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" },
});
