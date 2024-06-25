"use client";
import { useState } from "react";
import { FastApiPostCreate, FastApiStatusResponse } from "@/app/types";
import ListItems from "./ListItems";
import ListInput from "./ListInput";
import SubmitButton from "./SubmitButton";
import PostPublicToggle from "./PostPublicToggle";
import { isFastApiPost } from "@/app/_actions/util";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface ListFormProps {
  initialList: FastApiPostCreate;
  updatePostId: number | null; // id of post to be updated
  router: AppRouterInstance;
}

export default function ListForm({
  initialList,
  updatePostId,
  router,
}: ListFormProps) {
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
    if (value.length == 0) {
      setErrorMessage("Entry cannot be empty");
      return;
    }
    const newTexts = list.post_texts;
    for (const text of newTexts) {
      if (text === value) {
        setErrorMessage("No duplicates allowed");
        return;
      }
    }
    newTexts.push(value);
    setList({ ...list, post_texts: newTexts });
    return;
  }

  function togglePublic(isPublic: boolean) {
    setList({ ...list, public: isPublic });
  }

  async function submitListFunction() {
    setSubmitStatus("submitting");
    const postAPIURL: string = updatePostId
      ? "/api/lists/update"
      : `/api/lists/create`;
    const postBody = updatePostId ? { ...list, post_id: updatePostId } : list;
    if (!validatePost(list.post_texts)) {
      setErrorMessage(`Error submitting post: Invalid post`);
      return;
    }

    const result = await fetch(postAPIURL, {
      method: "POST",
      body: JSON.stringify(postBody),
    });
    if (result.ok) {
      const data = await result.json();
      if (isFastApiPost(data)) {
        router.push(`/posts/me/${data.id}`);
        return;
      }
      const errorResponse: FastApiStatusResponse = data;
      setErrorMessage(`Error submitting post: ${errorResponse.detail}`);
    }

    setSubmitStatus("");
  }

  // this function checks to make sure that there are no duplicates in the post listings
  function validatePost(post_texts: string[]) {
    if (post_texts.length == 0) {
      setErrorMessage("Cannot be empty");
      return false;
    }
    return true;
  }

  const [list, setList] = useState(initialList);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState("");

  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className="text-2xl">I'm grateful for </h1>
      <ListItems items={list.post_texts} deleteCallback={deleteCallback} />

      {errorMessage.length > 0 ? (
        <p className="text-error">{errorMessage}</p>
      ) : null}

      <ListInput
        addItemFunction={addItemFunction}
        setErrorMessageFunction={setErrorMessage}
      />
      <PostPublicToggle onClickFunction={togglePublic} />
      <SubmitButton
        onClickFunction={submitListFunction}
        submitStatus={submitStatus}
      />
    </div>
  );
}
