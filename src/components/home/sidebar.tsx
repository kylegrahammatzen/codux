"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Plus, Home, Search, Folder, HatGlasses, Settings, Gem, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useSession } from "@/providers/session-provider";

type HomeSidebarProps = {
  pathname: string;
};

export const HomeSidebar = (props: HomeSidebarProps) => {
  const router = useRouter();
  const session = useSession();
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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex flex-col h-full pt-2 min-w-max gap-4">
      <div className="flex flex-col gap-4">
        <Button size="sm" onClick={handleStartChat}>
          <Plus className="size-4" />
          Start Project
        </Button>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <div className="text-xs font-medium text-muted-foreground px-2 mb-1">Main</div>
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
          </div>

          <Separator />

          <div className="flex flex-col gap-1">
            <div className="text-xs font-medium text-muted-foreground px-2 mb-1">Work</div>
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
          </div>

          <Separator />

          <div className="flex flex-col gap-1">
            <div className="text-xs font-medium text-muted-foreground px-2 mb-1">Settings</div>
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
      </div>

      <div className="flex-1" />

      <div className="flex flex-col gap-3">
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
          <Button size="sm">
            Upgrade
          </Button>
        </Card>

        <Card className="p-3 flex items-center gap-3 min-w-0">
          <div className="size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
            {session.user.image ? (
              <img src={session.user.image} alt={session.user.name} className="size-8 rounded-full" />
            ) : (
              getInitials(session.user.name)
            )}
          </div>
          <div className="flex flex-col gap-0.5 flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{session.user.name}</div>
            <div className="text-xs text-muted-foreground truncate">{session.user.email}</div>
          </div>
        </Card>
      </div>
    </div>
  );
};
