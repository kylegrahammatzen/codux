"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Plus, Home, Search, Folder, HatGlasses, Settings, Gem } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type HomeSidebarProps = {
  pathname: string;
};

export const HomeSidebar = (props: HomeSidebarProps) => {
  const router = useRouter();
  const isActive = (path: string) => props.pathname === path;

  const handleStartChat = () => {
    if (props.pathname !== "/") {
      router.push("/");
    }
  };

  const handleNavigation = (path: string) => {
    if (props.pathname !== path) {
      router.push(path);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full pt-2 min-w-max">
      <div className="flex flex-col">
        <Button size="sm" onClick={handleStartChat}>
          <Plus className="size-4" />
          Start Chat
        </Button>

        <div className="h-4" />

        <div className="flex flex-col gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleNavigation("/")}
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
            onClick={() => handleNavigation("/search")}
            className={cn(
              "justify-start",
              isActive("/search") && "bg-accent"
            )}
          >
            <Search className="size-4" />
            Search
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleNavigation("/projects")}
            className={cn(
              "justify-start",
              isActive("/projects") && "bg-accent"
            )}
          >
            <Folder className="size-4" />
            Projects
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleNavigation("/agents")}
            className={cn(
              "justify-start",
              isActive("/agents") && "bg-accent"
            )}
          >
            <HatGlasses className="size-4" />
            Agents
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleNavigation("/settings")}
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
