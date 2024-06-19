"use client";
import { useState } from "react";
import { FastApiPostCreate } from "@/app/types";
import ListItems from "./ListItems";
import ListInput from "./ListInput";
import SubmitButton from "./SubmitButton";
import PostPublicToggle from "./PostPublicToggle";

const initialList: FastApiPostCreate = {
  public: false,
  post_texts: ["a", "b", "c"],
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
    if (value.length == 0) return;
    const newTexts = list.post_texts;
    newTexts.push(value);
    setList({ ...list, post_texts: newTexts });
  }

  function togglePublic(isPublic: boolean) {
    setList({ ...list, public: isPublic });
  }

  function submitListFunction() {
    console.log(list);
  }

  const [list, setList] = useState(initialList);
  return (
    <>
      <ListItems items={list.post_texts} deleteCallback={deleteCallback} />
      <ListInput addItemFunction={addItemFunction} />
      <SubmitButton onClickFunction={submitListFunction} />
      <PostPublicToggle onClickFunction={togglePublic} />
    </>
  );
}
