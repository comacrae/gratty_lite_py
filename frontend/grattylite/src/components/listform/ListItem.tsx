"use client";
import { XMarkIcon } from "@heroicons/react/24/outline";
interface ListItemProps {
  text: string;
  deleteCallback: Function;
}

export default function ListItem({ text, deleteCallback }: ListItemProps) {
  return (
    <div className="join join-horizontal flex justify-end">
      <li className="join-item flex flex-row items-center border border-x-0 border-s px-2">
        {text}
      </li>
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
