import { ExampleCard } from "./example-card";
import { Megaphone, File, ChartPie, ShoppingBasket, ShieldCheck, SquareKanban } from "lucide-react";

export const BrowseAgentsCard = () => {
  const icons = [SquareKanban, Megaphone, File, ChartPie, ShoppingBasket, ShieldCheck];

  return (
    <ExampleCard title="Browse available agents" description="See what agents can do.">
      <div className="w-full grid grid-cols-3 gap-1">
        {icons.map((Icon, i) => (
          <div key={i} className="aspect-square max-h-16 bg-card rounded-sm flex items-center justify-center">
            <Icon className="size-5 text-muted-foreground" strokeWidth={2} />
          </div>
        ))}
      </div>
    </ExampleCard>
  );
};
