import { buttonRecipe } from "@components/ui/button/config/button-recipe";
import { RecipeConfig, RecipeVariantRecord } from "@pandacss/dev";

export const recipes: Record<
  string,
  Partial<RecipeConfig<RecipeVariantRecord>>
> = {
  button: buttonRecipe,
};
