import { ExampleCard } from "./example-card";
import { CreateTaskCard } from "./create-task-card";
import { ConnectCalendarCard } from "./connect-calendar-card";
import { BrowseAgentsCard } from "./browse-agents-card";
import { UploadFileCard } from "./upload-file-card";

export const ExampleCards = () => {
  const examples = [
    {
      title: "Explore use cases",
      description: "See what's possible.",
    },
    {
      title: "Customize projects",
      description: "Find one and make it yours.",
    },
  ];

  return (
    <>
      <CreateTaskCard />
      <ConnectCalendarCard />
      <BrowseAgentsCard />
      <UploadFileCard />
      {examples.map((example, i) => (
        <ExampleCard key={i} title={example.title} description={example.description}>
          <span className="text-4xl font-bold text-muted-foreground">{i + 5}</span>
        </ExampleCard>
      ))}
    </>
  );
};
