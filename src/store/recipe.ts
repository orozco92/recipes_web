import { create } from "zustand";
import {
  Ingredient,
  Recipe,
  RecipePrimitives,
  UpsertRecipeState,
  WithId,
} from "../core/interfaces";
import { devtools } from "zustand/middleware";
import { defaultRecipePicture } from "../core/constants";

interface State {
  data: UpsertRecipeState;
  picture: string;
  pictureFile: File | undefined;
  updateSteps: (description: string) => void;
  updateIngredients: (ingredient: Ingredient) => void;
  removeIngredient: (index: number) => void;
  updateRecipeData: (data: unknown, key: RecipePrimitives) => void;
  setPicture: (picture?: string) => void;
  setPictureFile: (pictureFile: File | undefined) => void;
  setRecipe: (recipe: Recipe & WithId) => void;
  reset: () => void;
}

const initialValue: UpsertRecipeState = {
  name: "",
  calories: 0,
  cookingTime: 0,
  servings: 0,
  mealType: "",
  difficulty: "",
  ingredients: [],
  steps: [],
};

export const useUpsertRecipeStore = create<State>()(
  devtools((set, get) => {
    return {
      data: initialValue as Omit<Recipe, "picture">,
      picture: defaultRecipePicture,
      pictureFile: undefined,
      updateSteps: (description: string) => {
        const updatedData = get().data;
        updatedData.steps = [{ number: 0, description }];
        set({ data: updatedData });
      },
      updateIngredients: (ingredient: Ingredient) => {
        const { data } = get();
        const ingredients = [...data.ingredients];
        ingredients.push(ingredient);
        data.ingredients = ingredients;
        set({ data });
      },
      removeIngredient: (index: number) => {
        const { data } = get();
        const ingredients = [
          ...data.ingredients.slice(0, index),
          ...data.ingredients.slice(index + 1),
        ];
        data.ingredients = ingredients;
        set({ data });
      },
      updateRecipeData: (value: unknown, key: RecipePrimitives) => {
        const updatedData = get().data;
        const data = { ...updatedData, [key]: value };
        set({ data });
      },
      setPicture: (picture = defaultRecipePicture) => set({ picture }),
      setPictureFile: (pictureFile) => set({ pictureFile }),
      setRecipe: (recipe) => {
        const data = {
          id: recipe.id,
          name: recipe.name,
          calories: recipe.calories ?? initialValue.calories,
          cookingTime: recipe.cookingTime ?? initialValue.cookingTime,
          servings: recipe.servings ?? initialValue.servings,
          mealType: recipe.mealType ?? initialValue.mealType,
          difficulty: recipe.difficulty ?? initialValue.difficulty,
          ingredients: recipe.ingredients ?? initialValue.ingredients,
          steps: recipe.steps ?? initialValue.steps,
        } as UpsertRecipeState;
        set({ data, picture: recipe.picture ?? defaultRecipePicture });
      },
      reset: () => {
        set({
          data: initialValue as Omit<Recipe, "picture">,
          picture: defaultRecipePicture,
          pictureFile: undefined,
        });
      },
    };
  })
);
