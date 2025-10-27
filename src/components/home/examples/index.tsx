import { ExampleCard } from "./example-card";
import { CreateTaskCard } from "./create-task-card";
import { ConnectCalendarCard } from "./connect-calendar-card";
import { BrowseAgentsCard } from "./browse-agents-card";

export const ExampleCards = () => {
  const examples = [
    {
      title: "Upload your first file",
      description: "Drop in a doc.",
    },
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
      {examples.map((example, i) => (
        <ExampleCard key={i} title={example.title} description={example.description}>
          <span className="text-4xl font-bold text-muted-foreground">{i + 4}</span>
        </ExampleCard>
      ))}
    </>
  );
};
