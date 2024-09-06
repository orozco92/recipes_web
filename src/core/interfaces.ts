import { MealTypeConst, RecipeDifficultyConst } from "./enums";

export type RecipeDifficulty =
  (typeof RecipeDifficultyConst)[keyof typeof RecipeDifficultyConst];
export type MealType = (typeof MealTypeConst)[keyof typeof MealTypeConst];

export type WithAll = "ALL";

export interface Ingredient {
  name: string;
  amount?: string;
  unit?: string;
}
export interface Recipe {
  name: string;
  picture: string;
  cookingTime: number;
  servings: number;
  mealType: MealType | "";
  difficulty: RecipeDifficulty | "";
  calories: number;
  steps: {
    number: number;
    description: string;
  }[];
  ingredients: (Ingredient | (Ingredient & WithId))[];
}

export interface WithId {
  id: number;
}

export type RecipePrimitives = keyof Omit<Recipe, "steps" | "ingredients">;

export interface RecipeListDto {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  name: string;
  picture: string;
  cookingTime: number;
  servings: number;
  mealType: MealType;
  difficulty: RecipeDifficulty;
  calories: number;
  rating: number;
  authorId: number;
}
