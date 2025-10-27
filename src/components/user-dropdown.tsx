"use client";

import { signOut } from "@/actions/account";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuCustomItem,
} from "@/components/ui/dropdown-menu";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { Toggle } from "@/components/ui/toggle";
import { useTheme } from "next-themes";
import { useRouter, usePathname } from "next/navigation";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import type { User } from "@/lib/auth";

type UserDropdownProps = {
  user: User | null;
};

export const UserDropdown = (props: UserDropdownProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const user = props.user;
  const nameParts = user?.name?.split(" ") || [];
  const initials = nameParts.length > 1
    ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
    : nameParts[0]?.[0]?.toUpperCase() || "U";

  const handleProfileClick = () => {
    const profilePath = `/@${user?.username}`;
    if (pathname !== profilePath) {
      router.push(profilePath);
    }
  };

  return (
    <DropdownMenu openOnHover>
      <DropdownMenuTrigger className="size-8 data-[popup-open]:ring-2 data-[popup-open]:ring-ring hover:ring-2 hover:ring-ring focus-visible:ring-2 focus-visible:ring-ring transition-all duration-200 rounded-full cursor-pointer">
        <Avatar className="size-8">
          <AvatarImage src={user?.image || undefined} alt={user?.name || "User"} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center gap-2 p-2">
          <Avatar className="size-8">
            <AvatarImage src={user?.image || undefined} alt={user?.name || "User"} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-sm font-medium truncate">{user?.name || "User"}</span>
            <span className="text-xs text-muted-foreground truncate">{user?.email || ""}</span>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleProfileClick}>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Preferences</DropdownMenuLabel>
          <DropdownMenuCustomItem>
            <span className="text-sm">Theme</span>
            <ToggleGroup value={theme ? [theme] : []} onValueChange={(value) => value[0] && setTheme(value[0])}>
              <Toggle value="system" variant="outline" size="sm" className="h-7 min-w-7 px-1">
                <MonitorIcon className="size-3.5" />
              </Toggle>
              <Toggle value="light" variant="outline" size="sm" className="h-7 min-w-7 px-1">
                <SunIcon className="size-3.5" />
              </Toggle>
              <Toggle value="dark" variant="outline" size="sm" className="h-7 min-w-7 px-1">
                <MoonIcon className="size-3.5" />
              </Toggle>
            </ToggleGroup>
          </DropdownMenuCustomItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={async () => await signOut()}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
