//import { createPost } from "@/app/_actions/posts";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  console.log(formData.getAll());
}
