"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { X, File } from "lucide-react";
import * as React from "react";
import Image from "next/image";
import type { StagedImage } from "@tambo-ai/react";

type StagedFilesProps = {
  files: StagedImage[];
  onRemoveFile: (fileId: string) => void;
};

const truncateFilename = (filename: string, maxLength = 12): string => {
  const lastDotIndex = filename.lastIndexOf(".");
  if (lastDotIndex === -1) {
    return filename.length > maxLength ? filename.slice(0, maxLength - 3) + "..." : filename;
  }

  const name = filename.slice(0, lastDotIndex);
  const ext = filename.slice(lastDotIndex);

  if (filename.length <= maxLength) {
    return filename;
  }

  // Use middle truncation to show start and end of filename
  const availableLength = maxLength - ext.length - 1; // 1 for "…"
  const startLength = Math.ceil(availableLength / 2);
  const endLength = Math.floor(availableLength / 2);

  return name.slice(0, startLength) + "…" + name.slice(-endLength) + ext;
};

export const StagedFiles = (props: StagedFilesProps) => {
  if (props.files.length === 0) return null;

  const isImage = (file: StagedImage) => {
    return file.type.startsWith("image/");
  };

  const filePreview = (file: StagedImage) => (
    <div
      key={file.id}
      className="relative group flex-shrink-0 transition-all duration-300 ease-[cubic-bezier(.165,.84,.44,1)] select-none"
      style={{
        transitionProperty: "opacity, transform",
      }}
    >
      <div className="relative flex items-center justify-center rounded-lg border border-border bg-muted h-20 w-32 overflow-hidden pointer-events-none">
        {isImage(file) ? (
          <>
            <Image
              src={file.dataUrl}
              alt={file.name}
              fill
              unoptimized
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-2 right-2 text-white text-xs font-medium text-center truncate">
              {truncateFilename(file.name)}
            </div>
          </>
        ) : (
          <>
            <File className="size-8 text-muted-foreground" />
            <div className="absolute bottom-2 left-2 right-2 text-muted-foreground text-xs font-medium text-center truncate">
              {truncateFilename(file.name)}
            </div>
          </>
        )}
      </div>
      <Button
        type="button"
        variant="outline"
        onClick={(e) => {
          e.stopPropagation();
          props.onRemoveFile(file.id);
        }}
        className="absolute -top-2 -right-2 size-5 p-0 bg-card hover:bg-muted dark:hover:bg-muted"
        aria-label={`Remove ${file.name}`}
      >
        <X className="size-3" />
      </Button>
    </div>
  );

  return (
    <div
      className={cn(
        "transition-all duration-300 ease-[cubic-bezier(.165,.84,.44,1)]",
        props.files.length > 0 ? "opacity-100" : "opacity-0"
      )}
      style={{
        transitionProperty: "opacity, height",
      }}
    >
      <ScrollArea key={props.files.length} orientation="horizontal">
        <div className="flex items-center gap-2.5 mt-2">
          {props.files.map((file) => filePreview(file))}
        </div>
      </ScrollArea>
    </div>
  );
};
