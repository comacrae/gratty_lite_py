import { NextRequest, NextResponse } from "next/server";
const fastApiUrl = process.env.FASTAPI_KEY;
export async function GET(req: Request) {
  const api_url: string = req.url.split("api")[1];
  console.log(api_url);
  const result = await fetch(fastApiUrl + api_url, { method: "GET" })
    .then(function (res: Response) {
      if (!res.ok) {
        throw new Error("Failed GET request to api: " + api_url);
      }
      return res.json();
    })
    .then(function (data) {
      return { message: data };
    });
  return result;
}
