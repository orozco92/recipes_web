import axios, { AxiosError } from "axios";
import {
  ApiValidationError,
  ProfileUser,
  UpdatePasswordDto,
  UpdateProfileDto,
} from "../core/interfaces";
import { ValidationError } from "../core/errors";

const apiURL = import.meta.env.VITE_API_URL;

export async function getProfileData(): Promise<ProfileUser | null> {
  try {
    const response = await axios.get(`${apiURL}/profile/me`);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    if (err.status === 401) throw err;
    return null;
  }
}

export async function updateProfileData(
  updateProfileDto: UpdateProfileDto
): Promise<ProfileUser | null> {
  try {
    const response = await axios.patch(
      `${apiURL}/profile/me`,
      updateProfileDto
    );
    return response.data;
  } catch (error) {
    const e = error as AxiosError;
    if (e.response?.data)
      throw new ValidationError(
        (e.response?.data as { message: ApiValidationError[] }).message
      );
    throw new Error("Internal server error");
  }
}

export async function updatePassword(
  updatePasswordDto: UpdatePasswordDto
): Promise<ProfileUser | null> {
  try {
    const response = await axios.patch(
      `${apiURL}/profile/resetPassword`,
      updatePasswordDto
    );
    return response.data;
  } catch (error) {
    const e = error as AxiosError;
    if (e.response?.data)
      throw new ValidationError(
        (e.response?.data as { message: ApiValidationError[] }).message
      );
    throw new Error("Internal server error");
  }
}

export async function updateProfilePicture(
  file: File
): Promise<ProfileUser | null> {
  try {
    const body = new FormData();
    body.append("file", file);
    const response = await axios.patch(`${apiURL}/profile/updatePicture`, body);
    return response.data;
  } catch (error) {
    throw new Error("Internal server error");
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
