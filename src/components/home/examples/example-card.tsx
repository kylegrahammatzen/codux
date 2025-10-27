import { Card } from "@/components/ui/card";

type ExampleCardProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
};

export const ExampleCard = (props: ExampleCardProps) => {
  return (
    <Card className="group h-52 bg-accent/20 border-border/30 hover:border-border flex flex-col p-4 overflow-hidden relative cursor-pointer transition-colors">
      {props.children && (
        <div className="flex-1 flex items-start min-h-0 select-none">
          {props.children}
        </div>
      )}
      <div className="flex flex-col gap-1 relative z-10">
        <h3 className="text-sm font-medium text-foreground">{props.title}</h3>
        <p className="text-xs text-muted-foreground">{props.description}</p>
      </div>
    </Card>
  );
};
