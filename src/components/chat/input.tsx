"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChatInputActions } from "@/components/chat/input-actions";
import { cn } from "@/lib/utils";

type ChatInputProps = {
  className?: string;
};

export const ChatInput = (props: ChatInputProps) => {
  return (
    <div className={cn("rounded-md relative px-2 py-2 flex flex-col gap-2 border border-border bg-accent/20 focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 transition-[color,box-shadow,border-color] ease-[cubic-bezier(.25,.46,.45,.94)] duration-200 outline-none", props.className)}>
      <Textarea
        placeholder="Type a message..."
        className="bg-transparent border-none shadow-none min-h-20 resize-none focus-visible:ring-0 px-0"
      />

      {/* Buttons positioned at bottom */}
      <div className="flex justify-between items-center">
        <ChatInputActions />

        <Button variant="default" size="icon-sm">
          <span className="font-semibold">S</span>
        </Button>
      </div>
    </div>
  );
};
