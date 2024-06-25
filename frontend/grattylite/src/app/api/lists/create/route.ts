import { createPost } from "@/app/_actions/posts";

async function createPostFromJSON(req: Request) {
  const postRequestBody = await req.json();
  const response = createPost(
    postRequestBody.public,
    postRequestBody.post_texts
  );
  return Response.json(response);
}

export { createPostFromJSON as POST };
