"use client";

import { usePathname } from "next/navigation";
import { MainProvider } from "@/components/main-context";
import { MainLayout } from "@/components/main-layout";
import { HomePanel } from "@/components/home/panel";
import { DashboardHeader } from "@/components/dashboard-header";
import { UserDropdown } from "@/components/user-dropdown";
import { useSession } from "@/components/session-provider";

export default function HomeLayout(props: { children: React.ReactNode }) {
  const pathname = usePathname();
  const session = useSession();

  return (
    <MainProvider>
      <MainLayout
        pathname={pathname}
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
