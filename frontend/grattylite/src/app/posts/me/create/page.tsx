"use client";
import ListForm from "@/components/listform/ListForm";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <main>
      <ListForm
        initialList={{ public: false, post_texts: [] }}
        updatePostId={null}
        router={router}
      />
    </main>
  );
}
