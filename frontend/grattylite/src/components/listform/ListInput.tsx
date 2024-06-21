"use client";
import { PlusIcon } from "@heroicons/react/24/outline";
interface ListInputProps {
  addItemFunction: Function;
  setErrorMessageFunction: Function;
}

function onAddItem(addFunc: Function) {
  const element: HTMLElement | null = document.getElementById("item-add-text");
  if (!(element instanceof HTMLInputElement)) return;
  const value: string = element.value;
  addFunc(value);
  element.value = "";
  return;
}

export default function ListInput({
  addItemFunction,
  setErrorMessageFunction,
}: ListInputProps) {
  return (
    <div className="join join-horizontal">
      <input
        className="input-bordered join-item px-2"
        id="item-add-text"
        placeholder="..."
        onClick={() => {
          setErrorMessageFunction("");
        }}
      />
      <button
        className="btn join-item hover:bg-success"
        onClick={() => {
          onAddItem(addItemFunction);
        }}
      >
        <PlusIcon className="size-4" />
      </button>
    </div>
  );
}
