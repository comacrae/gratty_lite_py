"use client";
interface DeleteButtonProps {
  deleteKey: string;
  onClick: Function;
}
export function DeleteButton({ deleteKey, onClick }: DeleteButtonProps) {
  return (
    <button
      className="btn join-item"
      onClick={() => {
        onClick(deleteKey);
      }}
    >
      delete
    </button>
  );
}
