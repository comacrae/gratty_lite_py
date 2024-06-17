import { auth } from "@/app/auth";
import { deletePost } from "../_actions/posts";

async function test() {
  const session = await auth();

  const result = await deletePost(3);
  return Response.json(result);
}

export { test as GET };
