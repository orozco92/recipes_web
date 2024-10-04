export const MealTypeConst = {
  Breakfast: "BREAKFAST",
  Lunch: "LUNCH",
  Dinner: "DINNER",
  Deserts: "DESERTS",
  Snacks: "SNACKS",
} as const;

export const RecipeDifficultyConst = {
  Beginner: "BEGINNER",
  Intermediate: "INTERMEDIATE",
  Advanced: "ADVANCED",
  Expert: "EXPERT",
} as const;

export const MealTypeWithAll = { ...MealTypeConst, All: "ALL" } as const;
export const RecipeDifficultyWithAll = {
  ...RecipeDifficultyConst,
  All: "ALL",
} as const;

export enum Roles {
  Customer = 'CUSTOMER',
  Colaborator = 'COLABORATOR',
  Admin = 'ADMIN',
}
