import {
  FastApiPost,
  FastApiPostItem,
  FastApiStatusResponse,
} from "@/app/types";
import { getCurrentUserPostById } from "@/app/_actions/posts";

function isFastApiPost(obj: any): obj is FastApiPost {
  return obj && typeof obj.owner_id === "number";
}

function convertFastApiDate(timeCreated: string) {
  const date = new Date(Date.parse(timeCreated));
  return {
    date: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
}

function getFastApiPostItems(postItems: FastApiPostItem[]) {
  const numItems = postItems.length;
  return postItems.map((item, index) => {
    return (
      <div className="flex items-center flex-col" key={item.id + index}>
        <p className="text-center">{item.text}</p>
        {index < numItems - 1 ? (
          <div className="w-6 h-1 border-t mt-1"></div>
        ) : null}
      </div>
    );
  });
}

export default async function Page({ params }: { params: { id: number } }) {
  const result = await getCurrentUserPostById(params?.id);
  if (isFastApiPost(result)) {
    return (
      <main>
        <div className="grid grid-col-1">
          {getFastApiPostItems(result.items)}
        </div>
      </main>
    );
  } else {
    return (
      <main>
        <p>Invalid ID</p>
      </main>
    );
  }
}
