"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const UserDropdown = () => {
  return (
    <DropdownMenu openOnHover>
      <DropdownMenuTrigger className="size-8 data-[popup-open]:ring-2 data-[popup-open]:ring-ring hover:ring-2 hover:ring-ring focus-visible:ring-2 focus-visible:ring-ring transition-all duration-200 rounded-full">
        <Avatar className="size-8">
          <AvatarImage src="https://github.com/kylegrahammatzen.png" alt="User" />
          <AvatarFallback>KG</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Account settings</DropdownMenuItem>
        <DropdownMenuItem>Billing settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
