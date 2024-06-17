import { auth } from "@/app/auth";
import { headers } from "next/headers";
import { fastApiPostRequest } from "../_actions/http";

async function test(crsfToken: string) {
  const session = await auth();
  const testPost = {
    owner_id: 1,
    public: false,
    post_texts: ["csrftest", "csrftest2"],
  };

  const result = await fastApiPostRequest("/posts/user/me", testPost);
  return Response.json(result);
}

export { test as GET };
