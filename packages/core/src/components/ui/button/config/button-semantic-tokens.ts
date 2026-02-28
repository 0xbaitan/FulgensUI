import { SemanticTokens } from "@pandacss/dev";

export const buttonSemanticTokens: SemanticTokens = {
  colors: {
    "button-background": {
      type: "color",
      value: { base: "{colors.blue.800}", _dark: "{colors.blue.100}" },
    },
    "button-text": {
      type: "color",
      value: { base: "{colors.white}", _dark: "{colors.gray.900}" },
    },
  },
};
