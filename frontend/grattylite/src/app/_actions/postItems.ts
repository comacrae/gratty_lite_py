import { fastApiGetRequest } from "./http";
import { FastApiPostItem } from "../types";

export async function getCurrentUserPostItems(): Promise<FastApiPostItem[]> {
  const result: FastApiPostItem[] = await fastApiGetRequest(
    "/post-items/user/me"
  );
  return result;
}

export async function getPostItemsByUserId(
  userId: number
): Promise<FastApiPostItem[]> {
  const result: FastApiPostItem[] = await fastApiGetRequest(
    `/post-items/user/${userId}`
  );
  return result;
}
