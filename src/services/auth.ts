import axios, { AxiosError } from "axios";
import { AuthData } from "../core/interfaces/api";
import { StorageNames } from "../store/storage-names";
import { ApiValidationError, SignUpDto } from "../core/interfaces";
import { ValidationError } from "../core/errors";

const apiURL = import.meta.env.VITE_API_URL;
(() => {
  const stringStorage = localStorage.getItem(StorageNames.Auth);
  if (!stringStorage) return;
  const authStorage = JSON.parse(stringStorage);
  const token = authStorage.state?.token;
  if (token) updateAccessToken(token);
})();

export function updateAccessToken(newToken?: string) {
  if (newToken)
    axios.defaults.headers.common.Authorization = `Bearer ${newToken}`;
  else delete axios.defaults.headers.common.Authorization;
}

export async function login(
  username: string,
  password: string
): Promise<AuthData | null> {
  try {
    const response = await axios.post<AuthData>(`${apiURL}/auth/signin`, {
      username,
      password,
    });
    axios.defaults.headers.common.Authorization = `Bearer ${response.data.accessToken}`;
    return response.data;
  } catch (e) {
    return null;
  }
}

export async function signup({
  username,
  email,
  password,
}: SignUpDto): Promise<boolean> {
  try {
    await axios.post(`${apiURL}/auth/signup`, {
      username,
      email,
      password,
    });
    return true;
  } catch (e) {
    const error = e as AxiosError;
    if (error.response?.data)
      throw new ValidationError(
        (error.response?.data as { message: ApiValidationError[] }).message
      );
    throw new Error("Internal server error");
  }
}
