"use server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
interface ButtonProps {
  postId: number;
  //router: AppRouterInstance;
}
export default async function EditRedirectButton({ postId }: ButtonProps) {
  return (
    <Link href={`/posts/me/${postId}/edit`} passHref legacyBehavior>
      <button className="btn btn-primary">Edit List</button>
    </Link>
  );
}
