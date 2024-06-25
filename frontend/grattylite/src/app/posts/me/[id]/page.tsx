import { getPost } from "./actions";
import { FastApiPostItems } from "./FastApiPostItems";
import { EditRedirectButton } from "./components";
export default async function ViewPage({ params }: { params: { id: number } }) {
  const result = await getPost(params.id);
  if (result?.items) {
    return (
      <main>
        <FastApiPostItems postItems={result?.items} />
        <EditRedirectButton postId={params.id} />
      </main>
    );
  }
  return <main>Invalid ID</main>;
}
