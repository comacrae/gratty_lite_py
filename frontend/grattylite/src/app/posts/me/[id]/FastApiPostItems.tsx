"use server";
import { FastApiPostItem } from "@/app/types";
interface FastApiPostItemProps {
  postItems: FastApiPostItem[];
}
export async function FastApiPostItems({ postItems }: FastApiPostItemProps) {
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
