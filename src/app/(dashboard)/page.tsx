import { hasSession } from "@/lib/auth";
import { HomeProvider } from "@/components/home-context";
import { HomeLayout } from "@/components/home-layout";
import { DashboardHeader } from "@/components/dashboard-header";
import { headers } from "next/headers";
import { CreateTaskCard } from "@/components/home/examples/create-task-card";
import { ConnectCalendarCard } from "@/components/home/examples/connect-calendar-card";
import { BrowseAgentsCard } from "@/components/home/examples/browse-agents-card";
import { UploadFileCard } from "@/components/home/examples/upload-file-card";
import { ExploreUseCasesCard } from "@/components/home/examples/explore-use-cases-card";
import { CustomizeProjectsCard } from "@/components/home/examples/customize-projects-card";

export default async function Home() {
  const session = await hasSession();
  const headersList = await headers();
  const pathname = headersList.get("x-request-path") || "/";

  const firstName = session.user.name?.split(' ')[0];

  return (
    <HomeProvider>
      <HomeLayout
        pathname={pathname}
        firstName={firstName}
        header={<DashboardHeader user={session.user} />}
      >
        <CreateTaskCard />
        <ConnectCalendarCard />
        <BrowseAgentsCard />
        <UploadFileCard />
        <ExploreUseCasesCard />
        <CustomizeProjectsCard />
      </HomeLayout>
    </HomeProvider>
  );
}
