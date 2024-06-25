"use server";
import { getCurrentUserPostByPostId } from "@/app/_actions/posts";
import { isFastApiPost } from "@/app/_actions/util";

export async function getPost(id: number) {
  const result = await getCurrentUserPostByPostId(id);
  if (isFastApiPost(result)) return result;
}
