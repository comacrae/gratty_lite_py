import Link from "next/link";
import { getFastApiCurrentUserInfo } from "../_actions/users";

async function FollowList({ userList }: { userList: Object[] }) {
  return;
}
export default async function ProfilePage() {
  const result = await getFastApiCurrentUserInfo();
  if (!result) throw new Error("Can't get user");
  return (
    <main>
      <h1>{result.email}</h1>
      <h1>Number of posts: {result.num_posts}</h1>
    </main>
  );
}
