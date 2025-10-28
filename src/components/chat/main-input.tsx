"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { SendHorizontal, Mic } from "lucide-react";
import * as React from "react";
import { useRouter } from "next/navigation";
import { createProject } from "@/actions/project";

type MainInputProps = {
  className?: string;
  userId: string;
};

export const MainInput = (props: MainInputProps) => {
  const router = useRouter();
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

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

  return (
    <form onSubmit={handleSubmit}>
      <div className={cn("rounded-md relative px-2 py-2 flex flex-col gap-1 border border-border bg-accent/20 focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 transition-all ease-[cubic-bezier(.215,.61,.355,1)] duration-300 outline-none", props.className)}>
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about the code..."
          className="bg-transparent border-none shadow-none min-h-20 resize-none focus-visible:ring-0 px-0 min-w-max"
        />

        <div className="flex justify-between items-center">
          <Button type="button" variant="outline" size="icon-sm" className="bg-card">
            <Mic className="size-4" />
          </Button>

          <Button type="submit" variant="default" size="icon-sm" disabled={isSubmitting || !value.trim()}>
            <SendHorizontal />
          </Button>
        </div>
      </div>
    </form>
  );
};
