"use server";
import { getCurrentUserPostByPostId } from "@/app/_actions/posts";
import { attemptDeletePost } from "./actions";
import {
  isFastApiPost,
  convertFastApiPostItemsToStrings,
} from "@/app/_actions/util";
import { EditForm } from "./EditForm";

export default async function EditPage({ params }: { params: { id: number } }) {
  const results = await getCurrentUserPostByPostId(params.id);
  if (isFastApiPost(results)) {
    return (
      <main>
        <EditForm
          initialItems={convertFastApiPostItemsToStrings(results.items)}
          id={params.id}
        />
      </main>
    );
  }
  return <main>Invalid</main>;
}
