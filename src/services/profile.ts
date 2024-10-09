import axios from "axios";
import { ProfileUser } from "../core/interfaces";

const apiURL = import.meta.env.VITE_API_URL;

export async function getProfileData(): Promise<ProfileUser | null> {
  try {
    const response = await axios.get(`${apiURL}/profile/me`);
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function getFavoriteIds() {
  try {
    const response = await axios.get(`${apiURL}/profile/favorites/ids`);
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function addToFavorites(recipeId: number) {
  try {
    await axios.patch(`${apiURL}/profile/favorites`, {
      recipeId,
    });
    return true;
  } catch (error) {
    return false;
  }
}

export async function removeFromFavorites(recipeId: number) {
  try {
    await axios.delete(`${apiURL}/profile/favorites/${recipeId}`);
    return true;
  } catch (error) {
    return false;
  }
}
