"use server";
import { getCurrentUserPostByPostId } from "@/app/_actions/posts";
import {
  isFastApiPost,
  convertFastApiPostItemsToStrings,
} from "@/app/_actions/util";
import { AddForm } from "../../create/AddForm";

export default async function EditPage({ params }: { params: { id: number } }) {
  const results = await getCurrentUserPostByPostId(params.id);
  if (isFastApiPost(results)) {
    return (
      <AddForm initialItems={convertFastApiPostItemsToStrings(results.items)} />
    );
  }
  return <main>Invalid</main>;
}
