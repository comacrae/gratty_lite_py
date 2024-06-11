"use server";

export async function queryApi(previousState: any, formData: FormData) {
  const result = await fetch("http://127.0.0.1:8000/", {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    });
  return result;
}
