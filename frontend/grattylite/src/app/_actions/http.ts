import { redirect } from "next/navigation";
import { auth } from "@/app/auth";
import { headers } from "next/headers";
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

async function getJSONHeader() {
  const oldHeaders = await headers();
  const newHeader: {
    [key: string]: any;
  } = { "Content-Type": "application/json" };

  [...oldHeaders.entries()].reduce((o, [k, v]) => {
    newHeader[k] = v;
    return o;
  });
  return newHeader;
}

export async function fastApiPostJSONRequest(
  apiRequest: string,
  jsonBody: any
) {
  // This function is a general GET for FASTAPI url
  const session = await auth();
  if (session == null || !session?.user) redirect("/home?login-success=false");
  const header = await getJSONHeader();

  const result = await fetch(fastApiUrl + apiRequest, {
    method: "POST",
    headers: header,
    body: JSON.stringify(jsonBody),
  }).then(function (res: Response) {
    if (!res.ok) {
      throw new Error("Failed POST request to api: " + apiRequest);
    }
    return res.json();
  });
  return result;
}

export async function fastApiPutJSONRequest(apiRequest: string, jsonBody: any) {
  // This function is a general GET for FASTAPI url
  const session = await auth();
  if (session == null || !session?.user) redirect("/home?login-success=false");
  const header = await getJSONHeader();

  const result = await fetch(fastApiUrl + apiRequest, {
    method: "PUT",
    headers: header,
    body: JSON.stringify(jsonBody),
  }).then(function (res: Response) {
    if (!res.ok) {
      throw new Error("Failed POST request to api: " + apiRequest);
    }
    return res.json();
  });
  return result;
}
