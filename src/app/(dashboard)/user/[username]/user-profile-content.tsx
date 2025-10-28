"use client";

import { useSession } from "@/providers/session-provider";

type UserProfileContentProps = {
  profileUser: {
    id: string;
    name: string;
    username: string | null;
    displayUsername: string | null;
    image: string | null;
    createdAt: Date;
  };
};

export const UserProfileContent = (props: UserProfileContentProps) => {
  const session = useSession();
  const isOwnProfile = session.user.id === props.profileUser.id;

  return (
    <div className="p-4">
      <h1>@{props.profileUser.displayUsername}</h1>
      <p>{props.profileUser.name}</p>
      <p>{isOwnProfile ? "This is your profile" : "Viewing another user's profile"}</p>
    </div>
  );
};
