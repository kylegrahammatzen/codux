"use client";

import { useAppContext } from "@/components/app-context";
import { ChatPanel } from "@/components/chat-panel";
import { PreviewPanel } from "@/components/preview-panel";
import { cn } from "@/lib/utils";

export const AppLayout = () => {
  const { isChatPanelVisible, isMobile } = useAppContext();

  return (
    <div className={cn("flex h-full", isChatPanelVisible && !isMobile && "gap-2")}>
      {!isMobile && (
        <div
          className={cn(
            "transition-[width] ease-in-out duration-300 overflow-hidden",
            isChatPanelVisible ? "w-[40%]" : "w-0"
          )}
        >
          <ChatPanel />
        </div>
      )}

      <PreviewPanel />
    </div>
  );
};
