import { auth } from "@/app/auth";
import { updatePost } from "../_actions/posts";
import { FastApiPostCreate } from "../types";

async function test() {
  const session = await auth();

  const result = await updatePost(true, ["jong", "jing"], 44);
  return Response.json(result);
}

export { test as GET };
