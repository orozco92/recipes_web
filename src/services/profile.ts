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
