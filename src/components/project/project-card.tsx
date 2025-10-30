"use client";

import Image from "next/image";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Project } from "@/providers/projects-provider";

type ProjectCardProps = Project;

const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)}w ago`;
  return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
};

export const ProjectCard = (props: ProjectCardProps) => {
  const handleRename = () => {
    // TODO: Implement rename functionality
    console.log("Rename project:", props.id);
  };

  const handleCopyId = async () => {
    await navigator.clipboard.writeText(props.id);
  };

  const handleDelete = () => {
    // TODO: Implement delete functionality
    console.log("Delete project:", props.id);
  };

  return (
    <div className="group relative rounded-lg border border-border bg-card overflow-hidden hover:border-border/80 transition-colors">
      {/* Preview Image */}
      <div className="relative aspect-video bg-muted overflow-hidden">
        {props.previewImage ? (
          <Image
            src={props.previewImage}
            alt={props.name}
            fill
            unoptimized
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
            No preview
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-card-foreground truncate flex-1">
            {props.name}
          </h3>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={(props) => (
                <Button
                  {...props}
                  variant="ghost"
                  size="sm"
                  className="size-6 p-0 -mt-1 -mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                />
              )}
            >
              <MoreVertical className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleRename}>
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleCopyId}>
                Copy Project ID
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive" onClick={handleDelete}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="text-sm text-muted-foreground">
          Edited {formatRelativeTime(props.updatedAt)}
        </p>
      </div>
    </div>
  );
};
