import { ExampleCard } from "./example-card";
import { Skeleton } from "@/components/ui/skeleton";

export const ConnectCalendarCard = () => {
  const currentMonth = new Date().toLocaleString('en', { month: 'short' });
  const currentYear = new Date().getFullYear();

  // Define which days are filled (indices 0,1 for first two, and 15,16,17 for last three on desktop)
  const filledDays = [0, 1, 15, 16, 17];

  return (
    <ExampleCard title="Connect calendar" description="Sync your schedule.">
      <div className="w-full bg-card p-2 rounded-sm">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium text-foreground">{currentMonth}</span>
          <span className="text-xs font-medium text-muted-foreground/70">{currentYear}</span>
        </div>
        {/* Mobile: 12 squares (3 rows x 4 cols) */}
        <div className="grid md:hidden lg:grid grid-cols-4 lg:grid-cols-6 gap-y-1.5 gap-x-1.5 lg:gap-y-1 lg:gap-x-1">
          {Array.from({ length: 12 }).map((_, i) => (
            filledDays.includes(i) ? (
              <div key={i} className="aspect-square bg-foreground/20 dark:bg-foreground/30 rounded-[2px]" />
            ) : (
              <div key={i} className="aspect-square bg-accent rounded-[2px] group-hover:animate-pulse transition-opacity duration-200" />
            )
          ))}
          {/* Show extra 3 squares on lg (desktop) */}
          {Array.from({ length: 3 }).map((_, i) => {
            const index = 15 + i;
            return (
              <div key={`extra-${i}`} className="hidden lg:block">
                {filledDays.includes(index) ? (
                  <div className="aspect-square bg-foreground/20 dark:bg-foreground/30 rounded-[2px]" />
                ) : (
                  <div className="aspect-square bg-accent rounded-[2px] group-hover:animate-pulse transition-opacity duration-200" />
                )}
              </div>
            );
          })}
        </div>
        {/* Tablet (md): 18 squares (3 rows x 6 cols) */}
        <div className="hidden md:grid lg:hidden grid-cols-6 gap-y-1 gap-x-1">
          {Array.from({ length: 18 }).map((_, i) => (
            filledDays.includes(i) ? (
              <div key={i} className="aspect-square bg-foreground/20 dark:bg-foreground/30 rounded-[2px]" />
            ) : (
              <div key={i} className="aspect-square bg-accent rounded-[2px] group-hover:animate-pulse transition-opacity duration-200" />
            )
          ))}
        </div>
      </div>
    </ExampleCard>
  );
};
