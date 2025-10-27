"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Plus, Home, Compass, Headphones, Settings, Gem } from "lucide-react";
import { cn } from "@/lib/utils";

type HomeSidebarProps = {
  pathname: string;
};

export const HomeSidebar = (props: HomeSidebarProps) => {
  const isActive = (path: string) => props.pathname === path;

  return (
    <div className="flex flex-col justify-between h-full pt-2 min-w-max">
      <div className="flex flex-col">
        <Button size="sm">
          <Plus className="size-4" />
          Start Chat
        </Button>

        <div className="h-4" />

        <div className="flex flex-col gap-1">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "justify-start",
              isActive("/") && "bg-accent"
            )}
          >
            <Home className="size-4" />
            Home
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "justify-start",
              isActive("/explore") && "bg-accent"
            )}
          >
            <Compass className="size-4" />
            Explore
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "justify-start",
              isActive("/assistants") && "bg-accent"
            )}
          >
            <Headphones className="size-4" />
            Assistants
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "justify-start",
              isActive("/settings") && "bg-accent"
            )}
          >
            <Settings className="size-4" />
            Settings
          </Button>
        </div>
      </div>

      <Card className="p-3 flex flex-col gap-3 min-w-0">
        <div className="size-8 rounded-md bg-accent text-accent-foreground flex items-center justify-center">
          <Gem className="size-4" />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs gap-2">
            <div className="font-medium whitespace-nowrap">Plan: Free</div>
            <div className="text-muted-foreground whitespace-nowrap">20/20 messages</div>
          </div>
          <Progress value={100} />
        </div>
        <div className="flex-1" />
        <Button size="sm">
          Upgrade
        </Button>
      </Card>
    </div>
  );
};
