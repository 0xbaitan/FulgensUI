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
  test: {
    environment: "happy-dom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["**/*.test.{ts,tsx}", "**/__tests__/**/*.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/components/**", "src/config/**"],
      exclude: ["src/**/*.stories.{ts,tsx}", "src/**/*.mdx", "**/*.d.ts"],
      thresholds: {
        lines: 90,
        branches: 100,
        functions: 90,
        statements: 90,
      },
    },
  },
});
