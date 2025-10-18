"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChatInputActions } from "@/components/chat/input-actions";

export const ChatInput = () => {
  return (
    <div className="bg-gray-50 rounded-md relative p-2 m-1.5 flex flex-col gap-2 border border-border shadow-sm focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 transition-[color,box-shadow,border-color] outline-none">
      <Textarea
        placeholder="Type a message..."
        className="bg-transparent border-none shadow-none min-h-12 resize-none focus-visible:ring-0 px-2"
      />

      {/* Buttons positioned at bottom */}
      <div className="flex justify-between items-center">
        <ChatInputActions />

        <Button variant="default" size="icon-sm">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
};
