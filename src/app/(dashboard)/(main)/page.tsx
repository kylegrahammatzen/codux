import { hasSession } from "@/lib/auth";
import { PanelHeader } from "@/components/panel-header";
import { HomeGreeting } from "@/components/home/greeting";
import { ChatInput } from "@/components/chat/input";
import { CreateTaskCard } from "@/components/home/examples/create-task-card";
import { ConnectCalendarCard } from "@/components/home/examples/connect-calendar-card";
import { BrowseAgentsCard } from "@/components/home/examples/browse-agents-card";
import { UploadFileCard } from "@/components/home/examples/upload-file-card";
import { ExploreUseCasesCard } from "@/components/home/examples/explore-use-cases-card";
import { ManageProjectsCard } from "@/components/home/examples/customize-projects-card";

export default async function Home() {
  const session = await hasSession();
  const firstName = session.user.name?.split(' ')[0];

  return (
    <>
      <PanelHeader />
      <div className="flex-1 flex flex-col min-h-0 overflow-y-auto items-center justify-center">
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
      </div>
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-0 pb-4">
        <ChatInput />
      </div>
    </>
  );
}
