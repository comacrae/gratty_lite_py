import { redirect } from "next/navigation";
import { auth } from "@/app/auth";

export async function GET() {
  redirect("/");
}
