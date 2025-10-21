"use client";

import { File } from "lucide-react";
import { cn } from "@/lib/utils";

type FileItemProps = {
  name: string;
  path: string;
  isActive?: boolean;
  hasError?: boolean;
  onClick?: (path: string) => void;
};

export const FileItem = (props: FileItemProps) => {
  const handleClick = () => {
    props.onClick?.(props.path);
  };

  return (
    <div
      className={cn(
        "flex items-center gap-1 hover:bg-gray-100 rounded px-1 py-1 text-sm cursor-pointer group relative",
        props.isActive && "bg-blue-100 hover:bg-blue-100"
      )}
      onClick={handleClick}
    >
      <File className="size-4 text-muted-foreground" />
      <span className="flex-1">{props.name}</span>
      {props.hasError && (
        <div className="size-4 rounded-full bg-red-100 flex items-center justify-center" title="File has errors">
          <div className="size-2 rounded-full bg-red-500" />
        </div>
      )}
    </div>
  );
};
