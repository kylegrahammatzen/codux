import { ExampleCard } from "./example-card";
import { ShieldCheck, Megaphone, File, ChartPie } from "lucide-react";
import { cn } from "@/lib/utils";

export const CustomizeProjectsCard = () => {
  const items = [
    { Icon: ShieldCheck, hasBg: true },
    { Icon: Megaphone, hasBg: false },
    { Icon: File, hasBg: false },
    { Icon: ChartPie, hasBg: true },
  ];

  return (
    <ExampleCard title="Customize projects" description="Find one and make it yours.">
      <div className="w-full grid grid-cols-2 gap-1">
        {items.map(({ Icon, hasBg }, i) => (
          <div key={i} className="h-14.5 bg-card rounded-sm flex items-center justify-center p-2">
            <div className={cn("w-full h-full border-2 border-dashed border-border rounded-sm flex items-center justify-center", hasBg && "group-hover:bg-foreground/10 dark:group-hover:bg-foreground/20 transition-colors")}>
              <Icon className="size-4 text-muted-foreground" strokeWidth={2} />
            </div>
          </div>
        ))}
      </div>
    </ExampleCard>
  );
};
