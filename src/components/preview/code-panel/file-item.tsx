"use client";

import { File } from "lucide-react";

type FileItemProps = {
  name: string;
};

export const FileItem = (props: FileItemProps) => {
  return (
    <div className="flex items-center gap-1 hover:bg-gray-100 rounded px-1 py-1 text-sm cursor-pointer">
      <File className="size-4 text-gray-500" />
      <span>{props.name}</span>
    </div>
  );
};
