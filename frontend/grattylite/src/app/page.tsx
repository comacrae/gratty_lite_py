"use server";
import { config } from "@/app/auth";
import { SessionProvider } from "next-auth/react";
import Navbar from "./navbar";
import { Session } from "next-auth";

async function SessionInfo() {
  return "empty";
}

export default async function Home() {
  return (
    <main>
      {Navbar()}
      <div>{<SessionInfo />}</div>
    </main>
  );
}
