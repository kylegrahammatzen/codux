import { DashboardHeader } from "@/components/dashboard-header";
import type { User } from "@/lib/auth";

type DashboardLayoutProps = {
  user: User;
  children: React.ReactNode;
};

export const DashboardLayout = (props: DashboardLayoutProps) => {
  return (
    <div className="flex flex-col h-full gap-2 p-2">
      <DashboardHeader user={props.user} />
      {props.children}
    </div>
  );
};
