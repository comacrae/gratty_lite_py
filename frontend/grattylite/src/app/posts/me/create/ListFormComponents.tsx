"use client";
import { useFormStatus } from "react-dom";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
export function ListItem({
  text,
  deleteCallback,
}: {
  text: string;
  deleteCallback: Function;
}) {
  return (
    <div className="join join-horizontal flex justify-end">
      <input
        type="text"
        name="text"
        className="join-item flex flex-row items-center border border-x-0 border-s px-2"
        value={text}
        readOnly
      />
      <button
        className="btn btn-outline btn-sm join-item px-0 hover:bg-warning"
        onClick={() => {
          deleteCallback(text);
        }}
      >
        <XMarkIcon className="size-4" />
      </button>
    </div>
  );
}

export function ListItems({
  items,
  setState,
}: {
  items: string[];
  setState: Function;
}) {
  return (
    <div className="grid grid-cols-1 gap-2">
      {items.map((value: string, idx: number) => {
        return (
          <ListItem
            text={value}
            deleteCallback={() => {
              let list = items;
              list.splice(list.indexOf(value), 1);
              setState({ items: list });
            }}
            key={idx + value}
          />
        );
      })}
    </div>
  );
}

export function SubmitButton() {
  const { pending, data } = useFormStatus();

  return (
    <button className="btn btn-primary" type="submit" aria-disabled={pending}>
      Submit
    </button>
  );
}

export function CreateItemButton({
  initialState,
  setState,
}: {
  initialState: any;
  setState: any;
}) {
  return (
    <form
      action={(formData: FormData) => {
        const input = formData.get("add-item");
        setState({ items: [...initialState.items, input] });
      }}
    >
      <input
        className="input input-bordered px-2"
        type="text"
        name="add-item"
        required
      />
      <button className="btn hover:btn-success" type="submit">
        Add Item
      </button>
    </form>
  );
}

export function PostPublicToggle() {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text px-2">Allow Public Access</span>
        <input
          type="checkbox"
          className="toggle toggle-info"
          id="post-type-switch"
        />
      </label>
    </div>
  );
}
