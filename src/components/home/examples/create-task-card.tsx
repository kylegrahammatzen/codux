import { ExampleCard } from "./example-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Check } from "lucide-react";

export const CreateTaskCard = () => {
  return (
    <ExampleCard title="Create new task" description="Start something new.">
      <div className="w-full flex flex-col gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2 bg-card p-2.25 rounded-sm">
            <div className="size-4 rounded-sm bg-accent shrink-0 flex items-center justify-center">
              <Check className="size-3 text-accent-foreground" />
            </div>
            <Skeleton className="h-2.5 flex-1" />
          </div>
        ))}
      </div>
    </ExampleCard>
  );
};
