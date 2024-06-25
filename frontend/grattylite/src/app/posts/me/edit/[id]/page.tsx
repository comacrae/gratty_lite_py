"use client";

import ListForm from "@/components/listform/ListForm";
import { FastApiPost, FastApiPostCreate, FastApiPostItem } from "@/app/types";
import { getCurrentUserPostByPostId } from "@/app/_actions/posts";
import {
  isFastApiPost,
  convertFastApiPostItemsToStrings,
} from "@/app/_actions/util";
import { useRouter } from "next/navigation";

export default async function Page({ params }: { params: { id: number } }) {
  const list = await getCurrentUserPostByPostId(params.id);
  const router = useRouter();
  if (isFastApiPost(list) && params.id != null) {
    const initList: FastApiPostCreate = {
      public: list.public,
      post_texts: convertFastApiPostItemsToStrings(list.items),
    };
    return (
      <main>
        <ListForm
          initialList={initList}
          updatePostId={params.id}
          router={router}
        ></ListForm>
      </main>
    );
  }
}
