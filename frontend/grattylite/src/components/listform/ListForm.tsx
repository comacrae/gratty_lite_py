"use client";
import { createPost } from "@/app/_actions/posts";
import { useState } from "react";
import { FastApiPostCreate } from "@/app/types";
import ListItems from "./ListItems";
import ListInput from "./ListInput";
import SubmitButton from "./SubmitButton";
import PostPublicToggle from "./PostPublicToggle";

const initialList: FastApiPostCreate = {
  public: false,
  post_texts: [],
};

export default function ListForm() {
  function deleteCallback(value: string) {
    let texts = list.post_texts;
    const idxToRemove = list.post_texts.indexOf(value);
    if (idxToRemove == -1) {
      return;
    }
    texts.splice(idxToRemove, 1);
    setList({ ...list, post_texts: texts });
  }

  function addItemFunction(value: string) {
    if (value.length == 0) return "Item cannot be empty";
    const newTexts = list.post_texts;
    for (const text of newTexts) {
      if (text === value) return "No duplicates allowed";
    }
    newTexts.push(value);
    setList({ ...list, post_texts: newTexts });
    return "success";
  }

  function togglePublic(isPublic: boolean) {
    setList({ ...list, public: isPublic });
  }

  function submitListFunction() {}

  // this function checks to make sure that there are no duplicates in the post listings
  function validatePost(post_texts: string[]) {
    if (post_texts.length == 0) return false;
    return true;
  }

  const [list, setList] = useState(initialList);
  const [error, setError] = useState("");
  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className="text-2xl">I'm grateful for </h1>
      <ListItems items={list.post_texts} deleteCallback={deleteCallback} />
      <ListInput addItemFunction={addItemFunction} />
      <PostPublicToggle onClickFunction={togglePublic} />
      <SubmitButton onClickFunction={submitListFunction} />
    </div>
  );
}
