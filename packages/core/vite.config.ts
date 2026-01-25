/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/*": path.resolve(dirname, "src"),
      "@recipes/*": path.resolve(dirname, "src/recipes"),
      "@styled-system/*": path.resolve(dirname, "src/styled-system"),
      "@components/*": path.resolve(dirname, "src/components"),
      "@stories/*": path.resolve(dirname, "src/stories"),
    },
  },
});
