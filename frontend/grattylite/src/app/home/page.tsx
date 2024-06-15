"use server";
import { fastApiGet } from "../actions";
import { FastApiUser } from "../types";
export default async function HomePage() {
  return (
    <main>
      <p>{user && user.email}</p>
    </main>
  );
}
