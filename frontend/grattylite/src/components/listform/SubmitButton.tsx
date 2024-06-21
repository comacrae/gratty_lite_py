"use client";
interface SubmitButtonProps {
  onClickFunction: Function;
  submitStatus: string;
}
export default function SubmitButton({
  onClickFunction,
  submitStatus,
}: SubmitButtonProps) {
  return (
    <button
      className="btn btn-primary"
      onClick={() => {
        onClickFunction();
      }}
    >
      {submitStatus === "submitting" ? "Submitting..." : "Submit"}
    </button>
  );
}
