"use client";
import { useFormStatus } from "react-dom";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
export function ListItem({ text, idx }: { text: string; idx: number }) {
  return (
    <div className="join join-horizontal flex justify-end">
      <input
        type="text"
        name="text"
        id={text + idx}
        className="join-item flex flex-row items-center border border-x-0 border-s px-2"
        value={text}
        readOnly
      />
      <button
        id={text + idx + "btn"}
        className="btn btn-outline btn-sm join-item px-0 hover:bg-warning"
        onClick={() => {
          const input = document.getElementById(text + idx);
          const btn = document.getElementById(text + idx + "btn");
          input?.remove();
          btn?.remove();
          return;
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
        return <ListItem text={value} idx={idx} key={idx + value} />;
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
