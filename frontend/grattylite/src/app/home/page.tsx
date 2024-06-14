import { fastApiGet } from "../actions";
async function getUsername() {
  const result = await fastApiGet("/users/me");

  return result.message.id;
}
export default function HomePage() {
  const result = getUsername();
  return (
    <main>
      <p>{result}</p>
    </main>
  );
}
