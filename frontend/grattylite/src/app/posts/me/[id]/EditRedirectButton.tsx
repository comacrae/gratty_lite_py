"use client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
interface ButtonProps {
  postId: number;
  router: AppRouterInstance;
}
export default function EditRedirectButton({ postId, router }: ButtonProps) {
  return (
    <button
      className="btn btn-primary"
      onClick={() => {
        router.push(`posts/me/edit/${postId}`);
      }}
    >
      Edit List
    </button>
  );
}
