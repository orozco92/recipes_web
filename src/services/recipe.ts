import { Recipe } from "../core/interfaces";
import { RecipeListRequest } from "../core/interfaces/api";

const API_URL = "http://localhost:3000";

export async function upsertRecipe(recipe: Recipe) {
  const response = await fetch(`${API_URL}/recipes`, {
    method: "POST",
    headers: [["Content-Type", "application/json"]],
    body: JSON.stringify(recipe),
  });

  const data = response.json();
  return data;
}

export async function listRecipes(request: RecipeListRequest) {
  const query = new URLSearchParams({
    page: request.page.toString(),
    pageSize: request.pageSize.toString(),
  });

  if (request.difficulty && request.difficulty !== "ALL")
    query.set("difficulty", request.difficulty);

  if (request.mealType && request.mealType !== "ALL")
    query.set("mealType", request.mealType);

  const response = await fetch(`${API_URL}/recipes?${query.toString()}`, {
    method: "GET",
  });

  const data = await response.json();
  // const list: unknown[] = data.data;
  // data.data = [...list.concat(list), ...list.concat(list)];
  return data;
}
