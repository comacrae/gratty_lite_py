"use server";
import { updatePost } from "@/app/_actions/posts";
import { isFastApiPost } from "@/app/_actions/util";
import { redirect, RedirectType } from "next/navigation";
import { z } from "zod";
export async function attemptUpdatePost(formData: FormData, id: number) {
  const stringSchema = z.array(z.string());
  const postItems: string[] = stringSchema.parse(formData.getAll("text"));
  const isPublic: boolean = formData.get("post-type-switch") == "on";
  const result = await updatePost(isPublic, postItems, id);
  if (isFastApiPost(result)) {
    redirect(`/posts/me/${result.id}`, RedirectType.replace);
  }
}
