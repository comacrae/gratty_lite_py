import { auth } from "@/app/auth";
import {
  followUser,
  unfollowUser,
  getCurrentUserFollowers,
  getCurrentUserFollowing,
} from "../_actions/subscriptions";

async function test() {
  const result = getCurrentUserFollowers();
  return Response.json(result);
}

export { test as GET };
