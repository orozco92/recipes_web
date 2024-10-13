import { MealTypeConst, RecipeDifficultyConst, Roles } from "./enums";

export type RecipeDifficulty =
  (typeof RecipeDifficultyConst)[keyof typeof RecipeDifficultyConst];
export type MealType = (typeof MealTypeConst)[keyof typeof MealTypeConst];

export type WithAll = "ALL";

export interface Ingredient {
  name: string;
  amount?: string;
  unit?: string;
}

export interface RecipeStep {
  number: number;
  description: string;
}
export interface Recipe {
  name: string;
  picture: string;
  cookingTime: number;
  servings: number;
  mealType: MealType | "";
  difficulty: RecipeDifficulty | "";
  calories: number;
  steps: RecipeStep[];
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

export interface User {
  username: string;
  email: string;
  role: Roles;
}

export interface ProfileUser {
  id: number;
  username: string;
  email: string;
  role: Roles;
  firstName: string;
  lastName: string;
  picture: string;
  favorites: Recipe[];
}

export type Nullable<T> = T | null;

export interface SignUpDto {
  username: string;
  email: string;
  password: string;
}

export interface ApiValidationError {
  property: string;
  errors: Record<string, string>;
}

export type UpdateProfileDto = Pick<
  ProfileUser,
  "username" | "firstName" | "lastName" | "picture"
>;

export interface UpdatePasswordDto {
  oldPassword: string;
  newPassword: string;
}
