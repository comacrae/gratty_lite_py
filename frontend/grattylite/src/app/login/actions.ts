"use server";

export async function attemptLogin(previousState: any, formData: FormData) {
  const username = formData.get("username")?.toString();
  const password = formData.get("username")?.toString();
  const params = new URLSearchParams();

  // check that username is defined and not empty
  if (typeof username != "undefined" && username.length > 0) {
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
        responseMsg.message = data.access_token;
      } else if ("detail" in data) {
        responseMsg.message = data.detail;
      } else {
        throw Error("Issue with auth API");
      }
      return responseMsg;
    });
  return result;
}
