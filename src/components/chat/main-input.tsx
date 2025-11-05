"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StagedFiles } from "@/components/chat/staged-files";
import { cn } from "@/lib/utils";
import { SendHorizontal, Mic, File } from "lucide-react";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useTamboThreadInput } from "@tambo-ai/react";
import { useFileUpload } from "@/contexts/file-upload-context";

type MainInputProps = {
  className?: string;
  userId: string;
};

function generateProjectId(): string {
  return typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export const MainInput = (props: MainInputProps) => {
  const router = useRouter();
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { value, setValue, submit, isPending } = useTamboThreadInput();
  const { images, addImages, removeImage, clearImages } = useFileUpload();

  const handleSubmit = React.useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if ((!value.trim() && images.length === 0) || isPending) return;

      // Generate projectId client-side
      const projectId = generateProjectId();

      // Store pending message in sessionStorage to be submitted from project page
      // Note: Images are not transferred in initial message (can be added after)
      try {
        sessionStorage.setItem(
          "pending-message",
          JSON.stringify({
            message: value,
            projectId,
          }),
        );
      } catch (error) {
        console.error("[MainInput] Failed to store pending message:", error);
      }

      // Clear form state before navigation
      setValue("");
      if (images.length > 0) {
        clearImages();
      }

      // Navigate to project page (will submit message there with correct contextKey)
      console.log("[MainInput] Navigating to:", `/project/${projectId}`);
      router.push(`/project/${projectId}`);
    },
    [value, setValue, isPending, images, clearImages, router],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileClick = () => {
    if (images.length >= 3) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length > 0) {
      await addImages(files);
    }
    e.target.value = "";
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={cn("rounded-md relative px-2 py-2 flex flex-col gap-1 border border-border bg-accent/20 focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 transition-all ease-[cubic-bezier(.215,.61,.355,1)] duration-300 outline-none", props.className)}>
        <StagedFiles files={images} onRemoveFile={removeImage} />

        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe what you want to build..."
          className="bg-transparent border-none shadow-none min-h-20 resize-none focus-visible:ring-0 px-0 min-w-max"
        />

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button type="button" variant="outline" size="icon-sm" className="bg-card">
              <Mic className="size-4" />
            </Button>
            <Button type="button" variant="outline" size="sm" className="bg-card" onClick={handleFileClick} disabled={images.length >= 3}>
              <File className="size-4" />
              Add file
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                aria-hidden="true"
              />
            </Button>
          </div>

          <Button type="submit" variant="default" size="icon-sm" disabled={isPending || (!value.trim() && images.length === 0)}>
            <SendHorizontal />
          </Button>
        </div>
      </div>
    </form>
  );
};
