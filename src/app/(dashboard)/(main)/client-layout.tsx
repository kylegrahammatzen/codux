"use client";

import { usePathname } from "next/navigation";
import { TamboProvider } from "@tambo-ai/react";
import { env } from "@/env";
import { MainProvider } from "@/providers/main-provider";
import { MainLayout } from "@/components/main-layout";
import { HomePanel } from "@/components/home/panel";
import { DashboardHeader } from "@/components/dashboard-header";
import { UserDropdown } from "@/components/user-dropdown";
import { useSession } from "@/providers/session-provider";

type ClientLayoutProps = {
  children: React.ReactNode;
  userToken?: string;
};

export const ClientLayout = (props: ClientLayoutProps) => {
  const pathname = usePathname();
  const session = useSession();

  return (
    <TamboProvider apiKey={env.NEXT_PUBLIC_TAMBO_API_KEY} userToken={props.userToken}>
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
    </TamboProvider>
  );
};
