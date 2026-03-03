import rootConfig from "../../eslint.config";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  ...rootConfig,
  globalIgnores([".docusaurus", "build"]),
  {
    files: ["**/*.d.ts"],
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
]);
