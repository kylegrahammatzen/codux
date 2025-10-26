import { hasSession } from "@/lib/auth";

export default async function Home() {
  const session = await hasSession();

  return (
    <h1>Hello @{session.user.username}</h1>
  );
}
