"use server";
import { AddForm } from "./AddForm";
export default async function CreatePage() {
  return (
    <main>
      <AddForm initialItems={[]} />
    </main>
  );
}
