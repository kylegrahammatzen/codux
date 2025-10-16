"use client";

import { Button } from "@/components/ui/button";
import { ChatInput } from "@/components/chat/input";
import { useProjectContext } from "@/components/project-context";

export const ChatPanel = () => {
  const { toggleChat } = useProjectContext();

  return (
    <div className="w-full h-full bg-white rounded-md flex flex-col">
      <div className="h-12 flex items-center justify-between p-2">
        <div className="flex items-center gap-2">
          <div className="size-6 bg-black rounded-sm flex items-center justify-center">
            <span className="text-white text-xs font-semibold">St</span>
          </div>
          <Button variant="ghost" size="sm">
            <span className="font-medium">Stan</span>
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
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Button>
        </div>
        <div className="flex items-center gap-1">
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
            <span className="sr-only">History</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={toggleChat}>
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
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
            <span className="sr-only">Collapse</span>
          </Button>
        </div>
      </div>

      <div className="flex-1 px-2">Stan</div>

      <ChatInput />
    </div>
  );
};
