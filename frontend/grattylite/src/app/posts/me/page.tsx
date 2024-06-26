"use server";
import { getCurrentUserPosts } from "@/app/_actions/posts";
import { FastApiPostList } from "./pageComponents";
import { isFastApiStatusResponse } from "@/app/_actions/util";
export default async function PostsPage() {
  const result = await getCurrentUserPosts();
  if (isFastApiStatusResponse(result)) {
    return <main>error</main>;
  }
  return (
    <main>
      <FastApiPostList list={result} />
    </main>
  );
}
