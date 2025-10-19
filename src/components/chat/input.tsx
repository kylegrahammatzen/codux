"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChatInputActions } from "@/components/chat/input-actions";
import { MoveUp } from "lucide-react";

export const ChatInput = () => {
  return (
    <div className="bg-gray-50 rounded-md relative p-2 m-1.5 flex flex-col gap-2 border border-border shadow-sm focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 transition-[color,box-shadow,border-color] ease-[cubic-bezier(.25,.46,.45,.94)] duration-200 outline-none">
      <Textarea
        placeholder="Type a message..."
        className="bg-transparent border-none shadow-none min-h-12 resize-none focus-visible:ring-0 px-0"
      />

      {/* Buttons positioned at bottom */}
      <div className="flex justify-between items-center">
        <ChatInputActions />

        <Button variant="default" size="icon-sm">
          <MoveUp className="size-4" />
        </Button>
      </div>
    </div>
  );
};
