"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Eye } from "lucide-react";

type SnapshotActionsProps = {
  onRestore: () => void;
  onPreview: () => void;
};

export const SnapshotActions = (props: SnapshotActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
        <MoreVertical className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={props.onPreview}>
          <Eye className="size-4 mr-2" />
          Preview
        </DropdownMenuItem>
        <DropdownMenuItem onClick={props.onRestore}>
          Restore
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
