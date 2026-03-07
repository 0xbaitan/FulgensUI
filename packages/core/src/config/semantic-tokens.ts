import { SemanticTokens } from "@pandacss/dev";
import { buttonSemanticTokens } from "@/components/ui/button/config/button-semantic-tokens";

/**
 * Semantic Color Tokens
 *
 * Semantic aliases decouple components from specific colors, enabling
 * easy theme customization and rebranding.
 *
 * **Strategy:**
 * - Components use semantic names (primary, danger, success)
 * - Semantic tokens reference base colors (blue, red, green)
 * - Rebranding = change alias targets, not components
 *
 * **7 Semantic Aliases:**
 * 1. primary → blue (Primary brand actions)
 * 2. secondary → gray (Secondary/neutral actions)
 * 3. accent → purple (Accent/special features)
 * 4. success → green (Success states)
 * 5. danger → red (Error/destructive actions)
 * 6. warning → orange (Warning states)
 * 7. info → cyan (Informational states)
 *
 * @example
 * // Component uses semantic token
 * backgroundColor: "{colors.primary.500}"
 *
 * // Theme change: primary blue → indigo
 * primary: { 500: { value: "{colors.indigo.500}" } }
 */
export const semanticTokens: SemanticTokens = {
  colors: {
    // Preserve existing button semantic tokens
    ...buttonSemanticTokens.colors,

    /**
     * Primary - Main brand color (blue)
     * Use for: Primary CTAs, main actions, brand identity
     */
    primary: {
      50: { value: "{colors.blue.50}" },
      100: { value: "{colors.blue.100}" },
      200: { value: "{colors.blue.200}" },
      300: { value: "{colors.blue.300}" },
      400: { value: "{colors.blue.400}" },
      500: { value: "{colors.blue.500}" },
      600: { value: "{colors.blue.600}" },
      700: { value: "{colors.blue.700}" },
      800: { value: "{colors.blue.800}" },
      900: { value: "{colors.blue.900}" },
      950: { value: "{colors.blue.950}" },
    },

    /**
     * Secondary - Neutral/secondary actions (gray)
     * Use for: Secondary buttons, neutral elements, text
     */
    secondary: {
      50: { value: "{colors.gray.50}" },
      100: { value: "{colors.gray.100}" },
      200: { value: "{colors.gray.200}" },
      300: { value: "{colors.gray.300}" },
      400: { value: "{colors.gray.400}" },
      500: { value: "{colors.gray.500}" },
      600: { value: "{colors.gray.600}" },
      700: { value: "{colors.gray.700}" },
      800: { value: "{colors.gray.800}" },
      900: { value: "{colors.gray.900}" },
      950: { value: "{colors.gray.950}" },
    },

    /**
     * Accent - Special features/premium content (purple)
     * Use for: Accent buttons, highlights, premium badges
     */
    accent: {
      50: { value: "{colors.purple.50}" },
      100: { value: "{colors.purple.100}" },
      200: { value: "{colors.purple.200}" },
      300: { value: "{colors.purple.300}" },
      400: { value: "{colors.purple.400}" },
      500: { value: "{colors.purple.500}" },
      600: { value: "{colors.purple.600}" },
      700: { value: "{colors.purple.700}" },
      800: { value: "{colors.purple.800}" },
      900: { value: "{colors.purple.900}" },
      950: { value: "{colors.purple.950}" },
    },

    /**
     * Success - Positive actions/confirmations (green)
     * Use for: Success messages, confirm buttons, positive states
     */
    success: {
      50: { value: "{colors.green.50}" },
      100: { value: "{colors.green.100}" },
      200: { value: "{colors.green.200}" },
      300: { value: "{colors.green.300}" },
      400: { value: "{colors.green.400}" },
      500: { value: "{colors.green.500}" },
      600: { value: "{colors.green.600}" },
      700: { value: "{colors.green.700}" },
      800: { value: "{colors.green.800}" },
      900: { value: "{colors.green.900}" },
      950: { value: "{colors.green.950}" },
    },

    /**
     * Danger - Destructive actions/errors (red)
     * Use for: Delete buttons, error messages, alerts
     */
    danger: {
      50: { value: "{colors.red.50}" },
      100: { value: "{colors.red.100}" },
      200: { value: "{colors.red.200}" },
      300: { value: "{colors.red.300}" },
      400: { value: "{colors.red.400}" },
      500: { value: "{colors.red.500}" },
      600: { value: "{colors.red.600}" },
      700: { value: "{colors.red.700}" },
      800: { value: "{colors.red.800}" },
      900: { value: "{colors.red.900}" },
      950: { value: "{colors.red.950}" },
    },

    /**
     * Warning - Caution/important notices (orange)
     * Use for: Warning messages, caution buttons, important actions
     */
    warning: {
      50: { value: "{colors.orange.50}" },
      100: { value: "{colors.orange.100}" },
      200: { value: "{colors.orange.200}" },
      300: { value: "{colors.orange.300}" },
      400: { value: "{colors.orange.400}" },
      500: { value: "{colors.orange.500}" },
      600: { value: "{colors.orange.600}" },
      700: { value: "{colors.orange.700}" },
      800: { value: "{colors.orange.800}" },
      900: { value: "{colors.orange.900}" },
      950: { value: "{colors.orange.950}" },
    },

    /**
     * Info - Informational messages (cyan)
     * Use for: Info messages, help buttons, tips
     */
    info: {
      50: { value: "{colors.cyan.50}" },
      100: { value: "{colors.cyan.100}" },
      200: { value: "{colors.cyan.200}" },
      300: { value: "{colors.cyan.300}" },
      400: { value: "{colors.cyan.400}" },
      500: { value: "{colors.cyan.500}" },
      600: { value: "{colors.cyan.600}" },
      700: { value: "{colors.cyan.700}" },
      800: { value: "{colors.cyan.800}" },
      900: { value: "{colors.cyan.900}" },
      950: { value: "{colors.cyan.950}" },
    },
  },
};
