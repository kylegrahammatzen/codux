"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { MoreVertical, Pencil, Copy, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useTamboThreadList } from "@tambo-ai/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RenameDialog } from "./rename-dialog";
import { DeleteDialog } from "./delete-dialog";
import { useProjects, type Project } from "@/providers/projects-provider";
import { useToast } from "@/hooks/use-toast";

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

const truncateText = (text: string, maxLength: number = 30): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

export const ProjectCard = (props: ProjectCardProps) => {
  const { updateProjectName, removeProject } = useProjects();
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const toast = useToast();
  const contextKey = `project-${props.id}`;
  const { data: threads } = useTamboThreadList({ contextKey });
  const [displayName, setDisplayName] = useState(props.name);

  useEffect(() => {
    // Use thread name from Tambo if available, otherwise use database name
    if (threads?.items?.[0]?.name) {
      setDisplayName(threads.items[0].name);
    }
  }, [threads]);

  const handleCopyId = async () => {
    await navigator.clipboard.writeText(props.id);
    toast.add({
      title: "Project ID copied",
      description: "The project ID has been copied to your clipboard",
    });
  };

  const handleRenameSuccess = (newName: string) => {
    updateProjectName(props.id, newName);
  };

  const handleDeleteSuccess = () => {
    removeProject(props.id);
  };

  return (
    <Card className="group p-0 gap-0 overflow-hidden min-w-0">
      {/* Preview Image */}
      <div className="relative aspect-video border-b border-border/70 dark:border-border/50">
        {props.previewImage ? (
          <Image
            src={props.previewImage}
            alt={props.name}
            fill
            unoptimized
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm bg-background">
            No preview
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 bg-background min-w-0">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium">
              {truncateText(displayName)}
            </h3>
            <p className="text-sm text-muted-foreground">
              Edited {formatRelativeTime(props.updatedAt)}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="shrink-0"
            render={<Link href={`/project/${props.id}`} />}
          >
            <Eye className="size-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={(triggerProps) => (
                <Button {...triggerProps} variant="ghost" size="sm" className="shrink-0" />
              )}
            >
              <MoreVertical className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setRenameDialogOpen(true)}>
                <Pencil className="size-4" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleCopyId}>
                <Copy className="size-4" />
                Copy Project ID
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
                <Trash2 className="size-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <RenameDialog
        projectId={props.id}
        currentName={props.name}
        open={renameDialogOpen}
        onOpenChange={setRenameDialogOpen}
        onSuccess={handleRenameSuccess}
      />

      <DeleteDialog
        projectId={props.id}
        projectName={props.name}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onSuccess={handleDeleteSuccess}
      />
    </Card>
  );
};
