"use client";
import { FastApiPostItem } from "@/app/types";
import EditRedirectButton from "./EditRedirectButton";
import { useRouter } from "next/navigation";
import { convertFastApiDate, isFastApiPost } from "@/app/_actions/util";

function getFastApiPostItems(postItems: FastApiPostItem[]) {
  const router = useRouter();
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
  const res = await fetch(
    `http://localhost:3000/api/lists/get/me/${params.id}`,
    {
      method: "GET",
    }
  );
  const result = await res.json();
  if (isFastApiPost(result)) {
    const date = convertFastApiDate(result.time_created);
    return (
      <main>
        <h1 className="text-center">
          On
          <h2 className="inline font-bold m-x-2">{` ${date.month}/${date.day}/${date.year}`}</h2>
          , you were grateful for
        </h1>
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
    ); // need to display Error message if this occurs
  }
}
