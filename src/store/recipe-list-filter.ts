import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { MealTypeWithAll, RecipeDifficultyWithAll } from "../core/enums";
import { MealType, RecipeDifficulty, WithAll } from "../core/interfaces";

interface State {
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (page: number) => void;
  mealType: MealType | WithAll;
  setMealType: (mealType: MealType | WithAll) => void;
  difficulty: RecipeDifficulty | WithAll;
  setDifficulty: (difficulty: RecipeDifficulty | WithAll) => void;
}

export const useRecipeListStore = create<State>()(
  devtools((set) => {
    return {
      page: 1,
      pageSize: 25,
      mealType: MealTypeWithAll.All,
      difficulty: RecipeDifficultyWithAll.All,
      setPage: (page) => set({ page }),
      setPageSize: (pageSize) => set({ pageSize }),
      setMealType: (mealType) => set({ mealType }),
      setDifficulty: (difficulty) => set({ difficulty }),
    };
  })
);
