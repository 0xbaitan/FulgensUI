import { defineTokens } from "@pandacss/dev";

/**
 * Base Color Tokens
 *
 * Comprehensive color palette using Tailwind CSS v3 exact hex values.
 *
 * **Tier 1 Colors (8 colors)** - Immediate implementation:
 * - gray: Neutral UI elements
 * - blue: Primary brand color
 * - green: Success states
 * - red: Error/danger states
 * - orange: Warning states
 * - yellow: Caution/highlight
 * - purple: Accent/special features
 * - cyan: Informational states
 *
 * **Tier 2 Colors (3 colors)** - Reserved for future expansion:
 * - pink, indigo, teal (not yet implemented)
 *
 * Each color has 11 shades (50-950) for comprehensive theming.
 */
export const colors = defineTokens.colors({
  black: { value: "#000000" },
  white: { value: "#FFFFFF" },

  /**
   * Gray - Neutral UI elements
   * Use for: Text, borders, backgrounds, secondary elements
   */
  gray: {
    50: { value: "#F9FAFB" },
    100: { value: "#F3F4F6" },
    200: { value: "#E5E7EB" },
    300: { value: "#D1D5DB" },
    400: { value: "#9CA3AF" },
    500: { value: "#6B7280" },
    600: { value: "#4B5563" },
    700: { value: "#374151" },
    800: { value: "#1F2937" },
    900: { value: "#111827" },
    950: { value: "#030712" },
  },

  /**
   * Blue - Primary brand color
   * Use for: Primary actions, links, focus states
   */
  blue: {
    50: { value: "#EFF6FF" },
    100: { value: "#DBEAFE" },
    200: { value: "#BFDBFE" },
    300: { value: "#93C5FD" },
    400: { value: "#60A5FA" },
    500: { value: "#3B82F6" },
    600: { value: "#2563EB" },
    700: { value: "#1D4ED8" },
    800: { value: "#1E40AF" },
    900: { value: "#1E3A8A" },
    950: { value: "#172554" },
  },

  /**
   * Green - Success states
   * Use for: Success messages, confirmations, positive actions
   */
  green: {
    50: { value: "#ECFDF5" },
    100: { value: "#D1FAE5" },
    200: { value: "#A7F3D0" },
    300: { value: "#6EE7B7" },
    400: { value: "#34D399" },
    500: { value: "#10B981" },
    600: { value: "#059669" },
    700: { value: "#047857" },
    800: { value: "#065F46" },
    900: { value: "#064E3B" },
    950: { value: "#022C22" },
  },

  /**
   * Red - Error/danger states
   * Use for: Errors, destructive actions, alerts
   */
  red: {
    50: { value: "#FEF2F2" },
    100: { value: "#FEE2E2" },
    200: { value: "#FECACA" },
    300: { value: "#FCA5A5" },
    400: { value: "#F87171" },
    500: { value: "#EF4444" },
    600: { value: "#DC2626" },
    700: { value: "#B91C1C" },
    800: { value: "#991B1B" },
    900: { value: "#7F1D1D" },
    950: { value: "#450A0A" },
  },

  /**
   * Orange - Warning states
   * Use for: Warnings, caution messages, important notices
   */
  orange: {
    50: { value: "#FFF7ED" },
    100: { value: "#FFEDD5" },
    200: { value: "#FED7AA" },
    300: { value: "#FDBA74" },
    400: { value: "#FB923C" },
    500: { value: "#F97316" },
    600: { value: "#EA580C" },
    700: { value: "#C2410C" },
    800: { value: "#9A3412" },
    900: { value: "#7C2D12" },
    950: { value: "#431407" },
  },

  /**
   * Yellow - Caution/highlight
   * Use for: Highlights, pending states, informational notices
   */
  yellow: {
    50: { value: "#FEFCE8" },
    100: { value: "#FEF9C3" },
    200: { value: "#FEF08A" },
    300: { value: "#FDE047" },
    400: { value: "#FACC15" },
    500: { value: "#EAB308" },
    600: { value: "#CA8A04" },
    700: { value: "#A16207" },
    800: { value: "#854D0E" },
    900: { value: "#713F12" },
    950: { value: "#422006" },
  },

  /**
   * Purple - Accent/special features
   * Use for: Accent colors, special features, premium content
   */
  purple: {
    50: { value: "#FAF5FF" },
    100: { value: "#F3E8FF" },
    200: { value: "#E9D5FF" },
    300: { value: "#D8B4FE" },
    400: { value: "#C084FC" },
    500: { value: "#A855F7" },
    600: { value: "#9333EA" },
    700: { value: "#7E22CE" },
    800: { value: "#6B21A8" },
    900: { value: "#581C87" },
    950: { value: "#3B0764" },
  },

  /**
   * Cyan - Informational states
   * Use for: Info messages, tips, helpful notices
   */
  cyan: {
    50: { value: "#ECFEFF" },
    100: { value: "#CFFAFE" },
    200: { value: "#A5F3FC" },
    300: { value: "#67E8F9" },
    400: { value: "#22D3EE" },
    500: { value: "#06B6D4" },
    600: { value: "#0891B2" },
    700: { value: "#0E7490" },
    800: { value: "#155E75" },
    900: { value: "#164E63" },
    950: { value: "#083344" },
  },
});
