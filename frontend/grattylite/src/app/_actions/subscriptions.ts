import { fastApiGetRequest } from "./http";
import { FastApiUserPublic } from "../types";

export async function getCurrentUserFollowers(): Promise<FastApiUserPublic[]> {
  const result = await fastApiGetRequest("/subscriptions/followers/user/me");
  return result;
}

export async function getCurrentUserFollowing(): Promise<FastApiUserPublic[]> {
  const result = await fastApiGetRequest("/subscriptions/following/user/me");
  return result;
}

export async function getUserFollowersByUserId(
  userId: number
): Promise<FastApiUserPublic[]> {
  const result = await fastApiGetRequest(
    `/subscriptions/followers/user/${userId}`
  );
  return result;
}

export async function getUserFollowingByUserId(
  userId: number
): Promise<FastApiUserPublic[]> {
  const result = await fastApiGetRequest(
    `/subscriptions/following/user/${userId}`
  );
  return result;
}
