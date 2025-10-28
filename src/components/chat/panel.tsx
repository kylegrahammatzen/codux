"use client";

import { Button } from "@/components/ui/button";
import { ScrollableMessageContainer } from "@/components/tambo/scrollable-message-container";
import { ThreadContent, ThreadContentMessages } from "@/components/tambo/thread-content";
import { ChatInput } from "@/components/chat/input";

export const ChatPanel = () => {
  return (
    <div className="flex flex-col h-full w-full min-w-max">
      <div className="flex items-center justify-between px-2 border-b h-12 bg-card rounded-t-md shrink-0">
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

      <div className="flex-1 min-h-0 flex flex-col">
        <ScrollableMessageContainer className="flex-1 min-h-0 p-4">
          <ThreadContent>
            <ThreadContentMessages />
          </ThreadContent>
        </ScrollableMessageContainer>

        <div className="px-4 pb-4 shrink-0 overflow-y-scroll">
          <ChatInput />
        </div>
      </div>
    </div>
  );
};
