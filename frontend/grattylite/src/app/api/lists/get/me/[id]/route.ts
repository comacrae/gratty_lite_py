import { getCurrentUserPostByPostId } from "@/app/_actions/posts";

export async function GET({ params }: { params: { id: number } }) {
  const res = getCurrentUserPostByPostId(params.id);
  return Response.json(res);
}
