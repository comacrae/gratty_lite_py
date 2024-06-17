import { redirect } from "next/navigation";
import { auth } from "@/app/auth";
import { headers } from "next/headers";
import { FastApiStatusResponse } from "../types";
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

  const res = await fetch(fastApiUrl + apiRequest, {
    method: "PUT",
    headers: header,
    body: JSON.stringify(jsonBody),
  });
  return res.status;
}

export async function fastApiDeleteRequest(apiRequest: string) {
  // This function is a general GET for FASTAPI url
  const session = await auth();
  if (session == null || !session?.user) redirect("/home?login-success=false");

  const res = await fetch(fastApiUrl + apiRequest, {
    method: "DELETE",
    headers: headers(),
  });
  return res.status;
}

function fastApiStatusToDetail(httpStatus: number) {
  switch (httpStatus) {
    case 200:
      return "success";
    case 404:
      return "not found";
    default:
      return "other";
  }
}

export function getFastApiStatusObject(
  httpStatus: number
): FastApiStatusResponse {
  const fastApiRes: FastApiStatusResponse = {
    status: httpStatus,
    success: httpStatus == 200,
    detail: fastApiStatusToDetail(httpStatus),
  };
  return fastApiRes;
}
