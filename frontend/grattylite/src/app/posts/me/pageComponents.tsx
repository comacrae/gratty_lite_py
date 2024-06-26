import { FastApiPost } from "@/app/types";
import { convertFastApiDate } from "@/app/_actions/util";
import Link from "next/link";

export async function FastApiPostList({ list }: { list: FastApiPost[] }) {
  return (
    <div className="grid grid-col-4 gap-2">
      {list.map((item, idx) => {
        const date = convertFastApiDate(item.time_created);
        return (
          <Link href={`/posts/me/${item.id}`} legacyBehavior passHref>
            <button className="btn" key={idx}>
              {`${date.month}/${date.day}/${date.year}`}
            </button>
          </Link>
        );
      })}
    </div>
  );
}
