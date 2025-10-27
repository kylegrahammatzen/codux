import { ExampleCard } from "./example-card";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText } from "lucide-react";

export const UploadFileCard = () => {
  return (
    <ExampleCard title="Upload your first file" description="Drop in a doc.">
      <div className="w-full bg-card p-2 rounded-sm">
        <div className="flex flex-col gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-start gap-2">
              <FileText className="self-center size-4 text-muted-foreground shrink-0" fill="currentColor" />
              <div className="flex-1 flex justify-between items-start gap-2">
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-2 w-16 bg-foreground/30 dark:bg-foreground/50 animate-pulse [animation-play-state:paused] group-hover:[animation-play-state:running]" />
                  <Skeleton className="h-2 w-12 animate-pulse [animation-play-state:paused] group-hover:[animation-play-state:running]" />
                </div>
                <Skeleton className="h-2 w-8 bg-muted-foreground/40 dark:bg-muted-foreground/60 animate-pulse [animation-play-state:paused] group-hover:[animation-play-state:running]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </ExampleCard>
  );
};
