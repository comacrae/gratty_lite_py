import { auth } from "@/app/auth";
import { headers } from "next/headers";
async function test() {
  return fetch("http://127.0.0.1:8000/users/me", {
    headers: headers(),
  });
}

export { test as GET };
