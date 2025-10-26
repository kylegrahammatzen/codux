import { hasSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-layout";

type UserProfilePageProps = {
  params: Promise<{
    username: string;
  }>;
};

export default async function UserProfilePage(props: UserProfilePageProps) {
  const session = await hasSession();

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
    redirect(`/@${session.user.username}`);
  }

  const profileUser = userData[0];
  const isOwnProfile = session.user.id === profileUser.id;

  return (
    <DashboardLayout user={session.user}>
      <div>
        <h1>@{profileUser.displayUsername}</h1>
        <p>{profileUser.name}</p>
        <p>{isOwnProfile ? "This is your profile" : "Viewing another user's profile"}</p>
      </div>
    </DashboardLayout>
  );
}
