"use server";

export async function getPost(id: number) {
  const res = await fetch(`http://localhost:3000/api/posts/user/me/${id}`, {
    method: "GET",
  });
  const result = await Response.json(res);
  return result;
}
