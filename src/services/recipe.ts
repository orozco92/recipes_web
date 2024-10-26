import axios from "axios";
import {
  RecipeListRequest,
  SearcheablePagedAndSortedRequest,
} from "../core/interfaces/api";
import { UpsertRecipeDto } from "../core/interfaces/recipe";
import { Recipe, WithId } from "../core/interfaces";

const apiURL = import.meta.env.VITE_API_URL;

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

export async function myRecipes(request: SearcheablePagedAndSortedRequest) {
  const query = new URLSearchParams({
    page: request.page.toString(),
    pageSize: request.pageSize.toString(),
  });
  if (request.search) query.set("search", request.search);

  const response = await axios.get(`${apiURL}/recipes/me?${query.toString()}`);

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
  const response = await axios.get(`${apiURL}/recipes/${recipeId}`);
  return response.data;
}

export async function upsertRecipeWithPicture(
  upsertRecipeDto: UpsertRecipeDto,
  picture?: File
) {
  const recipe = await upsertRecipe(upsertRecipeDto);
  if (!picture) return recipe;
  try {
    const withImage = await updateRecipePicture(recipe.id, picture);
    return withImage;
  } catch (error) {
    await removeRecipe(recipe.id);
    throw error;
  }
}

export async function upsertRecipe(
  upsertRecipeDto: UpsertRecipeDto
): Promise<Recipe & WithId> {
  const response = !upsertRecipeDto.id
    ? await axios.post(`${apiURL}/recipes`, upsertRecipeDto)
    : await axios.patch(
        `${apiURL}/recipes/${upsertRecipeDto.id}`,
        upsertRecipeDto
      );
  return response.data;
}

export async function updateRecipePicture(
  id: number,
  picture: File
): Promise<Recipe & WithId> {
  const body = new FormData();
  body.append("file", picture);
  const response = await axios.patch(`${apiURL}/recipes/${id}/picture`, body);
  return response.data;
}

export async function removeRecipe(id: number): Promise<Recipe & WithId> {
  const response = await axios.delete(`${apiURL}/recipes/${id}`);
  return response.data;
}
