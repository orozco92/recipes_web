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
