import { FastApiPost, FastApiStatusResponse } from "@/app/types";
import { getCurrentUserPostById } from "@/app/_actions/posts";

function isFastApiPost(obj: any): obj is FastApiPost {
  return obj && typeof obj.owner_id === "number";
}

export default async function Page({ params }: { params: { id: number } }) {
  const result = await getCurrentUserPostById(params?.id);
  console.log(result);
  let post: any = "invalid";
  if (isFastApiPost(result)) post = result.owner_id;
  return <main>{post}</main>;
}
