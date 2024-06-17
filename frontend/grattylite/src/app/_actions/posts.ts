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

export async function createPost(
  isPublic: boolean,
  postItems: string[]
): Promise<FastApiPost> {
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
): Promise<FastApiStatusResponse> {
  const post: FastApiPostCreate = {
    public: isPublic,
    post_texts: postItems,
  };

  const status = await fastApiPutJSONRequest(`/posts/update/${postId}`, post);
  return getFastApiStatusObject(status);
}

export async function deletePost(postId: number) {
  const status = await fastApiDeleteRequest(`/posts/delete/${postId}`);
  return getFastApiStatusObject(status);
}
