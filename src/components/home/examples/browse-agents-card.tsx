import { ExampleCard } from "./example-card";
import { Megaphone, File, ChartPie, ShoppingBasket, ShieldCheck, SquareKanban } from "lucide-react";

export const BrowseAgentsCard = () => {
  const icons = [SquareKanban, Megaphone, File, ChartPie, ShoppingBasket, ShieldCheck];

  return (
    <ExampleCard title="Browse available agents" description="See what agents can do.">
      <div className="grid grid-cols-3 gap-1.5 md:gap-1 w-fit mx-auto md:w-full">
        {icons.map((Icon, i) => (
          <div key={i} className="aspect-square w-16 md:w-auto md:max-h-16 bg-card rounded-sm flex items-center justify-center">
            <Icon className="size-5 text-muted-foreground" strokeWidth={2} />
          </div>
        ))}
      </div>
    </ExampleCard>
  );
};
