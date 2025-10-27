import { AppHeader } from "@/components/app-header";
import { UserDropdown } from "@/components/user-dropdown";
import type { User } from "@/lib/auth";
import Link from "next/link";

type DashboardHeaderProps = {
  user: User;
};

export const DashboardHeader = (props: DashboardHeaderProps) => {
  return (
    <AppHeader>
      <Link href="/">
        <span className="text-sm font-medium">Logo</span>
      </Link>
      <UserDropdown user={props.user} />
    </AppHeader>
  );
};
