"use server";
import { createPost } from "@/app/_actions/posts";
import { isFastApiPost } from "@/app/_actions/util";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import { z } from "zod";

export async function attemptCreatePost(formData: FormData) {
  const stringSchema = z.array(z.string());
  const postItems: string[] = stringSchema.parse(formData.getAll("text"));
  const isPublic: boolean = formData.get("post-type-switch") == "on";
  try {
    const result = await createPost(isPublic, postItems);
    if (isFastApiPost(result)) {
      redirect(`/posts/me/${result.id}`, RedirectType.replace);
    }
  } catch {
    throw new Error("Unable to create post");
  }
}
