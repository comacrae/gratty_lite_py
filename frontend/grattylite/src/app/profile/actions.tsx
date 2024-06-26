import { getFastApiCurrentUser } from "../_actions/users";
import { FastApiUser } from "../types";
export async function getUser() {
  try {
    const result = (await getFastApiCurrentUser()) as FastApiUser;
    return result;
  } catch {
    throw new Error("Can't get current user");
  }
}
