import { hasSession } from "@/lib/auth";
import { HomeProvider } from "@/components/home-context";
import { HomeLayout } from "@/components/home-layout";
import { HomePanel } from "@/components/home/panel";
import { HomeGreeting } from "@/components/home/greeting";
import { DashboardHeader } from "@/components/dashboard-header";
import { UserDropdown } from "@/components/user-dropdown";
import { headers } from "next/headers";
import { CreateTaskCard } from "@/components/home/examples/create-task-card";
import { ConnectCalendarCard } from "@/components/home/examples/connect-calendar-card";
import { BrowseAgentsCard } from "@/components/home/examples/browse-agents-card";
import { UploadFileCard } from "@/components/home/examples/upload-file-card";
import { ExploreUseCasesCard } from "@/components/home/examples/explore-use-cases-card";
import { ManageProjectsCard } from "@/components/home/examples/customize-projects-card";

export default async function Home() {
  const session = await hasSession();
  const headersList = await headers();
  const pathname = headersList.get("x-request-path") || "/";

  const firstName = session.user.name?.split(' ')[0];

  return (
    <HomeProvider>
      <HomeLayout
        pathname={pathname}
        header={
          <DashboardHeader>
            <UserDropdown user={session.user} />
          </DashboardHeader>
        }
      >
        <HomePanel showChatInput={true}>
          <div className="flex flex-col h-full md:h-auto w-full max-w-2xl mx-auto px-4 md:px-0 min-h-0">
            <HomeGreeting firstName={firstName} />
            <div className="flex-1 min-h-0 overflow-y-auto md:overflow-visible mb-8 md:mb-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <CreateTaskCard />
                <ConnectCalendarCard />
                <BrowseAgentsCard />
                <UploadFileCard />
                <ExploreUseCasesCard />
                <ManageProjectsCard />
              </div>
            </div>
          </div>
        </HomePanel>
      </HomeLayout>
    </HomeProvider>
  );
}
