import { describe, it, expect } from "vitest";

/**
 * Token Infrastructure Tests
 *
 * These tests verify that design tokens are properly defined and structured
 * according to the PandaCSS token system requirements.
 */

describe("Design Tokens Infrastructure", () => {
  describe("Radii Tokens", () => {
    it("should export radii tokens with all required sizes", async () => {
      const { radii } = await import("../radii");

      expect(radii).toBeDefined();
      expect(radii.none).toBeDefined();
      expect(radii.sm).toBeDefined();
      expect(radii.md).toBeDefined();
      expect(radii.lg).toBeDefined();
      expect(radii.xl).toBeDefined();
      expect(radii.full).toBeDefined();
    });

    it("should have correct pixel values for radii", async () => {
      const { radii } = await import("../radii");

      expect(radii.none.value).toBe("0");
      expect(radii.sm.value).toBe("4px");
      expect(radii.md.value).toBe("8px");
      expect(radii.lg.value).toBe("12px");
      expect(radii.xl.value).toBe("16px");
      expect(radii.full.value).toBe("9999px");
    });
  });

  describe("Font Sizes Tokens", () => {
    it("should export sizes (fontSizes) tokens with all required scales", async () => {
      const { sizes } = await import("../sizes");

      expect(sizes).toBeDefined();
      expect(sizes.xs).toBeDefined();
      expect(sizes.sm).toBeDefined();
      expect(sizes.md).toBeDefined();
      expect(sizes.lg).toBeDefined();
      expect(sizes.xl).toBeDefined();
    });

    it("should have correct pixel values for font sizes", async () => {
      const { sizes } = await import("../sizes");

      expect(sizes.xs.value).toBe("12px");
      expect(sizes.sm.value).toBe("14px");
      expect(sizes.md.value).toBe("16px");
      expect(sizes.lg.value).toBe("18px");
      expect(sizes.xl.value).toBe("20px");
    });
  });

  describe("Spacing Tokens", () => {
    it("should export spacing tokens with 4px grid progression", async () => {
      const { spacing } = await import("../spacing");

      expect(spacing).toBeDefined();
      expect(spacing[0]).toBeDefined();
      expect(spacing[1]).toBeDefined();
      expect(spacing[2]).toBeDefined();
      expect(spacing[3]).toBeDefined();
      expect(spacing[4]).toBeDefined();
      expect(spacing[5]).toBeDefined();
      expect(spacing[6]).toBeDefined();
      expect(spacing[8]).toBeDefined();
      expect(spacing[10]).toBeDefined();
      expect(spacing[12]).toBeDefined();
    });

    it("should follow 4px base unit progression", async () => {
      const { spacing } = await import("../spacing");

      expect(spacing[0].value).toBe("0");
      expect(spacing[1].value).toBe("4px");
      expect(spacing[2].value).toBe("8px");
      expect(spacing[3].value).toBe("12px");
      expect(spacing[4].value).toBe("16px");
      expect(spacing[6].value).toBe("24px");
      expect(spacing[8].value).toBe("32px");
      expect(spacing[10].value).toBe("40px");
      expect(spacing[12].value).toBe("48px");
    });
  });

  describe("Shadows Tokens", () => {
    it("should export shadow tokens with all required sizes", async () => {
      const { shadows } = await import("../shadows");

      expect(shadows).toBeDefined();
      expect(shadows.sm).toBeDefined();
      expect(shadows.md).toBeDefined();
      expect(shadows.lg).toBeDefined();
      expect(shadows.xl).toBeDefined();
    });

    it("should have valid CSS box-shadow values", async () => {
      const { shadows } = await import("../shadows");

      expect(shadows.sm.value).toContain("rgba");
      expect(shadows.md.value).toContain("rgba");
      expect(shadows.lg.value).toContain("rgba");
      expect(shadows.xl.value).toContain("rgba");
    });
  });

  describe("Base Colors", () => {
    it("should include all Tier 1 base colors (8 colors)", async () => {
      const { colors } = await import("../colors");

      // Existing colors
      expect(colors.gray).toBeDefined();
      expect(colors.blue).toBeDefined();
      expect(colors.green).toBeDefined();
      expect(colors.red).toBeDefined();

      // New Tier 1 colors
      expect(colors.orange).toBeDefined();
      expect(colors.yellow).toBeDefined();
      expect(colors.purple).toBeDefined();
      expect(colors.cyan).toBeDefined();
    });

    it("should have 11 shades (50-950) for each Tier 1 color", async () => {
      const { colors } = await import("../colors");

      const checkColorShades = (color: unknown) => {
        const colorObj = color as Record<number, unknown>;
        expect(colorObj[50]).toBeDefined();
        expect(colorObj[100]).toBeDefined();
        expect(colorObj[200]).toBeDefined();
        expect(colorObj[300]).toBeDefined();
        expect(colorObj[400]).toBeDefined();
        expect(colorObj[500]).toBeDefined();
        expect(colorObj[600]).toBeDefined();
        expect(colorObj[700]).toBeDefined();
        expect(colorObj[800]).toBeDefined();
        expect(colorObj[900]).toBeDefined();
        expect(colorObj[950]).toBeDefined();
      };

      checkColorShades(colors.gray);
      checkColorShades(colors.blue);
      checkColorShades(colors.green);
      checkColorShades(colors.red);
      checkColorShades(colors.orange);
      checkColorShades(colors.yellow);
      checkColorShades(colors.purple);
      checkColorShades(colors.cyan);
    });

    it("should use Tailwind CSS v3 hex values", async () => {
      const { colors } = await import("../colors");

      // Verify some known Tailwind v3 values
      expect(colors.blue[500].value).toBe("#3B82F6");
      expect(colors.green[500].value).toBe("#10B981");
      expect(colors.red[500].value).toBe("#EF4444");
    });
  });

  describe("Token Registration", () => {
    it("should export all new token categories from base/index.ts", async () => {
      const baseTokens = await import("../index");

      expect(baseTokens.colors).toBeDefined();
      expect(baseTokens.radii).toBeDefined();
      expect(baseTokens.sizes).toBeDefined();
      expect(baseTokens.spacing).toBeDefined();
      expect(baseTokens.shadows).toBeDefined();
    });

    it("should register all token categories in tokens.ts", async () => {
      const { tokens } = await import("../../tokens");

      expect(tokens.colors).toBeDefined();
      expect(tokens.radii).toBeDefined();
      expect(tokens.fontSizes).toBeDefined();
      expect(tokens.spacing).toBeDefined();
      expect(tokens.shadows).toBeDefined();
    });
  });
});
