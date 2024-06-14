import { redirect } from "next/navigation";
import { auth } from "@/app/auth";
import { headers } from "next/headers";
const fastApiUrl = process.env.FASTAPI_URL;

export async function fastApiGet(apiRequest: string) {
  // This function is a general GET for FASTAPI url
  const session = await auth();

  if (session == null || !session?.user) redirect("/");

  const result = await fetch(fastApiUrl + apiRequest, {
    method: "GET",
    headers: headers(),
  })
    .then(function (res: Response) {
      if (!res.ok) {
        throw new Error("Failed GET request to api: " + apiRequest);
      }
      return res.json();
    })
    .then(function (data) {
      return { message: data };
    });
  return result;
}
