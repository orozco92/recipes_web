import { create } from "zustand";
import { Ingredient, Recipe, RecipePrimitives } from "../core/interfaces";
import { devtools } from "zustand/middleware";

interface State {
  data: Recipe;
  updateSteps: (description: string) => void;
  updateIngredients: (ingredient: Ingredient) => void;
  removeIngredient: (index: number) => void;
  updateRecipeData: (data: unknown, key: RecipePrimitives) => void;
  reset: () => void;
}

const initialValue: Recipe = {
  name: "",
  calories: 0,
  cookingTime: 0,
  picture: "",
  servings: 0,
  category: "",
  difficulty: "",
  ingredients: [],
  steps: [],
};

export const useUpsertRecipeStore = create<State>()(
  devtools((set, get) => {
    return {
      data: initialValue as Recipe,
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
      reset: () => {
        set({ data: initialValue as Recipe });
      },
    };
  })
);
