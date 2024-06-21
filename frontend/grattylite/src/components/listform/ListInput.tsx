"use client";
import { useState } from "react";
interface ListInputProps {
  addItemFunction: Function;
}

function onAddItem(addFunc: Function, setErrorMessage: Function) {
  const element: HTMLElement | null = document.getElementById("item-add-text");
  if (!(element instanceof HTMLInputElement)) return;
  const value: string = element.value;
  const resultMsg = addFunc(value);
  if (resultMsg != "success") setErrorMessage(resultMsg);
  element.value = "";
  return;
}

export default function ListInput({ addItemFunction }: ListInputProps) {
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <>
      {errorMessage.length > 0 ? (
        <p className="text-error">{errorMessage}</p>
      ) : null}
      <div className="join join-horizontal">
        <input
          className="input-bordered join-item px-2"
          id="item-add-text"
          placeholder="..."
          onClick={() => {
            setErrorMessage("");
          }}
        />
        <button
          className="btn join-item"
          onClick={() => {
            onAddItem(addItemFunction, setErrorMessage);
          }}
        >
          add
        </button>
      </div>
    </>
  );
}
