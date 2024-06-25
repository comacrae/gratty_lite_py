"use client";
import { useState } from "react";
import { attemptCreatePost } from "./actions";
import {
  ListItems,
  SubmitButton,
  CreateItemButton,
  PostPublicToggle,
} from "./ListFormComponents";

export function AddForm({ initialItems }: { initialItems: string[] }) {
  const [postsState, setPostsState] = useState({ items: initialItems });
  return (
    <div className="flex flex-col items-center gap-2">
      <CreateItemButton initialState={postsState} setState={setPostsState} />
      <form action={attemptCreatePost}>
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
