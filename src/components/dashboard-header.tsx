import { AppHeader } from "@/components/app-header";
import { UserDropdown } from "@/components/user-dropdown";
import type { User } from "@/lib/auth";

type DashboardHeaderProps = {
  user: User;
};

export const DashboardHeader = (props: DashboardHeaderProps) => {
  return (
    <AppHeader>
      <span className="text-sm font-medium">Logo</span>
      <UserDropdown user={props.user} />
    </AppHeader>
  );
};
