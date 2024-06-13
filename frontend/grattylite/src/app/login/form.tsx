"use client";
import { useFormStatus, useFormState } from "react-dom";

const initialState = { message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button className="btn" type="submit" aria-disabled={pending}>
      Login
    </button>
  );
}

export default function Form() {
  const [state, formAction] = useFormState(attemptLogin, initialState);
  return (
    <form action={formAction}>
      <label htmlFor="username">Username</label>
      <input type="text" id="username" name="username" />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" />
      <SubmitButton />
      <p>{state?.message}</p>
    </form>
  );
}
