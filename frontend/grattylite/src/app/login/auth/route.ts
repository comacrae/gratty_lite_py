export async function testLogin(request: Request) {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  const params = new URLSearchParams();

  if (typeof username === "string") params.append("username", username);
  if (typeof password === "string") params.append("password", password);
  fetch("http://127.0.0:8000/").then(function (res) {
    console.log(res);
  });
}
