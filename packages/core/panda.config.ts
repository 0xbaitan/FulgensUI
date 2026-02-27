import { defineConfig } from "@pandacss/dev";

import { tokens } from "@config/tokens";
import { recipes } from "@config/recipes";
import { semanticTokens } from "@config/semantic-tokens";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  prefix: "fui",

  // Where to look for your css declarations
  include: [
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
    "./stories/**/*.{js,jsx,ts,tsx,mdx}",
  ],

  // Files to exclude
  exclude: ["node_modules", "dist", "build", "styled-system"],

  outdir: "./src/styled-system",

  // Useful for theme customization
  theme: {
    extend: {
      tokens,
      semanticTokens,
      recipes,
    },
  },
});
