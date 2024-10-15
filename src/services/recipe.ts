import axios from "axios";
import { Recipe } from "../core/interfaces";
import { RecipeListRequest } from "../core/interfaces/api";

const apiURL = import.meta.env.VITE_API_URL;

export async function upsertRecipe(recipe: Recipe) {
  const response = await fetch(`${apiURL}/recipes`, {
    method: "POST",
    headers: [["Content-Type", "application/json"]],
    body: JSON.stringify(recipe),
  });

  const data = response.json();
  return data;
}

export async function listRecipes(request: RecipeListRequest) {
  const query = buildRecipesListQuery(request);

  const response = await axios.get(`${apiURL}/recipes?${query.toString()}`);

  return response.data;
}

export async function favoriteRecipes(request: RecipeListRequest) {
  const query = buildRecipesListQuery(request);

  const response = await axios.get(
    `${apiURL}/recipes/favorites?${query.toString()}`
  );

  return response.data;
}

export function buildRecipesListQuery(
  request: RecipeListRequest
): URLSearchParams {
  const query = new URLSearchParams({
    page: request.page.toString(),
    pageSize: request.pageSize.toString(),
  });

  if (request.difficulty && request.difficulty !== "ALL")
    query.set("difficulty", request.difficulty);

  if (request.mealType && request.mealType !== "ALL")
    query.set("mealType", request.mealType);

  if (request.search) query.set("search", request.search);

  return query;
}

export async function getRecipeData(recipeId?: string) {
  if (!recipeId) return;
  const response = await fetch(`http://localhost:3000/recipes/${recipeId}`);
  const json = response.json();
  return json;
}
