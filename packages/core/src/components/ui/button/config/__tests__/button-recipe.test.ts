import { describe, it, expect } from "vitest";

/**
 * Button Recipe Tests
 *
 * Verifies that the button recipe is properly structured with all required
 * variants and uses design tokens instead of hard-coded values.
 */

describe("Button Recipe", () => {
  describe("Recipe Structure", () => {
    it("should export buttonRecipe as a recipe definition", async () => {
      const { buttonRecipe } = await import("../button-recipe");

      expect(buttonRecipe).toBeDefined();
      expect(buttonRecipe.className).toBe("button");
    });

    it("should have base styles using design tokens", async () => {
      const { buttonRecipe } = await import("../button-recipe");

      expect(buttonRecipe.base).toBeDefined();

      // Should use token references, not hard-coded values
      const baseStyles = buttonRecipe.base as Record<string, unknown>;

      // Check that padding uses spacing tokens
      if (baseStyles.padding || baseStyles.paddingX || baseStyles.px) {
        const padding =
          baseStyles.padding || `${baseStyles.px} ${baseStyles.py}`;
        expect(padding).toMatch(/spacing|{spacing/);
      }

      // Check that borderRadius uses radii tokens
      if (baseStyles.borderRadius) {
        expect(baseStyles.borderRadius).toMatch(/radii|{radii/);
      }

      // Check that fontSize uses sizes tokens
      if (baseStyles.fontSize) {
        expect(baseStyles.fontSize).toMatch(
          /sizes|fontSizes|{sizes|{fontSizes/,
        );
      }
    });

    it("should include JSX tracking hint for Button component", async () => {
      const { buttonRecipe } = await import("../button-recipe");

      expect(buttonRecipe.jsx).toBeDefined();
      expect(buttonRecipe.jsx).toContain("Button");
    });
  });

  describe("Visual Variant", () => {
    it("should define visual variant with 4 options", async () => {
      const { buttonRecipe } = await import("../button-recipe");

      expect(buttonRecipe.variants?.visual).toBeDefined();
      const visual = buttonRecipe.variants?.visual as Record<string, unknown>;

      expect(visual.solid).toBeDefined();
      expect(visual.outline).toBeDefined();
      expect(visual.ghost).toBeDefined();
      expect(visual.subtle).toBeDefined();
    });

    it("should use tokens in visual variants (no hard-coded colors)", async () => {
      const { buttonRecipe } = await import("../button-recipe");
      const visual = buttonRecipe.variants?.visual as Record<
        string,
        Record<string, unknown>
      >;

      // Check solid variant uses tokens
      if (visual.solid?.backgroundColor) {
        expect(visual.solid.backgroundColor).toMatch(/colors|{colors/);
      }

      // Check outline variant uses tokens
      if (visual.outline?.borderColor) {
        expect(visual.outline.borderColor).toMatch(/colors|{colors/);
      }
    });
  });

  describe("Intent Variant", () => {
    it("should define intent variant with 7 semantic options", async () => {
      const { buttonRecipe } = await import("../button-recipe");

      expect(buttonRecipe.variants?.intent).toBeDefined();
      const intent = buttonRecipe.variants?.intent as Record<string, unknown>;

      expect(intent.primary).toBeDefined();
      expect(intent.secondary).toBeDefined();
      expect(intent.accent).toBeDefined();
      expect(intent.success).toBeDefined();
      expect(intent.danger).toBeDefined();
      expect(intent.warning).toBeDefined();
      expect(intent.info).toBeDefined();
    });

    it("should use semantic tokens for intent variants in compound variants", async () => {
      const { buttonRecipe } = await import("../button-recipe");
      const compoundVariants = buttonRecipe.compoundVariants;

      // Intent styles are defined in compound variants (visual + intent combinations)
      // Check that compound variants use semantic tokens like {colors.primary.*}
      const compoundVariantsString = JSON.stringify(compoundVariants);

      // Should use semantic color tokens that match intent names
      expect(compoundVariantsString).toMatch(/colors\.primary/);
      expect(compoundVariantsString).toMatch(/colors\.secondary/);
      expect(compoundVariantsString).toMatch(/colors\.accent/);
      expect(compoundVariantsString).toMatch(/colors\.success/);
      expect(compoundVariantsString).toMatch(/colors\.danger/);
      expect(compoundVariantsString).toMatch(/colors\.warning/);
      expect(compoundVariantsString).toMatch(/colors\.info/);
    });
  });

  describe("Size Variant", () => {
    it("should define size variant with 5 options", async () => {
      const { buttonRecipe } = await import("../button-recipe");

      expect(buttonRecipe.variants?.size).toBeDefined();
      const size = buttonRecipe.variants?.size as Record<string, unknown>;

      expect(size.xs).toBeDefined();
      expect(size.sm).toBeDefined();
      expect(size.md).toBeDefined();
      expect(size.lg).toBeDefined();
      expect(size.xl).toBeDefined();
    });

    it("should use spacing and font size tokens", async () => {
      const { buttonRecipe } = await import("../button-recipe");
      const size = buttonRecipe.variants?.size as Record<string, unknown>;

      // Check that sizes use tokens
      const checkSizeUsesTokens = (sizeStyles: unknown) => {
        if (!sizeStyles) return;

        const styleString = JSON.stringify(sizeStyles);
        const sizeStylesObj = sizeStyles as Record<string, unknown>;

        // Should use spacing tokens for padding
        if (
          sizeStylesObj.padding ||
          sizeStylesObj.px ||
          sizeStylesObj.paddingX
        ) {
          expect(styleString).toMatch(/spacing|{spacing/);
        }

        // Should use font size tokens
        if (sizeStylesObj.fontSize) {
          expect(styleString).toMatch(/sizes|fontSizes|{sizes|{fontSizes/);
        }
      };

      checkSizeUsesTokens(size.xs);
      checkSizeUsesTokens(size.sm);
      checkSizeUsesTokens(size.md);
      checkSizeUsesTokens(size.lg);
      checkSizeUsesTokens(size.xl);
    });
  });

  describe("Shape Variant", () => {
    it("should define shape variant with 3 options", async () => {
      const { buttonRecipe } = await import("../button-recipe");

      expect(buttonRecipe.variants?.shape).toBeDefined();
      const shape = buttonRecipe.variants?.shape as Record<string, unknown>;

      expect(shape.base).toBeDefined();
      expect(shape.circle).toBeDefined();
      expect(shape.square).toBeDefined();
    });

    it("should use radii tokens for shape variants", async () => {
      const { buttonRecipe } = await import("../button-recipe");
      const shape = buttonRecipe.variants?.shape as Record<
        string,
        Record<string, unknown>
      >;

      // Check that shapes use radii tokens
      if (shape.base?.borderRadius) {
        expect(shape.base.borderRadius).toMatch(/radii|{radii/);
      }

      if (shape.circle?.borderRadius) {
        expect(shape.circle.borderRadius).toMatch(/radii|{radii/);
      }

      if (shape.square?.borderRadius) {
        expect(shape.square.borderRadius).toMatch(/radii|{radii/);
      }
    });
  });

  describe("Interactive States", () => {
    it("should define hover state styles", async () => {
      const { buttonRecipe } = await import("../button-recipe");

      const base = buttonRecipe.base as Record<string, unknown>;
      expect(base._hover).toBeDefined();
    });

    it("should define focus-visible state styles", async () => {
      const { buttonRecipe } = await import("../button-recipe");

      const base = buttonRecipe.base as Record<string, unknown>;
      expect(base._focusVisible || base._focus).toBeDefined();
    });

    it("should define active state styles", async () => {
      const { buttonRecipe } = await import("../button-recipe");

      const base = buttonRecipe.base as Record<string, unknown>;
      expect(base._active).toBeDefined();
    });

    it("should define disabled state styles", async () => {
      const { buttonRecipe } = await import("../button-recipe");

      const base = buttonRecipe.base as Record<string, unknown>;
      expect(base._disabled).toBeDefined();
    });
  });

  describe("Default Variants", () => {
    it("should have sensible default variants", async () => {
      const { buttonRecipe } = await import("../button-recipe");

      expect(buttonRecipe.defaultVariants).toBeDefined();

      const defaults = buttonRecipe.defaultVariants as Record<string, unknown>;

      // Should have defaults for visual, intent, size, and shape
      expect(defaults.visual).toBeDefined();
      expect(defaults.intent).toBeDefined();
      expect(defaults.size).toBeDefined();
      expect(defaults.shape).toBeDefined();

      // Verify sensible defaults
      expect(defaults.visual).toBe("solid");
      expect(defaults.intent).toBe("primary");
      expect(defaults.size).toBe("md");
      expect(defaults.shape).toBe("base");
    });
  });

  describe("Recipe File Size", () => {
    it("should be less than 500 lines", async () => {
      // Read the file content to check line count
      const fs = await import("fs/promises");
      const path = await import("path");

      const filePath = path.resolve(__dirname, "../button-recipe.ts");
      const content = await fs.readFile(filePath, "utf-8");
      const lineCount = content.split("\n").length;

      expect(lineCount).toBeLessThan(500);
    });
  });
});
