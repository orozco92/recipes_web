import axios from "axios";
import { AuthData } from "../core/interfaces/api";
import { StorageNames } from "../store/storage-names";

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
