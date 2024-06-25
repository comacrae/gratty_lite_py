"use server";
import Link from "next/link";
interface ButtonProps {
  postId: number;
}
export async function EditRedirectButton({ postId }: ButtonProps) {
  return (
    <Link href={`/posts/me/edit/${postId}`} passHref legacyBehavior>
      <button className="btn btn-primary">Edit List</button>
    </Link>
  );
}
