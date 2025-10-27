"use client";

import { File } from "lucide-react";

type FileItemProps = {
  name: string;
};

export const FileItem = (props: FileItemProps) => {
  return (
    <div className="flex items-center gap-1 hover:bg-accent rounded px-1 py-1 text-sm cursor-pointer">
      <File className="size-4 text-muted-foreground" />
      <span>{props.name}</span>
    </div>
  );
};
