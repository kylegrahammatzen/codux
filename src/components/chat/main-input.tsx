"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StagedFiles } from "@/components/chat/staged-files";
import { cn } from "@/lib/utils";
import { SendHorizontal, Mic, File } from "lucide-react";
import * as React from "react";
import { useRouter } from "next/navigation";
import { createProject } from "@/actions/project";
import type { StagedImage } from "@tambo-ai/react";

type MainInputProps = {
  className?: string;
  userId: string;
};

export const MainInput = (props: MainInputProps) => {
  const router = useRouter();
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [images, setImages] = React.useState<StagedImage[]>([]);

  const handleSubmit = React.useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!value.trim() || isSubmitting) return;

      setIsSubmitting(true);

      try {
        const result = await createProject(props.userId);

        if (result.success && result.projectId) {
          router.push(`/project/${result.projectId}`);
        } else {
          console.error("Failed to create project:", result.message);
          setIsSubmitting(false);
        }
      } catch (error) {
        console.error("Failed to create project:", error);
        setIsSubmitting(false);
      }
    },
    [value, isSubmitting, props.userId, router],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);

    const newImages: StagedImage[] = await Promise.all(
      files.map(async (file) => {
        const dataUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });

        return {
          id: Math.random().toString(36).substring(7),
          name: file.name,
          type: file.type,
          dataUrl,
        };
      })
    );

    setImages((prev) => [...prev, ...newImages]);
    e.target.value = "";
  };

  const removeImage = (fileId: string) => {
    setImages((prev) => prev.filter((img) => img.id !== fileId));
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
            <Button type="button" variant="outline" size="sm" className="bg-card" onClick={handleFileClick}>
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

          <Button type="submit" variant="default" size="icon-sm" disabled={isSubmitting || !value.trim()}>
            <SendHorizontal />
          </Button>
        </div>
      </div>
    </form>
  );
};
