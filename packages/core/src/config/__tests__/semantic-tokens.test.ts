import { describe, it, expect } from "vitest";

/**
 * Semantic Tokens Tests
 *
 * Verifies that semantic color aliases are properly defined and map
 * to the correct base colors.
 */

describe("Semantic Tokens", () => {
  describe("Semantic Color Aliases", () => {
    it("should define 7 semantic color aliases", async () => {
      const { semanticTokens } = await import("../semantic-tokens");

      expect(semanticTokens.colors).toBeDefined();
      expect(semanticTokens.colors?.primary).toBeDefined();
      expect(semanticTokens.colors?.secondary).toBeDefined();
      expect(semanticTokens.colors?.accent).toBeDefined();
      expect(semanticTokens.colors?.success).toBeDefined();
      expect(semanticTokens.colors?.danger).toBeDefined();
      expect(semanticTokens.colors?.warning).toBeDefined();
      expect(semanticTokens.colors?.info).toBeDefined();
    });

    it("should map primary alias to blue", async () => {
      const { semanticTokens } = await import("../semantic-tokens");
      const primary = semanticTokens.colors?.primary as
        | Record<number, unknown>
        | undefined;

      expect(primary).toBeDefined();
      if (primary) {
        expect(primary[500]).toBeDefined();
        const shade500 = primary[500] as Record<string, unknown>;
        expect(shade500.value).toBe("{colors.blue.500}");
      }
    });

    it("should map secondary alias to gray", async () => {
      const { semanticTokens } = await import("../semantic-tokens");
      const secondary = semanticTokens.colors?.secondary as
        | Record<number, unknown>
        | undefined;

      expect(secondary).toBeDefined();
      if (secondary) {
        expect(secondary[500]).toBeDefined();
        const shade500 = secondary[500] as Record<string, unknown>;
        expect(shade500.value).toBe("{colors.gray.500}");
      }
    });

    it("should map accent alias to purple", async () => {
      const { semanticTokens } = await import("../semantic-tokens");
      const accent = semanticTokens.colors?.accent as
        | Record<number, unknown>
        | undefined;

      expect(accent).toBeDefined();
      if (accent) {
        expect(accent[500]).toBeDefined();
        const shade500 = accent[500] as Record<string, unknown>;
        expect(shade500.value).toBe("{colors.purple.500}");
      }
    });

    it("should map success alias to green", async () => {
      const { semanticTokens } = await import("../semantic-tokens");
      const success = semanticTokens.colors?.success as
        | Record<number, unknown>
        | undefined;

      expect(success).toBeDefined();
      if (success) {
        expect(success[500]).toBeDefined();
        const shade500 = success[500] as Record<string, unknown>;
        expect(shade500.value).toBe("{colors.green.500}");
      }
    });

    it("should map danger alias to red", async () => {
      const { semanticTokens } = await import("../semantic-tokens");
      const danger = semanticTokens.colors?.danger as
        | Record<number, unknown>
        | undefined;

      expect(danger).toBeDefined();
      if (danger) {
        expect(danger[500]).toBeDefined();
        const shade500 = danger[500] as Record<string, unknown>;
        expect(shade500.value).toBe("{colors.red.500}");
      }
    });

    it("should map warning alias to orange", async () => {
      const { semanticTokens } = await import("../semantic-tokens");
      const warning = semanticTokens.colors?.warning as
        | Record<number, unknown>
        | undefined;

      expect(warning).toBeDefined();
      if (warning) {
        expect(warning[500]).toBeDefined();
        const shade500 = warning[500] as Record<string, unknown>;
        expect(shade500.value).toBe("{colors.orange.500}");
      }
    });

    it("should map info alias to cyan", async () => {
      const { semanticTokens } = await import("../semantic-tokens");
      const info = semanticTokens.colors?.info as
        | Record<number, unknown>
        | undefined;

      expect(info).toBeDefined();
      if (info) {
        expect(info[500]).toBeDefined();
        const shade500 = info[500] as Record<string, unknown>;
        expect(shade500.value).toBe("{colors.cyan.500}");
      }
    });

    it("should have all 11 shades (50-950) for each semantic alias", async () => {
      const { semanticTokens } = await import("../semantic-tokens");

      const checkSemanticShades = (alias: unknown) => {
        if (typeof alias !== "object" || alias === null) return;

        const aliasObj = alias as Record<number, unknown>;
        expect(aliasObj[50]).toBeDefined();
        expect(aliasObj[100]).toBeDefined();
        expect(aliasObj[200]).toBeDefined();
        expect(aliasObj[300]).toBeDefined();
        expect(aliasObj[400]).toBeDefined();
        expect(aliasObj[500]).toBeDefined();
        expect(aliasObj[600]).toBeDefined();
        expect(aliasObj[700]).toBeDefined();
        expect(aliasObj[800]).toBeDefined();
        expect(aliasObj[900]).toBeDefined();
        expect(aliasObj[950]).toBeDefined();
      };

      checkSemanticShades(semanticTokens.colors?.primary);
      checkSemanticShades(semanticTokens.colors?.secondary);
      checkSemanticShades(semanticTokens.colors?.accent);
      checkSemanticShades(semanticTokens.colors?.success);
      checkSemanticShades(semanticTokens.colors?.danger);
      checkSemanticShades(semanticTokens.colors?.warning);
      checkSemanticShades(semanticTokens.colors?.info);
    });
  });
});
