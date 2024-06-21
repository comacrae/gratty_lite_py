"use client";
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
    if (validatePost(list.post_texts)) {
      const result = await fetch("http://localhost:3000/api/lists", {
        method: "POST",
        body: JSON.stringify(list),
      });
      if (result.ok) {
        console.log(result.json());
      }
      setErrorMessage("Error submitting post");
      //somehow redirect to a server component and attempt to post, then redirect to newest list view page
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
