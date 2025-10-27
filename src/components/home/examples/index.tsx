import { CreateTaskCard } from "./create-task-card";
import { ConnectCalendarCard } from "./connect-calendar-card";
import { BrowseAgentsCard } from "./browse-agents-card";
import { UploadFileCard } from "./upload-file-card";
import { ExploreUseCasesCard } from "./explore-use-cases-card";
import { CustomizeProjectsCard } from "./customize-projects-card";

export const ExampleCards = () => {
  return (
    <>
      <CreateTaskCard />
      <ConnectCalendarCard />
      <BrowseAgentsCard />
      <UploadFileCard />
      <ExploreUseCasesCard />
      <CustomizeProjectsCard />
    </>
  );
};
