import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
    "./stories/**/*.{js,jsx,ts,tsx,mdx}",
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {},
  },

  // The output directory for your css system
  outdir: "fulgens",

  importMap: {
    css: "fulgens/css",
    tokens: "fulgens/tokens",
    recipes: "fulgens/recipes",
    jsx: "fulgens/jsx",
    patterns: "fulgens/patterns",
  },
});
