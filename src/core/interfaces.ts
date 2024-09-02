import { MealType, RecipeDifficulty } from "./enums";

type Difficulty = keyof typeof RecipeDifficulty;
type Category = keyof typeof MealType;

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
  category: Category | "";
  difficulty: Difficulty | "";
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
  category: MealType;
  difficulty: Difficulty;
  calories: number;
  rating: number;
  authorId: number;
}
