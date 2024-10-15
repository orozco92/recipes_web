import axios from "axios";
import { UserListRequest } from "../core/interfaces/api";

const apiURL = import.meta.env.VITE_API_URL;

export async function listUsers(request: UserListRequest) {
  const query = new URLSearchParams({
    page: request.page.toString(),
    pageSize: request.pageSize.toString(),
  });
  if (request.roles) {
    query.append("roles", request.roles.toString());
  }

  const response = await axios.get(`${apiURL}/users?${query.toString()}`);
  return response.data;
}

export async function disableUser(userId: number) {
  const response = await axios.patch(`${apiURL}/users/${userId}/disable`);
  return response.data;
}

export async function enableUser(userId: number) {
  const response = await axios.patch(`${apiURL}/users/${userId}/enable`);
  return response.data;
}

export async function removeUser(userId: number) {
  const response = await axios.delete(`${apiURL}/users/${userId}`);
  return response.data;
}
