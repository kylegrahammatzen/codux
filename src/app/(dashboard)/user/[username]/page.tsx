import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { UserProfileContent } from "./user-profile-content";

type UserProfilePageProps = {
  params: Promise<{
    username: string;
  }>;
};

export default async function UserProfilePage(props: UserProfilePageProps) {
  const params = await props.params;
  const username = params.username;

  const userData = await db
    .select({
      id: user.id,
      name: user.name,
      username: user.username,
      displayUsername: user.displayUsername,
      image: user.image,
      createdAt: user.createdAt,
    })
    .from(user)
    .where(eq(user.username, username))
    .limit(1);

  if (!userData[0]) {
    redirect("/");
  }

  return <UserProfileContent profileUser={userData[0]} />;
}
