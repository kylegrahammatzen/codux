"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useTamboThread, useTamboThreadList } from "@tambo-ai/react";

type RenameDialogProps = {
  projectId: string;
  currentName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (newName: string) => void;
};

export const RenameDialog = (props: RenameDialogProps) => {
  const [name, setName] = useState(props.currentName);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateThreadName } = useTamboThread();
  const contextKey = `project-${props.projectId}`;
  const { data: threads, refetch } = useTamboThreadList({ contextKey });

  // Update name when dialog opens or currentName changes
  useEffect(() => {
    if (props.open) {
      setName(props.currentName);
    }
  }, [props.open, props.currentName]);

  const handleRename = async () => {
    if (!name.trim() || isSubmitting) return;

    const threadId = threads?.items?.[0]?.id;
    if (!threadId) return;

    setIsSubmitting(true);
    try {
      await updateThreadName(name.trim(), threadId);
      await refetch(); // Refresh the thread list to get updated name
      props.onOpenChange(false);
      props.onSuccess?.(name.trim());
    } catch (error) {
      console.error("Failed to rename thread:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Project</DialogTitle>
          <DialogDescription>
            Enter a new name for your project
          </DialogDescription>
        </DialogHeader>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Project name"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleRename();
            }
          }}
        />
        <DialogFooter>
          <Button variant="ghost" onClick={() => props.onOpenChange(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleRename} disabled={!name.trim() || isSubmitting}>
            {isSubmitting ? "Renaming..." : "Rename"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
