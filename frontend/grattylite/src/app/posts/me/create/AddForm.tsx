"use client";
import { useState } from "react";
import { createPost } from "./actions";
import {
  ListItems,
  SubmitButton,
  CreateItemButton,
  PostPublicToggle,
} from "./ListFormComponents";

export function AddForm() {
  const [postsState, setPostsState] = useState({ items: ["fuck"] });
  return (
    <div className="flex flex-col items-center gap-2">
      <CreateItemButton initialState={postsState} setState={setPostsState} />
      <form action={createPost}>
        <ListItems items={postsState.items} setState={setPostsState} />
        <PostPublicToggle />
        <SubmitButton />
      </form>
    </div>
  );
}
