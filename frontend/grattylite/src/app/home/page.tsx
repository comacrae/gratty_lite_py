"use server";
import { fastApiGet } from "../actions";
import { FastApiUser } from "../types";
async function getFastApiUser(): Promise<FastApiUser> {
  const result = await fastApiGet("/users/me");
  const user: FastApiUser = result?.message;
  return user;
}
export default async function HomePage() {
  const user = await getFastApiUser();
  return (
    <main>
      <p>{user.email}</p>
    </main>
  );
}
