import { Tokens } from "@pandacss/dev";

import { colors, radii, sizes, spacing, shadows } from "./base";

export const tokens: Tokens = {
  colors: {
    ...colors,
  },
  radii: {
    ...radii,
  },
  fontSizes: {
    ...sizes,
  },
  spacing: {
    ...spacing,
  },
  shadows: {
    ...shadows,
  },
};
