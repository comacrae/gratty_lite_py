import { auth } from "@/app/auth";
import {
  getFastApiUserById,
  getFastApiCurrentUser,
  getFastApiCurrentUserId,
  getFastApiUsers,
} from "@/app/_actions/users";
async function test() {
  const session = await auth();

  const result = await getFastApiUsers();
  return Response.json(result);
}

export { test as GET };
