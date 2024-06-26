import {
  fastApiDeleteRequest,
  fastApiGetRequest,
  getFastApiStatusObject,
} from "./http";
import {
  FastApiStatusResponse,
  FastApiUser,
  FastApiUserPublic,
} from "@/app/types";

export async function getFastApiCurrentUser(): Promise<FastApiUser> {
  const user: FastApiUser = await fastApiGetRequest("/users/me");
  return user;
}

export async function getFastApiCurrentUserInfo() {
  const info = await fastApiGetRequest(`/users/me/info`);
  return info;
}

export async function getFastApiCurrentUserId() {
  const id = await fastApiGetRequest(`/users/me/id`);
  return id;
}

export async function getFastApiUserById(
  userId: number
): Promise<FastApiUserPublic> {
  const user: FastApiUserPublic = await fastApiGetRequest(`/users/${userId}`);
  return user;
}

export async function getFastApiUsers(): Promise<FastApiUserPublic[]> {
  const users: FastApiUserPublic[] = await fastApiGetRequest("/users/");
  return users;
}

export async function deleteCurrentUser(): Promise<FastApiStatusResponse> {
  const status = await fastApiDeleteRequest("/users/delete/me");
  return status;
}
