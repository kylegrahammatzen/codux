"use client";

import { Button } from "@/components/ui/button";
import { ChatInput } from "@/components/chat/input";

export const ChatPanel = () => {
  return (
    <div className="flex flex-col h-full min-w-max">
      <div className="flex items-center justify-between px-2 border-b h-12 bg-card rounded-t-md">
        <div className="flex items-center gap-2">
          <div className="size-6 bg-primary rounded-sm grid place-items-center">
            <span className="text-primary-foreground text-xs font-semibold">St</span>
          </div>
          <span className="font-medium text-sm">Stan</span>
        </div>
        <Button variant="ghost" size="sm">
          <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </Button>
      </div>

      <div className="flex-1 bg-card grid place-items-center">
        <p className="text-muted-foreground text-sm">Chat panel</p>
      </div>

      <ChatInput className="m-1.5" />
    </div>
  );
};
