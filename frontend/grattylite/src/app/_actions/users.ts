import { fastApiGet } from "./http";
import {
  FastApiPost,
  FastApiPostItem,
  FastApiUser,
  FastApiUserPublic,
} from "@/app/types";
export async function getFastApiCurrentUser(): Promise<FastApiUser> {
  const user: FastApiUser = await fastApiGet("/users/me");
  return user;
}

export async function getFastApiCurrentUserId() {
  const info = await fastApiGet(`/users/me/id`);
  return info;
}

export async function getFastApiUserById(
  id: number
): Promise<FastApiUserPublic> {
  const user: FastApiUserPublic = await fastApiGet(`/users/${id}`);
  return user;
}

export async function getFastApiUsers(): Promise<FastApiUserPublic[]> {
  const users: FastApiUserPublic[] = await fastApiGet("/users/");
  return users;
}
