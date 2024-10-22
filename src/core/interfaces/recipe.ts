import { Recipe } from "../interfaces";

export interface UpsertRecipeDto extends Omit<Recipe, "picture"> {
  id?: number;
}
