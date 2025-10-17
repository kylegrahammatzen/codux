"use client";

import { useAppContext } from "@/components/app-context";
import { useProjectContext } from "@/components/project-context";
import { ChatPanel } from "@/components/chat/panel";
import { PreviewPanel } from "@/components/preview/panel";
import { IntegrationsPanel } from "@/components/integrations/panel";
import { cn } from "@/lib/utils";

export const AppLayout = () => {
  const { isMobile } = useAppContext();
  const { showChat, showIntegrations } = useProjectContext();

  return (
    <div className="flex flex-1 overflow-hidden min-h-0">
      <div className={cn(
        "hidden xl:block flex-shrink-0 transition-all ease-in-out duration-300 overflow-hidden",
        showChat ? "w-[30%] mr-2" : "w-0"
      )}>
        <ChatPanel />
      </div>

      <PreviewPanel />

      <div className={cn(
        "hidden xl:block flex-shrink-0 transition-all ease-in-out duration-300 overflow-hidden",
        showIntegrations ? "w-[30%] ml-2" : "w-0"
      )}>
        <IntegrationsPanel />
      </div>
    </div>
  );
};
