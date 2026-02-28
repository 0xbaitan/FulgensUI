import { SemanticTokens } from "@pandacss/dev";
import { buttonSemanticTokens } from "@/components/ui/button/config/button-semantic-tokens";

export const semanticTokens: SemanticTokens = {
  colors: {
    ...buttonSemanticTokens.colors,
  },
};
