import { ExampleCard } from "./example-card";

export const ExampleCards = () => {
  const examples = [
    {
      title: "Create new task",
      description: "Start something new.",
    },
    {
      title: "Connect calendar",
      description: "Sync your schedule.",
    },
    {
      title: "Browse available agents",
      description: "See what agents can do.",
    },
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
      {examples.map((example, i) => (
        <ExampleCard key={i} title={example.title} description={example.description}>
          <span className="text-4xl font-bold text-muted-foreground">{i + 1}</span>
        </ExampleCard>
      ))}
    </>
  );
};
