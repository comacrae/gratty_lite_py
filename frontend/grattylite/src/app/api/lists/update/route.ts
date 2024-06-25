import { updatePost } from "@/app/_actions/posts";
import { FastApiPost, FastApiStatusResponse } from "@/app/types";

async function updatePostFromJSON(req: Request) {
  const postRequestBody = await req.json();
  const response = await updatePost(
    postRequestBody.public,
    postRequestBody.post_texts,
    postRequestBody.post_id
  );
  return Response.json(response);
}

export { updatePostFromJSON as POST };
