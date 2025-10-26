import { AppHeader } from "@/components/app-header";
import { UserDropdown } from "@/components/user-dropdown";
import { Button } from "@/components/ui/button";
import type { User } from "@/lib/auth";

type DashboardHeaderProps = {
  user: User;
};

export const DashboardHeader = (props: DashboardHeaderProps) => {
  return (
    <AppHeader>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon-sm" className="bg-white">
          <svg
            className="size-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </Button>
        <span className="text-sm font-medium">Logo</span>
      </div>
      <UserDropdown user={props.user} />
    </AppHeader>
  );
};
