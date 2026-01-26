import { defineConfig } from "@pandacss/dev";
import * as recipes from "@/recipes";
import { colors } from "@/tokens/base";

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
  exclude: [],

  outdir: "./src/styled-system",

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          ...colors,
        },
      },
      recipes: {
        ...recipes,
      },
    },
  },
});
