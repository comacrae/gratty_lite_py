"use server";
import { getCurrentUserPostByPostId } from "@/app/_actions/posts";
import {
  isFastApiPost,
  convertFastApiPostItemsToStrings,
} from "@/app/_actions/util";
import { EditForm } from "./EditForm";

export default async function EditPage({ params }: { params: { id: number } }) {
  const results = await getCurrentUserPostByPostId(params.id);
  if (isFastApiPost(results)) {
    return (
      <EditForm
        initialItems={convertFastApiPostItemsToStrings(results.items)}
        id={params.id}
      />
    );
  }
  return <main>Invalid</main>;
}
