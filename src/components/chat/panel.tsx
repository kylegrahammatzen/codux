"use client";

import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChatInput } from "@/components/chat/input";

export const ChatPanel = () => {
  return (
    <div className="flex flex-col h-full min-w-max">
      <div className="flex items-center justify-between px-2 border-b h-12">
        <div className="flex items-center gap-2">
          <div className="size-6 bg-black rounded-sm flex items-center justify-center">
            <span className="text-white text-xs font-semibold">St</span>
          </div>
          <span className="font-medium text-sm">Stan</span>
        </div>
        <Button variant="ghost" size="sm">
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </Button>
      </div>

      <CardContent className="flex-1 flex items-center justify-center">
        <p className="text-gray-400 text-sm">Chat panel</p>
      </CardContent>

      <div className="p-4">
        <ChatInput />
      </div>
    </div>
  );
};
