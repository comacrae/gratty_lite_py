import { NextRequest } from "next/server";
import { createPost } from "@/app/_actions/posts";

async function createPostFromJSON(req: Request) {
  const postRequestBody = await req.json();
  const result = await createPost(
    postRequestBody.public,
    postRequestBody.post_texts
  );
  return result;
}

export { createPostFromJSON as POST };
