import { hasSession } from "@/lib/auth";
import { HomeProvider } from "@/components/home-context";
import { HomeLayout } from "@/components/home-layout";
import { PanelHeader } from "@/components/panel-header";
import { DashboardHeader } from "@/components/dashboard-header";
import { UserDropdown } from "@/components/user-dropdown";
import { headers } from "next/headers";

export default async function ProjectsPage() {
  const session = await hasSession();
  const headersList = await headers();
  const pathname = headersList.get("x-request-path") || "/projects";

  return (
    <HomeProvider>
      <HomeLayout
        pathname={pathname}
        showChatInput={false}
        panelHeader={<PanelHeader title="Projects" />}
        header={
          <DashboardHeader>
            <UserDropdown user={session.user} />
          </DashboardHeader>
        }
      >
        <div className="w-full h-full p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* Project cards will go here */}
          </div>
        </div>
      </HomeLayout>
    </HomeProvider>
  );
}
