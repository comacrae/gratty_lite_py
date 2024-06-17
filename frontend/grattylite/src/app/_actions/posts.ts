import {
  fastApiGetRequest,
  fastApiPostJSONRequest,
  fastApiPutJSONRequest,
} from "./http";

import { FastApiPost, FastApiPostItem, FastApiPostCreate } from "@/app/types";

export async function getCurrentUserPosts(): Promise<FastApiPost[]> {
  const posts: FastApiPost[] = await fastApiGetRequest("/posts/user/me");
  return posts;
}

export async function getCurrentUserPostById(
  postId: number
): Promise<FastApiPost> {
  const post: FastApiPost = await fastApiGetRequest(`/posts/user/me/${postId}`);
  return post;
}

export async function getPostByPostId(postId: number): Promise<FastApiPost> {
  const post: FastApiPost = await fastApiGetRequest(`/posts/${postId}`);
  return post;
}
export async function getPostsByUserId(userId: number): Promise<FastApiPost[]> {
  const post: FastApiPost[] = await fastApiGetRequest(`/posts/user/${userId}`);
  return post;
}

export async function createPost(isPublic: boolean, postItems: string[]) {
  const post: FastApiPostCreate = {
    public: isPublic,
    post_texts: postItems,
  };

  const result = await fastApiPostJSONRequest("/posts/user/me", post);
  return Response.json(result);
}

export async function updatePost(
  isPublic: boolean,
  postItems: string[],
  postId: number
) {
  const post: FastApiPostCreate = {
    public: isPublic,
    post_texts: postItems,
  };

  const status = await fastApiPutJSONRequest(`/posts/update/${postId}`, post);
  if (status == 200) {
    return { detail: "success" };
  } else if (status == 404) {
    return { detail: "post not found" };
  }
}
