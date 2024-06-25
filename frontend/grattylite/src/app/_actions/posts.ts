"use server";
import {
  fastApiGetRequest,
  fastApiPostJSONRequest,
  fastApiPutJSONRequest,
  fastApiDeleteRequest,
  getFastApiStatusObject,
} from "./http";

import {
  FastApiPost,
  FastApiPostCreate,
  FastApiStatusResponse,
} from "@/app/types";

export async function getCurrentUserPosts(): Promise<
  FastApiPost[] | FastApiStatusResponse
> {
  const posts: FastApiPost[] = await fastApiGetRequest("/posts/user/me");
  return posts;
}

export async function getCurrentUserPostByPostId(
  postId: number
): Promise<FastApiPost | FastApiStatusResponse> {
  const post: FastApiPost = await fastApiGetRequest(`/posts/user/me/${postId}`);
  return post;
}

export async function getPostByPostId(
  postId: number
): Promise<FastApiPost | FastApiStatusResponse> {
  const post: FastApiPost = await fastApiGetRequest(`/posts/${postId}`);
  return post;
}
export async function getPostsByUserId(
  userId: number
): Promise<FastApiPost[] | FastApiStatusResponse> {
  const post: FastApiPost[] = await fastApiGetRequest(`/posts/user/${userId}`);
  return post;
}

export async function createPost(
  isPublic: boolean,
  postItems: string[]
): Promise<FastApiPost | FastApiStatusResponse> {
  const post: FastApiPostCreate = {
    public: isPublic,
    post_texts: postItems,
  };
  const result: FastApiPost = await fastApiPostJSONRequest(
    "/posts/user/me",
    post
  );
  return result;
}

export async function updatePost(
  isPublic: boolean,
  postItems: string[],
  postId: number
): Promise<FastApiPost | FastApiStatusResponse> {
  const post: FastApiPostCreate = {
    public: isPublic,
    post_texts: postItems,
  };

  const res = await fastApiPostJSONRequest(`/posts/update/${postId}`, post);
  return res;
}

export async function deletePost(
  postId: number
): Promise<FastApiStatusResponse> {
  const status = await fastApiDeleteRequest(`/posts/delete/${postId}`);
  return status;
}
