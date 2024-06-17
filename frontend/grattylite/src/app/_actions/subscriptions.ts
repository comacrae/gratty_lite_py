import {
  fastApiGetRequest,
  fastApiPostRequest,
  fastApiDeleteRequest,
} from "./http";
import { FastApiStatusResponse, FastApiUserPublic } from "../types";

export async function getCurrentUserFollowers(): Promise<
  FastApiUserPublic[] | FastApiStatusResponse
> {
  const result = await fastApiGetRequest("/subscriptions/followers/user/me");
  return result;
}

export async function getCurrentUserFollowing(): Promise<
  FastApiUserPublic[] | FastApiStatusResponse
> {
  const result = await fastApiGetRequest("/subscriptions/following/user/me");
  return result;
}

export async function getUserFollowersByUserId(
  userId: number
): Promise<FastApiUserPublic[] | FastApiStatusResponse> {
  const result = await fastApiGetRequest(
    `/subscriptions/followers/user/${userId}`
  );
  return result;
}

export async function getUserFollowingByUserId(
  userId: number
): Promise<FastApiUserPublic[] | FastApiStatusResponse> {
  const result = await fastApiGetRequest(
    `/subscriptions/following/user/${userId}`
  );
  return result;
}

export async function followUser(
  userId: number
): Promise<FastApiStatusResponse | FastApiStatusResponse> {
  const result = await fastApiPostRequest(
    `/subscriptions/follow/user/${userId}`
  );
  return result;
}

export async function unfollowUser(
  userId: number
): Promise<FastApiStatusResponse | FastApiStatusResponse> {
  const result = await fastApiDeleteRequest(
    `/subscriptions/unfollow/user/${userId}`
  );
  return result;
}
