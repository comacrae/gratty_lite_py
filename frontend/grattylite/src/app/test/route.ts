"use server";
async function test() {
  return await fetch("http://127.0.0.1:8000/jwt", { method: "GET" });
}

export { test as GET };
