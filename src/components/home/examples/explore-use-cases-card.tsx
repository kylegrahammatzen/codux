import { ExampleCard } from "./example-card";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, ChartPie } from "lucide-react";
import { cn } from "@/lib/utils";

export const ExploreUseCasesCard = () => {
  const cards = [
    {
      Icon: FileText,
      showIcon: true,
      className: "absolute -rotate-5 -translate-x-12 md:-translate-x-10 translate-y-0.25 z-0 rounded-r-2xl md:rounded-r-4xl",
    },
    {
      Icon: ChartPie,
      showIcon: true,
      className: "relative z-10",
    },
    {
      Icon: FileText,
      showIcon: false,
      className: "absolute rotate-5 translate-x-12 md:translate-x-10 translate-y-0.25 z-0 rounded-l-2xl md:rounded-l-4xl",
    },
  ];

  return (
    <ExampleCard title="Explore use cases" description="See what's possible.">
      <div className="w-full h-full flex items-center justify-center relative">
        {cards.map((card, i) => (
          <div
            key={i}
            className={cn("w-28 h-36 md:w-24 md:h-30 bg-card border border-border/50 rounded-sm p-2 flex flex-col", card.className)}
          >
            <div className="flex flex-col gap-2">
              <card.Icon className={cn("size-3 text-muted-foreground", !card.showIcon && "invisible")} />
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-1 w-6 bg-foreground/30 dark:bg-foreground/50" />
                  <Skeleton className="h-1 w-4" />
                </div>
                <Skeleton className="h-1 w-3 bg-muted-foreground/40 dark:bg-muted-foreground/60" />
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <Skeleton className="h-8 w-full rounded-sm bg-foreground/20 dark:bg-foreground/40" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-1 w-4 bg-muted-foreground/30 dark:bg-muted-foreground/50" />
              <Skeleton className="h-1 w-8 bg-muted-foreground/30 dark:bg-muted-foreground/50" />
            </div>
          </div>
        ))}
      </div>
    </ExampleCard>
  );
};
