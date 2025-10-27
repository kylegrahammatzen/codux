"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChatInputActions } from "@/components/chat/input-actions";
import { cn } from "@/lib/utils";
import { SendHorizontal, X } from "lucide-react";
import { useTamboThreadInput, useTamboThread } from "@tambo-ai/react";
import * as React from "react";
import Image from "next/image";

type ChatInputProps = {
  className?: string;
};

export const ChatInput = (props: ChatInputProps) => {
  const { value, setValue, submit, images, removeImage, clearImages } = useTamboThreadInput();
  const { cancel } = useTamboThread();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleSubmit = React.useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if ((!value.trim() && images.length === 0) || isSubmitting) return;

      setIsSubmitting(true);

      if (images.length > 0) {
        setTimeout(() => clearImages(), 0);
      }

      try {
        await submit({ streamResponse: true });
        setValue("");
        setTimeout(() => {
          textareaRef.current?.focus();
        }, 0);
      } catch (error) {
        console.error("Failed to submit message:", error);
        await cancel();
      } finally {
        setIsSubmitting(false);
      }
    },
    [value, submit, setValue, cancel, isSubmitting, images, clearImages],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={cn("rounded-md relative px-2 py-2 flex flex-col gap-2 border border-border bg-accent/20 focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 transition-[color,box-shadow,border-color] ease-[cubic-bezier(.25,.46,.45,.94)] duration-200 outline-none", props.className)}>
        {images.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-border">
            {images.map((image) => (
              <div key={image.id} className="relative group flex-shrink-0">
                <div className="relative flex items-center rounded-lg border border-border bg-background hover:bg-muted w-32 h-20 overflow-hidden">
                  <Image
                    src={image.dataUrl}
                    alt={image.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-1 left-2 right-2 text-white text-xs font-medium truncate">
                    {image.name}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(image.id)}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-background border border-border text-muted-foreground rounded-full flex items-center justify-center hover:bg-muted hover:text-foreground transition-colors shadow-sm z-10"
                  aria-label={`Remove ${image.name}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about the code..."
          className="bg-transparent border-none shadow-none min-h-20 resize-none focus-visible:ring-0 px-0"
        />

        <div className="flex justify-between items-center">
          <ChatInputActions />

          <Button type="submit" variant="default" size="icon-sm" disabled={!value.trim() && images.length === 0}>
            <SendHorizontal />
          </Button>
        </div>
      </div>
    </form>
  );
};
