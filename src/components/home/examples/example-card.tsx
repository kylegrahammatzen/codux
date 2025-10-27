import { Card } from "@/components/ui/card";

type ExampleCardProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
};

export const ExampleCard = (props: ExampleCardProps) => {
  return (
    <Card className="h-40 bg-accent/20 border-border/30 flex flex-col p-4">
      <div className="flex-1 flex items-center justify-center">
        {props.children}
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-medium text-foreground">{props.title}</h3>
        <p className="text-xs text-muted-foreground">{props.description}</p>
      </div>
    </Card>
  );
};
