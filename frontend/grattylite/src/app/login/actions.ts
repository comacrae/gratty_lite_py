"use server";
import crypto from "crypto";

type AuthToken = {
  access_token: string;
  refresh_token: string;
};
import { cookies } from "next/headers";

export async function getSessionData() {
  const sessionData = cookies().get("token")?.value;
  if (!sessionData) return null;
  const token: AuthToken = JSON.parse(sessionData);
  return token;
}

export async function setSessionData(token: AuthToken) {
  const tokenStr: string = JSON.stringify(token);
  try {
    await cookies().set("token", tokenStr, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // One week
      path: "/",
    });
  } catch (e) {
    throw e;
  }
  return true;
  // Redirect or handle the response after setting the cookie
}

export async function attemptLogin(previousState: any, formData: FormData) {
  const username = formData.get("username")?.toString();
  const password = formData.get("username")?.toString();
  const params = new URLSearchParams();

  let token: AuthToken | null = await getSessionData();
  // check if logged in already
  if (token != null) return { message: "already logged in" };
  if (typeof username != "undefined" && username.length > 0) {
    // check that username is defined and not empty
    params.set("username", username);
  } else {
    throw Error("Username cannot be empty");
  }

  //check that password is defined and not empty
  if (typeof password != "undefined" && username.length > 0) {
    params.set("password", password);
  } else {
    throw Error("Password cannot be empty");
  }
  const result = await fetch(`http://127.0.0.1:8000/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  })
    .then((response) => {
      if (!response.ok) {
        throw Error("Issue trying to verify credentials");
      }
      return response.json();
    })
    .then(function (data) {
      const responseMsg = { message: "" };
      if ("access_token" in data) {
        let token: AuthToken = {
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        };
        setSessionData(token);
        responseMsg.message = "Set Token;Logged in";
      } else if ("detail" in data) {
        responseMsg.message = data.detail;
      } else {
        throw Error("Issue with auth API");
      }
      return responseMsg;
    });
  return result;
}
