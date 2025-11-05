"use client";

import { usePathname } from "next/navigation";
import { useSession } from "@/providers/session-provider";
import { MainProvider } from "@/providers/main-provider";
import { MainLayout } from "@/components/main-layout";
import { HomePanel } from "@/components/home/panel";
import { DashboardHeader } from "@/components/dashboard-header";
import { UserDropdown } from "@/components/user-dropdown";

type ProjectsLayoutProps = {
  children: React.ReactNode;
};

export default function ProjectsLayout(props: ProjectsLayoutProps) {
  const pathname = usePathname();
  const session = useSession();

  return (
    <MainProvider>
      <MainLayout
        pathname={pathname}
        user={session.user}
        header={
          <DashboardHeader>
            <UserDropdown user={session.user} />
          </DashboardHeader>
        }
      >
        <HomePanel>
          {props.children}
        </HomePanel>
      </MainLayout>
    </MainProvider>
  );
}
