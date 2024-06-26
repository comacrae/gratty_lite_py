"use client";
import { useState } from "react";
import { attemptUpdatePost } from "./actions";
import {
  ListItems,
  SubmitButton,
  CreateItemButton,
  PostPublicToggle,
} from "./ListFormComponents";

export function EditForm({
  initialItems,
  id,
}: {
  initialItems: string[];
  id: number;
}) {
  const [postsState, setPostsState] = useState({ items: initialItems });
  return (
    <div className="flex flex-col items-center gap-2">
      <CreateItemButton initialState={postsState} setState={setPostsState} />
      <form
        action={(formData: FormData) => {
          attemptUpdatePost(formData, id);
        }}
      >
        <ListItems
          items={postsState.items}
          initialState={postsState}
          setState={setPostsState}
        />
        <PostPublicToggle />
        <SubmitButton />
      </form>
    </div>
  );
}
