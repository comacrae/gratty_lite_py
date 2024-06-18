"use server";
import Navbar from "./navbar";

export default async function Home() {
  return <body className="bg-transparent">{Navbar()}</body>;
}
