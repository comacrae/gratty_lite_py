import { redirect } from "next/navigation";
import { auth } from "@/app/auth";
import { headers, cookies } from "next/headers";
import { JsonObject } from "next-auth/adapters";
const fastApiUrl = process.env.FASTAPI_URL;

// TODO: More comprehensive error messages
export async function fastApiGetRequest(apiRequest: string) {
  // This function is a general GET for FASTAPI url
  const session = await auth();

  if (session == null || !session?.user) redirect("/home?login-success=false");

  const result = await fetch(fastApiUrl + apiRequest, {
    method: "GET",
    headers: headers(),
  }).then(function (res: Response) {
    return res.json(); // need to handle error codes more elegantly
  });
  return result;
}

export async function fastApiPostJSONRequest(
  apiRequest: string,
  jsonBody: any
) {
  // This function is a general GET for FASTAPI url
  const session = await auth();
  if (session == null || !session?.user) redirect("/home?login-success=false");

  const newHeader: {
    [key: string]: any;
  } = { "Content-Type": "application/json" };
  [...headers().entries()].reduce((o, [k, v]) => {
    newHeader[k] = v;
    return o;
  });
  const result = await fetch(fastApiUrl + apiRequest, {
    method: "POST",
    headers: newHeader,
    body: JSON.stringify(jsonBody),
  }).then(function (res: Response) {
    if (!res.ok) {
      throw new Error("Failed POST request to api: " + apiRequest);
    }
    return res.json();
  });
  return result;
}
