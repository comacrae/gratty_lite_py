import { auth } from "@/app/auth";
import { fastApiPostJSONRequest } from "../_actions/http";
import { FastApiPostCreate } from "../types";

async function test() {
  const session = await auth();
  const testPost: FastApiPostCreate = {
    public: false,
    post_texts: ["csrftest", "csrftest2"],
  };

  const result = await fastApiPostJSONRequest("/posts/user/me", testPost);
  return Response.json(result);
}

export { test as GET };
