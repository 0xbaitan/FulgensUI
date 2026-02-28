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
    alias: [
      { find: "@", replacement: path.resolve(dirname, "src") },
      {
        find: "@styled-system",
        replacement: path.resolve(dirname, "src/styled-system"),
      },
      {
        find: "@components",
        replacement: path.resolve(dirname, "src/components"),
      },
      { find: "@config", replacement: path.resolve(dirname, "src/config") },
    ],
  },
});
