import { auth } from "@/app/auth";
import { getPostByPostId } from "../_actions/posts";

async function test() {
  const session = await auth();

  const result = await getPostByPostId(33);
  return Response.json(result);
}

export { test as GET };
