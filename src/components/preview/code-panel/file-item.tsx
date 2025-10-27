"use client";

import { File } from "lucide-react";
import { cn } from "@/lib/utils";

type FileItemProps = {
  name: string;
  path?: string;
  isActive?: boolean;
  onClick?: (path: string) => void;
};

export const FileItem = (props: FileItemProps) => {
  const handleClick = () => {
    if (props.path && props.onClick) {
      props.onClick(props.path);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-1 hover:bg-accent rounded px-1 py-1 text-sm cursor-pointer",
        props.isActive && "bg-accent"
      )}
      onClick={handleClick}
    >
      <File className="size-4 text-muted-foreground" />
      <span>{props.name}</span>
    </div>
  );
};
