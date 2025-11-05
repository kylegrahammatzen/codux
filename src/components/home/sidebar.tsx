"use client";

import { Button } from "@/components/ui/button";
import { Plus, Home, Search, Folder, HatGlasses, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import type { User as UserType } from "@/lib/auth";

type HomeSidebarProps = {
  pathname: string;
  user: UserType | null;
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

  const handleProfileClick = () => {
    const profilePath = `/@${props.user?.username}`;
    if (props.pathname !== profilePath) {
      router.push(profilePath);
    }
  };

  return (
    <div className="flex flex-col h-full pt-2 min-w-max">

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Button size="sm" onClick={handleStartChat}>
            <Plus className="size-4" />
            Start Project
          </Button>
        </div>

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
        </div>

        <div className="flex flex-col gap-1">
          <div className="text-xs font-medium text-muted-foreground px-2 mb-1">Account</div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleProfileClick}
            className={cn(
              "justify-start",
              isActive(`/@${props.user?.username}`) && "bg-accent"
            )}
          >
            <User className="size-4" />
            Profile
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
    </div>
  );
};
