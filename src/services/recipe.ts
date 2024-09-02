import { Recipe } from "../core/interfaces";

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

export async function listRecipes(page: number, pageSize: number) {
  const query = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  });
  const response = await fetch(`${API_URL}/recipes?${query.toString()}`, {
    method: "GET",
  });

  const data = await response.json();
  // const list: unknown[] = data.data;
  // data.data = [...list.concat(list), ...list.concat(list)];
  return data;
}
