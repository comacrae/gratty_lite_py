"use client";
interface SubmitButtonProps {
  onClickFunction: Function;
}
export default function SubmitButton({ onClickFunction }: SubmitButtonProps) {
  return (
    <button
      className="btn btn-primary"
      onClick={() => {
        onClickFunction();
      }}
    >
      Submit
    </button>
  );
}
